import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Home from './Home.jsx'
import { illustrations } from '../assets/illustrations/manifest.js'

/**
 * #74 — the homepage hero's copy and the argument band, as rewritten by the
 * home rewrite.
 *
 * Named for the ticket rather than the page, the way homepage-restructure and
 * vickee-entry-points are. The band ORDER those two pin is their contract, not
 * this one; what this file holds is what the hero says, who the page says it
 * is for, and what the argument panel carries now that it closes the page
 * rather than opening it.
 *
 * Geometry and colour are deliberately absent. The panel treatment and the
 * stacking order at a breakpoint are rendered positions jsdom does not compute
 * — the suite omits the Tailwind plugin, so no utility resolves to a value
 * here. They are verified in a browser.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SRC, '..', '..')

const draw = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>,
  )

const bandsOf = (container) => [...container.querySelectorAll('section')]

const argumentBand = (container) =>
  bandsOf(container).find((b) => b.textContent.includes('Consulting should create momentum'))

describe('SCN-001 — the hero states the buyer’s problem', () => {
  it('opens on the stalled pilot and what Mile42 exists for', () => {
    const { container } = draw()
    const hero = bandsOf(container)[0]

    expect(hero.querySelector('h1').textContent).toBe('Most AI pilots never make it past the demo.')
    expect(hero.textContent).toContain('leadership was encouraged, and nothing changed')
    expect(hero.textContent).toContain('Mile42 exists for what comes next')
  })

  /* The kicker is the document title and the share card's first line, and it
     is deliberately not drawn in the hero any more: the band opens on the
     reader's problem, not on a slogan about the firm. */
  it('no longer carries the kicker or the broken-model headline', () => {
    const { container } = draw()
    const hero = bandsOf(container)[0]

    expect(hero.textContent).not.toContain('Execution, Rebuilt.')
    expect(container.textContent).not.toMatch(/The consulting model is broken/)
    expect(container.textContent).not.toMatch(/senior judgment with AI-native delivery/)
  })

  it('keeps both calls to action', () => {
    const { container } = draw()
    const hero = bandsOf(container)[0]
    const links = [...hero.querySelectorAll('a')].map((a) => [a.textContent.trim(), a.getAttribute('href')])

    expect(links).toContainEqual(['Start a conversation', '/contact'])
    expect(links).toContainEqual(['See how we deliver', '/how-we-work/delivery-model'])
  })
})

describe('SCN-002 — the page names who it is for, directly under the hero', () => {
  it('states the trigger and the buyer in the second band', () => {
    const { container } = draw()
    const band = bandsOf(container)[1]

    expect(band.textContent).toContain(
      'Mile42 is who you call when an AI initiative has stalled between prototype and production',
    )
    expect(band.textContent).toContain('mid-market and enterprise leaders in IT, marketing, customer experience, and operations')
  })

  /* A sentence, not a section. It qualifies the hero, so it carries no heading
     of its own and the outline runs h1 straight to the next band's h2. */
  it('carries no heading of its own', () => {
    const { container } = draw()
    expect(bandsOf(container)[1].querySelectorAll('h1,h2,h3,h4,h5,h6')).toHaveLength(0)
  })
})

