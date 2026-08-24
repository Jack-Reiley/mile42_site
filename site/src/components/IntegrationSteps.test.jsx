import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import IntegrationSteps from './IntegrationSteps.jsx'

/**
 * The picture is decoration; the sequence is content. These cover the part a
 * reader who never sees the blobs still has to get: five steps, in order, each
 * with its numeral written out.
 */

const STEPS = [
  { label: 'Create', line: 'A tenant and namespace.' },
  { label: 'Upload', line: 'One call.' },
  { label: 'Index', line: 'Status is queryable.' },
  { label: 'Search', line: 'By meaning or by exact term.' },
  { label: 'Retrieve', line: 'Full content in one batch call.' },
]

describe('IntegrationSteps', () => {
  it('is an ordered list of the five moments, numerals included', () => {
    render(<IntegrationSteps steps={STEPS} />)
    const items = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(items).toHaveLength(5)
    items.forEach((item, i) => {
      expect(item).toHaveTextContent(String(i + 1).padStart(2, '0'))
      expect(item).toHaveTextContent(STEPS[i].label)
      expect(item).toHaveTextContent(STEPS[i].line)
    })
  })

  it('hides the drawings, which say nothing the copy beside them does not', () => {
    const { container } = render(<IntegrationSteps steps={STEPS} />)
    const svgs = container.querySelectorAll('svg')
    // five blobs and the arrow overlay
    expect(svgs).toHaveLength(6)
    svgs.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'))
  })

  it('gives every drawing its own gradient and clip ids', () => {
    const { container } = render(<IntegrationSteps steps={STEPS} />)
    const ids = [...container.querySelectorAll('[id]')].map((el) => el.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
