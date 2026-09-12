import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { illustrations, placeholderKeys } from '../assets/illustrations/manifest.js'
import { PathCard, FeaturePanel } from './primitives.jsx'
import Home from '../pages/Home.jsx'
import MeetVickee from '../pages/MeetVickee.jsx'
import HowWeWork from '../pages/HowWeWork.jsx'
import WhyMile42 from '../pages/WhyMile42.jsx'
import ClientJourney from '../pages/ClientJourney.jsx'
import WhatWeDo from '../pages/WhatWeDo.jsx'
import Engineering from '../pages/Engineering.jsx'
import Advisory from '../pages/Advisory.jsx'
import AiProducts from '../pages/AiProducts.jsx'
import EngagementModel from '../pages/EngagementModel.jsx'

/**
 * #111 — a second set of illustrations, in the places #109 emptied.
 *
 * This file replaces illustrations-retired.test.jsx. That suite's contract was
 * "nothing draws anywhere"; this one is the inverse, held entry by entry: each
 * new drawing renders once, on its page, in its slot, with the alt it should
 * carry, and the twelve #109 entries still render nowhere.
 *
 * Geometry is still not asserted. The suite omits the Tailwind plugin, so no
 * utility resolves to a value here; the re-opened columns are class contracts
 * on the source and are measured in a browser, with the numbers recorded in
 * the requirements document.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SRC, '..', '..')
const read = (p) => readFileSync(join(SRC, p), 'utf8')

const RETIRED = [
  'hero-desk',
  'vickee-librarian',
  'brain-gear',
  'handshake',
  'chess',
  'laptop',
  'lightbulb',
  'gears',
  'path-lightbulb',
  'path-gears',
  'path-handshake',
  'path-clipboard',
]

const at = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

/* Every illustration goes through `Spot`, and the header logo is the only other
   `img` in the tree. Matched against the manifest's own sources rather than a
   path, because Vite inlines the two small SVGs as data URIs. */
const SOURCES = new Set(Object.values(illustrations).map((a) => a.src))
const artOf = (container) =>
  [...container.querySelectorAll('img')].filter((i) => SOURCES.has(i.getAttribute('src')))

const eagerOf = (container) =>
  [...container.querySelectorAll('img')].filter(
    (i) => i.getAttribute('loading') === 'eager' || i.getAttribute('fetchpriority') === 'high',
  )

/* The hero is the page's first section. Read by section rather than by
   position in the image list so a spot further down cannot stand in for it. */
const heroOf = (container) => container.querySelector('section')

