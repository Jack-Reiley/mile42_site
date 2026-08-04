#!/usr/bin/env node
/* Compiles design/tokens/theme.css with Tailwind and asserts that every token
 * it declares actually produces a utility.
 *
 * The probe is generated from the theme rather than hand-maintained, so adding
 * a token automatically puts it under test. A typo'd token name fails here
 * instead of silently producing no utility at the call site.
 *
 * This checks that the theme is structurally valid and complete. It cannot
 * check that the values are correct — no hex or size is printed in the source
 * PDFs, so a transcription error is invisible to automation. See README.md.
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const THEME = resolve(HERE, '..', 'theme.css')
const ROOT = resolve(HERE, '..', '..', '..')
// Tailwind resolves `@import "tailwindcss"` relative to the importing file, so
// the generated entry has to live somewhere node_modules is reachable from.
// node_modules/.cache is already ignored by git.
const SCRATCH = join(ROOT, 'node_modules', '.cache')

/** Theme namespace -> the utility that proves the token resolved. */
const NAMESPACES = [
  ['--color-', (n) => `bg-${n}`],
  ['--font-', (n) => `font-${n}`],
  ['--text-', (n) => `text-${n}`],
  ['--spacing-', (n) => `p-${n}`],
  ['--container-', (n) => `max-w-${n}`],
  ['--radius-', (n) => `rounded-${n}`],
  ['--shadow-', (n) => `shadow-${n}`],
  ['--breakpoint-', (n) => `${n}:flex`],
]

function parseTokens(css) {
  const body = css.slice(css.indexOf('@theme'))
  const tokens = []
  for (const [, name] of body.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)) {
    // Skip modifiers such as --text-heading-1--line-height; they qualify a
    // token rather than creating one.
    if (name.slice(2).includes('--')) continue
    const ns = NAMESPACES.find(([prefix]) => name.startsWith(prefix))
    if (!ns) continue
    tokens.push({ name, utility: ns[1](name.slice(ns[0].length)) })
  }
  return tokens
}

/** Declared value of a token in theme.css, ignoring the trailing comment. */
function declaredValue(css, name) {
  const m = css.match(new RegExp(`^\\s*${name}\\s*:\\s*([^;]+);`, 'm'))
  return m ? m[1].trim() : null
}

const css = readFileSync(THEME, 'utf8')
const tokens = parseTokens(css)
if (tokens.length === 0) {
  console.error('FAIL: no tokens parsed from theme.css')
  process.exit(1)
}

// 1. Contract check. Catches a renamed, mistyped, or silently re-valued token,
//    which the generated probe alone cannot: the probe is built from theme.css,
//    so a token renamed to `--color-brnad` would just produce `bg-brnad` and
//    pass. The fixture is the independent source of truth.
const expected = JSON.parse(readFileSync(join(HERE, 'expected.json'), 'utf8'))
const contractFailures = []
for (const [group, entries] of Object.entries(expected)) {
  if (group.startsWith('_')) continue
  for (const [name, want] of Object.entries(entries)) {
    const got = declaredValue(css, name)
    if (got === null) contractFailures.push(`${name} — missing from theme.css`)
    else if (got !== want) contractFailures.push(`${name} — expected ${want}, found ${got}`)
  }
}
if (contractFailures.length) {
  console.error(`FAIL: ${contractFailures.length} token(s) disagree with expected.json:`)
  for (const f of contractFailures) console.error(`  ${f}`)
  process.exit(1)
}
const contractCount = Object.entries(expected)
  .filter(([g]) => !g.startsWith('_'))
  .reduce((n, [, e]) => n + Object.keys(e).length, 0)

mkdirSync(SCRATCH, { recursive: true })
const work = mkdtempSync(join(SCRATCH, 'mile42-tokens-'))
try {
  writeFileSync(
    join(work, 'probe.html'),
    `<div class="${tokens.map((t) => t.utility).join(' ')}"></div>\n`,
  )
  // The probe entry supplies the Tailwind import that theme.css deliberately omits.
  writeFileSync(
    join(work, 'entry.css'),
    `@import "tailwindcss";\n@import ${JSON.stringify(THEME)};\n@source "./probe.html";\n`,
  )

  execFileSync(
    'npx',
    ['@tailwindcss/cli', '-i', join(work, 'entry.css'), '-o', join(work, 'out.css')],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  )

  const out = readFileSync(join(work, 'out.css'), 'utf8')
  // Tailwind escapes the variant colon in the emitted selector, so `comp:flex`
  // lands as `.comp\:flex`. Compare against the literal selector text rather
  // than building a regex, which is easy to get subtly wrong.
  const missing = tokens.filter(
    ({ utility }) => !out.includes(`.${utility.replaceAll(':', '\\:')}`),
  )

  if (missing.length) {
    console.error(`FAIL: ${missing.length} token(s) produced no utility:`)
    for (const m of missing) console.error(`  ${m.name}  ->  .${m.utility}`)
    process.exit(1)
  }

  console.log(`contract: ${contractCount} pinned value(s) match expected.json`)
  console.log(`tokens:   ${tokens.length} declared, ${tokens.length} produced a utility`)
  console.log('theme.css compiles under Tailwind and is structurally complete')
} catch (err) {
  if (err.stderr?.length) console.error(err.stderr.toString())
  else console.error(err.message)
  process.exit(1)
} finally {
  rmSync(work, { recursive: true, force: true })
}
