import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import Home from './Home.jsx'
import ClientJourney from './ClientJourney.jsx'
import { illustrations } from '../assets/illustrations/manifest.js'

/**
 * SCN-008 — #105 took the handshake off the Meet Dewey hero, where it had been
 * standing in for a Level One drawing the site did not have yet.
 *
 * It still has two homes: the homepage's AI-products card and the client
 * journey's Evolve stage. Neither changed, which is exactly why they are worth
 * asserting — the risk of removing an entry's most visible use is that someone
 * later reads the entry as unused and deletes it, or that the build stops
 * emitting it and two silent placeholders appear on pages nobody was editing.
 *
 * Asserted on `src` rather than on an accessible name because both remaining
 * uses sit inside a label that already says what they say, so the artwork is
 * decorative and carries an empty alt by design.
 *
 * The client journey's stage has to be opened first. `StageJourney` renders one
 * stage's detail at a time, and the handshake belongs to Evolve, the fourth.
 */

const at = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

const handshakeImages = (container) =>
  [...container.querySelectorAll('img')].filter((i) => i.getAttribute('src')?.includes('handshake'))

describe('the handshake keeps its remaining homes', () => {
  it('is still built and registered', () => {
    expect(illustrations.handshake).toBeDefined()
    expect(illustrations.handshake.src).toMatch(/handshake/)
    expect(illustrations.handshake.srcSet).toMatch(/\s\d+w/)
  })

  it('still draws on the homepage', () => {
    const { container } = at(<Home />)
    expect(handshakeImages(container).length).toBeGreaterThan(0)
  })

  it('still draws on the client journey once its stage is opened', async () => {
    const user = userEvent.setup()
    const { container } = at(<ClientJourney />)

    await user.click(screen.getByRole('button', { name: /Evolve/ }))

    expect(handshakeImages(container).length).toBeGreaterThan(0)
  })
})
