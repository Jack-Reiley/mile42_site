import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Header from './Header.jsx'

/**
 * #85 — the supplied lockup replaces the text wordmark on the surfaces that
 * carry the mark.
 *
 * The header had no coverage before this file, so nothing proved it rendered a
 * mark at all.
 *
 * #97 retired the coming-soon splash, which was the other surface. The
 * scenarios that covered it went with it: SCN-002 was splash-only, and SCN-001,
 * SCN-003, and SCN-005 kept their header halves. Nothing here lost coverage of
 * a surface that still exists.
 *
 * Queried by role and accessible name throughout, following Footer.test.jsx, so
 * a restyle or a change of wrapper element does not break these.
 */

const drawHeader = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>,
  )

describe('SCN-001 — the header carries the brand mark', () => {
  it('gives the header a mark rather than a text wordmark', () => {
    drawHeader()
    const home = screen.getAllByRole('link', { name: 'Mile42' })[0]

    expect(home.querySelector('img')).toBeInTheDocument()
    expect(home).not.toHaveTextContent('Mile42')
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
})

describe('SCN-005 — the header mark suits the field it sits on', () => {
  /* The header sits on the page fill and takes the standard variant. The light
     variant was the splash's, and #97 retired that surface. */
  it('does not draw the light variant in the header', () => {
    drawHeader()
    const src = screen.getAllByRole('link', { name: 'Mile42' })[0].querySelector('img').getAttribute('src')
    expect(src).not.toMatch(/light/)
  })
})

describe('the header mark is still the way home', () => {
  it('links to the home route', () => {
    drawHeader()
    expect(screen.getAllByRole('link', { name: 'Mile42' })[0].getAttribute('href')).toBe('/')
  })
})
