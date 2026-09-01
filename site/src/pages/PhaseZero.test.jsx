import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App.jsx'

/**
 * Phase Zero is the site's only free offer, and the things most likely to drift
 * are the ones a build cannot catch: the terms of the offer disappearing in an
 * edit, and the entry points that were pointed here going back to /contact.
 *
 * Queries are by role and accessible name rather than by class or DOM position,
 * so restyling the page does not break a test and a skipped heading level does
 * not pass one. Entry-point queries are scoped to the main landmark, because
 * the header and footer carry their own Phase Zero links on every route and an
 * unscoped query matches those too.
 */

const ROUTE = '/what-we-do/phase-zero'

const at = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

/** Every heading on the page, in document order, as [level, name] pairs. */
const outline = () =>
  screen.getAllByRole('heading').map((h) => [Number(h.tagName[1]), h.textContent.trim()])

describe('the Phase Zero page', () => {
  it('is the only h1 on the route', () => {
    at(ROUTE)
    const h1s = outline().filter(([level]) => level === 1)
    expect(h1s).toEqual([[1, 'Proof, not a proposal.']])
  })

  it('never skips a heading level', () => {
    at(ROUTE)
    const levels = outline().map(([level]) => level)
    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1]).toBeLessThanOrEqual(1)
    })
  })

  /* The catch question is the one a reader brings to a free offer, so both
     halves of the answer are pinned. Losing the second half turns the first
     into a claim nobody believes. */
  it('states that the offering is free and says when payment starts', () => {
    at(ROUTE)
    expect(screen.getByRole('heading', { level: 3, name: 'Phase Zero is free.' })).toBeInTheDocument()
    expect(screen.getByText(/You pay when you decide to scale it/)).toBeInTheDocument()
  })

  it('keeps the four stages of the engagement', () => {
    at(ROUTE)
    const stages = ['Identify', 'Analyze', 'Pilot', 'Roadmap']
    stages.forEach((s) => expect(screen.getByText(s)).toBeInTheDocument())
  })

  it('offers a way to start the conversation', () => {
    at(ROUTE)
    const main = within(screen.getByRole('main'))
    expect(main.getByRole('link', { name: /Start with Phase Zero/ })).toHaveAttribute(
      'href',
      '/contact',
    )
  })
})

/**
 * The four pages that were given an entry point into Phase Zero. Advisory's
 * link predates the route and pointed at /contact while the page did not exist,
 * which is exactly the drift worth pinning.
 */
describe('the entry points into Phase Zero', () => {
  it.each([
    ['/', /See how Phase Zero works/],
    ['/what-we-do', /See how Phase Zero works/],
    ['/what-we-do/advisory', /Start with Phase Zero/],
    ['/how-we-work/client-journey', /^Phase Zero/],
    ['/how-we-work/engagement-model', /See Phase Zero/],
  ])('%s links to the page rather than to /contact', (path, name) => {
    at(path)
    const main = within(screen.getByRole('main'))
    expect(main.getByRole('link', { name })).toHaveAttribute('href', ROUTE)
  })
})
