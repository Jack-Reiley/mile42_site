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
    // Six, not the eight this page opened with: #70 folded the librarian,
    // connectors, and source-of-truth bands into one interactive diagram.
    expect(container.querySelectorAll('section')).toHaveLength(6)
  })

  it('opens the way a top-level page opens, not the way a detail page does', () => {
    const { container } = page()
    // An h1 and no breadcrumb: the comp drew this as a child of What we do, and
    // it is a top-level page instead.
    expect(container.querySelector('h1')).toHaveTextContent(
      'Meet Dewey\u2122. The librarian for AI agents (and humans).',
    )
    expect(container.querySelector('nav[aria-label="Breadcrumb"]')).toBeNull()
  })

  /* #77. The hero was reverted by a merge resolution in PR #66, which dropped
     #60's trademark from the eyebrow and #70's heading, and left the lead
     repeating the line the h1 had become. The assertion above is what caught
     it; these two cover the parts it could not see.

     Added beside the existing assertions rather than replacing any of them.
     Nothing above this comment was modified. */
  it('carries the trademark on the brand eyebrow', () => {
    const { container } = page()
    // Scoped to the hero: the mark appears elsewhere on the page too, and what
    // the merge dropped was this one.
    const eyebrow = container.querySelector('section p')

    // The literal U+2122, not an entity: `&#8482;` renders identically in a
    // browser and would fail this comparison, which is exactly the kind of
    // near-miss that would read as the restoration not having taken.
    expect(eyebrow).toHaveTextContent('Dewey\u2122')
    // The eyebrow names the product and stops; the heading says what it is.
    expect(eyebrow).not.toHaveTextContent('librarian')
  })

  it('states its opening line once, in the heading, not twice', () => {
    const { container } = page()
    const hero = container.querySelector('section')

    // The tell for the regression: the h1 and the first sentence of the lead
    // said the same thing. The line is retired from the hero entirely.
    expect(hero).not.toHaveTextContent('Every agent needs a library.')
    expect(hero).toHaveTextContent(/Agents don.t fail for lack of intelligence/)
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

  it('is registered as a route', () => {
    const route = PAGES.find((p) => p.path === '/meet-dewey')
    expect(route).toBeDefined()
    expect(route.title).toMatch(/^Meet Dewey/)
  })
})
