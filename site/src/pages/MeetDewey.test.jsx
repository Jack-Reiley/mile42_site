import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import MeetDewey from './MeetDewey.jsx'
import { PAGES } from '../App.jsx'

/**
 * The page renders, and it is reachable.
 *
 * The render assertion exists because the bundler does not catch an undefined
 * identifier: a component here referenced a shared constant it had no import
 * for, built cleanly, and blanked the page on first paint. Nothing but
 * rendering it catches that.
 */

const page = () =>
  render(
    <MemoryRouter>
      <MeetDewey />
    </MemoryRouter>,
  )

describe('Meet Dewey', () => {
  it('renders every section', () => {
    const { container } = page()
    // Seven, not the eight this page opened with: #70 folded the librarian,
    // connectors, and source-of-truth bands into one interactive diagram, and
    // the context-layer intro band was added back after the hero.
    expect(container.querySelectorAll('section')).toHaveLength(7)
  })

  it('opens the way a top-level page opens, not the way a detail page does', () => {
    const { container } = page()
    // An h1 and no breadcrumb: the comp drew this as a child of What we do, and
    // it is a top-level page instead.
    expect(container.querySelector('h1')).toHaveTextContent(
      'Intelligence is table stakes. Context is where you win.',
    )
    expect(container.querySelector('nav[aria-label="Breadcrumb"]')).toBeNull()
  })

  /* #77 asserted the trademarked product name on the hero eyebrow, because the
     heading it sat above opened with "Meet Dewey\u2122" and a merge had dropped the
     mark. The hero copy has since been rewritten to lead with the problem
     rather than the product, so the eyebrow names the category instead and
     there is no longer a name up there to carry a mark. What #77 was actually
     protecting \u2014 a hero that says one thing once \u2014 is what the two assertions
     below check. */
  it('names the category on the eyebrow, and the problem in the heading', () => {
    const { container } = page()
    // Scoped to the hero: the page has other eyebrows below it.
    const eyebrow = container.querySelector('section p')

    expect(eyebrow).toHaveTextContent('The context layer for enterprise AI')
    // The eyebrow places the product in a category and stops; the heading makes
    // the argument.
    expect(eyebrow).not.toHaveTextContent('librarian')
  })

  it('states its opening line once, in the heading, not twice', () => {
    const { container } = page()
    const hero = container.querySelector('section')

    // The tell for the #77 regression was an h1 and a lead saying the same
    // thing. The lead says what Dewey does; only the heading frames the wager.
    expect(hero).not.toHaveTextContent('Every agent needs a library.')
    expect(hero).toHaveTextContent(/Dewey turns what your organization uniquely knows/)
  })

  /* Counting the band's list items used to stand in for "the proof points are
     there". The band carries four lists now, so that number says nothing about
     any one of them; each block is named instead. */
  it('makes the context argument before the product does anything', () => {
    const { container } = page()
    const intro = container.querySelectorAll('section')[1]

    // The band opens on its heading; it carries no eyebrow of its own.
    expect(intro).toHaveTextContent(/Your people know the business\./)
    expect(intro).not.toHaveTextContent('Governed enterprise context')
  })

  it('turns the argument on a labelled contrast rather than on prose', () => {
    const { container } = page()
    const intro = container.querySelectorAll('section')[1]

    expect(intro).toHaveTextContent('Without a context layer')
    expect(intro).toHaveTextContent('With Dewey')
    expect(intro).toHaveTextContent('Direct access to every source creates unacceptable risk')
    expect(intro).toHaveTextContent('Each person and agent gets exactly what they are authorized to know')
  })

  /* The outcomes are statements, not headings. #(this change) split them out of
     a single heading-scale block that read as a second headline; if they ever
     come back as headings the band has two competing heading levels again. */
  it('lands three outcomes, and none of them is a heading', () => {
    const { container } = page()
    const intro = container.querySelectorAll('section')[1]

    expect(intro).toHaveTextContent('Your systems stay protected.')
    expect(intro).toHaveTextContent('Your people remain accountable.')
    expect(intro).toHaveTextContent(/Your agents act from context the enterprise can inspect/)
    expect(intro.querySelectorAll('h1, h2, h3, h4, h5, h6')).toHaveLength(1)
  })

  /* The band used to close on five ticked proof points. Every one of them is
     made further down the page, and more specifically: "up to date" by the
     indexing pillar's status endpoint, "federated" by the per-tenant namespaces
     and catalog rollups, "scoped" by the least-privilege pillar, "grounded" by
     the cited-answer pillar, and "auditable" by the connectors pillar's review
     and signoff. This band is the introduction; it should not pre-empt them. */
  it('leaves the proof points to the pillars that make them', () => {
    const { container } = page()
    const intro = container.querySelectorAll('section')[1]

    expect(intro).not.toHaveTextContent('Up to date across approved enterprise sources')
    expect(intro).not.toHaveTextContent('Auditable across retrievals and approved actions')
    // Still made on the page, just not in the introduction to it. The pillars
    // are a selector, so only the open one is in the DOM; this is its first.
    expect(container).toHaveTextContent('Multi-tenant with per-tenant namespaces')
  })

  it('carries the whole integration strip and the comparison', () => {
    page()
    expect(screen.getByText('Retrieve')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    // seven alternatives, each a row header
    expect(screen.getAllByRole('rowheader')).toHaveLength(7)
  })

  /* The librarian diagram used to be a `role="img"` with a written-out label,
     because nothing in it could be operated. Its parts are buttons now, so the
     picture is reachable rather than described, and the assertion follows the
     behaviour instead of the old markup. */
  it('carries the librarian diagram, and every part of it is reachable', () => {
    page()
    expect(screen.getByRole('button', { name: 'Dewey, the librarian' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Your systems of record' })).toBeInTheDocument()
  })

  it('still makes the three folded-in arguments on the page', () => {
    page()
    // One band each before #70; all three are now titles in the diagram.
    expect(screen.getAllByText('Every library needs a librarian.').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Connectors are code, not prompts.').length).toBeGreaterThan(0)
    expect(screen.getAllByText('One source of truth, every agent.').length).toBeGreaterThan(0)
    // The outbound half of the connectors band, which the handoff dropped.
    expect(
      screen.getAllByText('Agents propose. Humans approve. Code executes.').length,
    ).toBeGreaterThan(0)
  })

  /* SCN-003. The hero artwork is the page's largest above-the-fold image, so it
     is what LCP measures. Lazy loading it, or shipping it without intrinsic
     dimensions, are the two ways that regresses silently. */
  it('leads with the hero artwork, sized and prioritised', () => {
    const { container } = page()
    const art = container.querySelector('section img')

    expect(art).toHaveAttribute('loading', 'eager')
    expect(art).toHaveAttribute('fetchpriority', 'high')
    expect(art.getAttribute('width')).toBeTruthy()
    expect(art.getAttribute('height')).toBeTruthy()
    expect(art).toHaveAccessibleName(/hand/i)
  })

  /* SCN-006 and SCN-007. The contrast is drawn twice, because corresponding
     rows cannot be made to line up while each panel owns its own list. The
     stacked form keeps the real list markup; the side-by-side form is a
     labelled group whose rows are grid cells. Exactly one is ever displayed, so
     nothing is announced twice. The risk this guards is a CSS change that drops
     one of the two visibility classes and leaves both in the accessibility
     tree. */
  it('draws the contrast twice, and shows exactly one of the two forms', () => {
    const { container } = page()
    const intro = container.querySelectorAll('section')[1]

    const stacked = intro.querySelector('.lg\\:hidden')
    const sideBySide = intro.querySelector('[role="group"]')

    expect(stacked).not.toBeNull()
    expect(sideBySide).not.toBeNull()
    // The stacked form is the one that carries real lists.
    expect(stacked.querySelectorAll('ul')).toHaveLength(2)
    expect(stacked.querySelectorAll('li')).toHaveLength(6)
    // Each is hidden at the widths where the other is shown.
    expect(stacked.className).toMatch(/lg:hidden/)
    expect(sideBySide.className).toMatch(/\bhidden\b/)
    expect(sideBySide.className).toMatch(/lg:grid/)
    expect(sideBySide).toHaveAttribute('aria-label')
  })

  /* SCN-005 pairing, as far as the DOM can carry it. Alignment itself is a
     layout property and is checked in the browser, but the reading order is
     not: each problem must be followed by the answer that resolves it, so a
     screen reader hears the pair rather than one column then the other. */
  it('orders the side-by-side contrast as pairs, not as two columns', () => {
    const { container } = page()
    const group = container.querySelector('[role="group"]')
    const text = group.textContent

    expect(text.indexOf('Context scattered')).toBeLessThan(
      text.indexOf('Approved knowledge in one shared, governed context layer'),
    )
    expect(text.indexOf('Approved knowledge in one shared, governed context layer')).toBeLessThan(
      text.indexOf('Direct access to every source'),
    )
    expect(text.indexOf('Each person and agent gets exactly what they are authorized to know')).toBeLessThan(
      text.indexOf('A separate pipeline for every agent'),
    )
  })

  /* SCN-012. Tailwind reads class names as literals, so a computed
     `row-start-${i}` produces no utility at all and a fourth pair would render
     on top of an existing row. PAIR_ROW is written out for that reason; this
     asserts it still covers every pair. */
  it('places every contrast pair on a row of its own', () => {
    const { container } = page()
    const group = container.querySelector('[role="group"]')

    const rows = [...group.children]
      .map((el) => [...el.classList].find((c) => c.startsWith('row-start-')))
      .filter(Boolean)
    const paired = rows.filter((c) => c !== 'row-start-1')

    // Three pairs, three cells each, one row per pair, none sharing a row with
    // the column headings.
    expect(new Set(paired).size).toBe(3)
    expect(paired).toHaveLength(9)
  })

  /* SCN-010. Em dashes are fine in this file and in the requirements document.
     They are not fine in copy a visitor reads. */
  it('carries no em dashes in the copy a reader sees', () => {
    const { container } = page()
    expect(container.textContent).not.toMatch(/\u2014/)
  })

  /* SCN-011. The illustration is served through the pipeline rather than as a
     hand-placed file: a responsive source set, real alternative text, and
     intrinsic dimensions emitted by the build rather than typed in. */
  it('serves the introduction artwork through the asset pipeline', () => {
    const { container } = page()
    const intro = container.querySelectorAll('section')[1]
    const art = intro.querySelector('img')

    expect(art).toHaveAccessibleName(/chess/i)
    expect(art.getAttribute('srcset')).toMatch(/\s\d+w/)
    expect(Number(art.getAttribute('width'))).toBeGreaterThan(0)
    expect(Number(art.getAttribute('height'))).toBeGreaterThan(0)
  })

  it('is registered as a route', () => {
    const route = PAGES.find((p) => p.path === '/meet-dewey')
    expect(route).toBeDefined()
    expect(route.title).toMatch(/^Meet Dewey/)
  })
})
