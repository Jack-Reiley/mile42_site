import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Home from './Home.jsx'
import AgenticAi from './AgenticAi.jsx'
import AiProducts from './AiProducts.jsx'

/**
 * Vickee shipped in #58 as a page nothing else on the site pointed at. This is
 * the contract for the three entry points that fix that.
 *
 * One suite across three pages rather than three per-page files, because the
 * behavior under test is a single claim — Vickee is reachable from the places a
 * reader forms their picture of what the firm builds — and splitting it would
 * scatter one contract across three files that each assert a third of it.
 *
 * Links are asserted at the root, which is where #97 mounted the site. See
 * Footer.test.jsx for what that cost and src/go-live.test.jsx for the sweep
 * that replaces it.
 */

const VICKEE = '/meet-vickee'

const draw = (Page) =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Page />
    </MemoryRouter>,
  )

const href = (name) => screen.getByRole('link', { name }).getAttribute('href')

describe('SCN-001 — the homepage carries a Vickee block in position', () => {
  /* Three failure modes this guards against, all of which the block has had.
     Leading with the library metaphor told a first-time reader nothing.
     Leading with "Vickee is the knowledge layer" explained the product but
     spoke to an engineer rather than the person who signs. Leading with the
     name put the product ahead of the benefit. The heading is what the buyer
     gets to decide and to show security; the body is where the name appears
     and says plainly what Vickee is. */
  it('leads on the benefit and names Vickee in the body', () => {
    draw(Home)
    // h3, not h2: the band's h2 is the objections this panel sits under.
    const heading = screen.getByRole('heading', { level: 3, name: /audit trail/i })
    expect(heading).toHaveTextContent('Decide what your agents are allowed to know.')

    const body = screen.getByText(/Vickee holds a governed, read-only copy/i)
    expect(body).toHaveTextContent(/indexes it automatically/i)
    expect(body).toHaveTextContent(/Agents never hold credentials to your systems of record/i)
  })

  /* The stalled-pilot story moved up into the hero, so the panel no longer
     repeats it. Pinned as an absence so it does not drift back in. */
  it('no longer repeats the stalled-project story the hero now carries', () => {
    draw(Home)
    expect(screen.queryByText(/Most AI projects stall in the same place/i)).toBeNull()
    expect(screen.queryByText(/security review ended the conversation/i)).toBeNull()
  })

  /* The count is asserted, not just the two titles. SCN-001 names a number, and
     an existence check passes just as happily with a third point added, which is
     how the block came to carry two against a contract asking for three. */
  it('shows the two supporting points the diagram cannot make', () => {
    draw(Home)
    expect(
      screen.getByText('Security review has something it can approve.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Every project after the first starts ahead.'),
    ).toBeInTheDocument()

    const panel = screen.getByRole('heading', { level: 3, name: /audit trail/i }).closest('div')
    expect(within(panel).getAllByRole('heading', { level: 4 })).toHaveLength(2)
  })

  /* The catalog drawer carries the sealed-sources and shared-source arguments
     now. It is one `role="img"`, so its parts are deliberately not separate
     nodes in the accessibility tree; the label is the contract. */
  it('presents the catalog drawer as one labelled image', () => {
    draw(Home)
    const diagram = screen.getByRole('img', { name: /card catalog drawer/i })
    expect(diagram).toHaveTextContent('CMS & CDP')
    expect(diagram).toHaveTextContent('CRM & marketing')
    expect(diagram).toHaveTextContent('Analytics')
    expect(diagram).not.toHaveTextContent('ERP & finance')
    expect(diagram).not.toHaveTextContent('Marketing & CRM')
    expect(diagram).toHaveTextContent('Never any credentials')
    expect(diagram).toHaveTextContent('Agents never reach the sources')
  })

  /* The objections and the product that answers the second of them are one
     band. A reader who meets Vickee without them has no idea why this firm
     would have built one. */
  it('keeps the objections in the same band as the product', () => {
    const { container } = draw(Home)
    const band = [...container.querySelectorAll('section')].find((b) =>
      b.textContent.includes('Decide what your agents are allowed to know'),
    )
    expect(band.textContent).toContain('Our AI pilot never made it to production.')
    expect(band.textContent).toContain('Security will not let agents touch our systems of record.')
    // The honesty note survived the rewrite as the third objection. The
    // "opportunity is AI" landing line did not: it was cut deliberately, so
    // this asserts it stays gone rather than drifting back in.
    expect(band.textContent).toContain('when the answer is not an agent')
    expect(band.textContent).not.toContain('The opportunity is AI')
  })

  /* Position is behavior here, not styling: the block has to land inside the
     objections that motivate it, and those are the first thing a reader meets
     after the hero and the line naming who the page is for.

     #60 pinned this to the band immediately before the closing call to action,
     which was where the practice band sat at the time. The homepage restructure
     moved that band to the front, so what this scenario pins is the band's
     place in the page order rather than its distance from the end. */
  it('sits in the band the hero and the buyer line hand off to', () => {
    const { container } = draw(Home)
    const bands = [...container.querySelectorAll('section')]
    const vickee = bands.findIndex((b) => b.textContent.includes('Decide what your agents are allowed to know'))

    /* Two, not one. The one-sentence buyer line sits between the hero and the
       objections band that carries Vickee. Vickee is still in the opening run
       of the page rather than filed near the end, which is what #60 was
       protecting. */
    expect(vickee).toBe(2)
    expect(bands[0].textContent).toContain('Most AI pilots never make it past the demo')
    expect(bands.at(-1).textContent).toContain('Name the process.')
  })

  /* Caught in the browser, not by a unit test: RuledGroup defaults its title to
     h4, which is right on the pages that put an h3 list heading above their
     columns and wrong here, where the band's h2 is the only heading above. The
     rendered outline went h2 straight to h4. */
  it('keeps the heading outline unbroken inside the block', () => {
    const { container } = draw(Home)
    const band = [...container.querySelectorAll('section')].find((b) =>
      b.textContent.includes('Decide what your agents are allowed to know'),
    )
    const levels = [...band.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
      Number(h.tagName[1]),
    )

    expect(levels[0]).toBe(2)
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
    }
  })

  /* The second objection links to Vickee too. That link names Vickee without
     the word Meet, so the button below the panel stays the one "Meet Vickee"
     link on the page and SCN-002 and SCN-006 keep a single target. */
  it('links the security objection to Vickee under its own name', () => {
    draw(Home)
    expect(href('How Vickee answers security')).toBe(VICKEE)
  })
})

