import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App.jsx'
import { RuledGroup } from '../components/Lists.jsx'

/**
 * The two scenarios a screenshot cannot check: that the ruled benefits keep a
 * real heading hierarchy, and that giving RuledGroup an optional heading level
 * left the pages that were already calling it alone.
 *
 * Everything here queries by role, level, and accessible name. Nothing asserts
 * on a class or on DOM position, so restyling the band does not break a test
 * and a skipped heading level does not pass one.
 */

const BENEFITS = [
  'Cost is predictable.',
  'Quality is more consistent.',
  'Context is not lost.',
  'Smaller teams, less overhead.',
]

const STATEMENT = 'Our progress is measured by value created, not effort expended.'

const at = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

/** Every heading on the page, in document order, as [level, name] pairs. */
const outline = () =>
  screen.getAllByRole('heading').map((h) => [Number(h.tagName[1]), h.textContent.trim()])

describe('SCN-005 — heading order stays h2 then h3', () => {
  it('sets the band statement as a level 2 heading', () => {
    at('/how-we-work/delivery-model')
    expect(screen.getByRole('heading', { level: 2, name: STATEMENT })).toBeInTheDocument()
  })

  it.each(BENEFITS)('sets %s as a level 3 heading', (title) => {
    at('/how-we-work/delivery-model')
    expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
  })

  it('puts the four benefits directly under the statement with no level skipped', () => {
    at('/how-we-work/delivery-model')
    const levels = outline()
    const start = levels.findIndex(([, name]) => name === STATEMENT)

    expect(start).toBeGreaterThan(-1)
    expect(levels.slice(start, start + 5)).toEqual([
      [2, STATEMENT],
      ...BENEFITS.map((title) => [3, title]),
    ])
  })

  it('never jumps more than one level anywhere on the page', () => {
    at('/how-we-work/delivery-model')
    const levels = outline().map(([level]) => level)
    const jumps = levels.slice(1).filter((level, i) => level - levels[i] > 1)

    expect(jumps).toEqual([])
  })
})

describe('SCN-007 — the existing ruled groups are unchanged', () => {
  it('defaults RuledGroup to a level 4 heading', () => {
    render(<RuledGroup title="Untouched" ruleClass="border-t-brand" />)
    expect(screen.getByRole('heading', { level: 4, name: 'Untouched' })).toBeInTheDocument()
  })

  it.each([
    ['/what-we-do/engineering', ['AI and agentic systems', 'Systems and platforms', 'Modernization']],
    ['/what-we-do/ai-products', ['Delivery accelerators', 'Client-owned products', 'Market-facing products']],
    ['/what-we-do/engineering/agentic-ai', ['Agents and copilots', 'Knowledge and automation', 'Applications and data']],
  ])('leaves the group titles on %s at level 4', (path, titles) => {
    at(path)
    for (const title of titles) {
      expect(screen.getByRole('heading', { level: 4, name: title })).toBeInTheDocument()
    }
  })
})

describe('SCN-008 — the benefit copy is unchanged', () => {
  it.each([
    [BENEFITS[0], 'We can commit to a price because we are not guessing at how many hours a team will need.'],
    [BENEFITS[1], 'Test coverage and documentation happen continuously rather than depending on whether the schedule held.'],
    [BENEFITS[2], 'Decisions and rationale are captured as the work happens, so the reasoning survives past the engagement.'],
    [BENEFITS[3], 'Fewer people means fewer handoffs, fewer status meetings, and less of your time spent managing us.'],
  ])('keeps the body under %s', (title, body) => {
    at('/how-we-work/delivery-model')
    expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
    expect(screen.getByText(body)).toBeInTheDocument()
  })
})
