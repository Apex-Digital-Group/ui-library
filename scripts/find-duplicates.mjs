#!/usr/bin/env node
/**
 * Pairwise similarity scan across pages/ and component domain folders.
 * Tokenises each file (strips comments, collapses whitespace, drops string
 * literals so prose/data doesn't dominate) then compares the token bag with
 * Jaccard similarity. Prints any pair >= 0.55 — that band catches "same
 * template, different data" without flooding with shared-import noise.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', 'src')

const TARGETS = [
  path.join(ROOT, 'pages'),
  path.join(ROOT, 'components', 'groups'),
  path.join(ROOT, 'components', 'agency'),
  path.join(ROOT, 'components', 'refer'),
  path.join(ROOT, 'components'),
]

async function walk(dir, depth = 0) {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.jsx') && !/\.(test|stories)\.jsx$/.test(entry.name)) {
      out.push(path.join(dir, entry.name))
    }
  }
  return out
}

function tokens(src) {
  const stripped = src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, ' "S" ')
    .replace(/[{}();,]/g, ' ')
  return new Set(
    stripped
      .split(/\s+/)
      .filter((t) => t.length >= 3 && t.length <= 40 && !/^\d+$/.test(t)),
  )
}

function jaccard(a, b) {
  let inter = 0
  for (const t of a) if (b.has(t)) inter++
  const uni = a.size + b.size - inter
  return uni === 0 ? 0 : inter / uni
}

async function main() {
  const files = (
    await Promise.all(TARGETS.map((d) => walk(d).catch(() => [])))
  ).flat()
  const seen = new Set()
  const groups = []
  for (const f of files) {
    if (seen.has(f)) continue
    seen.add(f)
    groups.push({ canonical: f, src: await fs.readFile(f, 'utf8') })
  }
  for (const g of groups) g.tokens = tokens(g.src)

  const hits = []
  for (let i = 0; i < groups.length; i++) {
    for (let j = i + 1; j < groups.length; j++) {
      const score = jaccard(groups[i].tokens, groups[j].tokens)
      if (score >= 0.4) {
        hits.push({
          a: path.relative(ROOT, groups[i].canonical),
          b: path.relative(ROOT, groups[j].canonical),
          score: score.toFixed(2),
        })
      }
    }
  }
  hits.sort((x, y) => y.score - x.score)
  for (const h of hits) {
    console.log(`${h.score}  ${h.a}  ↔  ${h.b}`)
  }
  console.log(`\n${hits.length} suspected duplicate pairs (threshold 0.55).`)
}

main().catch((e) => { console.error(e); process.exit(1) })
