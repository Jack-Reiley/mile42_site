import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from '../App.jsx'

/**
 * Phase Zero's commercial line, pinned across every surface that states it.
 *
 * The site once said the offering was free on four surfaces and priced it on a
 * fifth, because the page was rebuilt and the entry points into it were not.
 * The failure mode is not one wrong sentence, it is five sentences drifting
 * apart, so they are asserted together in one file rather than each beside its
 * own page.
 *
 * Every assertion is scoped to the surface it is about. A document-wide ban on
 * the word would be wrong: How We Work argues "the claim is free" about cheap
 * talk and Why Mile42 says information is becoming "nearly free", and neither
 * is a commercial claim about Phase Zero. Those two are pinned as untouched so
 * a future tightening of this guard cannot quietly rewrite them.
 */

/* The pages carry the full sentence; the nav card carries the short form the
   248px panel column has room for. Both say the same thing, and both are
   pinned, because a card that keeps the words while losing the posture is the
   drift this file exists to catch. */
const LINE = /priced to be a decision, not an investment/i
const CARD_LINE = /The low-risk way in, priced to be a decision\./
const FREE = /\bfree\b/i
const COSTS_NOTHING = /cost(s)? nothing/i

/* jsdom implements no media queries and no matchMedia. The header asks it
   whether hovering is real before opening a panel on hover, and userEvent's
   pointer movement reaches that handler, so the query has to answer something.
   False: these tests click, which is the path a touch device takes too. */
beforeAll(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })
})

const at = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

const main = () => within(screen.getByRole('main'))

/* The desktop trigger and the drawer's drill-in button carry the same
   accessible name. The drawer is not rendered until Menu is activated, so
   before that there is one and after it there are two, the drawer's last. */
const sectionMenus = () => screen.getAllByRole('button', { name: 'What we do menu' })

describe('the header panel states the priced line', () => {
  it('offers Phase Zero without calling it free', async () => {
    const user = userEvent.setup()
    at('/')
    await user.click(sectionMenus()[0])

    /* Eyebrow and title are one link, so the name runs them together. */
    const card = screen.getByRole('link', { name: /Not sure where to start.*Phase Zero/ })
    const column = card.closest('div')
    expect(within(column).getByText(CARD_LINE)).toBeInTheDocument()
    expect(within(column).queryByText(FREE)).toBeNull()
  })
})

describe('the mobile drawer states the same line', () => {
  it('carries the desktop card body verbatim', async () => {
    const user = userEvent.setup()
    at('/')
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    await user.click(sectionMenus().at(-1))

    /* Both navs are labelled Primary; the drawer is the one that just opened. */
    const drawer = within(screen.getAllByRole('navigation', { name: 'Primary' }).at(-1))
    expect(drawer.getByText(CARD_LINE)).toBeInTheDocument()
    expect(drawer.queryByText(FREE)).toBeNull()
  })
})

describe('the pages that point at Phase Zero state the priced line', () => {
  it.each([
    ['/', 'the homepage panel'],
    ['/what-we-do', 'the What We Do band'],
  ])('%s states it and does not call the offering free', (path) => {
    at(path)
    expect(main().getByText(LINE)).toBeInTheDocument()
    expect(main().queryByText(FREE)).toBeNull()
  })
})

describe('the engagement model argues the first engagement', () => {
  /* The page's argument, not its wording. It used to rest on the engagement
     costing nothing; it now rests on who carries the risk of an estimate made
     before there is a baseline to argue a price from. Both halves are pinned,
     because the first alone is a price with no reason behind it. */
  it('prices the first engagement as a decision and says who carries the risk', () => {
    at('/how-we-work/engagement-model')
    expect(main().getByText(/the first engagement is priced to be a decision/i))
      .toBeInTheDocument()
    expect(main().getByText(/the risk of an unproven estimate is ours to carry/i))
      .toBeInTheDocument()
  })

  it('no longer claims the first engagement can cost nothing', () => {
    at('/how-we-work/engagement-model')
    expect(main().queryByText(FREE)).toBeNull()
    expect(main().queryByText(COSTS_NOTHING)).toBeNull()
  })
})

describe('the Phase Zero page itself', () => {
  it('closes on the priced line', () => {
    at('/what-we-do/phase-zero')
    expect(
      main().getByRole('heading', { name: 'Priced to be a decision, not an investment.' }),
    ).toBeInTheDocument()
  })
})

/**
 * The credit against later work is implied everywhere and stated nowhere. The
 * design handoff asks for that on the Phase Zero page, and stating it on one
 * surface only would put the site back where it started, saying two different
 * things about the same offer.
 */
describe('the credit against later work', () => {
  it.each([
    '/',
    '/what-we-do',
    '/what-we-do/phase-zero',
    '/how-we-work/engagement-model',
  ])('is not stated on %s', (path) => {
    at(path)
    expect(main().queryByText(/credit(ed)? (it |the (pilot|fee|cost) )?(back |off )?against/i))
      .toBeNull()
    expect(main().queryByText(/comes off (the price of |what you )?(later|future)/i)).toBeNull()
  })
})

/**
 * The two non-commercial uses of the word, pinned as untouched. Neither is
 * about Phase Zero, and a guard that swept them up would be a worse bug than
 * the one this file exists to prevent.
 */
describe('the non-commercial uses of the word survive', () => {
  it('How We Work still contrasts a free claim with what is not free', () => {
    at('/how-we-work')
    expect(main().getByText(/The claim is free\. What is not free is describing/))
      .toBeInTheDocument()
  })

  it('Why Mile42 still says information is becoming nearly free', () => {
    at('/why-mile42')
    expect(main().getByText(/nearly free/)).toBeInTheDocument()
  })
})
