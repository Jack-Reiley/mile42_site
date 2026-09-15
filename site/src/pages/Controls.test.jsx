import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Controls from './Controls.jsx'
import { PAGES } from '../App.jsx'

/**
 * #128 — the controls page as a ruled register, written for the person who
 * has to explain an agent's controls to an external auditor. Supersedes the
 * #122 contract for SCN-002 (the honesty block, now removed) and SCN-003 (five
 * tables, now five registers in label columns).
 *
 * The contract is the copy and the order: eight bands, five control areas
 * each numbered, headed, and led in a label column beside a real table whose
 * fourteen rows are character for character what #122 shipped. jsdom has no
 * layout, so the hairlines, the column proportions, the band contrast, and
 * the stacking below `md` are checked in the browser pass the requirements
 * document records.
 */

const draw = () =>
  render(
    <MemoryRouter initialEntries={['/meet-vickee/controls']}>
      <Controls />
    </MemoryRouter>,
  )

const bands = (container) => [...container.querySelectorAll('section')]

const STATEMENT =
  'What an agent can reach, what it can change, what record it leaves, and what you would show an auditor. Written for the person who has to sign off, not the person who builds it.'

const CONTROLS = [
  'Access control',
  'Change control and separation of duties',
  'Logging and evidence',
  'Monitoring and review',
  'When it is wrong',
]

const COLUMNS = ['Control', 'How it works', 'Evidence you receive']

/* The fourteen rows as `main` carried them before #128, in page order. The
   register changes how they are drawn and nothing about what they say. */
const ROWS = [
  ['Scope by tenant and namespace', 'Every agent works inside a tenant and namespace created on purpose. Nothing lands by accident, and an agent sees only what its scope holds.', 'The tenant and namespace configuration'],
  ['Least privilege by construction', 'Access is scoped by tenant, namespace, and tags, so the narrowest scope is the starting point rather than something added later.', 'The scope assigned to each agent'],
  ['Credential isolation', 'No source-system credentials sit in an agent’s context window, prompts, or logs. The keys stay with you.', 'The publication list: what was copied into Vickee, and from where'],
  ['Governed copy', 'Agents read from a governed copy of curated extracts. The source system is never touched.', 'The publication list'],
  ['Writeback setting', 'Outbound writeback is off, or gated by a named approver. Which one is a setting your team chooses, and it is visible.', 'The writeback setting as configured'],
  ['Deterministic connectors', 'Data moves through connectors written as plain code. No model sits in the sync path, so the same input shapes the same way every run.', 'The approval record for any change that landed'],
  ['Cited answers', 'Every answer names the sources it drew on, so a control can be evidenced rather than asserted.', 'A sample cited answer'],
  ['Per-query log', 'An exportable log records who or what asked, what was retrieved, which sources were cited, and when.', 'The log export'],
  ['Continuous evaluation', 'Set up during the engagement: evaluation keeps running after launch rather than stopping at a one-time check.', 'The evaluation results'],
  ['Review cadence', 'Set up during the engagement: a scheduled examination of what the system is actually doing.', 'The review schedule'],
  ['Route for bad outputs', 'Set up during the engagement: the people using it can report a bad output to someone who can change the system, and what changed is recorded.', 'The change record'],
  ['Named accountability', 'Set up during the engagement: one named person is accountable for every consequential decision.', 'The accountability assignment'],
  ['Bounded blast radius', 'A misbehaving agent reaches a read-only knowledge layer rather than the system of record. Your ERP never sees it.', 'The writeback setting as configured'],
  ['Reversible content', 'Content can be replaced or removed, and the index follows.', 'The removal record'],
]

/* The evidence cell carries its own column label for the stacked layout. What
   the row says is the text after it. */
const cellText = (cell) =>
  [...cell.childNodes]
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => n.textContent)
    .join('')
    .trim()

describe('SCN-001 — the page keeps its route, title, breadcrumb, and heading size', () => {
  it('is in the route table with its tab title', () => {
    const page = PAGES.find((p) => p.path === '/meet-vickee/controls')
    expect(page).toBeDefined()
    expect(page.title).toBe('How agents are controlled · Mile42')
    expect(page.Component).toBe(Controls)
  })

  it('renders one h1 at the detail-page step and a breadcrumb back to Meet Vickee', () => {
    draw()
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent('How agents are controlled.')
    /* `H2 as="h1"`: the step every other child page uses, not the display step. */
    expect(h1s[0].className).toContain('lg:text-heading-2')
    expect(h1s[0].className).not.toContain('lg:text-heading-1')

    const crumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(within(crumb).getByRole('link', { name: 'Meet Vickee' }).getAttribute('href')).toBe('/meet-vickee')
    expect(within(crumb).getByText('Controls')).toHaveAttribute('aria-current', 'page')
  })

  it('carries no paragraph in the header band', () => {
    const { container } = draw()
    expect(bands(container)[0].querySelector('p')).toBeNull()
  })
})

