import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { render, screen, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from '../App.jsx'

/**
 * #122 SCN-007 — Meet Vickee gains a section panel so the controls page can
 * sit under it, the way Agentic AI sits under Engineering.
 *
 * Rendered through App rather than Header alone so the panel's ids and the
 * route's `aria-current` behave as they do on the site. The header is
 * otherwise covered where its copy is a page's contract
 * (phase-zero-commercial-line.test.jsx) and by the copy-rules walk.
 */

/* jsdom has no matchMedia. The header asks it whether hovering is real; false
   keeps these on the click path a touch device takes. */
beforeAll(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })
})

afterEach(cleanup)

const at = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

/* The desktop caret and the drawer's drill-in carry the same accessible name;
   the drawer is not rendered until Menu is activated, so the desktop one is
   always first. */
const vickeeMenus = () => screen.getAllByRole('button', { name: 'Meet Vickee menu' })

describe('the header offers Controls under Meet Vickee', () => {
  it('keeps the label as a link to the overview and opens a panel from the caret', async () => {
    const user = userEvent.setup()
    at('/')
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(nav).getByRole('link', { name: 'Meet Vickee' }).getAttribute('href')).toBe('/meet-vickee')

    const caret = vickeeMenus()[0]
    expect(caret).toHaveAttribute('aria-expanded', 'false')
    await user.click(caret)
    expect(caret).toHaveAttribute('aria-expanded', 'true')

    const panel = document.getElementById(caret.getAttribute('aria-controls'))
    expect(panel).not.toBeNull()
    /* Eyebrow and title are one link, so the name runs them together. */
    const controls = within(panel).getByRole('link', { name: /Controls$/ })
    expect(controls.getAttribute('href')).toBe('/meet-vickee/controls')
    expect(within(panel).getByText('Start here')).toBeInTheDocument()
    expect(within(panel).getByRole('link', { name: 'Meet Vickee' }).getAttribute('href')).toBe('/meet-vickee')
  })

  it('lists the same Controls link when the drawer drills into Meet Vickee', async () => {
    const user = userEvent.setup()
    at('/')
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    await user.click(vickeeMenus().at(-1))

    const drawer = document.getElementById('mobile-nav')
    const controls = within(drawer).getByRole('link', { name: /Controls$/ })
    expect(controls.getAttribute('href')).toBe('/meet-vickee/controls')
    expect(within(drawer).getByRole('link', { name: 'Meet Vickee' }).getAttribute('href')).toBe('/meet-vickee')
  })

  it('does not put the Controls link in the panels of the other sections', async () => {
    const user = userEvent.setup()
    at('/')
    for (const name of ['What we do menu', 'How we work menu']) {
      const caret = screen.getAllByRole('button', { name })[0]
      await user.click(caret)
      const panel = document.getElementById(caret.getAttribute('aria-controls'))
      expect(within(panel).queryByRole('link', { name: /Controls$/ })).toBeNull()
      await user.click(caret)
    }
  })
})
