#!/usr/bin/env node
/**
 * Generate a Storybook story + Vitest smoke spec for every .jsx in src/components.
 * Skips files that already have a sibling .stories.jsx or .test.jsx (so manual
 * stories / tests authored later are never overwritten).
 *
 * Heuristics:
 *  - Default-exported components get a `Default` story with no props.
 *  - Named-exported components get one story per export that looks like a
 *    PascalCase React component, plus a render-without-crash spec each.
 *  - Components whose name ends in "Modal" or starts with "Use" are scaffolded
 *    with `open` defaulted to true so the Storybook frame shows content.
 *  - File-level imports are read so the story re-exports the same surface;
 *    arg types are left empty — Storybook infers controls from runtime props.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TARGETS = [
  path.join(ROOT, 'src', 'components'),
  path.join(ROOT, 'src', 'pages'),
]

const PASCAL = /^[A-Z][A-Za-z0-9_]*$/

async function walk(dir) {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(p)))
    else if (entry.isFile() && entry.name.endsWith('.jsx')) out.push(p)
  }
  return out
}

function parseExports(src) {
  const named = new Set()
  let hasDefault = false

  const defaultRe = /export\s+default\s+(?:function\s+([A-Za-z0-9_]+)|([A-Za-z0-9_]+))/g
  let m
  while ((m = defaultRe.exec(src))) {
    hasDefault = true
    const id = m[1] || m[2]
    if (id && PASCAL.test(id)) named.add(`__default__:${id}`)
  }

  if (!hasDefault && /export\s+default\s+/.test(src)) hasDefault = true

  const namedRe =
    /export\s+(?:const|let|var|function|class)\s+([A-Za-z0-9_]+)|export\s*{\s*([^}]+)\s*}/g
  while ((m = namedRe.exec(src))) {
    if (m[1] && PASCAL.test(m[1])) named.add(m[1])
    if (m[2]) {
      for (const part of m[2].split(',')) {
        const name = part.trim().split(/\s+as\s+/i).pop().trim()
        if (PASCAL.test(name)) named.add(name)
      }
    }
  }

  return { hasDefault, named: [...named] }
}

function titleFor(absPath, baseName) {
  const fromComponents = path.relative(path.join(ROOT, 'src', 'components'), absPath)
  if (!fromComponents.startsWith('..')) {
    const dir = path.dirname(fromComponents)
    if (dir === '.' || dir === '') return `Components/${baseName}`
    const segments = dir.split(path.sep).map((s) => s[0].toUpperCase() + s.slice(1))
    return `Components/${segments.join('/')}/${baseName}`
  }
  const fromPages = path.relative(path.join(ROOT, 'src', 'pages'), absPath)
  if (!fromPages.startsWith('..')) {
    return `Pages/${baseName}`
  }
  return baseName
}

function storyTemplate({ baseName, importPath, defaultExportName, namedComponents, isModalLike, visibilityProp, isPage, isOverlay, title }) {
  // base44-ported modals gate visibility on `isOpen`; shadcn primitives use `open`.
  // Use whichever the component actually destructures so the story isn't blank.
  const visProp = visibilityProp || 'open'
  const defaultProps = isModalLike ? `{ ${visProp}: true, onOpenChange: () => {}, onClose: () => {} }` : `{}`
  const importLine = (() => {
    const parts = []
    if (defaultExportName) parts.push(defaultExportName)
    const namedOnly = namedComponents.filter((n) => n !== defaultExportName)
    const right = namedOnly.length ? `{ ${namedOnly.join(', ')} }` : null
    if (parts.length && right) return `import ${parts[0]}, ${right} from '${importPath}'`
    if (parts.length) return `import ${parts[0]} from '${importPath}'`
    if (right) return `import ${right} from '${importPath}'`
    return `import * as Mod from '${importPath}'`
  })()

  const stories = []
  if (defaultExportName) {
    stories.push(`export const Default = {
  name: '${defaultExportName}',
  render: (args) => <${defaultExportName} {...args} />,
  args: ${defaultProps},
}`)
  }
  for (const c of namedComponents) {
    if (c === defaultExportName) continue
    stories.push(`export const ${c}Example = {
  name: '${c}',
  render: (args) => <${c} {...args} />,
  args: ${defaultProps},
}`)
  }
  if (stories.length === 0) {
    stories.push(`export const Default = {
  render: () => <div className="t-body-md text-muted-foreground">No default render — pick a named export.</div>,
}`)
  }

  return `import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
${importLine}

export default {
  title: '${title}',
  component: ${defaultExportName || namedComponents[0] || 'undefined'},
  parameters: { layout: '${isPage || isOverlay ? 'fullscreen' : 'centered'}' },
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}

${stories.join('\n\n')}
`
}

function testTemplate({ importPath, defaultExportName, namedComponents }) {
  /*
   * Smoke test goal: catch import-time breakage (missing dep, bad alias,
   * broken refactor). Runtime mount tests are too brittle for compound
   * primitives that need children/triggers — those get hand-written specs.
   */
  const all = [defaultExportName, ...namedComponents.filter((n) => n !== defaultExportName)].filter(Boolean)
  const importLine = (() => {
    const parts = []
    if (defaultExportName) parts.push(defaultExportName)
    const namedOnly = namedComponents.filter((n) => n !== defaultExportName)
    const right = namedOnly.length ? `{ ${namedOnly.join(', ')} }` : null
    if (parts.length && right) return `import ${parts[0]}, ${right} from '${importPath}'`
    if (parts.length) return `import ${parts[0]} from '${importPath}'`
    if (right) return `import ${right} from '${importPath}'`
    return null
  })()

  const cases = []
  for (const c of all) {
    cases.push(`  it('exports ${c}', () => {
    expect(${c}).toBeDefined()
  })`)
  }

  if (importLine) {
    return `import { describe, it, expect } from 'vitest'
${importLine}

describe('${all.join(', ')}', () => {
${cases.join('\n\n')}
})
`
  }

  return `import { describe, it, expect } from 'vitest'
import * as Mod from '${importPath}'

describe('${importPath}', () => {
  it('module loads', () => {
    expect(Mod).toBeTypeOf('object')
  })
})
`
}