describe('SCN-002 — the statement band follows the header', () => {
  it('is one paragraph on a page band, under no heading or eyebrow', () => {
    const { container } = draw()
    const band = bands(container)[1]
    expect(band.className).toContain('bg-page')
    const paragraphs = band.querySelectorAll('p')
    expect(paragraphs).toHaveLength(1)
    expect(paragraphs[0].textContent).toBe(STATEMENT)
    expect(band.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull()
    expect(band.querySelector('.text-eyebrow')).toBeNull()
  })

  it('says nowhere that Vickee has not been through a third-party audit', () => {
    const { container } = draw()
    expect(container.textContent).not.toContain('Vickee has not been through a third-party audit')
  })
})

describe('SCN-003 — eight bands in the handoff order', () => {
  const FILLS = ['bg-navy', 'bg-page', 'bg-surface', 'bg-page', 'bg-navy', 'bg-page', 'bg-surface', 'orange']

  it('draws navy, page, surface, page, navy, page, surface, orange-deep', () => {
    const { container } = draw()
    const sections = bands(container)
    expect(sections).toHaveLength(8)
    sections.forEach((section, i) => expect(section.className, `band ${i + 1}`).toContain(FILLS[i]))
  })

  it('puts the five control areas in the third to seventh', () => {
    const { container } = draw()
    const sections = bands(container)
    CONTROLS.forEach((name, i) => {
      expect(sections[i + 2].querySelector('h2')).toHaveTextContent(name)
    })
  })

  it('rules the top of each surface band that follows a page band', () => {
    const { container } = draw()
    const sections = bands(container)
    expect(sections[2].className).toContain('border-t')
    expect(sections[6].className).toContain('border-t')
    expect(sections[3].className).not.toContain('border-t')
    expect(sections[5].className).not.toContain('border-t')
  })
})

describe('SCN-004 — each control area has a numbered label column', () => {
  it.each(CONTROLS.map((name, i) => [name, i]))('%s carries number, h2, and lead in that order', (name, i) => {
    draw()
    const h2 = screen.getByRole('heading', { level: 2, name })
    const label = h2.parentElement
    const [number, heading, lead] = label.children
    expect(number.textContent).toBe(String(i + 1).padStart(2, '0'))
    expect(number.className).toContain('text-eyebrow')
    expect(heading).toBe(h2)
    expect(lead.tagName).toBe('P')
    expect(lead.textContent.length).toBeGreaterThan(0)
  })

  it('names the five h2s in order before the closing band', () => {
    const { container } = draw()
    const h2s = [...container.querySelectorAll('h2')].map((h) => h.textContent)
    expect(h2s.slice(0, 5)).toEqual(CONTROLS)
    expect(h2s).toHaveLength(6)
  })

  it('collapses the label above the register below lg and beside it from lg', () => {
    draw()
    for (const name of CONTROLS) {
      const grid = screen.getByRole('heading', { level: 2, name }).closest('.grid')
      expect(grid.className).toContain('lg:grid-cols-[minmax(240px,1fr)_minmax(0,2.2fr)]')
      expect(grid.className).not.toMatch(/(^|\s)grid-cols-/)
    }
  })
})

describe('SCN-005 — the register is a real table with the same content as before', () => {
  it.each(CONTROLS)('%s has one table with the three column headers', (name) => {
    draw()
    const band = screen.getByRole('heading', { level: 2, name }).closest('section')
    const tables = within(band).getAllByRole('table')
    expect(tables).toHaveLength(1)
    const headers = tables[0].querySelectorAll('thead th[scope="col"]')
    expect([...headers].map((th) => th.textContent)).toEqual(COLUMNS)
  })

  it('opens every row with a row header followed by two cells', () => {
    draw()
    for (const table of screen.getAllByRole('table')) {
      for (const row of table.querySelectorAll('tbody tr')) {
        expect(row.children).toHaveLength(3)
        expect(row.children[0].tagName).toBe('TH')
        expect(row.children[0].getAttribute('scope')).toBe('row')
        expect(row.children[1].tagName).toBe('TD')
        expect(row.children[2].tagName).toBe('TD')
      }
    }
  })

  it('carries the fourteen rows character for character', () => {
    draw()
    const rows = screen
      .getAllByRole('table')
      .flatMap((table) => [...table.querySelectorAll('tbody tr')])
      .map((tr) => [...tr.children].map(cellText))
    expect(rows).toEqual(ROWS)
  })

  it('states every table role explicitly so the structure survives a display change', () => {
    draw()
    for (const table of screen.getAllByRole('table')) {
      expect(table.getAttribute('role')).toBe('table')
      expect(table.querySelector('thead').getAttribute('role')).toBe('rowgroup')
      expect(table.querySelector('tbody').getAttribute('role')).toBe('rowgroup')
      for (const tr of table.querySelectorAll('tr')) expect(tr.getAttribute('role')).toBe('row')
      for (const th of table.querySelectorAll('thead th')) expect(th.getAttribute('role')).toBe('columnheader')
      for (const th of table.querySelectorAll('tbody th')) expect(th.getAttribute('role')).toBe('rowheader')
      for (const td of table.querySelectorAll('td')) expect(td.getAttribute('role')).toBe('cell')
    }
  })

  it('labels the evidence cell for the stacked layout, hidden from md up', () => {
    draw()
    for (const table of screen.getAllByRole('table')) {
      for (const tr of table.querySelectorAll('tbody tr')) {
        const label = tr.lastElementChild.querySelector('span')
        expect(label.textContent).toBe('Evidence you receive')
        expect(label.className).toContain('md:hidden')
      }
    }
  })
})

describe('SCN-007 — the navy control area takes the on-dark tones', () => {
  it('draws Logging and evidence with hero type, sky labels, and off-white rules', () => {
    draw()
    const h2 = screen.getByRole('heading', { level: 2, name: 'Logging and evidence' })
    const band = h2.closest('section')
    expect(band.className).toContain('bg-navy')
    expect(h2.className).toContain('text-hero-heading')
    expect(h2.previousElementSibling.className).toContain('text-sky')
    expect(h2.nextElementSibling.className).toContain('text-hero-heading')

    const table = within(band).getByRole('table')
    expect(table.className).toContain('text-hero-heading')
    for (const th of table.querySelectorAll('thead th')) expect(th.className).toContain('text-sky')
    for (const tr of table.querySelectorAll('tbody tr')) expect(tr.className).toContain('border-hero-heading/25')
  })

  it('keeps the four light areas on ink', () => {
    draw()
    for (const name of CONTROLS.filter((n) => n !== 'Logging and evidence')) {
      const band = screen.getByRole('heading', { level: 2, name }).closest('section')
      const table = within(band).getByRole('table')
      expect(table.className).toContain('text-ink')
      for (const tr of table.querySelectorAll('tbody tr')) expect(tr.className).toContain('border-ink/16')
    }
  })
})

describe('SCN-010 — heading order and keyboard reach', () => {
  it('is one h1 followed only by h2s', () => {
    const { container } = draw()
    const levels = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => Number(h.tagName[1]))
    expect(levels[0]).toBe(1)
    expect(levels.filter((l) => l === 1)).toHaveLength(1)
    expect(levels.slice(1).every((l) => l === 2)).toBe(true)
  })

  it('reaches the breadcrumb link and then the closing button, and nothing else', () => {
    const { container } = draw()
    const focusable = [...container.querySelectorAll('a[href], button')]
    expect(focusable.map((el) => el.textContent)).toEqual(['Meet Vickee', 'Start a conversation'])
  })
})

describe('SCN-011 — the statement is the page’s one contrast construction', () => {
  it('counts exactly one ", not " and finds it in the statement paragraph', () => {
    const { container } = draw()
    const hits = container.textContent.match(/,\s*not\s/g) || []
    expect(hits).toHaveLength(1)
    expect(bands(container)[1].textContent).toContain(
      'Written for the person who has to sign off, not the person who builds it.',
    )
  })

  it('carries none of the banned strings and no em dash', () => {
    const { container } = draw()
    const text = container.textContent
    for (const banned of ['SOC 2', 'SOC2', 'ISO 27001', 'NIST', 'roadmap', 'certified', '—']) {
      expect(text, banned).not.toContain(banned)
    }
  })
})

describe('SCN-012 — the closing band is unchanged', () => {
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
