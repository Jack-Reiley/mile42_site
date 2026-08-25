import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BAND, BAND_GRAIN } from '../components/primitives.jsx'

/**
 * #75 — the bands the homepage and Meet Dewey are drawn on, and the tones the
 * type on them takes.
 *
 * Source scans rather than rendered assertions, for the reason
 * accent-contrast.test.jsx gives: the suite omits the Tailwind plugin, so jsdom
 * never resolves a utility to a colour and a contrast check here would measure
 * nothing. The real ratios are asserted by design/tokens/verify/check.mjs,
 * which compiles the theme. What this file catches is the other half — a band
 * changed without its type tones, or a tone written as a hand-rolled utility
 * instead of going through the prop.
 *
 * SCN-004 and SCN-005 are not repeated here. hero-grain.test.jsx already fails
 * any BAND key with no grain recipe and any page whose film leaks past the
 * opening band, which is exactly what those two scenarios say.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SRC, '..', '..')

const source = (...parts) => readFileSync(join(SRC, ...parts), 'utf8')
const bandsNamed = (text, band) => text.match(new RegExp(`band="${band}"`, 'g')) ?? []

describe('SCN-001 — the homepage opens and closes on the same field', () => {
  it('draws both of its coloured bands on blue', () => {
    const home = source('pages', 'Home.jsx')

    expect(bandsNamed(home, 'blue')).toHaveLength(2)
    expect(bandsNamed(home, 'brand')).toHaveLength(0)
  })
})

describe('SCN-002 — Meet Dewey opens and closes on the burnt orange', () => {
  it('draws both of its coloured bands on orange-deep', () => {
    const dewey = source('pages', 'MeetDewey.jsx')

    expect(bandsNamed(dewey, 'orange-deep')).toHaveLength(2)
    expect(bandsNamed(dewey, 'blue')).toHaveLength(0)
    expect(bandsNamed(dewey, 'gold')).toHaveLength(0)
  })
})

describe('SCN-003 — every line on a dark band is legible on it', () => {
  /* Ink is 3.14:1 on blue and 3.19 on orange-deep. The heading already carried
     the hero tone on both pages; what this pins is that the eyebrow and the
     lead moved with it rather than keeping the default. */
  it('gives the homepage hero the off-white tone on every line', () => {
    const home = source('pages', 'Home.jsx')
    const hero = home.slice(home.indexOf('<Section band="blue" grain'), home.indexOf('</Section>'))

    expect(hero).toContain('text-hero-heading')
    expect(hero).toContain('<H1 tone="hero"')
    expect(hero).toContain('<Lead tone="hero"')
    expect(hero).not.toContain('text-ink')
  })

  it('gives the homepage closing band the off-white tone on every line', () => {
    const home = source('pages', 'Home.jsx')
    const closing = home.slice(home.lastIndexOf('<Section band="blue">'))

    expect(closing).toContain('<H2 tone="hero"')
    expect(closing).toContain('<Lead tone="hero"')
  })

  it('gives both Meet Dewey bands the off-white tone on every line', () => {
    const dewey = source('pages', 'MeetDewey.jsx')
    const hero = dewey.slice(dewey.indexOf('<Section band="orange-deep" grain'))
    const closing = dewey.slice(dewey.lastIndexOf('<Section band="orange-deep">'))

    expect(hero).toContain('<Eyebrow tone="hero"')
    expect(hero).toContain('<H1 tone="hero"')
    expect(hero).toContain('<Lead tone="hero"')
    expect(closing).toContain('<H2 tone="hero"')
    expect(closing).toContain('<Lead tone="hero"')
  })
})

describe('SCN-006 — the new pairings are measured, not asserted by eye', () => {
  /* The gate is the only place a real ratio is computed. A band added to BAND
     with no row here passes every test in this suite while nothing has ever
     measured the type on it, which is the state this ticket found. */
  it('enforces off-white on orange-deep in the token gate', () => {
    const gate = readFileSync(join(ROOT, 'design', 'tokens', 'verify', 'check.mjs'), 'utf8')

    expect(gate).toContain('ORANGE_DEEP')
    expect(gate).toContain("'off-white copy on the orange-deep band'")
  })

  /* The band mix and the gate's copy of it are two literals that have to agree.
     The gate says so in its own header; this fails when one moves.

     Compared with the separators stripped, because the two are spelled in
     different dialects: a Tailwind arbitrary value cannot contain spaces, so
     BAND writes underscores where the gate's plain CSS writes spaces. */
  it('spells the band mix the same way the gate does', () => {
    const gate = readFileSync(join(ROOT, 'design', 'tokens', 'verify', 'check.mjs'), 'utf8')
    const mix = 'color-mix(in srgb, var(--color-orange) 76%, black)'
    const bare = (value) => value.replace(/[\s_]/g, '')

    expect(gate).toContain(mix)
    expect(bare(BAND['orange-deep'])).toContain(bare(mix))
  })
})

describe('SCN-007 — a dark band with no surviving coloured eyebrow has a fallback', () => {
  it('offers the off-white through the same tone prop the other eyebrows use', () => {
    const primitives = source('components', 'primitives.jsx')

    expect(primitives).toContain("hero: 'text-hero-heading'")
  })

  /* Through the prop, not around it. Eleven call sites hand-wrote a colour
     utility beside the eyebrow class in #62 and the primitive fix left them
     behind; this is the same failure mode one band later. */
  it('is reached through the prop rather than a hand-written utility', () => {
    const dewey = source('pages', 'MeetDewey.jsx')
    const eyebrow = dewey.split('\n').filter((line) => line.includes('<Eyebrow'))

    expect(eyebrow.length).toBeGreaterThan(0)
    for (const line of eyebrow) expect(line).not.toMatch(/text-hero-heading/)
  })
})

describe('the new band is a full member of the band system', () => {
  it('states a fill and a grain recipe', () => {
    expect(BAND['orange-deep']).toBeTruthy()
    expect(BAND_GRAIN['orange-deep'].blend).toBe('overlay')
    expect(BAND_GRAIN['orange-deep'].opacity).toBeGreaterThan(0)
  })
})
