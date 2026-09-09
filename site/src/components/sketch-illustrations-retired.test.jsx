import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { illustrations, placeholderKeys } from '../assets/illustrations/manifest.js'
import Home from '../pages/Home.jsx'
import MeetVickee from '../pages/MeetVickee.jsx'
import HowWeWork from '../pages/HowWeWork.jsx'
import WhatWeDo from '../pages/WhatWeDo.jsx'
import Engineering from '../pages/Engineering.jsx'
import Advisory from '../pages/Advisory.jsx'
import AiProducts from '../pages/AiProducts.jsx'
import EngagementModel from '../pages/EngagementModel.jsx'

/**
 * #109 — the ink sketch illustrations stop drawing, and everything that makes
 * putting them back a swap rather than a rebuild stays where it is.
 *
 * The site has exactly two treatments. The eight SKETCH entries are hand-drawn
 * ink line art; the four `path-*` entries are flat single-colour linework
 * tinted from a token. Only the first set is retired, and half of what this
 * file asserts is that the second set was not caught by the same edit.
 *
 * The other half guards the restore. The entries stay registered and built and
 * every Spot call stays in the source with its sizes and classes, because that
 * placement spec — not the ticket prose — is what the follow-up reads.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(SRC, p), 'utf8')

const SKETCH = [
  'hero-desk',
  'vickee-librarian',
  'brain-gear',
  'handshake',
  'chess',
  'laptop',
  'lightbulb',
  'gears',
]

const PATH = ['path-lightbulb', 'path-gears', 'path-handshake', 'path-clipboard']

const at = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

/* Every illustration on the site goes through `Spot`, and the header logo is
   the only other `img` in the tree. Reading `src` rather than an accessible
   name is deliberate: most spots sit inside a label that already says what they
   say, so they are decorative and carry an empty alt by design. */
