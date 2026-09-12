import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import App, { PAGES } from '../App.jsx'

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

/**
 * The information architecture ticket merged the client journey and the
 * engagement model into How we work and folded AI-driven Products into
 * Engineering. Each old path has inbound links, so each keeps resolving: Netlify
 * answers a 301 before the app loads, and the in-app table catches navigation
 * to a path that has since moved. The 301 cannot carry a fragment to every
 * client, so the host sends the two merged pages to the page top and the app
 * is what lands on the band.
 */
describe('the retired paths redirect', () => {
  const SITE = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
  const redirects = () => readFileSync(join(SITE, 'public', '_redirects'), 'utf8')

  const at = (path) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    )

  const heading = () => screen.getByRole('heading', { level: 1 }).textContent

  afterEach(() => {
    delete Element.prototype.scrollIntoView
  })

  it.each([
    ['/how-we-work/client-journey', '/how-we-work'],
    ['/how-we-work/engagement-model', '/how-we-work'],
    ['/what-we-do/ai-products', '/what-we-do/engineering'],
  ])('sends %s to %s at the host', (from, to) => {
    expect(redirects()).toMatch(new RegExp(`^${from}\\s+${to}\\s+301$`, 'm'))
  })

  it('lists no route for any of the three', () => {
    const paths = PAGES.map((p) => p.path)
    expect(paths).not.toContain('/how-we-work/client-journey')
    expect(paths).not.toContain('/how-we-work/engagement-model')
    expect(paths).not.toContain('/what-we-do/ai-products')
  })

  it.each([
    ['/how-we-work/client-journey', 'client-journey'],
    ['/how-we-work/engagement-model', 'engagement-model'],
  ])('lands %s on the How we work band it became', (from, id) => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    at(from)

    expect(heading()).toBe('Execution is a system, not a sales pitch.')
    const band = document.getElementById(id)
    expect(band.tagName).toBe('SECTION')
    expect(band.querySelector('h2')).not.toBeNull()
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(scrollIntoView.mock.instances[0]).toBe(band)
  })

  it('lands /what-we-do/ai-products on Engineering, where the accelerators went', () => {
    at('/what-we-do/ai-products')

    expect(heading()).toBe('You need to execute.')
    expect(
      screen.getByRole('heading', { level: 2, name: 'What you do not have to build from scratch.' }),
    ).toBeInTheDocument()
  })

  /* The delivery model keeps its page. Its band on How we work is a summary
     that leads there, anchored so the header panel can point at it. */
  it('keeps the delivery model as a route and gives it a summary band', () => {
    expect(PAGES.map((p) => p.path)).toContain('/how-we-work/delivery-model')
    at('/how-we-work')
    const band = document.getElementById('delivery-model')
    expect(band.querySelector('a[href="/how-we-work/delivery-model"]')).not.toBeNull()
  })
})
