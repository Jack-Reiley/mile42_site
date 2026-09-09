import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { illustrations, placeholderKeys } from '../assets/illustrations/manifest.js'
import Home from '../pages/Home.jsx'
import MeetVickee from '../pages/MeetVickee.jsx'
import HowWeWork from '../pages/HowWeWork.jsx'
import ClientJourney from '../pages/ClientJourney.jsx'
import WhatWeDo from '../pages/WhatWeDo.jsx'
import Engineering from '../pages/Engineering.jsx'
import Advisory from '../pages/Advisory.jsx'
import AiProducts from '../pages/AiProducts.jsx'
import EngagementModel from '../pages/EngagementModel.jsx'

/**
 * #109 — every illustration comes off the site.
 *
 * The ticket began with the eight hand-drawn ink sketches and the four flat
 * `path-*` icons deliberately left alone. Brett extended it to both treatments
 * after seeing the first pass, so the contract is now the simple one: nothing
 * in the manifest draws anywhere, and the header logo is the only image the
 * site renders.
 *
 * That extension is what makes the layout assertions here necessary rather than
 * fussy. Removing the artwork alone left blank halves and an empty gutter, so
 * four containers were restructured to close the space. Those changes are the
 * visible half of this ticket and jsdom cannot see them — the suite omits the
 * Tailwind plugin, so no utility resolves to a value — which is why they are
 * asserted as class contracts on the source and measured for real in a browser.
 *
 * The plumbing is kept on purpose. Entries stay registered and built, and every
 * Spot call stays where it was placed, so restoring artwork is a flag change
 * plus band-level layout work rather than a rebuild from nothing.
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
const ALL = [...SKETCH, ...PATH]

const PAGES = [
  ['the homepage', <Home />],
  ['Meet Vickee', <MeetVickee />],
  ['How we work', <HowWeWork />],
  ['the client journey', <ClientJourney />],
  ['What we do', <WhatWeDo />],
  ['Engineering', <Engineering />],
  ['Advisory', <Advisory />],
  ['AI products', <AiProducts />],
  ['Engagement model', <EngagementModel />],
]

const at = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

/* Every illustration goes through `Spot`, and the header logo is the only other
   `img` in the tree. Read by `src` rather than accessible name because most
   spots sat inside a label that already said what they said, so they were
   decorative and carried an empty alt by design. */
const artOf = (container) =>
  [...container.querySelectorAll('img')]
    .map((i) => i.getAttribute('src'))
    .filter((src) => src && src.includes('/illustrations/'))

describe('SCN-001 to SCN-005 — no illustration draws anywhere', () => {
  it.each(PAGES)('%s draws none', (_name, ui) => {
    expect(artOf(at(ui).container)).toEqual([])
  })

  it.each(PAGES)('%s renders the logo and nothing else', (_name, ui) => {
    const { container } = at(ui)
    const sources = [...container.querySelectorAll('img')].map((i) => i.getAttribute('src'))

    expect(sources.every((src) => src.includes('mile42-logo'))).toBe(true)
  })

  /* The client journey draws one stage's detail at a time, so the page-level
     assertion above only covers whichever stage opens first. Each stage named a
     spot of its own, and all four have to be checked. */
  it.each(['Understand', 'Design', 'Build', 'Evolve'])(
    'the %s stage draws none once it is opened',
    async (stage) => {
      const user = userEvent.setup()
      const { container } = at(<ClientJourney />)

      // Anchored: "Build" also appears inside the Understand stage's summary,
      // and an unanchored match finds both buttons.
      await user.click(screen.getByRole('button', { name: new RegExp(`^${stage}`) }))

      expect(artOf(container)).toEqual([])
    },
  )
})