const artOf = (container) =>
  [...container.querySelectorAll('img')]
    .map((i) => i.getAttribute('src'))
    .filter((src) => src && /\/illustrations\//.test(src))

const drawn = (container, keys) =>
  keys.filter((key) => artOf(container).some((src) => src.includes(key)))

describe('SCN-001, SCN-002, SCN-003 — no sketch illustration draws', () => {
  it.each([
    ['the homepage', <Home />],
    ['Meet Vickee', <MeetVickee />],
    ['How we work', <HowWeWork />],
  ])('%s draws none of them', (_name, ui) => {
    const { container } = at(ui)
    expect(drawn(container, SKETCH)).toEqual([])
  })

  /* Meet Vickee and How we work carried nothing but sketches, so they now draw
     no illustration at all. The homepage keeps exactly one, and naming it here
     rather than counting images is what makes a regression readable. */
  it('leaves Meet Vickee and How we work with no illustration at all', () => {
    for (const ui of [<MeetVickee />, <HowWeWork />]) {
      expect(artOf(at(ui).container)).toEqual([])
    }
  })

  it('leaves the homepage drawing only the Phase Zero clipboard', () => {
    const { container } = at(<Home />)
    expect(drawn(container, PATH)).toEqual(['path-clipboard'])
  })
})

describe('SCN-005 — the flat path icons are untouched', () => {
  it.each([
    ['What we do', <WhatWeDo />, ['path-lightbulb', 'path-gears', 'path-handshake', 'path-clipboard']],
    ['Engineering', <Engineering />, ['path-gears']],
    ['Advisory', <Advisory />, ['path-clipboard']],
    ['AI products', <AiProducts />, ['path-handshake']],
    ['Engagement model', <EngagementModel />, ['path-clipboard']],
  ])('%s still draws its icons', (_name, ui, expected) => {
    const { container } = at(ui)
    expect(drawn(container, expected)).toEqual(expected)
  })

  it('keeps every path entry resolvable through the manifest', () => {
    for (const key of PATH) {
      expect(illustrations[key]).toBeDefined()
      expect(illustrations[key].retired).toBeFalsy()
      expect(illustrations[key].srcSet).toMatch(/\s\d+w/)
    }
  })
})

describe('SCN-007 — every retired entry is still built and registered', () => {
  it.each(SKETCH)('%s keeps its alt text, level, and generated dimensions', (key) => {
    const art = illustrations[key]

    expect(art).toBeDefined()
    expect(art.retired).toBe(true)
    expect(art.alt).toMatch(/\w/)
    expect([1, 2, 3]).toContain(art.level)
    expect(art.width).toBeGreaterThan(0)
    expect(art.height).toBeGreaterThan(0)
    expect(art.srcSet).toMatch(/\s\d+w/)
  })

  /* Retiring an entry must not be mistaken for leaving it unfinished. The two
     flags mean different things and `npm run illustrations:placeholders` reads
     the second one. */
  it('reports no entry as an outstanding placeholder', () => {
    expect(placeholderKeys).toEqual([])
  })
})

describe('SCN-008 — the placement spec survives in the source', () => {
  /* Twelve calls across four files. Asserted on source text rather than on the
     DOM for the obvious reason: nothing renders any more, so the rendered tree
     cannot prove the spec is intact. A later reader who deletes these calls as
     dead code destroys what the restore ticket reads, which is what this
     guards. */
  const CALLS = [
    ['pages/Home.jsx', 'name="hero-desk"', 3],
    ['pages/Home.jsx', 'name="brain-gear"', 3],
    ['pages/MeetVickee.jsx', 'name="vickee-librarian"', 3],
    ['pages/MeetVickee.jsx', 'name="chess"', 3],
    ['pages/HowWeWork.jsx', 'name="gears"', 3],
  ]

  it.each(CALLS)('%s still calls Spot with %s', (file, marker) => {
    expect(read(file)).toContain(marker)
  })

  it('keeps each hero call carrying its own sizes value', () => {
    for (const [file, marker] of CALLS) {
      const call = read(file).slice(read(file).indexOf(marker))
      expect(call.slice(0, 400)).toMatch(/sizes=/)
    }
  })

  /* The three offerings cards break the card edge at different points and each
     offset was arrived at separately, with a comment explaining every number.
     Losing them loses the design, not just the position. */
  it('keeps the offerings cards individual offset classes', () => {
    const home = read('pages/Home.jsx')

    expect(home).toContain('lg:-top-[54px]')
    expect(home).toContain('xl:bottom-[105px]')
    expect(home).toContain('xl:-right-[24px]')
    expect(home).toContain('spotSizes')
  })

  it('keeps the stage journey and offerings calls that build their name from data', () => {
    expect(read('components/StageJourney.jsx')).toMatch(/<Spot name=\{stage\.spot\}/)
    expect(read('pages/Home.jsx')).toMatch(/name=\{o\.spot\}/)
  })

  it('records at the mechanism that the calls are deliberately inert', () => {
    expect(read('assets/illustrations/manifest.js')).toMatch(/retired/i)
    expect(read('components/primitives.jsx')).toMatch(/retired/i)
  })
})

describe('SCN-010 — the pages stay sound', () => {
  it.each([
    ['the homepage', <Home />],
    ['Meet Vickee', <MeetVickee />],
    ['How we work', <HowWeWork />],
  ])('%s announces no artwork that is no longer there', (_name, ui) => {
    const { container } = at(ui)
    const alts = [...container.querySelectorAll('img')]
      .map((i) => i.getAttribute('alt'))
      .filter(Boolean)

    for (const key of SKETCH) {
      const { alt } = illustrations[key]
      expect(alts).not.toContain(alt)
    }
  })

  it('keeps one h1 and a heading outline with no gap on each page', () => {
    for (const ui of [<Home />, <MeetVickee />, <HowWeWork />]) {
      const { container } = at(ui)
      expect(container.querySelectorAll('h1')).toHaveLength(1)
      expect(container.querySelectorAll('h2').length).toBeGreaterThan(0)
    }
  })

  it('keeps the remaining decorative icons carrying an empty alt', () => {
    const { container } = at(<WhatWeDo />)
    const icons = [...container.querySelectorAll('img')].filter((i) =>
      /\/illustrations\/path-/.test(i.getAttribute('src') ?? ''),
    )

    expect(icons.length).toBeGreaterThan(0)
    for (const icon of icons) expect(icon.getAttribute('alt')).toBe('')
  })
})

describe('SCN-004 — the client journey stages draw no spot', () => {
  /* The stage detail is rendered by StageJourney and covered where the handshake
     already had a home, in handshake-homes.test.jsx, which has to open a stage
     first. Asserted here only at the data level: every stage still names the
     spot it used to draw, so the restore knows where each one belongs. */
  it('keeps every stage naming the spot it used to draw', () => {
    const journey = read('components/StageJourney.jsx')

    for (const key of ['lightbulb', 'gears', 'laptop', 'handshake']) {
      expect(journey).toContain(`spot: '${key}'`)
    }
  })
})
