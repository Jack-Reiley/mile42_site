import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Home from './Home.jsx'

/**
 * #63 — the homepage's band order, as rewritten by the home rewrite around the
 * stalled AI initiative.
 *
 * Named for the ticket rather than the page, the way vickee-entry-points.test.jsx
 * is, because Home.test.jsx would invite every future homepage assertion into one
 * file and this is one contract about one structure.
 *
 * Links are asserted at the root, which is where #97 mounted the site. See
 * Footer.test.jsx for what that cost and src/go-live.test.jsx for the sweep
 * that replaces it.
 *
 * Geometry is deliberately absent. Spot placement and subgrid row alignment
 * are rendered positions jsdom does not compute; they are verified by
 * measurement in a browser.
 */

const draw = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>,
  )

const bandsOf = (container) => [...container.querySelectorAll('section')]

const bandWith = (container, text) =>
  bandsOf(container).find((b) => b.textContent.includes(text))

describe('SCN-001 — the page runs problem, buyer, objections, offer, platforms, argument, close', () => {
  it('orders the bands', () => {
    const { container } = draw()
    const bands = bandsOf(container)

    expect(bands).toHaveLength(7)
    expect(bands[0].textContent).toContain('Most AI pilots never make it past the demo')
    expect(bands[1].textContent).toContain('Mile42 is who you call')
    expect(bands[2].textContent).toContain('Three things we hear on the first call')
    expect(bands[3].textContent).toContain('Three ways organizations work with us')
    expect(bands[4].textContent).toContain('Platforms we build on')
    expect(bands[5].textContent).toContain('Consulting should create momentum, not overhead')
    expect(bands[6].textContent).toContain('Name the process. See it working in a month.')
  })

  /* The objections and the product that answers the second of them are one
     band. A move that left Vickee behind would undo that silently. */
  it('carries the Vickee block with the objections', () => {
    const { container } = draw()
    expect(bandsOf(container)[2].textContent).toContain('Decide what your agents are allowed to know')
  })
})

describe('SCN-002 — the three objections, in order, each with a link', () => {
  it('lists them in the order a buyer raises them', () => {
    const { container } = draw()
    const band = bandWith(container, 'Three things we hear on the first call')
    const titles = [...band.querySelectorAll('h3')].map((h) => h.textContent).slice(0, 3)

    expect(titles).toEqual([
      'Our AI pilot never made it to production.',
      'Security will not let agents touch our systems of record.',
      'We will tell you when the answer is not an agent.',
    ])
  })

  it.each([
    ['How we close the gap', '/what-we-do/engineering'],
    ['How Vickee answers security', '/meet-vickee'],
    ['When an agent is the wrong tool', '/what-we-do/engineering/agentic-ai'],
  ])('%s links to %s', (name, href) => {
    draw()
    const link = screen.getByRole('link', { name })
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe(href)
  })

  /* The body copy is lifted from the pages the links land on, so the homepage
     promises nothing the site does not already argue. */
  it('draws each body from the page it links to', () => {
    const { container } = draw()
    const band = bandWith(container, 'Three things we hear on the first call')

    expect(band.textContent).toContain('A prototype only has to work once.')
    expect(band.textContent).toContain('stopped by risk, legal, and security more often than by engineering')
    expect(band.textContent).toContain('A no you can trust early is cheaper than a yes that fails seven months in.')
  })

  it('no longer draws the core practice grid', () => {
    const { container } = draw()

    expect(container.textContent).not.toMatch(/Our core practice is agentic AI implementation/)
    expect(container.textContent).not.toMatch(/Context and workflow design/)
    expect(container.textContent).not.toMatch(/Adoption and accountability/)
  })
})

