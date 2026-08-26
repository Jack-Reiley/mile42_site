import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Header from './Header.jsx'
import ComingSoon from '../pages/ComingSoon.jsx'

/**
 * #85 — the supplied lockup replaces the text wordmark on the two surfaces that
 * carry the mark.
 *
 * Neither surface had any coverage before this file, so nothing proved either
 * one rendered a mark at all. The scenario worth pinning hardest is SCN-002:
 * the splash heading is now an image, and an `img` with no accessible name
 * inside an `h1` produces a heading a screen reader announces as empty. That is
 * invisible to a screenshot, a build, and every visual pass, which is exactly
 * why it needs a test rather than an eye.
 *
 * Queried by role and accessible name throughout, following Footer.test.jsx, so
 * a restyle or a change of wrapper element does not break these.
 */

const BASENAME = '/working'

const drawHeader = () =>
  render(
    <MemoryRouter basename={BASENAME} initialEntries={[`${BASENAME}/`]}>
      <Header />
    </MemoryRouter>,
  )

describe('SCN-001 — both surfaces carry the brand mark', () => {
  it('gives the header a mark rather than a text wordmark', () => {
    drawHeader()
    const home = screen.getAllByRole('link', { name: 'Mile42' })[0]

    expect(home.querySelector('img')).toBeInTheDocument()
    expect(home).not.toHaveTextContent('Mile42')
  })

  it('gives the splash a mark rather than a text wordmark', () => {
    const { container } = render(<ComingSoon />)

    expect(screen.getByRole('img', { name: 'Mile42' })).toBeInTheDocument()
    expect(container.querySelector('h1')).not.toHaveTextContent('Mile42')
  })
})

describe('SCN-002 — the splash still has a real heading', () => {
  it('exposes a level-one heading', () => {
    render(<ComingSoon />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  /* The whole point of the scenario. A heading whose only child is an image
     with an empty alt has no accessible name, and `getByRole` with a name is
     what fails when that happens. */
  it('announces that heading with the brand name rather than as an empty heading', () => {
    render(<ComingSoon />)
    expect(screen.getByRole('heading', { level: 1, name: 'Mile42' })).toBeInTheDocument()
  })
})

describe('SCN-003 — the mark is sized to land on the device pixel grid', () => {
  /* Rasterization is not observable from the DOM, so what is checked here is
     the precondition the commits reason about: both axes stated, and stated as
     whole numbers in the asset's exact 2:1 ratio. An `auto` axis resolved to
     80.695px, which is what put the ring's hairline off the grid. */
  const wholePixel2to1 = (img) => {
    const w = Number(img.getAttribute('width'))
    const h = Number(img.getAttribute('height'))

    expect(Number.isInteger(w)).toBe(true)
    expect(Number.isInteger(h)).toBe(true)
    expect(w).toBe(h * 2)
  }

  it('states both axes on the header mark', () => {
    drawHeader()
    wholePixel2to1(screen.getAllByRole('link', { name: 'Mile42' })[0].querySelector('img'))
  })

  it('states both axes on the splash mark', () => {
    render(<ComingSoon />)
    wholePixel2to1(screen.getByRole('img', { name: 'Mile42' }))
  })
})

describe('SCN-005 — the splash mark suits the field it sits on', () => {
  /* The splash draws a coloured field, so it takes the light variant. The
     header sits on the page fill and takes the standard one. */
  it('draws the light variant on the splash', () => {
    render(<ComingSoon />)
    expect(screen.getByRole('img', { name: 'Mile42' }).getAttribute('src')).toMatch(/light/)
  })

  it('does not draw the light variant in the header', () => {
    drawHeader()
    const src = screen.getAllByRole('link', { name: 'Mile42' })[0].querySelector('img').getAttribute('src')
    expect(src).not.toMatch(/light/)
  })
})

describe('the header mark is still the way home', () => {
  it('links to the home route, carrying the basename', () => {
    drawHeader()
    /* `to="/"` under a basename renders as the basename itself, with no
       trailing slash, which is what the router emits for the index route. */
    expect(screen.getAllByRole('link', { name: 'Mile42' })[0].getAttribute('href')).toBe(BASENAME)
  })
})