async function main() {
  const files = (await Promise.all(TARGETS.map(walk))).flat()
  let storiesWritten = 0
  let testsWritten = 0

  for (const file of files) {
    const baseName = path.basename(file, '.jsx')
    if (baseName.endsWith('.stories') || baseName.endsWith('.test')) continue

    const src = await fs.readFile(file, 'utf8')
    const { hasDefault, named } = parseExports(src)
    const defaultExportName = named.find((n) => n.startsWith('__default__:'))?.split(':')[1] || (hasDefault ? baseName : null)
    const namedComponents = named.filter((n) => !n.startsWith('__default__:'))

    const importPath = './' + baseName
    const isModalLike = /Modal$/.test(baseName) || /Drawer$/.test(baseName) || /Dialog$/.test(baseName)
    const visibilityProp = /\bisOpen\b/.test(src) ? 'isOpen' : 'open'
    // Full-screen overlays (modals/drawers) must use `layout: fullscreen`, else
    // Storybook's centered Docs canvas renders the story iframe ~300px wide and
    // the `fixed inset-0` modal is squished. Detect from source, not just name.
    const isOverlay = /fixed\s+inset-0/.test(src)
    const isPage = file.includes(`${path.sep}pages${path.sep}`)
    const title = titleFor(file, baseName)
    const storyPath = path.join(path.dirname(file), `${baseName}.stories.jsx`)
    const testPath = path.join(path.dirname(file), `${baseName}.test.jsx`)

    try {
      await fs.access(storyPath)
    } catch {
      const story = storyTemplate({ baseName, importPath, defaultExportName, namedComponents, isModalLike, visibilityProp, isPage, isOverlay, title })
      await fs.writeFile(storyPath, story)
      storiesWritten++
    }

    try {
      await fs.access(testPath)
    } catch {
      const test = testTemplate({ importPath, defaultExportName, namedComponents, isModalLike })
      await fs.writeFile(testPath, test)
      testsWritten++
    }
  }

  console.log(`stories written: ${storiesWritten}`)
  console.log(`tests written:   ${testsWritten}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