describe('SCN-002 — the homepage block leads to the Vickee page', () => {
  it('points its call to action at the Vickee route, carrying the basename', () => {
    draw(Home)
    expect(href('Meet Vickee')).toBe(VICKEE)
  })
})

describe('SCN-003 — the Agentic AI page points to Vickee', () => {
  it('offers the link inside the capability band that claims retrieval work', () => {
    const { container } = draw(AgenticAi)
    const band = [...container.querySelectorAll('section')].find((b) =>
      b.textContent.includes('RAG and knowledge systems'),
    )
    expect(band).toBeDefined()
    expect(
      within(band).getByRole('link', { name: /Meet Vickee/ }).getAttribute('href'),
    ).toBe(VICKEE)
  })
})

describe('SCN-004 — the AI-driven Products page describes Vickee and links to it', () => {
  it('describes Vickee as a product of the firm, the way Blink Social already is', () => {
    const { container } = draw(AiProducts)
    const panel = [...container.querySelectorAll('section')].find((b) =>
      b.textContent.includes('Blink Social'),
    )
    expect(panel).toBeDefined()
    expect(panel.textContent).toMatch(/Vickee, our knowledge layer for AI agents/)
  })

  it('points its link at the Vickee route', () => {
    draw(AiProducts)
    expect(href('Meet Vickee')).toBe(VICKEE)
  })
})

describe('SCN-006 — every new entry point is real, keyboard reachable navigation', () => {
  /* An anchor with an href is focusable and activatable by construction. What
     is worth asserting is that these are anchors at all rather than click
     handlers on something else, and that each one names Vickee so the
     destination is clear out of context. */
  it.each([
    ['the homepage', Home],
    ['the Agentic AI page', AgenticAi],
    ['the AI-driven Products page', AiProducts],
  ])('renders %s entry point as a link that names Vickee', (_label, Page) => {
    draw(Page)
    const link = screen.getByRole('link', { name: /Meet Vickee/ })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', VICKEE)
    expect(link).not.toHaveAttribute('aria-disabled')
  })
})
