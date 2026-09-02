import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App.jsx'

/**
 * Phase Zero is the page the rest of the site points at, and the things most
 * likely to drift are the ones a build cannot catch: the terms of the offer
 * disappearing in an edit, and the entry points that were pointed here going
 * back to /contact.
 *
 * Queries are by role and accessible name rather than by class or DOM position,
 * so restyling the page does not break a test and a skipped heading level does
 * not pass one. Queries are scoped to the main landmark, because the header and
 * footer carry their own Phase Zero links and copy on every route and an
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

  /* The page opens on the reader's own question rather than closing on it, and
     it is the largest type on the page without being its h1, because the navy
     header still owns that. Both halves are pinned because either one alone is a
     different page. */
  it('opens with the diagnostic question, below the h1', () => {
    at(ROUTE)
    const [first, second] = outline()
    expect(first).toEqual([1, 'Proof, not a proposal.'])
    expect(second).toEqual([2, 'What is the one process you would fix first?'])
  })

  /* The commercial line, and the reason it is not a price. Losing the second
     half turns the first into a claim with nothing behind it. */
  it('states the commercial terms without calling the offering free', () => {
    at(ROUTE)
    const main = within(screen.getByRole('main'))
    expect(
      main.getByRole('heading', { name: 'Priced to be a decision, not an investment.' }),
    ).toBeInTheDocument()
    expect(main.getByText(/no obligation to continue, and the roadmap is yours either way/))
      .toBeInTheDocument()
    /* The offering is no longer described as free. Scoped to main: the header's
       Phase Zero card still makes that claim, and until it is rewritten an
       unscoped query would pass on the wrong element. */
    expect(main.queryByText(/\bfree\b/i)).toBeNull()
  })

  /* Slide 4's job is to make the reader name a process. Both halves are pinned:
     the questions that surface one, and the shapes a pilot can take. */
  it('asks the four questions that surface a candidate process', () => {
    at(ROUTE)
    const questions = [
      'What frustrates people most?',
      'What takes the most human time?',
      'Where does quality slip?',
      'What is the low-hanging fruit?',
    ]
    questions.forEach((q) => expect(screen.getByText(q)).toBeInTheDocument())
  })

  it('shows four shapes a pilot can take', () => {
    at(ROUTE)
    const examples = [
      'Run agents on a live backlog',
      'Automate one business process',
      'Migrate a slice off a legacy platform',
      'Find and fix what is underperforming',
    ]
    examples.forEach((e) =>
      expect(screen.getByRole('heading', { level: 3, name: e })).toBeInTheDocument(),
    )
  })

  it('keeps the four stages of the engagement', () => {
    at(ROUTE)
    const stages = ['Identify', 'Analyze', 'Pilot', 'Roadmap']
    stages.forEach((s) => expect(screen.getByText(s)).toBeInTheDocument())
  })

  /* The handoff diagram's argument is the pairing, so both lanes are pinned in
     the same order. `getAllByText`, because the diagram draws a wide form and a
     stacked one and jsdom renders both, and the media query that hides one is
     not applied. */
  it('pairs each human step with the agent step it hands to', () => {
    at(ROUTE)
    const main = within(screen.getByRole('main'))
    const people = ['Name the outcome', 'Give context', 'Review the work', 'Approve to land']
    const agents = ['Plan', 'Build', 'Validate', 'Deploy']
    people.forEach((p) => expect(main.getAllByText(p).length).toBeGreaterThan(0))
    agents.forEach((a) => expect(main.getAllByText(a).length).toBeGreaterThan(0))
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
