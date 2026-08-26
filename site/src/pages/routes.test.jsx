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

/**
 * #78 — the homepage's tab title.
 *
 * It carried the headline #74 replaced, so the tab and the page said different
 * things and the sentence survived nowhere else. The generic assertion above
 * only checks the suffix, which is why the drift was invisible to it.
 *
 * Pinned so the next copy change fails a gate rather than shipping quietly,
 * which is the same class of drift that produced the ticket.
 */
describe('the homepage tab title', () => {
  const home = () => PAGES.find((p) => p.path === '/')

  it('echoes the hero eyebrow rather than a headline the page dropped', () => {
    expect(home().title).toBe('Execution, Rebuilt. \u00b7 Mile42')
  })

  it('no longer carries the headline #74 replaced', () => {
    expect(home().title).not.toMatch(/We help organizations deliver/)
  })
})
