import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Home from './Home.jsx'
import AgenticAi from './AgenticAi.jsx'
import AiProducts from './AiProducts.jsx'

/**
 * Dewey shipped in #58 as a page nothing else on the site pointed at. This is
 * the contract for the three entry points that fix that.
 *
 * One suite across three pages rather than three per-page files, because the
 * behavior under test is a single claim — Dewey is reachable from the places a
 * reader forms their picture of what the firm builds — and splitting it would
 * scatter one contract across three files that each assert a third of it.
 *
 * The basename is reproduced for the same reason Footer.test.jsx reproduces it:
 * the site mounts under /working, so a link that resolved without the prefix
 * would pass a naive assertion and 404 in the browser. See main.jsx.
 */

const BASENAME = '/working'
const DEWEY = `${BASENAME}/meet-dewey`

const draw = (Page) =>
  render(
    <MemoryRouter basename={BASENAME} initialEntries={[`${BASENAME}/`]}>
      <Page />
    </MemoryRouter>,
  )

const href = (name) => screen.getByRole('link', { name }).getAttribute('href')

describe('SCN-001 — the homepage carries a Dewey block in position', () => {
  /* Two failure modes this guards against, both of which the block has already
     had. Leading with the library metaphor told a first-time reader nothing.
     Leading with "Dewey is the knowledge layer" explained the product but spoke
     to an engineer rather than the person who signs. The block has to open on
     the reader's problem and still say plainly what Dewey is. */
  it('opens on the buyer problem rather than on the product category', () => {
    draw(Home)
    expect(screen.getByText(/Most AI pilots stall in the same place/i)).toBeInTheDocument()
    expect(screen.getByText(/security review ended the conversation/i)).toBeInTheDocument()
  })

  it('still says plainly what Dewey is', () => {
    draw(Home)
    expect(screen.getByText(/Dewey is the knowledge layer/i)).toBeInTheDocument()
    expect(screen.getByText(/indexes it automatically/i)).toBeInTheDocument()
  })

  it('shows the four supporting points', () => {
    draw(Home)
    expect(screen.getByText('Your systems of record stay sealed.')).toBeInTheDocument()
    expect(
      screen.getByText('Security review has something it can approve.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Every project after the first starts ahead.'),
    ).toBeInTheDocument()
    expect(screen.getByText('One answer, not one per agent.')).toBeInTheDocument()
  })

  /* Position is behavior here, not styling: the block has to land after the
     practice argument that motivates it and before the page stops asking for
     anything. */
  it('sits after the core practice band and before the closing call to action', () => {
    const { container } = draw(Home)
    const bands = [...container.querySelectorAll('section')]
    const practice = bands.findIndex((b) => b.textContent.includes('Our core practice'))
    const dewey = bands.findIndex((b) => b.textContent.includes('Most AI pilots stall'))
    const closing = bands.findIndex((b) => b.textContent.includes('Tell us what needs to work.'))

    expect(practice).toBeGreaterThan(-1)
    expect(dewey).toBe(practice + 1)
    expect(closing).toBe(dewey + 1)
  })

  /* Caught in the browser, not by a unit test: RuledGroup defaults its title to
     h4, which is right on the pages that put an h3 list heading above their
     columns and wrong here, where the band's h2 is the only heading above. The
     rendered outline went h2 straight to h4. */
  it('keeps the heading outline unbroken inside the block', () => {
    const { container } = draw(Home)
    const band = [...container.querySelectorAll('section')].find((b) =>
      b.textContent.includes('Most AI pilots stall'),
    )
    const levels = [...band.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
      Number(h.tagName[1]),
    )

    expect(levels[0]).toBe(2)
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
    }
  })
})

describe('SCN-002 — the homepage block leads to the Dewey page', () => {
  it('points its call to action at the Dewey route, carrying the basename', () => {
    draw(Home)
    expect(href('Meet Dewey')).toBe(DEWEY)
  })
})

describe('SCN-003 — the Agentic AI page points to Dewey', () => {
  it('offers the link inside the capability band that claims retrieval work', () => {
    const { container } = draw(AgenticAi)
    const band = [...container.querySelectorAll('section')].find((b) =>
      b.textContent.includes('RAG and knowledge systems'),
    )
    expect(band).toBeDefined()
    expect(
      within(band).getByRole('link', { name: /Meet Dewey/ }).getAttribute('href'),
    ).toBe(DEWEY)
  })
})

describe('SCN-004 — the AI-driven Products page describes Dewey and links to it', () => {
  it('describes Dewey as a product of the firm, the way Blink Social already is', () => {
    const { container } = draw(AiProducts)
    const panel = [...container.querySelectorAll('section')].find((b) =>
      b.textContent.includes('Blink Social'),
    )
    expect(panel).toBeDefined()
    expect(panel.textContent).toMatch(/Dewey, our knowledge layer for AI agents/)
  })

  it('points its link at the Dewey route', () => {
    draw(AiProducts)
    expect(href('Meet Dewey')).toBe(DEWEY)
  })
})

describe('SCN-006 — every new entry point is real, keyboard reachable navigation', () => {
  /* An anchor with an href is focusable and activatable by construction. What
     is worth asserting is that these are anchors at all rather than click
     handlers on something else, and that each one names Dewey so the
     destination is clear out of context. */
  it.each([
    ['the homepage', Home],
    ['the Agentic AI page', AgenticAi],
    ['the AI-driven Products page', AiProducts],
  ])('renders %s entry point as a link that names Dewey', (_label, Page) => {
    draw(Page)
    const link = screen.getByRole('link', { name: /Meet Dewey/ })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', DEWEY)
    expect(link).not.toHaveAttribute('aria-disabled')
  })
})
