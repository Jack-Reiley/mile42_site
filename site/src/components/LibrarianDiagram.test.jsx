import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LibrarianDiagram from './LibrarianDiagram.jsx'

/**
 * The picture is decoration; the seven arguments are content. What matters is
 * that none of them is only reachable with a pointer.
 */

const IDLE = 'Point at any part of the diagram.'

/* Both layouts are in the DOM at once — the switch between them is a media
   query, and jsdom has no viewport — so every panel assertion has to say which
   one it means or it matches the stacked list too. */
const panel = () => within(document.getElementById('librarian-part'))

describe('LibrarianDiagram', () => {
  it('offers every part as a real button, not a hover target', () => {
    render(<LibrarianDiagram />)
    expect(screen.getAllByRole('button')).toHaveLength(7)
  })

  it('starts on the idle panel', () => {
    render(<LibrarianDiagram />)
    expect(screen.getByText(IDLE)).toBeInTheDocument()
  })

  it('swaps the panel on hover and puts it back on leave', async () => {
    const user = userEvent.setup()
    render(<LibrarianDiagram />)
    const dewey = screen.getByRole('button', { name: 'Dewey, the librarian' })

    await user.hover(dewey)
    expect(screen.queryByText(IDLE)).not.toBeInTheDocument()
    expect(panel().getByText('Dewey · the librarian')).toBeInTheDocument()

    await user.unhover(dewey)
    expect(screen.getByText(IDLE)).toBeInTheDocument()
  })

  /* Keyboard reaches the same panels the pointer does. Without this the whole
     diagram would be mouse-only, which is what the buttons exist to prevent. */
  it('swaps the panel on focus', async () => {
    const user = userEvent.setup()
    render(<LibrarianDiagram />)

    await user.tab()
    expect(screen.getByRole('button', { name: 'Your systems of record' })).toHaveFocus()
    expect(screen.queryByText(IDLE)).not.toBeInTheDocument()
  })

  it('pins a part on click, and lets go on a second click', async () => {
    const user = userEvent.setup()
    render(<LibrarianDiagram />)
    const answers = screen.getByRole('button', { name: 'Scoped answers' })

    await user.click(answers)
    expect(answers).toHaveAttribute('aria-pressed', 'true')
    await user.unhover(answers)
    // Still up: that is what pinning is for.
    expect(panel().getByText('Scoped retrieval')).toBeInTheDocument()

    await user.click(answers)
    expect(answers).toHaveAttribute('aria-pressed', 'false')
  })

  /* The outbound leg is not in the handoff. It is here because the band this
     replaced carried it, so a test pins it down against a later tidy-up. */
  it('carries the outbound path the handoff left out', () => {
    render(<LibrarianDiagram />)
    expect(
      screen.getByRole('button', { name: 'Outbound, Dewey to your systems of record' }),
    ).toBeInTheDocument()
    expect(panel().queryByText('Gated')).not.toBeInTheDocument()
    expect(screen.getByText('Gated')).toBeInTheDocument()
  })

  /* Below xl the diagram is replaced by a plain list of all seven, rendered at
     all times rather than swapped in by a media query at test time. */
  it('always renders all seven parts as stacked text as well', () => {
    const { container } = render(<LibrarianDiagram />)
    const stacked = container.querySelector('ul')
    expect(stacked.querySelectorAll('li')).toHaveLength(7)
  })
})
