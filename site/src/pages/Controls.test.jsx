import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Controls from './Controls.jsx'
import { PAGES } from '../App.jsx'

/**
 * #122 — the controls page, written for the person who has to explain an
 * agent's controls to an external auditor.
 *
 * The contract is the copy: which five controls, in what order, each with a
 * table whose rows name a control, say how it works, and name the evidence.
 * The honesty block has to come before any of it. jsdom has no layout, so the
 * table's own horizontal scroll and the band contrast are checked in the
 * browser pass the requirements document records.
 */

const draw = () =>
  render(
    <MemoryRouter initialEntries={['/meet-vickee/controls']}>
      <Controls />
    </MemoryRouter>,
  )

const bands = (container) => [...container.querySelectorAll('section')]

const HONESTY =
  'Vickee has not been through a third-party audit, and Mile42 does not yet hold a security certification. What follows is what can be evidenced today, control by control. Where something is a configuration your team chooses rather than a default, it says so.'

const CONTROLS = [
  'Access control',
  'Change control and separation of duties',
  'Logging and evidence',
  'Monitoring and review',
  'When it is wrong',
]

const COLUMNS = ['Control', 'How it works', 'Evidence you receive']

describe('SCN-001 — the controls page is reachable at its own route', () => {
  it('is in the route table with its tab title', () => {
    const page = PAGES.find((p) => p.path === '/meet-vickee/controls')
    expect(page).toBeDefined()
    expect(page.title).toBe('How agents are controlled · Mile42')
    expect(page.Component).toBe(Controls)
  })

  it('renders one h1 and a breadcrumb back to Meet Vickee', () => {
    draw()
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent('How agents are controlled.')

    const crumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(within(crumb).getByRole('link', { name: 'Meet Vickee' }).getAttribute('href')).toBe('/meet-vickee')
    expect(within(crumb).getByText('Controls')).toHaveAttribute('aria-current', 'page')
  })
})

describe('SCN-002 — the honesty block comes before every control', () => {
  it('is the first paragraph after the header band, and no h2 precedes it', () => {
    const { container } = draw()
    const honesty = bands(container)[1].querySelector('p')
    expect(honesty.textContent).toBe(HONESTY)

    const firstH2 = container.querySelector('h2')
    expect(honesty.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(bands(container)[1].querySelector('h2')).toBeNull()
  })
})

describe('SCN-003 — five controls, in order, each with a table', () => {
  it('names the five h2s between the honesty block and the closing band', () => {
    const { container } = draw()
    const h2s = [...container.querySelectorAll('h2')].map((h) => h.textContent)
    expect(h2s.slice(0, 5)).toEqual(CONTROLS)
    expect(h2s).toHaveLength(6)
  })

  it.each(CONTROLS)('%s is followed by one lead and one table with the three columns', (name) => {
    draw()
    const band = screen.getByRole('heading', { level: 2, name }).closest('section')
    const leads = band.querySelectorAll(':scope > div > p')
    expect(leads).toHaveLength(1)
    expect(leads[0].textContent.length).toBeGreaterThan(0)

    const tables = within(band).getAllByRole('table')
    expect(tables).toHaveLength(1)
    expect(within(tables[0]).getAllByRole('columnheader').map((th) => th.textContent)).toEqual(COLUMNS)
  })

  it('gives every row a control, a mechanism, and an evidence', () => {
    draw()
    for (const table of screen.getAllByRole('table')) {
      const rows = [...table.querySelectorAll('tbody tr')]
      expect(rows.length).toBeGreaterThanOrEqual(2)
      for (const row of rows) {
        const control = row.querySelector('th[scope="row"]')
        const cells = row.querySelectorAll('td')
        expect(control.textContent.trim().length).toBeGreaterThan(0)
        expect(cells).toHaveLength(2)
        for (const cell of cells) expect(cell.textContent.trim().length).toBeGreaterThan(0)
      }
    }
  })
})

describe('SCN-004 — the tables say what is a choice and what is a practice', () => {
  const rowsOf = (name) => {
    const band = screen.getByRole('heading', { level: 2, name }).closest('section')
    return [...band.querySelectorAll('tbody tr')].map((tr) => ({
      control: tr.querySelector('th').textContent,
      how: tr.querySelectorAll('td')[0].textContent,
    }))
  }

  it('says writeback is off or gated, and that which one is a setting your team chooses', () => {
    draw()
    const row = rowsOf('Change control and separation of duties').find((r) => /writeback/i.test(r.control))
    expect(row.how).toMatch(/off, or gated by a named approver/)
    expect(row.how).toMatch(/a setting your team chooses/)
  })

  it.each([
    ['Monitoring and review', ['Continuous evaluation', 'Review cadence', 'Route for bad outputs']],
    ['When it is wrong', ['Named accountability']],
  ])('opens every engagement-practice row in %s with the same phrase', (name, practices) => {
    draw()
    const rows = rowsOf(name)
    for (const control of practices) {
      const row = rows.find((r) => r.control === control)
      expect(row, control).toBeDefined()
      expect(row.how).toMatch(/^Set up during the engagement:/)
    }
    // And no product row borrows the phrase.
    for (const row of rows.filter((r) => !practices.includes(r.control))) {
      expect(row.how).not.toMatch(/^Set up during the engagement:/)
    }
  })
})

describe('SCN-005 — the closing band invites the reader’s own framework', () => {
  it('closes on the heading, the lead, and a button to Contact', () => {
    const { container } = draw()
    const last = bands(container).at(-1)
    expect(last.querySelector('h2')).toHaveTextContent('Bring your control framework.')
    expect(last.querySelector('p')).toHaveTextContent(
      'Send the questionnaire, the control list, or the questions your auditors asked last time. We will answer each one against what is on this page, and say plainly where the answer is not yet.',
    )
    expect(within(last).getByRole('link', { name: 'Start a conversation' }).getAttribute('href')).toBe('/contact')
  })
})

describe('SCN-006 — the page names no framework, certification, or roadmap', () => {
  it('carries none of the banned strings and no em dash', () => {
    const { container } = draw()
    const text = container.textContent
    for (const banned of ['SOC 2', 'SOC2', 'ISO 27001', 'NIST', 'roadmap', 'certified', '—']) {
      expect(text, banned).not.toContain(banned)
    }
  })

  it('keeps the header lead as its only contrast construction', () => {
    const { container } = draw()
    const hits = container.textContent.match(/,\s*not\s/g) || []
    expect(hits).toHaveLength(1)
    expect(container.textContent).toContain(
      'Written for the person who has to sign off, not the person who builds it.',
    )
  })
})

describe('SCN-010 — heading order', () => {
  it('is one h1 followed only by h2s', () => {
    const { container } = draw()
    const levels = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => Number(h.tagName[1]))
    expect(levels[0]).toBe(1)
    expect(levels.filter((l) => l === 1)).toHaveLength(1)
    expect(levels.slice(1).every((l) => l === 2)).toBe(true)
  })
})
