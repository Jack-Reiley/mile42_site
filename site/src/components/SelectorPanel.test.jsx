import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectorPanel from './SelectorPanel.jsx'
import WhereAgentsWork from './WhereAgentsWork.jsx'
import DeweyPillars from './DeweyPillars.jsx'

/**
 * The shell shared by the delivery model's roles and Dewey's pillars.
 *
 * These cover the behaviour the extraction had to preserve, since it was pulled
 * out from under a page that had already shipped.
 */

const ITEMS = [
  { title: 'First', detail: 'one' },
  { title: 'Second', detail: 'two' },
  { title: 'Third', detail: 'three' },
]

const panel = (props = {}) =>
  render(
    <SelectorPanel eyebrow="Three things" items={ITEMS} paneId="probe" {...props}>
      {(item) => <p>{item.detail}</p>}
    </SelectorPanel>,
  )

describe('SelectorPanel', () => {
  it('selects the first item by default and shows its detail', () => {
    panel()
    expect(screen.getByRole('button', { name: /First/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('one')).toBeInTheDocument()
  })

  it('honours a different default', () => {
    panel({ defaultIndex: 2 })
    expect(screen.getByRole('button', { name: /Third/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('three')).toBeInTheDocument()
  })

  it('swaps the pane on selection and leaves exactly one pressed', async () => {
    panel()
    await userEvent.click(screen.getByRole('button', { name: /Second/ }))
    expect(screen.getByText('two')).toBeInTheDocument()
    expect(screen.queryByText('one')).not.toBeInTheDocument()
    const pressed = screen
      .getAllByRole('button')
      .filter((b) => b.getAttribute('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
  })

  it('never presents a closed state, so it is aria-pressed rather than aria-expanded', () => {
    panel()
    screen.getAllByRole('button').forEach((b) => {
      expect(b).toHaveAttribute('aria-pressed')
      expect(b).not.toHaveAttribute('aria-expanded')
    })
  })

  it('points every choice at the live pane', () => {
    const { container } = panel()
    const pane = container.querySelector('#probe')
    expect(pane).toHaveAttribute('aria-live', 'polite')
    screen.getAllByRole('button').forEach((b) => {
      expect(b).toHaveAttribute('aria-controls', 'probe')
    })
  })

  it('numbers the choices in order', () => {
    panel()
    expect(screen.getByRole('button', { name: /First/ })).toHaveTextContent('01')
    expect(screen.getByRole('button', { name: /Third/ })).toHaveTextContent('03')
  })

  it('omits the footnote when there is none', () => {
    const withNote = panel({ note: 'A footnote.' })
    expect(screen.getByText('A footnote.')).toBeInTheDocument()
    withNote.unmount()
    panel()
    expect(screen.queryByText('A footnote.')).not.toBeInTheDocument()
  })
})

describe('the two pages that use it', () => {
  const ROLES = [
    { title: 'Discovery', agents: 'Agent output A', human: 'Human call A' },
    { title: 'Design', agents: 'Agent output B', human: 'Human call B' },
  ]

  it('keeps the delivery model on its own default role', () => {
    // The extraction had to preserve this: Design is the deliberate default,
    // and index 3 clamps to the last role in this shortened fixture.
    render(<WhereAgentsWork roles={ROLES} />)
    expect(screen.getByText('Seven roles')).toBeInTheDocument()
    expect(screen.getByText(/Roles, not steps/)).toBeInTheDocument()
  })

  it('renders a pillar with its benefit and every proof line', () => {
    const PILLARS = [{ title: 'Organized', benefit: 'The benefit copy.', proof: ['One', 'Two'] }]
    render(<DeweyPillars pillars={PILLARS} />)
    expect(screen.getByText('The benefit copy.')).toBeInTheDocument()
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
    expect(screen.getByText(/live in the product today/)).toBeInTheDocument()
  })
})
