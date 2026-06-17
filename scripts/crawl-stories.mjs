#!/usr/bin/env node
/**
 * Visit every Storybook story via /iframe.html?id=... and report which ones
 * fail to render. A story is considered broken if it produces any of:
 *
 *   - an uncaught page error (React render crash, missing import, etc.)
 *   - a console error containing a React error / Storybook story error / stack
 *   - the preview iframe ends up empty after the wait budget
 *
 * Console warnings + the noisy Vite/HMR/source-map logs are filtered out.
 *
 * Usage:
 *   STORYBOOK=http://localhost:6006 node scripts/crawl-stories.mjs
 *   STORYBOOK=http://localhost:6006 LIMIT=20 node scripts/crawl-stories.mjs
 *
 * Output: a Markdown report at scripts/.story-report.md plus a JSON dump at
 * scripts/.story-report.json so subsequent runs can diff results.
 */
import { chromium } from '@playwright/test'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const BASE = process.env.STORYBOOK || 'http://localhost:6006'
const LIMIT = process.env.LIMIT ? Number(process.env.LIMIT) : Infinity
const CONCURRENCY = Number(process.env.CONCURRENCY || 4)
const WAIT_MS = Number(process.env.WAIT_MS || 1500)

const NOISE = [
  /\[vite\]/i,
  /sourcemap/i,
  /Download the React DevTools/,
  /AutomaticHistory/, // react-router noise
  /Warning: ReactDOM\.render/, // legacy storybook docs renderer
  /404 \(Not Found\)/, // missing image assets — not a story failure
  /Failed to load resource.*image/i,
  /preview-CfRjIl94\.js/, // chunk URL noise
]

function isNoise(text) {
  return NOISE.some((re) => re.test(text))
}

async function fetchIndex() {
  const res = await fetch(`${BASE}/index.json`)
  if (!res.ok) throw new Error(`index.json HTTP ${res.status}`)
  const j = await res.json()
  return Object.values(j.entries).filter((e) => e.type === 'story')
}

async function visit(browser, story) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()
  const errors = []
  const consoleErrors = []

  page.on('pageerror', (e) => {
    if (!isNoise(e.message)) errors.push(e.message.split('\n')[0])
  })
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (isNoise(text)) return
    consoleErrors.push(text.split('\n')[0])
  })

  const url = `${BASE}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`
  let status = 'pass'
  let detail = ''
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
    // Storybook injects a root div; let React mount + Storybook decorators run.
    await page.waitForTimeout(WAIT_MS)
    const empty = await page.evaluate(() => {
      const root = document.querySelector('#storybook-root, #root')
      const rootEmpty = !root || (root.children.length === 0 && (root.textContent || '').trim() === '')
      // Radix portals (Dialog, Sheet, Popover, etc.) attach to document.body
      // outside the storybook root. Treat any rendered content anywhere in
      // <body> as a non-empty story.
      const bodyText = (document.body.textContent || '').trim()
      const portalChildren = [...document.body.children].some(
        (c) => c.id !== 'storybook-root' && c.tagName !== 'SCRIPT' && c.children.length > 0,
      )
      return rootEmpty && bodyText.length === 0 && !portalChildren
    })
    const allErrors = [...errors, ...consoleErrors]
    if (allErrors.length) {
      status = 'fail'
      detail = allErrors.slice(0, 3).join(' | ')
    } else if (empty) {
      status = 'empty'
      detail = 'root mounted but rendered nothing'
    }
  } catch (e) {
    status = 'fail'
    detail = `navigation: ${e.message}`
  } finally {
    await ctx.close()
  }
  return { id: story.id, title: story.title, name: story.name, status, detail }
}

async function pool(items, n, work) {
  const results = []
  let i = 0
  let done = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      const r = await work(items[idx])
      results[idx] = r
      done++
      if (done % 25 === 0 || done === items.length) {
        process.stderr.write(`  …${done}/${items.length}\n`)
      }
    }
  }
  await Promise.all(Array.from({ length: n }, worker))
  return results
}

async function main() {
  const stories = (await fetchIndex()).slice(0, LIMIT)
  console.error(`Crawling ${stories.length} stories on ${BASE} (concurrency=${CONCURRENCY})`)
  const browser = await chromium.launch({ headless: true })
  try {
    const results = await pool(stories, CONCURRENCY, (s) => visit(browser, s))
    const failed = results.filter((r) => r.status !== 'pass')
    const byStatus = results.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1
      return acc
    }, {})

    // Markdown report
    const md = [
      `# Story crawl report`,
      ``,
      `- Storybook: ${BASE}`,
      `- Stories visited: **${results.length}**`,
      `- Pass:  **${byStatus.pass || 0}**`,
      `- Fail:  **${byStatus.fail || 0}**`,
      `- Empty: **${byStatus.empty || 0}**`,
      ``,
    ]
    if (failed.length) {
      md.push(`## Broken stories`, ``)
      md.push(`| Status | ID | Detail |`)
      md.push(`|---|---|---|`)
      for (const r of failed) {
        const safeDetail = r.detail.replace(/\|/g, '\\|').slice(0, 220)
        md.push(`| ${r.status} | \`${r.id}\` | ${safeDetail} |`)
      }
    }
    const mdPath = path.join(__dirname, '.story-report.md')
    const jsonPath = path.join(__dirname, '.story-report.json')
    await fs.writeFile(mdPath, md.join('\n'))
    await fs.writeFile(jsonPath, JSON.stringify(results, null, 2))
    console.log(`\n${results.length} stories  ${byStatus.pass || 0} pass  ${byStatus.fail || 0} fail  ${byStatus.empty || 0} empty`)
    console.log(`Report:   ${path.relative(ROOT, mdPath)}`)
    console.log(`Raw json: ${path.relative(ROOT, jsonPath)}`)
    process.exit(failed.length ? 1 : 0)
  } finally {
    await browser.close()
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
