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

/* ------------------------------------------------------------------ contrast
 * The gate cannot tell you a value is wrong, but it can tell you a pairing is
 * illegible. Every text-colour/fill pairing the design actually draws is listed
 * below with the WCAG 2.1 AA threshold for the size it is set at.
 *
 * Three fills are not tokens. `tint`, `blue` and `orange-deep` are written as
 * mixes in the `BAND` map in site/src/components/primitives.jsx, which says to
 * promote them when a second page needs them. They are spelled the same way
 * here and must be changed with it. Everything else resolves through the theme,
 * so a change to a parent token carries into the check automatically.
 */
const AA_NORMAL = 4.5
const AA_LARGE = 3

const TINT = 'color-mix(in srgb, var(--color-accent) 10%, white)'
const BLUE = 'color-mix(in srgb, var(--color-accent) 92%, black)'
const ORANGE_DEEP = 'color-mix(in srgb, var(--color-orange) 76%, black)'

const PAIRS = [
  // Body and heading ink, on every fill it is set on.
  ['var(--color-ink)', 'var(--color-page)', AA_NORMAL, 'body on the page fill'],
  ['var(--color-ink)', 'var(--color-surface)', AA_NORMAL, 'body on the surface band'],
  ['var(--color-ink)', TINT, AA_NORMAL, 'body on the tint band'],
  ['var(--color-ink)', 'var(--color-cta)', AA_NORMAL, 'body on the gold band'],
  ['var(--color-ink)', 'var(--color-brand)', AA_NORMAL, 'body on the hero band'],
  ['var(--color-on-cta)', 'var(--color-cta)', AA_NORMAL, 'button label on its fill'],

  // The accent as text. 12px eyebrows and 16px tertiary links, so normal text
  // throughout. The gold row is a selected SelectorPanel row; it sets the value.
  ['var(--color-accent-deep)', 'var(--color-page)', AA_NORMAL, 'accent text on the page fill'],
  ['var(--color-accent-deep)', 'var(--color-surface)', AA_NORMAL, 'accent text on the surface band'],
  ['var(--color-accent-deep)', TINT, AA_NORMAL, 'accent text on the tint band'],
  ['var(--color-accent-deep)', 'var(--color-cta)', AA_NORMAL, 'accent text on a selected gold row'],

  // Eyebrows on the dark bands. `sky` and `ice` are not interchangeable: on the
  // blue band sky measures 3.37 and only ice clears AA.
  ['var(--color-sky)', 'var(--color-navy)', AA_NORMAL, 'sky eyebrow on the navy band'],
  ['var(--color-ice)', BLUE, AA_NORMAL, 'ice eyebrow on the blue band'],
  // Meet Dewey's eyebrow. Neither coloured on-dark tone survives on this fill —
  // ice measures 4.49 and sky 3.32 — so it takes the off-white the headings
  // take, and that pairing is the row below rather than a fourth entry here.

  // Off-white headings on the dark bands.
  ['var(--color-hero-heading)', 'var(--color-navy)', AA_NORMAL, 'off-white copy on the navy band'],
  ['var(--color-hero-heading)', 'var(--color-forest)', AA_NORMAL, 'off-white copy on the forest band'],
  ['var(--color-hero-heading)', BLUE, AA_NORMAL, 'off-white copy on the blue band'],
  ['var(--color-hero-heading)', ORANGE_DEEP, AA_NORMAL, 'off-white copy on the orange-deep band'],

  // Reported, not enforced. The hero H1 misses even the large-text threshold
  // and is the most prominent element on the site. Changing either value is a
  // brand decision nobody has taken. OPEN-QUESTIONS.md question 1.
  ['var(--color-hero-heading)', 'var(--color-brand)', AA_LARGE, 'the hero H1 on the brand band', 'question 1'],
]

const NAMED = { white: '#ffffff', black: '#000000' }

/** Split on commas that are not inside parentheses. */
function splitArgs(s) {
  const out = []
  let depth = 0
  let start = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++
    else if (s[i] === ')') depth--
    else if (s[i] === ',' && depth === 0) {
      out.push(s.slice(start, i).trim())
      start = i + 1
    }
  }
  out.push(s.slice(start).trim())
  return out
}

/** A CSS colour expression to [r,g,b]. Handles hex, the two named colours the
 *  theme uses, var() indirection, and srgb color-mix, which is all the theme
 *  and the band maps contain. Anything else is a deliberate error rather than a
 *  silent zero. */
function resolveColor(css, expr) {
  const e = expr.trim()

  if (e in NAMED) return resolveColor(css, NAMED[e])

  if (e.startsWith('#')) {
    const h = e.slice(1)
    const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h
    if (full.length !== 6) throw new Error(`unsupported hex: ${e}`)
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
  }

  const v = e.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i)
  if (v) {
    const declared = declaredValue(css, v[1])
    if (declared === null) throw new Error(`${v[1]} is not declared in theme.css`)
    return resolveColor(css, declared)
  }

  const mix = e.match(/^color-mix\(\s*in\s+srgb\s*,([\s\S]*)\)$/i)
  if (mix) {
    const [first, second] = splitArgs(mix[1])
    const pct = first.match(/\s(\d+(?:\.\d+)?)%$/)
    if (!pct) throw new Error(`color-mix needs an explicit percentage: ${e}`)
    const p = Number(pct[1]) / 100
    const a = resolveColor(css, first.slice(0, pct.index))
    const b = resolveColor(css, second)
    return [0, 1, 2].map((i) => a[i] * p + b[i] * (1 - p))
  }

  throw new Error(`cannot resolve colour: ${e}`)
}

/** WCAG 2.1 relative luminance. */
function luminance([r, g, b]) {
  const lin = (v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrast(fg, bg) {
  const a = luminance(fg)
  const b = luminance(bg)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

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

// 2. Contrast check. The two checks above prove the theme is structurally sound;
//    neither notices that a pairing it produces is unreadable. This one does.
const contrastFailures = []
const knownDebt = []
for (const [fgExpr, bgExpr, threshold, label, known] of PAIRS) {
  const ratio = contrast(resolveColor(css, fgExpr), resolveColor(css, bgExpr))
  const line = `${label} — ${ratio.toFixed(2)}:1, needs ${threshold}`
  if (known) knownDebt.push(`${line} (${known})`)
  else if (ratio < threshold) contrastFailures.push(line)
}
if (contrastFailures.length) {
  console.error(`FAIL: ${contrastFailures.length} pairing(s) below WCAG AA:`)
  for (const f of contrastFailures) console.error(`  ${f}`)
  process.exit(1)
}

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
  console.log(`contrast: ${PAIRS.length - knownDebt.length} pairing(s) meet WCAG AA`)
  for (const d of knownDebt) console.log(`  known:  ${d}`)
  console.log(`tokens:   ${tokens.length} declared, ${tokens.length} produced a utility`)
  console.log('theme.css compiles under Tailwind and is structurally complete')
} catch (err) {
  if (err.stderr?.length) console.error(err.stderr.toString())
  else console.error(err.message)
  process.exit(1)
} finally {
  rmSync(work, { recursive: true, force: true })
}
