import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Home from './Home.jsx'

/**
 * #74 — the homepage hero's copy and the argument band under it.
 *
 * Named for the ticket rather than the page, the way homepage-restructure and
 * dewey-entry-points are. The band ORDER those two pin is their contract, not
 * this one; what this file holds is what the hero says and what the new band
 * carries.
 *
 * Geometry and colour are deliberately absent. SCN-003 and SCN-004 are the
 * panel treatment and the stacking order at a breakpoint, which are rendered
 * positions jsdom does not compute — the suite omits the Tailwind plugin, so no
 * utility resolves to a value here. They are verified in a browser and recorded
 * in the requirements document instead of being faked.
 */

const BASENAME = '/working'
const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SRC, '..', '..')

const draw = () =>
  render(
    <MemoryRouter basename={BASENAME} initialEntries={[`${BASENAME}/`]}>
      <Home />
    </MemoryRouter>,
  )

const bandsOf = (container) => [...container.querySelectorAll('section')]

describe('SCN-001 — the hero states a position', () => {
  it('opens on the eyebrow, the headline, and what Mile42 leaves out', () => {
    const { container } = draw()
    const hero = bandsOf(container)[0]

    expect(hero.textContent).toContain('Execution, Rebuilt.')
    expect(hero.querySelector('h1').textContent).toBe(
      'The consulting model is broken. We didn’t bring it with us.',
    )
    expect(hero.textContent).toContain('senior judgment with AI-native delivery')
    expect(hero.textContent).toContain('bloated teams, endless billing')
  })

  /* The headline it replaced. Left as an explicit absence because it is still
     the document title in App.jsx, so a half-finished revert would otherwise
     leave the page agreeing with the tab and nothing would catch it. */
  it('no longer leads with the service list', () => {
    const { container } = draw()
    expect(container.textContent).not.toMatch(/We help organizations deliver their most important work/)
  })
})

describe('SCN-002 — the argument sits between the claim and the work', () => {
  it('follows the hero and precedes core practice', () => {
    const { container } = draw()
    const bands = bandsOf(container)

    expect(bands[1].querySelector('h2').textContent).toBe(
      'Consulting should create momentum, not overhead.',
    )
    expect(bands[2].textContent).toContain('Our core practice is agentic AI implementation')
  })

  /* Order matters inside the band as well as between bands: the charge, then
     how Mile42 differs, then what the reader gets. Read as text nodes rather
     than by class, so a change to the markup that keeps the argument intact
     does not fail here. */
  it('builds the argument in three beats, in order', () => {
    const { container } = draw()
    const paragraphs = [...bandsOf(container)[1].querySelectorAll('p')].map((p) => p.textContent)

    expect(paragraphs).toHaveLength(3)
    expect(paragraphs[0]).toContain('That is not a delivery model. It is a conflict of interest.')
    expect(paragraphs[1]).toContain('Mile42 was built differently.')
    expect(paragraphs[2]).toContain('more of your investment directed toward the result')
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

  it('carries alt text describing what it depicts', () => {
    const { container } = draw()
    const art = bandsOf(container)[1].querySelector('img')

    expect(art).not.toBeNull()
    expect(art.getAttribute('alt')).toMatch(/brain and a gear/i)
  })
})

describe('SCN-006 — the page stays sound', () => {
  /* The band's heading sits under the page's h1 and above nothing, so h2 is the
     only level that keeps the outline unbroken. */
  it('gives the argument band a second-level heading and no other', () => {
    const { container } = draw()
    const band = bandsOf(container)[1]

    expect(band.querySelectorAll('h2')).toHaveLength(1)
    expect(band.querySelectorAll('h1, h3, h4, h5, h6')).toHaveLength(0)
  })
})
