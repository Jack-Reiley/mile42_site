import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BAND, BAND_GRAIN } from '../components/primitives.jsx'

/**
 * #84 — the forest green is retired.
 *
 * It existed only because the old brand green was too light to carry on-dark
 * type. #69 removed that reason, leaving two greens 1.82:1 apart, which is not
 * a difference a reader can see.
 *
 * A source scan, for the reason accent-contrast.test.jsx gives. The real ratios
 * are asserted by the token gate; what this catches is a call site left behind,
 * which is the failure mode #62 and #75 both hit.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SRC, '..', '..')
const tokens = (f) => readFileSync(join(ROOT, 'design', 'tokens', f), 'utf8')

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name)
    if (e.isDirectory()) return e.name === 'assets' ? [] : sourceFiles(path)
    return e.isFile() && e.name.endsWith('.jsx') && !e.name.includes('.test.') ? [path] : []
  })
}

describe('SCN-001 — the palette carries one green, not two', () => {
  it('no longer declares the retired token', () => {
    expect(tokens('theme.css')).not.toMatch(/--color-forest\s*:/)
  })

  it('drops it from the pinned contract too', () => {
    const pinned = JSON.parse(tokens(join('verify', 'expected.json')))
    expect(pinned.colors).not.toHaveProperty('--color-forest')
  })
})

describe('SCN-005 — nothing refers to a colour that no longer exists', () => {
  /* The utilities are what would break at runtime: `bg-forest` resolves to
     nothing once the token is gone, so the element silently loses its fill. */
  it('leaves no forest utility anywhere in the source', () => {
    const offenders = sourceFiles(SRC)
      .flatMap((path) =>
        readFileSync(path, 'utf8')
          .split('\n')
          .map((line, i) => ({ path: path.slice(SRC.length + 1), n: i + 1, line }))
          .filter(({ line }) => /\b(bg|text|border|border-t)-forest\b/.test(line)),
      )
      .map(({ path, n, line }) => `${path}:${n} ${line.trim()}`)

    expect(offenders).toEqual([])
  })

  it('leaves no var reference to the retired token', () => {
    const offenders = sourceFiles(SRC).filter((f) =>
      /var\(--color-forest\)/.test(readFileSync(f, 'utf8')),
    )
    expect(offenders).toEqual([])
  })

  it('removes the gate row rather than repointing it', () => {
    expect(tokens(join('verify', 'check.mjs'))).not.toMatch(/--color-forest/)
  })
})

describe('SCN-002 — every surface that was forest still reads correctly', () => {
  it('retires the band and its grain recipe together', () => {
    expect(BAND).not.toHaveProperty('forest')
    expect(BAND_GRAIN).not.toHaveProperty('forest')
  })

  /* hero-grain.test.jsx already fails any BAND key with no recipe. This is the
     other direction: a recipe left behind for a band that no longer exists. */
  it('leaves no orphan grain recipe', () => {
    for (const key of Object.keys(BAND_GRAIN)) expect(BAND).toHaveProperty(key)
  })

  it('puts Why Mile42 on the brand band', () => {
    const page = readFileSync(join(SRC, 'pages', 'WhyMile42.jsx'), 'utf8')
    expect(page.match(/<Section band="brand"/g)).toHaveLength(2)
  })
})

describe('SCN-003 — the tightest case is a recorded decision', () => {
  /* The one site where retiring forest spends margin rather than being
     neutral. The comment must state the move, not the obsolete reasoning. */
  it('records what the chip moved from and to', () => {
    const chip = readFileSync(join(SRC, 'components', 'ExecutionContrast.jsx'), 'utf8')

    expect(chip).toContain('bg-brand')
    expect(chip).not.toMatch(/bg-forest/)
    expect(chip).toMatch(/4\.79/)
  })
})
