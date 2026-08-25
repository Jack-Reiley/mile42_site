import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Home from './Home.jsx'

/**
 * #63 — the homepage's band order and the merged engagement band.
 *
 * Named for the ticket rather than the page, the way dewey-entry-points.test.jsx
 * is, because Home.test.jsx would invite every future homepage assertion into one
 * file and this is one contract about one restructure.
 *
 * The basename is reproduced for the reason Footer.test.jsx reproduces it: the
 * site mounts under /working, so a link asserted without the prefix would pass
 * here and 404 in the browser. See main.jsx.
 *
 * Geometry is deliberately absent. SCN-005 to SCN-007 are spot placement and
 * subgrid row alignment, which are rendered positions jsdom does not compute;
 * they are verified by measurement in a browser and recorded in the requirements
 * document instead of being faked here.
 */

const BASENAME = '/working'

const draw = () =>
  render(
    <MemoryRouter basename={BASENAME} initialEntries={[`${BASENAME}/`]}>
      <Home />
    </MemoryRouter>,
  )

const bandsOf = (container) => [...container.querySelectorAll('section')]

const bandWith = (container, text) =>
  bandsOf(container).find((b) => b.textContent.includes(text))

describe('SCN-001 — the core practice band leads the page', () => {
  /* The band the hero hands off to is now the anti-consulting argument, so core
     practice sits second rather than first. What this scenario protects is
     unchanged: core practice still comes before the three ways in, and the page
     still closes on the call to action. */
  it('puts core practice ahead of the three ways', () => {
    const { container } = draw()
    const bands = bandsOf(container)

    expect(bands[0].textContent).toContain('The consulting model is broken')
    expect(bands[1].textContent).toContain('Consulting should create momentum, not overhead')
    expect(bands[2].textContent).toContain('Our core practice is agentic AI implementation')
    expect(bands[3].textContent).toContain('Three ways organizations work with us')
    expect(bands.at(-1).textContent).toContain('Tell us what needs to work.')
  })

  /* The band moved as one object. #60 merged the practice argument and the
     product it produced for a reason, and a move that left Dewey behind would
     undo that silently. */
  it('carries the Dewey block with it', () => {
    const { container } = draw()
    expect(bandsOf(container)[2].textContent).toContain('the knowledge layer that keeps agents')
  })
})

describe('SCN-002 — the offer and its terms are one band', () => {
  it('holds the three columns and the engagement principles together', () => {
    const { container } = draw()
    const band = bandWith(container, 'Three ways organizations work with us')

    expect(band.textContent).toContain('You need clarity')
    expect(band.textContent).toContain('You need to execute')
    expect(band.textContent).toContain('You need proven solutions')
    expect(band.textContent).toContain('Our engagements are built around your outcomes.')
    expect(band.textContent).toContain('You know what the work costs before you commit.')
  })

  /* One band, one h2. The principles arrived carrying their own second-level
     heading; merging without demoting it would leave the band arguing with
     itself and break the outline. */
  it('presents exactly one second-level heading', () => {
    const { container } = draw()
    const band = bandWith(container, 'Three ways organizations work with us')

    expect(band.querySelectorAll('h2')).toHaveLength(1)
    expect(
      within(band).getByRole('heading', { level: 3, name: /Our engagements are built around your outcomes/ }),
    ).toBeInTheDocument()
  })
})

describe('SCN-003 — each column states its value inside its description', () => {
  it.each([
    ['You need clarity', 'direction, context, and decision confidence'],
    ['You need to execute', 'working technology, better execution, and stronger capability'],
    ['You need proven solutions', 'faster time to value and lower delivery risk'],
  ])('%s closes on its value', (title, value) => {
    const { container } = draw()
    const column = [...container.querySelectorAll('article')].find((a) =>
      a.textContent.includes(title),
    )

    expect(column).toBeDefined()
    expect(column.textContent).toContain(value)
  })

  it('presents no "You leave with" label anywhere on the page', () => {
    const { container } = draw()
    expect(container.textContent).not.toMatch(/You leave with/i)
  })
})

describe('SCN-004 — the pull-quote is gone', () => {
  it('no longer quotes larger firms on their economics', () => {
    const { container } = draw()
    expect(container.textContent).not.toMatch(/Larger firms can say this/i)
    expect(container.textContent).not.toMatch(/hard to mean it/i)
  })
})

describe('SCN-010 — the offering links still resolve', () => {
  it.each([
    ['Explore advisory', `${BASENAME}/what-we-do/advisory`],
    ['Explore engineering', `${BASENAME}/what-we-do/engineering`],
    ['Explore AI-driven products', `${BASENAME}/what-we-do/ai-products`],
  ])('%s carries the basename', (name, href) => {
    draw()
    expect(screen.getByRole('link', { name }).getAttribute('href')).toBe(href)
  })
})