describe('SCN-001 — each hero draws its scene beside the copy', () => {
  const HEROES = [
    ['the homepage', <Home />, 'developer-desk'],
    ['Meet Vickee', <MeetVickee />, 'dashboard-user'],
    ['How we work', <HowWeWork />, 'robot-team'],
    ['Why Mile42', <WhyMile42 />, 'mile42-mark-white'],
  ]

  it.each(HEROES)('%s draws its scene in the hero, once', (_name, ui, key) => {
    const { container } = at(ui)
    const inHero = artOf(container).filter((i) => heroOf(container).contains(i))

    expect(inHero).toHaveLength(1)
    expect(inHero[0].getAttribute('src')).toBe(illustrations[key].src)
  })

  /* The split is a class contract. #109 asserted these tracks were gone; #111
     puts each back, and Why Mile42 gets one it never had. */
  it('gives every hero its two columns back at the desktop breakpoint', () => {
    for (const [file, split] of [
      ['pages/Home.jsx', 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'],
      ['pages/MeetVickee.jsx', 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]'],
      ['pages/HowWeWork.jsx', 'lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]'],
      ['pages/WhyMile42.jsx', 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]'],
    ]) {
      expect(read(file)).toContain(split)
    }
  })
})

describe('SCN-002 — hero artwork is the one eager image on its page', () => {
  it.each([
    ['the homepage', <Home />],
    ['Meet Vickee', <MeetVickee />],
    ['How we work', <HowWeWork />],
    ['Why Mile42', <WhyMile42 />],
  ])('%s fetches exactly one image eagerly, from the hero', (_name, ui) => {
    const { container } = at(ui)
    const eager = eagerOf(container)

    expect(eager).toHaveLength(1)
    expect(heroOf(container).contains(eager[0])).toBe(true)
    expect(eager[0].getAttribute('fetchpriority')).toBe('high')
  })

  /* The path cards are above the fold on What we do and their icons are
     eager, so that page is the one place three prioritised images is right.
     What must not happen is the Phase Zero panel lower down joining them. */
  it('What we do fetches its three card icons eagerly and nothing else', () => {
    const { container } = at(<WhatWeDo />)
    const eager = eagerOf(container)

    expect(eager).toHaveLength(3)
    expect(eager.every((i) => heroOf(container).contains(i))).toBe(true)
  })
})

describe('SCN-003 — heroes are announced, the brand mark is not', () => {
  it.each([
    ['the homepage', <Home />, 'developer-desk'],
    ['Meet Vickee', <MeetVickee />, 'dashboard-user'],
    ['How we work', <HowWeWork />, 'robot-team'],
  ])('%s announces its hero with the alt on the entry', (_name, ui, key) => {
    const { container } = at(ui)
    const [hero] = artOf(container).filter((i) => heroOf(container).contains(i))

    expect(illustrations[key].alt).toMatch(/\w/)
    expect(hero.getAttribute('alt')).toBe(illustrations[key].alt)
  })

  it('leaves the Why Mile42 mark silent, because the header lockup names the firm', () => {
    const { container } = at(<WhyMile42 />)
    const [mark] = artOf(container)

    expect(mark.getAttribute('alt')).toBe('')
  })
})

describe('SCN-004 — the homepage argument panel draws its spot', () => {
  /* Found by its heading rather than by position: the home rewrite moved the
     panel from second band to the one above the closing call to action. */
  it('draws the gear-and-brain in the panel and announces it', () => {
    const { container } = at(<Home />)
    const panel = [...container.querySelectorAll('section')].find((s) =>
      s.textContent.includes('Consulting should create momentum'),
    )
    const art = artOf(container).filter((i) => panel.contains(i))

    expect(art).toHaveLength(1)
    expect(art[0].getAttribute('src')).toBe(illustrations['gear-brain'].src)
    expect(art[0].getAttribute('alt')).toBe(illustrations['gear-brain'].alt)
  })

  /* #109 closed this track; #111 opens it again for the spot. The copy stays
     pinned beside it, and keeps the 46rem measure it has had throughout. */
  it('restores the 13rem track and keeps the reading measure', () => {
    const home = read('pages/Home.jsx')

    expect(home).toContain('lg:grid-cols-[13rem_minmax(0,1fr)]')
    expect(home).toContain('lg:col-start-2 lg:row-start-1')
    expect(read('components/primitives.jsx')).toContain('max-w-[46rem]')
  })
})

describe('SCN-005 — each What we do path card carries its own icon', () => {
  const CARDS = [
    ['Advisory', /clarity/i, 'path-lightbulb-target'],
    ['Engineering', /execute/i, 'path-gears-trio'],
    ['AI products', /proven solutions/i, 'path-phone-circuit'],
  ]

  it.each(CARDS)('the %s card shows its icon, decoratively', (_name, eyebrow, key) => {
    at(<WhatWeDo />)
    const card = screen.getAllByRole('link').find((l) => eyebrow.test(l.textContent))
    const icons = artOf(card)

    expect(icons).toHaveLength(1)
    expect(icons[0].getAttribute('src')).toBe(illustrations[key].src)
    expect(icons[0].getAttribute('alt')).toBe('')
  })

  /* The icon sits inside the link. An announced alt would land in the link's
     accessible name, so the name has to stay the card's own copy. */
  it('names each card by its copy alone', () => {
    at(<WhatWeDo />)
    for (const [, eyebrow] of CARDS) {
      const card = screen.getAllByRole('link').find((l) => eyebrow.test(l.textContent))
      expect(card).toHaveAccessibleName(/\w/)
      expect(card.getAttribute('aria-label')).toBeNull()
    }
  })

  it('tilts the phone and only the phone', () => {
    const source = read('pages/WhatWeDo.jsx')
    const cards = source.slice(source.indexOf('const PATHS'), source.indexOf('\n]', source.indexOf('const PATHS')))

    expect(cards.match(/rotate-\[-5deg\]/g)).toHaveLength(1)
    expect(cards.indexOf('rotate-[-5deg]')).toBeGreaterThan(cards.indexOf('path-phone-circuit'))
  })
})

describe('SCN-006 — a path card without live artwork keeps the closed layout', () => {
  const card = (spot) =>
    render(
      <MemoryRouter>
        <PathCard to="/x" spot={spot} eyebrow="Eyebrow" title="Title">
          Body
        </PathCard>
      </MemoryRouter>,
    )

  it('draws no image and no icon column for a retired spot', () => {
    const { container } = card('path-lightbulb')
    const link = container.querySelector('a')

    expect(illustrations['path-lightbulb'].retired).toBe(true)
    expect(artOf(container)).toHaveLength(0)
    expect(link.className).toContain('grid-cols-[1fr_auto]')
    expect(link.className).not.toContain('grid-cols-[4rem_1fr_auto]')
  })

  it('treats an unknown spot the same way', () => {
    const { container } = card('no-such-entry')
    const link = container.querySelector('a')

    expect(artOf(container)).toHaveLength(0)
    expect(link.className).toContain('grid-cols-[1fr_auto]')
  })

  it('opens the icon column only for a spot that draws', () => {
    const { container } = card('path-lightbulb-target')
    const link = container.querySelector('a')

    expect(artOf(container)).toHaveLength(1)
    expect(link.className).toContain('grid-cols-[4rem_1fr_auto]')
  })
})

describe('SCN-007 — the Phase Zero panels share the magnifier', () => {
  const PANELS = [
    ['What we do', <WhatWeDo />],
    ['Engagement model', <EngagementModel />],
    ['Advisory', <Advisory />],
  ]

  it.each(PANELS)('%s draws the magnifier above its Phase Zero eyebrow', (_name, ui) => {
    const { container } = at(ui)
    const eyebrow = [...container.querySelectorAll('span')].find((s) =>
      /Offering · Phase Zero/.test(s.textContent),
    )
    const column = eyebrow.parentElement
    const art = artOf(column)

    expect(art).toHaveLength(1)
    expect(art[0].getAttribute('src')).toBe(illustrations['magnifier-gear'].src)
    expect(art[0].getAttribute('alt')).toBe('')
    expect(column.firstElementChild).toBe(art[0])
  })

  /* The homepage panel went with the home rewrite, and the Phase Zero card
     that replaced it in the offerings trio took the magnifier as its overhang.
     Asserted on the card so the drawing cannot fall off the page silently. */
  it('the homepage draws the magnifier on the Phase Zero card', () => {
    const { container } = at(<Home />)
    const card = [...container.querySelectorAll('article')].find((a) =>
      a.textContent.includes('Explore Phase Zero'),
    )
    const art = artOf(card)

    expect(art).toHaveLength(1)
    expect(art[0].getAttribute('src')).toBe(illustrations['magnifier-gear'].src)
    expect(art[0].getAttribute('alt')).toBe(illustrations['magnifier-gear'].alt)
  })

  /* Mid-spot size is a class contract on FeaturePanel: a Level Two entry gets
     the 112px slot, and the flat icons keep the 52px theirs was cut for. */
  it('sizes the slot by the entry level', () => {
    const { container: mid } = at(
      <FeaturePanel spot="magnifier-gear" eyebrow="E" title="T">x</FeaturePanel>,
    )
    const { container: flat } = at(
      <FeaturePanel spot="path-lightbulb-target" eyebrow="E" title="T">x</FeaturePanel>,
    )

    expect(illustrations['magnifier-gear'].level).toBe(2)
    expect(artOf(mid)[0].className).toContain('h-28 w-28')
    expect(artOf(mid)[0].getAttribute('sizes')).toBe('112px')
    expect(artOf(flat)[0].className).toContain('h-[52px] w-[52px]')
    expect(artOf(flat)[0].getAttribute('sizes')).toBe('52px')
  })

  it('swaps the fill to the light blue token at build time', () => {
    const build = readFileSync(join(ROOT, 'site', 'scripts', 'illustrations.mjs'), 'utf8')
    const entry = build.slice(build.indexOf("'magnifier_gear_with_color.png'"))

    expect(entry.slice(0, entry.indexOf('\n'))).toContain("refill: '--color-sky'")
  })
})

describe('SCN-008 — panels with a retired spot draw nothing', () => {
  it.each([
    ['Engineering', <Engineering />, 'Core practice'],
    ['AI products', <AiProducts />, 'Proof'],
  ])('%s keeps its feature panel empty of artwork', (_name, ui, eyebrowText) => {
    const { container } = at(ui)
    const eyebrow = [...container.querySelectorAll('span')].find(
      (s) => s.textContent.trim() === eyebrowText,
    )
    const column = eyebrow.parentElement

    expect(artOf(column)).toHaveLength(0)
    expect(column.firstElementChild).toBe(eyebrow)
  })
})

describe('SCN-009 — the retired set stays off the site', () => {
  const PAGES = [
    ['the homepage', <Home />],
    ['Meet Vickee', <MeetVickee />],
    ['How we work', <HowWeWork />],
    ['Why Mile42', <WhyMile42 />],
    ['the client journey', <ClientJourney />],
    ['What we do', <WhatWeDo />],
    ['Engineering', <Engineering />],
    ['Advisory', <Advisory />],
    ['AI products', <AiProducts />],
    ['Engagement model', <EngagementModel />],
  ]
  const retiredSources = RETIRED.map((k) => illustrations[k].src)

  it.each(PAGES)('%s draws none of the twelve retired entries', (_name, ui) => {
    const { container } = at(ui)
    for (const img of artOf(container)) {
      expect(retiredSources).not.toContain(img.getAttribute('src'))
    }
  })

  it.each(['Understand', 'Design', 'Build', 'Evolve'])(
    'the %s stage draws no spot once it is opened',
    async (stage) => {
      const user = userEvent.setup()
      const { container } = at(<ClientJourney />)

      // Anchored: "Build" also appears inside the Understand stage's summary.
      await user.click(screen.getByRole('button', { name: new RegExp(`^${stage}`) }))

      expect(artOf(container)).toHaveLength(0)
    },
  )

  /* The offerings trio draws the magnifier on its Phase Zero card and nothing
     else: the lightbulb and laptop calls on the other two cards stay inert. */
  it('leaves the homepage offerings cards to the magnifier and the Meet Vickee lede empty', () => {
    const home = at(<Home />)
    const offerings = [...home.container.querySelectorAll('section')].find((s) =>
      s.textContent.includes('Three ways organizations work with us'),
    )
    const art = artOf(offerings)
    expect(art).toHaveLength(1)
    expect(art[0].getAttribute('src')).toBe(illustrations['magnifier-gear'].src)

    const vickee = at(<MeetVickee />)
    expect(artOf(vickee.container)).toHaveLength(1)
  })

  it.each(RETIRED)('%s stays registered and retired', (key) => {
    const art = illustrations[key]

    expect(art.retired).toBe(true)
    expect(art.alt).toMatch(/\w/)
    expect(art.srcSet).toMatch(/\s\d+w/)
  })

  /* The inert calls stay in the pages as the record of the first set. */
  it('keeps the retired Spot calls in the source', () => {
    for (const [file, marker] of [
      ['pages/Home.jsx', 'name="hero-desk"'],
      ['pages/Home.jsx', 'name="brain-gear"'],
      ['pages/MeetVickee.jsx', 'name="vickee-librarian"'],
      ['pages/MeetVickee.jsx', 'name="chess"'],
      ['pages/HowWeWork.jsx', 'name="gears"'],
    ]) {
      expect(read(file)).toContain(marker)
    }
    expect(read('pages/Home.jsx')).toContain('lg:-top-[54px]')
    expect(read('pages/Home.jsx')).toContain('xl:bottom-[105px]')
  })
})

describe('SCN-010 — artwork reserves its space before it arrives', () => {
  it.each([
    ['the homepage', <Home />],
    ['Meet Vickee', <MeetVickee />],
    ['How we work', <HowWeWork />],
    ['Why Mile42', <WhyMile42 />],
    ['What we do', <WhatWeDo />],
    ['Advisory', <Advisory />],
    ['Engagement model', <EngagementModel />],
  ])('%s gives every image its intrinsic width and height', (_name, ui) => {
    const { container } = at(ui)
    const art = artOf(container)

    expect(art.length).toBeGreaterThan(0)
    for (const img of art) {
      expect(Number(img.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img.getAttribute('height'))).toBeGreaterThan(0)
    }
  })
})

describe('SCN-011 — every drawn entry is built and registered', () => {
  const LIVE = Object.entries(illustrations)
    .filter(([, v]) => !v.retired)
    .map(([k]) => k)

  it('draws exactly the nine entries this ticket seats', () => {
    expect(LIVE.sort()).toEqual(
      [
        'dashboard-user',
        'developer-desk',
        'gear-brain',
        'magnifier-gear',
        'mile42-mark-white',
        'path-gears-trio',
        'path-lightbulb-target',
        'path-phone-circuit',
        'robot-team',
      ].sort(),
    )
  })

  it.each(LIVE)('%s has alt text, a level, and dimensions', (key) => {
    const art = illustrations[key]

    expect(art.alt).toMatch(/\w/)
    expect([1, 2, 3]).toContain(art.level)
    expect(art.width).toBeGreaterThan(0)
    expect(art.height).toBeGreaterThan(0)
    expect(art.src).toMatch(/\/illustrations\/|^data:image\/svg\+xml/)
  })

  /* The rendered widths the pages ask for, at 1x and 2x. A raster entry has to
     carry a variant at least that wide, or a retina screen falls through to the
     full master. Vector entries are one file at every size. */
  it.each([
    ['robot-team', 352],
    ['path-lightbulb-target', 64],
    ['path-gears-trio', 64],
    ['path-phone-circuit', 64],
    ['magnifier-gear', 112],
  ])('%s carries variants covering %ipx at 1x and 2x', (key, rendered) => {
    const data = JSON.parse(
      readFileSync(join(SRC, 'assets', 'illustrations', 'illustrations.data.json'), 'utf8'),
    )
    const widths = data[key].variants.map((v) => v.width)

    expect(widths.some((w) => w >= rendered)).toBe(true)
    expect(widths.some((w) => w >= rendered * 2)).toBe(true)
    expect(illustrations[key].srcSet).toMatch(/\s\d+w/)
  })

  it.each(['dashboard-user', 'developer-desk', 'gear-brain', 'mile42-mark-white'])(
    '%s is a vector entry with no srcSet',
    (key) => {
      expect(illustrations[key].src).toMatch(/\.svg|^data:image\/svg\+xml/)
      expect(illustrations[key].srcSet).toBeUndefined()
    },
  )

  it('reports no entry as an outstanding placeholder', () => {
    expect(placeholderKeys).toEqual([])
  })
})