describe('SCN-003 — the offer is Phase Zero, Advisory, Engineering', () => {
  it('holds the three columns in that order', () => {
    const { container } = draw()
    const band = bandWith(container, 'Three ways organizations work with us')
    const titles = [...band.querySelectorAll('article h3')].map((h) => h.textContent)

    expect(titles).toEqual(['You need a pilot', 'You need clarity', 'You need to execute'])
  })

  it('states the Phase Zero terms on its card', () => {
    const { container } = draw()
    const column = [...container.querySelectorAll('article')].find((a) =>
      a.textContent.includes('You need a pilot'),
    )

    expect(column.textContent).toContain(
      'About a month. Fixed fee, agreed before we start, typically between $10k and $30k depending on the process.',
    )
  })

  it.each([
    ['You need clarity', 'defend the decision without us in the room'],
    ['You need to execute', 'leave your team able to change it without us'],
  ])('%s closes on its value', (title, value) => {
    const { container } = draw()
    const column = [...container.querySelectorAll('article')].find((a) =>
      a.textContent.includes(title),
    )

    expect(column).toBeDefined()
    expect(column.textContent).toContain(value)
  })

  /* One band, one h2. The engagement principles no longer close this band;
     they moved into the argument panel near the bottom of the page. */
  it('presents exactly one second-level heading and no principles', () => {
    const { container } = draw()
    const band = bandWith(container, 'Three ways organizations work with us')

    expect(band.querySelectorAll('h2')).toHaveLength(1)
    expect(band.textContent).not.toContain('You know what the work costs before you commit.')
  })

  it('no longer offers proven solutions or a separate Phase Zero panel', () => {
    const { container } = draw()

    expect(container.textContent).not.toMatch(/You need proven solutions/)
    expect(container.textContent).not.toMatch(/Start with a pilot\./)
    expect(container.textContent).not.toMatch(/priced to be a decision/)
    expect(container.textContent).not.toMatch(/You leave with/i)
  })
})

describe('SCN-004 — the platform strip', () => {
  it('is labelled as platforms, never partners', () => {
    const { container } = draw()
    const band = bandWith(container, 'Platforms we build on')

    expect(band.querySelector('h2').textContent).toBe('Platforms we build on.')
    expect(container.textContent).not.toMatch(/partner/i)
  })

  it('groups the platforms by category, as text', () => {
    const { container } = draw()
    const band = bandWith(container, 'Platforms we build on')
    const terms = [...band.querySelectorAll('dt')].map((t) => t.textContent)
    const names = [...band.querySelectorAll('dd')].map((d) => d.textContent)

    expect(terms).toEqual([
      'Models',
      'Data and AI foundation',
      'Enterprise workflow',
      'Content and experience',
      'Commerce',
    ])
    expect(names[0]).toContain('Anthropic Claude')
    expect(names[0]).toContain('xAI Grok')
    expect(names[3]).toContain('Bloomreach')
    expect(names[4]).toContain('SAP Hybris')
    expect(band.querySelectorAll('img')).toHaveLength(0)
  })
})

describe('SCN-005 — the closing call to action uses its own words', () => {
  it('does not repeat the template the other pages close on', () => {
    const { container } = draw()
    const close = bandsOf(container).at(-1)

    expect(close.textContent).not.toMatch(/Tell us what needs to work/)
    expect(close.textContent).not.toMatch(/We will tell you honestly/)
    expect(within(close).getByRole('link', { name: 'Start a conversation' }).getAttribute('href')).toBe('/contact')
  })
})

describe('SCN-010 — the offering links still resolve', () => {
  it.each([
    ['Explore Phase Zero', '/what-we-do/phase-zero'],
    ['Explore advisory', '/what-we-do/advisory'],
    ['Explore engineering', '/what-we-do/engineering'],
  ])('%s carries the basename', (name, href) => {
    draw()
    expect(screen.getByRole('link', { name }).getAttribute('href')).toBe(href)
  })

  it('no longer links to AI-driven products from the trio', () => {
    draw()
    expect(screen.queryByRole('link', { name: 'Explore AI-driven products' })).toBeNull()
  })
})
