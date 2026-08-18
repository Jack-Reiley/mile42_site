import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Footer from './Footer.jsx'

/**
 * The footer mixes in-app routes with one address that leaves the app. The
 * basename is the thing worth reproducing here: every internal link must carry
 * it and the mailto: must not, which is the failure a render without one would
 * hide. See main.jsx for why the site is mounted under /working.
 */

const BASENAME = '/working'

const draw = () =>
  render(
    <MemoryRouter basename={BASENAME} initialEntries={[`${BASENAME}/`]}>
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
    expect(href('Start a conversation')).toBe(`${BASENAME}/contact`)
    expect(href('LinkedIn')).toBe(`${BASENAME}/contact`)
    expect(href('Advisory')).toBe(`${BASENAME}/what-we-do/advisory`)
    expect(href('Privacy')).toBe(`${BASENAME}/legal/privacy`)
  })

  it('leaves no footer link pointing at a route that was never resolved', () => {
    draw()
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).toMatch(
        new RegExp(`^(${BASENAME}/|mailto:)`),
      )
    }
  })
})
