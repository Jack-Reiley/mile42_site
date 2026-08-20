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
    expect(container.querySelectorAll('section')).toHaveLength(8)
  })

  it('opens the way a top-level page opens, not the way a detail page does', () => {
    const { container } = page()
    // An h1 and no breadcrumb: the comp drew this as a child of What we do, and
    // it is a top-level page instead.
    expect(container.querySelector('h1')).toHaveTextContent('Every agent needs a library.')
    expect(container.querySelector('nav[aria-label="Breadcrumb"]')).toBeNull()
  })

  it('carries the whole integration strip and the comparison', () => {
    page()
    expect(screen.getByText('Retrieve')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    // seven alternatives, each a row header
    expect(screen.getAllByRole('rowheader')).toHaveLength(7)
  })

  it('describes the librarian diagram as one image rather than loose list items', () => {
    page()
    expect(screen.getByRole('img', { name: /never touch the systems of record/ })).toBeInTheDocument()
  })

  it('is registered as a route', () => {
    const route = PAGES.find((p) => p.path === '/meet-dewey')
    expect(route).toBeDefined()
    expect(route.title).toMatch(/^Meet Dewey/)
  })
})
