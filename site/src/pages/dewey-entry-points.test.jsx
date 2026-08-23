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
  it('names Dewey and states what Dewey does', () => {
    draw(Home)
    expect(screen.getByText('Every agent needs a library.')).toBeInTheDocument()
    expect(
      screen.getByText(/organizes, indexes, and surfaces your data/i),
    ).toBeInTheDocument()
  })

  it('shows the three supporting points', () => {
    draw(Home)
    expect(screen.getByText('Upload is the whole pipeline.')).toBeInTheDocument()
    expect(screen.getByText('The right search for the moment.')).toBeInTheDocument()
    expect(screen.getByText('Answers, not credentials.')).toBeInTheDocument()
  })

  /* Position is behavior here, not styling: the block has to land after the
     practice argument that motivates it and before the page stops asking for
     anything. */
  it('sits after the core practice band and before the closing call to action', () => {
    const { container } = draw(Home)
    const bands = [...container.querySelectorAll('section')]
    const practice = bands.findIndex((b) => b.textContent.includes('Our core practice'))
    const dewey = bands.findIndex((b) => b.textContent.includes('Every agent needs a library.'))
    const closing = bands.findIndex((b) => b.textContent.includes('Tell us what needs to work.'))

    expect(practice).toBeGreaterThan(-1)
    expect(dewey).toBe(practice + 1)
    expect(closing).toBe(dewey + 1)
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