describe('SCN-003 — the argument closes the page rather than opening it', () => {
  it('sits immediately before the closing call to action', () => {
    const { container } = draw()
    const bands = bandsOf(container)

    expect(bands.at(-2)).toBe(argumentBand(container))
    expect(bands.at(-2).querySelector('h2').textContent).toBe(
      'Consulting should create momentum, not overhead.',
    )
  })

  /* The charge, how Mile42 differs, then who does the work. Read as text nodes
     rather than by class, so a change to the markup that keeps the argument
     intact does not fail here. */
  it('builds the argument in order and closes on the team', () => {
    const { container } = draw()
    const paragraphs = [...argumentBand(container).querySelectorAll('p')].map((p) => p.textContent)

    expect(paragraphs).toHaveLength(3)
    expect(paragraphs[0]).toContain('That is a conflict of interest built into the billing.')
    expect(paragraphs[1]).toContain('Mile42 was built the other way round.')
    expect(paragraphs[2]).toBe(
      'A senior, US-based team. The people you meet are the people who do the work.',
    )
  })

  /* The engagement principles used to close the offerings band. They are one
     block with the argument now, and the merge must not have dropped one. */
  it('carries the three engagement principles', () => {
    const { container } = draw()
    const items = [...argumentBand(container).querySelectorAll('ol li')].map((li) => li.textContent)

    expect(items).toHaveLength(3)
    expect(items[0]).toContain('You know what the work costs before you commit.')
    expect(items[1]).toContain('The risk of an estimate sits with the people who made it.')
    expect(items[2]).toContain('We stay until the work is right.')
  })

  it('no longer carries the paragraphs the merge retired', () => {
    const { container } = draw()

    expect(container.textContent).not.toMatch(/Most firms are structured to protect their margin/)
    expect(container.textContent).not.toMatch(/Our engagements are built around your outcomes/)
    expect(container.textContent).not.toMatch(/more of your investment directed toward the result/)
  })
})

describe('SCN-005 — the artwork is a built asset, not a placed file', () => {
  it('is registered as a master, so the illustration build owns it', () => {
    const build = readFileSync(join(ROOT, 'site', 'scripts', 'illustrations.mjs'), 'utf8')
    const manifest = readFileSync(
      join(SRC, 'assets', 'illustrations', 'manifest.js'),
      'utf8',
    )

    expect(build).toContain("'Brain_gear.png'")
    expect(build).toContain("key: 'brain-gear'")
    expect(manifest).toContain("'brain-gear'")
  })

  /* The emitted data, not the source. A key present in the manifest with no
     built asset behind it renders nothing and `Spot` returns null silently. */
  it('has variants emitted for the sizes it is rendered at', () => {
    const data = JSON.parse(
      readFileSync(join(SRC, 'assets', 'illustrations', 'illustrations.data.json'), 'utf8'),
    )
    const widths = data['brain-gear'].variants.map((v) => v.width)

    expect(widths).toContain(128)
    expect(widths).toContain(256)
  })

  /* Rewritten by #109, which retired the ink sketches, and again by #111,
     which seated the vector gear-and-brain in the same slot. The retired entry
     keeps its alt text because alt is the one part of an illustration the
     build cannot regenerate; the band draws the new entry and announces it,
     since nothing else in the panel says what the drawing says. */
  it('draws the gear-and-brain, and keeps the retired entry intact', () => {
    const { container } = draw()
    const images = argumentBand(container).querySelectorAll('img')

    expect(images).toHaveLength(1)
    expect(images[0].getAttribute('alt')).toBe(illustrations['gear-brain'].alt)
    expect(images[0].getAttribute('loading')).toBe('lazy')

    expect(illustrations['brain-gear'].retired).toBe(true)
    expect(illustrations['brain-gear'].alt).toMatch(/brain and a gear/i)
  })
})

describe('SCN-006 — the page stays sound', () => {
  /* The band's heading sits under the page's h1 and beside nothing, so h2 is
     the only level that keeps the outline unbroken. */
  it('gives the argument band a second-level heading and no other', () => {
    const { container } = draw()
    const band = argumentBand(container)

    expect(band.querySelectorAll('h2')).toHaveLength(1)
    expect(band.querySelectorAll('h1, h3, h4, h5, h6')).toHaveLength(0)
  })

  it('has one h1 and never skips a heading level', () => {
    const { container } = draw()
    const levels = [...container.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
      Number(h.tagName[1]),
    )

    expect(levels.filter((l) => l === 1)).toHaveLength(1)
    expect(levels[0]).toBe(1)
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
    }
  })
})
