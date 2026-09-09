import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Home from './Home.jsx'
import ClientJourney from './ClientJourney.jsx'
import { illustrations } from '../assets/illustrations/manifest.js'

/**
 * SCN-008 — #105 took the handshake off the Meet Vickee hero, where it had been
 * standing in for a Level One drawing the site did not have yet. This file was
 * written to hold its two remaining homes: the homepage's AI-products card and
 * the client journey's Evolve stage.
 *
 * #109 retired the whole ink-sketch treatment, so neither of them draws any
 * more. The file's purpose survives that and inverts. The risk it was written
 * against was that removing an entry's most visible use lets someone later read
 * the entry as unused and delete it, or lets the build stop emitting it and
 * leave silent placeholders on pages nobody was editing. Retiring every use at
 * once makes that risk larger, not smaller — nothing on the site points at this
 * entry now except the two calls left deliberately in place.
 *
 * So: it must not draw, and it must still be built, registered, and named by
 * both call sites, because those two calls are where the follow-up ticket that
 * restores the artwork reads its placement from.
 *
 * The client journey's stage still has to be opened, for the same reason as
 * before: `StageJourney` renders one stage's detail at a time, and the
 * handshake belongs to Evolve, the fourth.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(SRC, p), 'utf8')

const at = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

const handshakeImages = (container) =>
  [...container.querySelectorAll('img')].filter((i) => i.getAttribute('src')?.includes('handshake'))

describe('the handshake is retired but not lost', () => {
  it('is still built and registered', () => {
    expect(illustrations.handshake).toBeDefined()
    expect(illustrations.handshake.src).toMatch(/handshake/)
    expect(illustrations.handshake.srcSet).toMatch(/\s\d+w/)
    expect(illustrations.handshake.alt).toMatch(/hand/i)
  })

  it('is marked retired rather than left as an unfinished placeholder', () => {
    expect(illustrations.handshake.retired).toBe(true)
    expect(illustrations.handshake.placeholder).toBe(false)
  })

  /* The flat `path-handshake` is a different entry and a different treatment,
     and #109 leaves it alone. Asserting it here keeps the two from being
     conflated by a later edit that reads "handshake" and retires both. */
  it('does not take the flat path handshake with it', () => {
    expect(illustrations['path-handshake'].retired).toBeFalsy()
  })

  it('no longer draws on the homepage', () => {
    const { container } = at(<Home />)
    expect(handshakeImages(container)).toHaveLength(0)
  })

  it('no longer draws on the client journey once its stage is opened', async () => {
    const user = userEvent.setup()
    const { container } = at(<ClientJourney />)

    await user.click(screen.getByRole('button', { name: /Evolve/ }))

    expect(handshakeImages(container)).toHaveLength(0)
  })

  /* Opening the stage has to keep working whether or not it draws anything, or
     the assertion above passes for the wrong reason. */
  it('still opens the Evolve stage and shows what it leaves behind', async () => {
    const user = userEvent.setup()
    at(<ClientJourney />)

    await user.click(screen.getByRole('button', { name: /Evolve/ }))

    expect(screen.getAllByText('You leave with:').length).toBeGreaterThan(0)
  })

  it('is still named by both call sites, which is where the restore reads it', () => {
    expect(read('pages/Home.jsx')).toContain("spot: 'handshake'")
    expect(read('components/StageJourney.jsx')).toContain("spot: 'handshake'")
  })
})
