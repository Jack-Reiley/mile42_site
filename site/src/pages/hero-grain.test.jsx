import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { PAGES } from '../App.jsx'
import { BAND, BAND_GRAIN } from '../components/primitives.jsx'

/**
 * The grain film on every page's opening band.
 *
 * Written against structure rather than against a list of pages, because the
 * point of the treatment is that it is universal. A route added later that
 * forgets its hero grain should fail here rather than ship flat.
 */

const heroOf = (container) => container.querySelector('section')
const filmOf = (section) =>
  [...section.children].find(
    (el) => el.tagName === 'SPAN' && (el.style.backgroundImage || '').includes('grain-fine'),
  )

const renderRoute = (path, Component) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Component />
    </MemoryRouter>,
  )

describe('every hero band carries grain', () => {
  it.each(PAGES.map((p) => [p.path, p]))('%s', (path, { Component }) => {
    const { container } = renderRoute(path, Component)
    const film = filmOf(heroOf(container))

    expect(film).toBeDefined()
    expect(film.getAttribute('aria-hidden')).toBe('true')
    expect(film.className).toContain('pointer-events-none')
    expect(Number(film.style.opacity)).toBeGreaterThan(0)
    expect(film.style.mixBlendMode).not.toBe('')
  })
})

describe('the film sits under the band it textures', () => {
  it.each(PAGES.map((p) => [p.path, p]))('%s', (path, { Component }) => {
    const { container } = renderRoute(path, Component)
    const hero = heroOf(container)

    /* First in the markup, so everything the band carries paints over it and
       keeps the contrast it was measured at. */
    expect(hero.firstElementChild).toBe(filmOf(hero))
    expect(hero.className).toContain('isolate')
    expect(hero.children.length).toBe(2)
    expect(hero.children[1].textContent.trim().length).toBeGreaterThan(0)
  })
})

describe('grain stops at the hero', () => {
  it.each(PAGES.map((p) => [p.path, p]))('%s', (path, { Component }) => {
    const { container } = renderRoute(path, Component)
    const [, ...rest] = container.querySelectorAll('section')

    /* Only the opening band is grained. Artwork further down the page may carry
       its own film, but never as a band-wide layer. */
    expect(rest.filter((s) => filmOf(s))).toEqual([])
  })
})

describe('every band states its own grain recipe', () => {
  it.each(Object.keys(BAND))('%s', (band) => {
    expect(BAND_GRAIN[band]).toBeDefined()
    expect(BAND_GRAIN[band].blend).toBeTruthy()
    expect(BAND_GRAIN[band].opacity).toBeGreaterThan(0)
  })
})
