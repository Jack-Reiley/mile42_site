import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import WhyMile42 from './WhyMile42.jsx'

/**
 * Why Mile42 carried a four-commitment "doctrine" block that spoke about the
 * firm rather than to the reader. It is replaced by proof: no client case
 * studies exist and none are written, so the section shows what the firm has
 * actually built, plus the tooling that built this site.
 */

const draw = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <WhyMile42 />
    </MemoryRouter>,
  )

const proofSection = () =>
  screen.getByRole('heading', { level: 2, name: 'What we have built.' }).closest('section')

describe('SCN-001 — the proof section names the three things built', () => {
  it('titles the three blocks as h3s under the section h2', () => {
    draw()
    const section = proofSection()
    const titles = within(section)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
    expect(titles).toEqual(['Vickee', 'Blink Social', 'This website'])
  })

  it('links Vickee and this website, and leaves Blink Social unlinked', () => {
    draw()
    const section = proofSection()
    expect(within(section).getByRole('link', { name: /Meet Vickee/ })).toHaveAttribute('href', '/meet-vickee')
    expect(within(section).getByRole('link', { name: /See the delivery model/ })).toHaveAttribute(
      'href',
      '/how-we-work/delivery-model',
    )
    expect(within(section).getAllByRole('link')).toHaveLength(2)
  })

  /* The figures are read from the repository, not estimated. The test pins
     the shape so a rewrite cannot drop the numbers without noticing. */
  it('states real figures for this website', () => {
    draw()
    const body = screen.getByText(/So far that is \d+ pull requests in under six weeks\./)
    expect(body).not.toHaveTextContent(/requirements contracts/)
    expect(body).not.toHaveTextContent(/Three people opened/)
  })
})

describe('SCN-002 — the tooling list carries the agreed rows', () => {
  it('lists the four tooling rows in order', () => {
    draw()
    const section = proofSection()
    expect(within(section).getByText('Tooling')).toBeInTheDocument()
    const terms = within(section).getAllByRole('term').map((t) => t.textContent)
    expect(terms).toEqual(['Models', 'Engineering', 'Coordination', 'Knowledge'])
    const definitions = within(section).getAllByRole('definition').map((d) => d.textContent)
    expect(definitions).toEqual([
      'Claude · Codex · GrokBot',
      'GitHub · React',
      'Slack · custom agentic workflows and integrations',
      'Vickee',
    ])
  })
})

describe('SCN-003 — the doctrine block is gone', () => {
  it('no longer renders the doctrine heading, intro, or commitments', () => {
    draw()
    expect(screen.queryByRole('heading', { name: 'Our doctrine.' })).toBeNull()
    expect(screen.queryByText(/Four commitments define the firm/)).toBeNull()
    expect(screen.queryByText(/Better customer outcomes are our/)).toBeNull()
    expect(screen.queryByText(/Your increased capabilities are our/)).toBeNull()
  })

  it('places the proof section between the hero and the engagements section', () => {
    draw()
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings.indexOf('What we have built.')).toBe(0)
    expect(headings[1]).toBe('Our engagements are built around your outcomes.')
  })
})
