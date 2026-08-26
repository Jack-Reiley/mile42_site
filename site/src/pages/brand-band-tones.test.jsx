import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BAND, BAND_GRAIN } from '../components/primitives.jsx'

/**
 * #69 — the brand green was revised and the band flipped from dark type on a
 * light field to light type on a dark one, the way `orange-deep` already works.
 *
 * Source scans rather than rendered assertions, for the reason
 * accent-contrast.test.jsx and band-colours.test.jsx both give: the suite omits
 * the Tailwind plugin, so jsdom never resolves a utility to a colour and a
 * contrast assertion here would measure nothing. The real ratios are asserted
 * by design/tokens/verify/check.mjs, which compiles the theme.
 *
 * What this file catches is the other half, and it is the half that has bitten
 * twice: #62 fixed a primitive and left eleven call sites behind, and #75 hit
 * the same shape one band later. Flipping a band's type means every line on it
 * moves, not just the heading.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SRC, '..', '..')
const source = (...parts) => readFileSync(join(SRC, ...parts), 'utf8')

/** The text of every `<Section band="brand"...>` block on a page. */
function brandBands(text) {
  const blocks = []
  const open = /<Section band="brand"[^>]*>/g
  let m
  while ((m = open.exec(text))) {
    const end = text.indexOf('</Section>', m.index)
    blocks.push(text.slice(m.index, end === -1 ? undefined : end))
  }
  return blocks
}

/* WhyMile42 is here because #84 moved it onto this band. It is the reason the
   scan exists: its eyebrow was `sky`, which reached 5.97:1 on the forest band
   it left and 3.28 on the one it joined, and a scan that only knew the three
   pages that already used `brand` would not have looked at it. */
const PAGES_WITH_BRAND_BANDS = ['Contact', 'Insights', 'Privacy', 'WhyMile42']

describe('SCN-007 — every line on a brand band takes the light tone', () => {
  it.each(PAGES_WITH_BRAND_BANDS)('gives every line on %s’s brand bands the hero tone', (page) => {
    const bands = brandBands(source('pages', `${page}.jsx`))
    expect(bands.length).toBeGreaterThan(0)

    for (const band of bands) {
      expect(band).not.toMatch(/tone="ink"/)
      expect(band).not.toMatch(/text-ink\b/)
    }
  })

  /* Through the prop, not around it. Hand-written colour utilities beside a
     primitive are exactly what #62 left behind. */
  it('reaches the tone through the prop rather than a hand-written utility', () => {
    for (const page of PAGES_WITH_BRAND_BANDS) {
      /* Not every brand band carries an eyebrow: the Insights closing band is a
         heading, a lead and a button. Assert on the ones that do. */
      for (const band of brandBands(source('pages', `${page}.jsx`))) {
        for (const line of band.split('\n').filter((l) => l.includes('<Eyebrow'))) {
          /* Not just "not ink": a coloured on-dark tone can fail here too.
             sky is 3.28 on this fill and ice 4.43, both under 4.5. */
          expect(line).toContain('tone="hero"')
          expect(line).not.toMatch(/text-hero-heading/)
        }
      }
    }
  })

  /* The components that draw their own brand fill rather than going through
     `Section`. These are the ones a page-level scan cannot see. */
  it('leaves no ink on a component that draws its own brand fill', () => {
    const card = source('components', 'WhereAgentsWork.jsx')
    const brandCard = card.slice(card.indexOf('bg-brand'))
    expect(brandCard.slice(0, 400)).not.toMatch(/text-ink\b/)
    expect(brandCard.slice(0, 400)).not.toMatch(/tone="ink"/)
  })

  it('gives both drill-down badge numerals the light tone', () => {
    const badge = source('components', 'HardParts.jsx')
    const block = badge.slice(badge.indexOf('function Badge'), badge.indexOf('function BlockLabel'))

    expect(block).toContain('bg-brand')
    /* The small badge was `text-white`, which is 2.59 on the old green and no
       better than the off-white. Neither tone survives; both take the hero one. */
    expect(block).not.toMatch(/text-white\b/)
    expect(block.match(/text-hero-heading/g)).toHaveLength(2)
  })

  it('gives the brand node in the tone map the light mark', () => {
    expect(source('components', 'HardParts.jsx'))
      .toContain("{ fill: 'bg-brand', mark: 'text-hero-heading'")
  })
})

