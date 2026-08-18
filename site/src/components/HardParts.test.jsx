import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, StaticRouter } from 'react-router'
import { createElement } from 'react'
import HardParts from './HardParts.jsx'
import App from '../App.jsx'

/**
 * The four scenarios a build and a screenshot cannot check: the keyboard
 * contract on the spine, the independence of the disclosures, and that the
 * section survives a render with no DOM.
 *
 * Everything here queries by role and accessible name. Nothing asserts on a
 * class, a selector, or DOM position, so a restyle does not break a test and a
 * broken tab list does not pass one.
 */

const PARTS = [
  { n: '01', title: 'Context and workflow design', heading: 'Context before solutions.', blocks: [{ kind: 'body', text: 'One.' }] },
  { n: '02', title: 'Architecture and integration', heading: 'Connecting an agent to real systems is most of the work.', blocks: [{ kind: 'body', text: 'Two.' }] },
  { n: '03', title: 'Governance and risk', heading: 'The controls are part of the build, not a review at the end.', blocks: [{ kind: 'body', text: 'Three.' }] },
  { n: '04', title: 'Adoption and accountability', heading: 'Go-live is the middle of the project, not the end.', blocks: [{ kind: 'body', text: 'Four.' }] },
]

const draw = () => render(<MemoryRouter><HardParts parts={PARTS} /></MemoryRouter>)

const tabs = () => within(screen.getByRole('tablist', { name: 'The four hard parts' })).getAllByRole('tab')

/** The tab the tab list reports as selected. */
const selected = () => tabs().find((t) => t.getAttribute('aria-selected') === 'true')

/** The panel, identified through the tab that names it rather than by id. */
const panel = () => screen.getByRole('tabpanel')

describe('SCN-003 — arrow keys move through the spine and select as they go', () => {
  it('moves focus and selection together to the next hard part', async () => {
    const user = userEvent.setup()
    draw()
    tabs()[0].focus()

    await user.keyboard('{ArrowRight}')

    expect(selected()).toHaveAccessibleName('Architecture and integration')
    expect(tabs()[1]).toHaveFocus()
    expect(panel()).toHaveAccessibleName('Architecture and integration')
  })

  it('wraps from the last hard part to the first', async () => {
    const user = userEvent.setup()
    draw()
    tabs()[3].focus()
    await user.keyboard('{ArrowRight}')

    expect(selected()).toHaveAccessibleName('Context and workflow design')
    expect(tabs()[0]).toHaveFocus()
  })

  it('wraps from the first hard part to the last', async () => {
    const user = userEvent.setup()
    draw()
    tabs()[0].focus()
    await user.keyboard('{ArrowLeft}')

    expect(selected()).toHaveAccessibleName('Adoption and accountability')
    expect(tabs()[3]).toHaveFocus()
  })

  it('keeps exactly one hard part selected', async () => {
    const user = userEvent.setup()
    draw()
    tabs()[0].focus()
    await user.keyboard('{ArrowRight}{ArrowRight}')

    expect(tabs().filter((t) => t.getAttribute('aria-selected') === 'true')).toHaveLength(1)
  })

  it('leaves only the selected tab in the tab sequence', async () => {
    const user = userEvent.setup()
    draw()
    tabs()[0].focus()
    await user.keyboard('{ArrowRight}')

    expect(tabs().map((t) => t.tabIndex)).toEqual([-1, 0, -1, -1])
  })
})

describe('SCN-004 — Home and End jump to the first and last hard part', () => {
  it('sends Home to the first hard part', async () => {
    const user = userEvent.setup()
    draw()
    tabs()[2].focus()
    await user.keyboard('{Home}')

    expect(selected()).toHaveAccessibleName('Context and workflow design')
    expect(tabs()[0]).toHaveFocus()
  })

  it('sends End to the last hard part', async () => {
    const user = userEvent.setup()
    draw()
    tabs()[0].focus()
    await user.keyboard('{End}')

    expect(selected()).toHaveAccessibleName('Adoption and accountability')
    expect(tabs()[3]).toHaveFocus()
  })
})

describe('SCN-007 — any number of disclosures can be open at once', () => {
  /* Both forms are in the DOM at once. The spine's controls carry `role="tab"`,
     which replaces their implicit button role, so a query for buttons reaches
     the four disclosure headers and nothing else. */
  const rows = () => screen.getAllByRole('button')

  const row = (name) => screen.getByRole('button', { name: new RegExp(name) })

  it('opens the first hard part and leaves the other three closed', () => {
    draw()
    expect(row('Context and workflow design')).toHaveAttribute('aria-expanded', 'true')
    expect(row('Architecture and integration')).toHaveAttribute('aria-expanded', 'false')
    expect(row('Governance and risk')).toHaveAttribute('aria-expanded', 'false')
    expect(row('Adoption and accountability')).toHaveAttribute('aria-expanded', 'false')
  })

  it('holds two hard parts open at the same time', async () => {
    const user = userEvent.setup()
    draw()
    await user.click(row('Architecture and integration'))

    expect(row('Context and workflow design')).toHaveAttribute('aria-expanded', 'true')
    expect(row('Architecture and integration')).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes one without closing the other', async () => {
    const user = userEvent.setup()
    draw()
    await user.click(row('Architecture and integration'))
    await user.click(row('Context and workflow design'))

    expect(row('Context and workflow design')).toHaveAttribute('aria-expanded', 'false')
    expect(row('Architecture and integration')).toHaveAttribute('aria-expanded', 'true')
  })

  it('allows all four open and all four closed', async () => {
    const user = userEvent.setup()
    draw()
    for (const p of PARTS.slice(1)) await user.click(row(p.title))
    expect(rows().every((r) => r.getAttribute('aria-expanded') === 'true')).toBe(true)

    for (const p of PARTS) await user.click(row(p.title))
    expect(rows().every((r) => r.getAttribute('aria-expanded') === 'false')).toBe(true)
  })
})

describe('SCN-013 — the section renders with no browser present', () => {
  it('renders the route to static markup and includes the first hard part', () => {
    const html = renderToStaticMarkup(
      createElement(StaticRouter, { location: '/what-we-do/engineering/agentic-ai' }, createElement(App)),
    )

    expect(html).toContain('Context before solutions.')
    expect(html).toContain('The distance between an AI pilot and an AI system.')
  })
})
