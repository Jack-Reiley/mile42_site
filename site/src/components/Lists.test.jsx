import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ControlRegister } from './Lists.jsx'
import { REVEAL_GROUP } from './reveal.js'

/**
 * #128 — the ruled register. What the page test cannot see from the outside:
 * the column proportions, which tone changes what, and where the reveal sits.
 */

const COLUMNS = ['Control', 'How it works', 'Evidence you receive']
const ROWS = [
  ['One', 'How one works.', 'Evidence for one'],
  ['Two', 'How two works.', 'Evidence for two'],
]

const draw = (props = {}) =>
  render(<ControlRegister columns={COLUMNS} rows={ROWS} {...props} />).container.querySelector('table')

describe('ControlRegister', () => {
  it('is a fixed-layout table with the middle column the widest', () => {
    const table = draw()
    expect(table.className).toContain('md:table-fixed')
    const cols = [...table.querySelectorAll('colgroup col')].map((c) => c.className)
    expect(cols).toEqual(['w-[26.7%]', 'w-[46.6%]', 'w-[26.7%]'])
  })

  it('draws no card: no border, radius, fill, or shadow class', () => {
    const table = draw()
    for (const cardClass of ['border-ink', 'rounded-card', 'bg-page', 'shadow-hard', 'min-w-']) {
      expect(table.className).not.toContain(cardClass)
    }
    expect(table.parentElement.className).not.toContain('overflow-x-auto')
  })

  it('hides the header row and the colgroup below md, where rows stack', () => {
    const table = draw()
    expect(table.querySelector('thead').className).toContain('hidden md:table-header-group')
    expect(table.querySelector('colgroup').className).toContain('hidden md:table-column-group')
    for (const tr of table.querySelectorAll('tbody tr')) {
      expect(tr.className).toContain('block')
      expect(tr.className).toContain('md:table-row')
    }
  })

  it('labels the evidence cell with the last column name, hidden from md up', () => {
    const table = draw()
    const labels = [...table.querySelectorAll('tbody td:last-child > span')]
    expect(labels).toHaveLength(ROWS.length)
    for (const label of labels) {
      expect(label.textContent).toBe('Evidence you receive')
      expect(label.className).toContain('md:hidden')
    }
  })

  it('relays the reveal to each row so the cells carry the motion', () => {
    const table = draw()
    expect(table.querySelector('tbody').className).not.toContain('m42-in')
    for (const tr of table.querySelectorAll('tbody tr')) {
      expect(tr.className).toContain(REVEAL_GROUP.relay)
    }
  })

  it('takes the on-dark tones with tone="hero"', () => {
    const table = draw({ tone: 'hero' })
    expect(table.className).toContain('text-hero-heading')
    for (const th of table.querySelectorAll('thead th')) {
      expect(th.className).toContain('text-sky')
      expect(th.className).toContain('border-hero-heading/50')
    }
    for (const tr of table.querySelectorAll('tbody tr')) expect(tr.className).toContain('border-hero-heading/25')
  })

  it('defaults to ink', () => {
    const table = draw()
    expect(table.className).toContain('text-ink')
    for (const th of table.querySelectorAll('thead th')) {
      expect(th.className).toContain('text-ink/72')
      expect(th.className).toContain('border-ink')
    }
    for (const tr of table.querySelectorAll('tbody tr')) expect(tr.className).toContain('border-ink/16')
  })
})
