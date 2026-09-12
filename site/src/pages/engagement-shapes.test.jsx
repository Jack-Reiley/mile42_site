import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import HowWeWork from './HowWeWork.jsx'

/**
 * The three shapes an engagement takes, in the engagement model bands of How
 * we work. They were a page of their own when this was written; the
 * information architecture ticket merged that page in, and the bands kept
 * their order.
 *
 * The page explained the pricing posture and never said what the work looks
 * like from the client's side: a fixed-scope pilot, a team embedded beside
 * yours, or a build priced on its outcome. This pins that the section exists,
 * that it names all three, and where it sits.
 *
 * The embedded shape is described in plain words. The "forward deployed
 * engineer" label is allowed only once buyers are heard using it, so its
 * absence is asserted rather than left to chance.
 */

const draw = () =>
  render(
    <MemoryRouter initialEntries={['/how-we-work']}>
      <HowWeWork />
    </MemoryRouter>,
  )

const SHAPES = ['A fixed-scope pilot', 'An embedded team', 'An outcome-priced build']

const bandOf = (container, text) =>
  [...container.querySelectorAll('section')].find((s) => s.textContent.includes(text))

describe('the engagement shapes section', () => {
  it('names the three shapes under one heading', () => {
    const { container } = draw()
    const band = bandOf(container, 'Three shapes the work takes.')
    expect(band).toBeDefined()

    const titles = [...band.querySelectorAll('h3')].map((h) => h.textContent)
    expect(titles).toEqual(SHAPES)
  })

  /* Two sentences each, which is the brief, and what keeps three parallel
     columns from becoming three short essays. */
  it('gives each shape two sentences', () => {
    const { container } = draw()
    const band = bandOf(container, 'Three shapes the work takes.')

    for (const title of SHAPES) {
      const body = within(band).getByRole('heading', { name: title }).nextElementSibling
      const sentences = body.textContent.match(/[^.!?]+[.!?]/g)
      expect(sentences, title).toHaveLength(2)
    }
  })

  it('links the pilot shape to the Phase Zero page', () => {
    const { container } = draw()
    const band = bandOf(container, 'Three shapes the work takes.')
    expect(within(band).getByRole('link', { name: 'What Phase Zero includes' })).toHaveAttribute(
      'href',
      '/what-we-do/phase-zero',
    )
  })

  it('describes the embedded shape without the FDE label', () => {
    const { container } = draw()
    expect(container.textContent).not.toMatch(/forward[- ]deployed/i)
    expect(container.textContent).not.toMatch(/\bFDE\b/)
  })

  /* Posture, then shapes, then the argument for the pricing. A reader who has
     just been told we price for value should see what they would be buying
     before the delivery-model reasoning behind it. */
  it('sits between the pricing posture and the delivery-model argument', () => {
    const { container } = draw()
    const bands = [...container.querySelectorAll('section')]
    const posture = bands.findIndex((b) => b.textContent.includes('skin in the game'))
    const shapes = bands.findIndex((b) => b.textContent.includes('Three shapes the work takes.'))
    const argument = bands.findIndex((b) =>
      b.textContent.includes('The delivery model is what makes the commercial model possible.'),
    )

    expect(shapes).toBe(posture + 1)
    expect(argument).toBe(shapes + 1)
  })
})
