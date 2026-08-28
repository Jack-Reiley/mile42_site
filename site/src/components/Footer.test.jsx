import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Footer from './Footer.jsx'

/**
 * The footer mixes in-app routes with one address that leaves the app, and the
 * separation between them is what this covers: the mailto: must stay an
 * address while every other link stays a route.
 *
 * #97 mounted the site at the root, so these render unprefixed. That cost this
 * file some of its reach — under the old /working mount a resolved route and a
 * stray raw anchor looked different, and now they do not. The requirements
 * document records that; the prefix sweep in src/go-live.test.jsx is what
 * stands in its place.
 */

const draw = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Footer />
    </MemoryRouter>,
  )

const href = (name) => screen.getByRole('link', { name }).getAttribute('href')

describe('SCN-005 — the footer email link leaves the app', () => {
  it('points the email link at the address, unprefixed by the basename', () => {
    draw()
    expect(href('Email')).toBe('mailto:hello@mile42.ai')
  })

  it('still routes every other footer link inside the app', () => {
    draw()
    expect(href('Start a conversation')).toBe('/contact')
    expect(href('LinkedIn')).toBe('/contact')
    expect(href('Advisory')).toBe('/what-we-do/advisory')
    expect(href('Privacy')).toBe('/legal/privacy')
  })

  it('leaves no footer link pointing at a route that was never resolved', () => {
    draw()
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).toMatch(/^(\/|mailto:)/)
    }
  })
})
