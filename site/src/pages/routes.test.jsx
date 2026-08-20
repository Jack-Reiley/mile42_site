import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { PAGES } from '../App.jsx'

/**
 * Every route renders.
 *
 * This exists because the bundler does not catch a missing import. A page that
 * used a shared constant without importing it built cleanly and would have
 * thrown on first paint — the kind of failure that is invisible until someone
 * opens that one page. Rendering each route is the cheapest thing that catches
 * it, and it holds for anything else that throws during render.
 */
describe('every route renders', () => {
  it.each(PAGES.map((p) => [p.path, p]))('%s', (path, { title, Component }) => {
    const { container } = render(
      <MemoryRouter initialEntries={[path]}>
        <Component />
      </MemoryRouter>,
    )
    expect(container.querySelector('section')).not.toBeNull()
    expect(container.textContent.trim().length).toBeGreaterThan(0)
    expect(title).toMatch(/Mile42$/)
  })
})
