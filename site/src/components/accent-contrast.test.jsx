import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * The accent is not a legible text colour. `--color-accent` measures 4.41:1 on
 * the page fill and 3.36 on a selected gold row, and 12px eyebrows and 16px
 * tertiary links are both normal text, so both need 4.5. `--color-accent-deep`
 * exists for that and the tone maps in primitives.jsx point at it.
 *
 * This is a source scan rather than a rendering assertion on purpose. The suite
 * deliberately omits the Tailwind plugin (see vitest.config.js), so jsdom never
 * resolves a utility to a colour and a rendered contrast check here would
 * measure nothing. The real ratios are asserted in design/tokens/verify, which
 * compiles the theme. What this catches is the other half of #62: eleven call
 * sites had hand-written `text-accent` alongside `text-eyebrow` instead of
 * going through the primitive, so fixing the primitive alone left them behind.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return entry.isFile() && entry.name.endsWith('.jsx') && !entry.name.includes('.test.')
      ? [path]
      : []
  })
}

/* `text-accent` and `text-accent-deep` share a prefix, so the boundary matters:
   without it every deep utility reads as a bare accent and the test never
   fails. */
const BARE_ACCENT = /\btext-accent\b(?!-)/

describe('accent as a text colour', () => {
  const files = sourceFiles(SRC)

  it('scans the component and page sources', () => {
    expect(files.length).toBeGreaterThan(20)
  })

  it('is never written as the bare accent', () => {
    const offenders = files.flatMap((path) =>
      readFileSync(path, 'utf8')
        .split('\n')
        .map((line, i) => ({ path: path.slice(SRC.length + 1), n: i + 1, line }))
        .filter(({ line }) => BARE_ACCENT.test(line))
        .map(({ path: p, n, line }) => `${p}:${n} ${line.trim()}`),
    )
    expect(offenders).toEqual([])
  })

  it('routes both accent tones through the deep variant', () => {
    const primitives = readFileSync(join(SRC, 'components', 'primitives.jsx'), 'utf8')
    expect(primitives).toContain("accent: 'text-accent-deep'")
    // The eyebrow tone map and the tertiary link tone map, not one of them.
    expect(primitives.match(/accent: 'text-accent-deep'/g)).toHaveLength(2)
  })
})