describe('SCN-006 — the containers close the space the artwork left', () => {
  /* Class contracts, not geometry. Each assertion names the utility that had to
     go and the shape that replaced it, so a revert shows up here rather than
     only in a browser. The measured widths are in the requirements document. */

  it('gives every hero one column instead of splitting the band', () => {
    for (const [file, retired] of [
      ['pages/Home.jsx', 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'],
      ['pages/MeetVickee.jsx', 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]'],
      ['pages/HowWeWork.jsx', 'lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]'],
    ]) {
      expect(read(file)).not.toContain(retired)
    }
  })

  /* The headline is what gains the width. `Lead` and `Body` keep the site-wide
     46rem measure, which is not this ticket's to change: widening it would move
     all sixteen pages and put the hero paragraph near 150 characters a line. */
  it('leaves the shared reading measure alone', () => {
    const primitives = read('components/primitives.jsx')

    expect(primitives).toContain('max-w-[46rem]')
    expect(primitives.match(/max-w-\[46rem\]/g).length).toBeGreaterThanOrEqual(2)
  })

  it('lets the homepage argument panel copy fill the track the spot held', () => {
    const home = read('pages/Home.jsx')

    expect(home).not.toContain('lg:grid-cols-[13rem_minmax(0,1fr)]')
    // The copy was pinned to the second column only so it sat beside the spot.
    expect(home).not.toContain('lg:col-start-2 lg:row-start-1')
  })

  /* Widening the copy was only half the fix for this panel. At the wrap's full
     1240px the copy filled the artwork's track and left the same amount of
     space on the other side, because `Body` stops at 46rem. The card is sized
     to its content instead: 46rem plus the card's two 40px paddings. */
  it('narrows the argument panel card to the measure its copy actually uses', () => {
    const home = read('pages/Home.jsx')
    const card = home.slice(home.indexOf('<Card fill="page"'), home.indexOf('<Card fill="page"') + 200)

    expect(card).toContain('max-w-[52rem]')
    expect(card).toContain('mx-auto')
  })

  it('closes the path card gutter rather than leaving copy indented', () => {
    const primitives = read('components/primitives.jsx')

    expect(primitives).toContain('grid-cols-[1fr_auto]')
    expect(primitives).not.toContain('grid-cols-[4rem_1fr_auto]')
  })
})

describe('SCN-007 — every entry is still built and registered', () => {
  it.each(ALL)('%s keeps its alt text, level, and generated dimensions', (key) => {
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

  it('leaves nothing in the manifest still drawable', () => {
    expect(Object.values(illustrations).filter((a) => !a.retired)).toEqual([])
  })
})

describe('SCN-008 — the placement spec survives in the source', () => {
  /* Asserted on source text because nothing renders, so the DOM cannot prove
     the spec is intact. What these calls still record is which artwork belonged
     where and at what size. What they no longer record is the layout around
     them, which SCN-006 deliberately changed. */
  const CALLS = [
    ['pages/Home.jsx', 'name="hero-desk"'],
    ['pages/Home.jsx', 'name="brain-gear"'],
    ['pages/MeetVickee.jsx', 'name="vickee-librarian"'],
    ['pages/MeetVickee.jsx', 'name="chess"'],
    ['pages/HowWeWork.jsx', 'name="gears"'],
  ]

  it.each(CALLS)('%s still calls Spot with %s', (file, marker) => {
    expect(read(file)).toContain(marker)
  })

  it('keeps each of those calls carrying its own sizes value', () => {
    for (const [file, marker] of CALLS) {
      const source = read(file)
      expect(source.slice(source.indexOf(marker), source.indexOf(marker) + 400)).toMatch(/sizes=/)
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

  it('keeps the calls that build their name from data', () => {
    expect(read('components/StageJourney.jsx')).toMatch(/<Spot name=\{stage\.spot\}/)
    expect(read('pages/Home.jsx')).toMatch(/name=\{o\.spot\}/)
    expect(read('components/primitives.jsx')).toMatch(/<Spot name=\{spot\}/)
  })

  it('records at the mechanism that the calls are deliberately inert', () => {
    expect(read('assets/illustrations/manifest.js')).toMatch(/retired/i)
    expect(read('components/primitives.jsx')).toMatch(/retired/i)
  })

  it('keeps every stage naming the spot it used to draw', () => {
    const journey = read('components/StageJourney.jsx')

    for (const key of ['lightbulb', 'gears', 'laptop', 'handshake']) {
      expect(journey).toContain(`spot: '${key}'`)
    }
  })
})

describe('SCN-010 — the pages stay sound', () => {
  it.each(PAGES)('%s announces no artwork that is no longer there', (_name, ui) => {
    const { container } = at(ui)
    const alts = [...container.querySelectorAll('img')]
      .map((i) => i.getAttribute('alt'))
      .filter(Boolean)

    for (const key of ALL) {
      expect(alts).not.toContain(illustrations[key].alt)
    }
  })

  it.each(PAGES)('%s keeps one h1 and a heading below it', (_name, ui) => {
    const { container } = at(ui)

    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(container.querySelectorAll('h2').length).toBeGreaterThan(0)
  })

  /* The path cards are links whose icon sat inside the link. Removing it must
     not change what the link is called, which is the one accessibility risk in
     dropping an image out of a link. */
  it('leaves the path cards named by their own copy', () => {
    at(<WhatWeDo />)
    const links = screen.getAllByRole('link')

    expect(links.some((l) => /clarity/i.test(l.textContent))).toBe(true)
    for (const link of links) expect(link).toHaveAccessibleName(/\w/)
  })
})