describe('SCN-006 — the brand green moves once, everywhere', () => {
  it('is declared in one place and carried by the token', () => {
    const theme = readFileSync(join(ROOT, 'design', 'tokens', 'theme.css'), 'utf8')
    expect(theme).toMatch(/--color-brand:\s*#00805d;/)
  })

  it('is pinned in the contract fixture so the revision cannot drift', () => {
    const pinned = JSON.parse(
      readFileSync(join(ROOT, 'design', 'tokens', 'verify', 'expected.json'), 'utf8'),
    )
    expect(pinned.colors['--color-brand']).toBe('#00805d')
  })

  it('leaves no hardcoded copy of the previous green in the shipped source', () => {
    const files = (function walk(dir) {
      return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const path = join(dir, e.name)
        if (e.isDirectory()) return e.name === 'assets' ? [] : walk(path)
        /* Test files are excluded: this one names the old value in a comment,
           and a scan that matched itself would never pass. */
        return e.isFile() && /\.(jsx|css|mjs)$/.test(e.name) && !e.name.includes('.test.')
          ? [path]
          : []
      })
    })(SRC)

    const offenders = files.filter((f) => /00b785/i.test(readFileSync(f, 'utf8')))
    expect(offenders).toEqual([])
  })
})

describe('SCN-008 — the grain film does not eat the margin', () => {
  it('keeps a recipe for the brand band', () => {
    expect(BAND.brand).toBe('bg-brand')
    expect(BAND_GRAIN.brand.blend).toBe('soft-light')
    expect(BAND_GRAIN.brand.opacity).toBeGreaterThan(0)
  })

  /* The film was tuned against a much lighter field. On the revised green the
     off-white has 4.79 flat, and soft-light at 0.45 lands the worst
     glyph-sized area on exactly 4.50. The recorded value has to leave margin. */
  it('holds the film at the measured value rather than the one tuned for the old green', () => {
    expect(BAND_GRAIN.brand.opacity).toBeLessThanOrEqual(0.4)
  })
})

describe('SCN-004 — a pairing is checked at the size it is drawn at', () => {
  const gate = () => readFileSync(join(ROOT, 'design', 'tokens', 'verify', 'check.mjs'), 'utf8')

  it('declares the brand pairing once per size it is drawn at', () => {
    const rows = gate()
      .split('\n')
      .filter((l) => l.includes("'var(--color-hero-heading)', 'var(--color-brand)'"))

    expect(rows.length).toBeGreaterThanOrEqual(2)
    expect(rows.some((r) => r.includes('AA_LARGE'))).toBe(true)
    expect(rows.some((r) => r.includes('AA_NORMAL'))).toBe(true)
  })

  /* The waiver is what hid this. A fifth element on a PAIRS row marks it as
     reported-not-enforced, and the brand rows must no longer carry one. */
  it('no longer waives the brand pairing as known debt', () => {
    const rows = gate()
      .split('\n')
      .filter((l) => l.includes("'var(--color-hero-heading)', 'var(--color-brand)'"))

    for (const row of rows) expect(row).not.toMatch(/,\s*'question \d+'\s*\]/)
  })

  it('no longer declares ink on the brand band, which the flip removed', () => {
    expect(gate()).not.toMatch(/'var\(--color-ink\)',\s*'var\(--color-brand\)'/)
  })
})

/**
 * #83 — every band that carries the film reads at one texture.
 *
 * The values themselves are measured by design/tokens/verify/grain.mjs, which
 * composites the tile against each fill. What is asserted here is the part a
 * measurement cannot: that no band was left behind, and that the recorded
 * target and the tool agree.
 */
describe('SCN-003 — the texture target is a stated number', () => {
  const tool = () =>
    readFileSync(join(ROOT, 'design', 'tokens', 'verify', 'grain.mjs'), 'utf8')

  it('states the target where a contributor adding a band will find it', () => {
    expect(tool()).toMatch(/const TARGET = 3\.95/)
  })

  it('describes the recipe in the band map rather than leaving it implied', () => {
    const src = readFileSync(join(SRC, 'components', 'primitives.jsx'), 'utf8')
    expect(src).toMatch(/grain\.mjs/)
    expect(src).toMatch(/3\.95/)
  })
})

describe('SCN-001 — no band was left at its old film', () => {
  /* The four that were conspicuous: gold was roughly twice its neighbours, and
     the two panels and navy all sat well above target. */
  it.each([
    ['gold', 0.37],
    ['navy', 0.5],
    ['panel-accent', 0.47],
    ['panel-orange', 0.57],
  ])('retunes %s', (band, expected) => {
    expect(BAND_GRAIN[band].opacity).toBeCloseTo(expected, 2)
  })

  it('leaves the three already at or under target at full opacity', () => {
    for (const band of ['tint', 'surface', 'page']) {
      expect(BAND_GRAIN[band].opacity).toBe(1)
    }
  })

  it('keeps every blend, since only opacity was the lever', () => {
    expect(BAND_GRAIN.brand.blend).toBe('soft-light')
    expect(BAND_GRAIN.navy.blend).toBe('soft-light')
    expect(BAND_GRAIN.blue.blend).toBe('overlay')
    expect(BAND_GRAIN['orange-deep'].blend).toBe('overlay')
  })
})
