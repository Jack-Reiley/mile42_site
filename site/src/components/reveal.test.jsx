import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Section, Wrap } from './primitives.jsx'
import { REVEAL, REVEAL_GROUP, startRevealFallback } from './reveal.js'

/**
 * The static-content reveal (#54).
 *
 * Most of the behaviour is CSS, so these cover what a component test can
 * actually prove: what opts in, what the fallback does and — more importantly —
 * what it refuses to do, and that the motion is declared with tokens.
 *
 * The way it looks, and the reduced-motion and unsupported-browser paths in a
 * real engine, are browser checks. See the verification report.
 */

const HERE = dirname(fileURLToPath(import.meta.url))
const read = (p) => readFileSync(resolve(HERE, p), 'utf8')
const css = () => read('../styles/index.css')

describe('SCN-001 — the motion is on the contents, not on the band', () => {
  it('does not animate the section itself', () => {
    const { container } = render(<Section>band</Section>)
    const className = container.querySelector('section').className
    expect(className).not.toMatch(/m42-in\b/)
    expect(className).not.toMatch(/m42-in-group/)
  })

  it('opts a wrap into revealing its children, so pages inherit it', () => {
    const { container } = render(<Wrap>content</Wrap>)
    expect(container.querySelector('div').className).toMatch(/m42-in-group/)
  })

  it('lets a wrap opt out', () => {
    const { container } = render(<Wrap reveal={false}>content</Wrap>)
    expect(container.querySelector('div').className).not.toMatch(/m42-in-group/)
  })

  it('scrubs over a fixed scroll distance rather than a share of element size', () => {
    // A percentage is a share of the element's own height, which is what let an
    // earlier pass finish a 906px band while 406px of it was still below the
    // fold. A length settles every element at the same height in the viewport.
    const rule = css().slice(css().indexOf('animation-range-start'))
    expect(rule.slice(0, 240)).toMatch(/var\(--scroll-reveal\)/)
    expect(rule.slice(0, 240)).not.toMatch(/entry\s+\d+%/)
  })
})

describe('SCN-002 — content is never left waiting on JavaScript', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.reveal
  })

  it('hides nothing until the observer is confirmed running', () => {
    // The hidden start state hangs off this attribute, and only the fallback
    // sets it. No attribute means every element renders plainly visible, which
    // is the behaviour when the script never loads, never parses, or throws.
    const stylesheet = css()
    const fallback = stylesheet.slice(stylesheet.indexOf('@supports not (animation-timeline'))
    expect(fallback).toMatch(/\[data-reveal="js"\][^{]*\{\s*opacity:\s*0/)
    expect(document.documentElement.dataset.reveal).toBeUndefined()
  })

  it('declines to take ownership where scroll-driven animation already exists', () => {
    vi.spyOn(CSS, 'supports').mockReturnValue(true)
    window.IntersectionObserver = class {}
    expect(startRevealFallback()).toBe(false)
    expect(document.documentElement.dataset.reveal).toBeUndefined()
    vi.restoreAllMocks()
  })

  it('declines to take ownership when the reader has asked for reduced motion', () => {
    vi.spyOn(CSS, 'supports').mockReturnValue(false)
    window.IntersectionObserver = class {}
    window.matchMedia = () => ({ matches: true })
    expect(startRevealFallback()).toBe(false)
    expect(document.documentElement.dataset.reveal).toBeUndefined()
    vi.restoreAllMocks()
    delete window.matchMedia
  })
})

describe('SCN-004 — the hero illustration keeps the LCP work from #12', () => {
  it('moves the home hero illustration without fading it', () => {
    const home = read('../pages/Home.jsx')
    const spot = home.slice(home.indexOf('name="hero-desk"'))
    expect(spot.slice(0, 400)).toMatch(/m42-in-solid/)
  })

  it('takes the start opacity from a variable, so a no-fade variant is possible', () => {
    expect(css()).toMatch(/opacity:\s*var\(--reveal-from,\s*0\)/)
    expect(css()).toMatch(/\.m42-in-solid\s*{\s*--reveal-from:\s*1;\s*}/)
  })
})

describe('SCN-005 — direction is consistent and declared once', () => {
  it('gives copy and imagery opposite entrances in two-column blocks', () => {
    expect(REVEAL.left).toContain('m42-in-left')
    expect(REVEAL.right).toContain('m42-in-right')
    const home = read('../pages/Home.jsx')
    expect(home).toMatch(/REVEAL_GROUP\.left/)
    expect(home).toMatch(/REVEAL\.right/)
  })

  it('relays a container so its parts arrive in turn instead of as a slab', () => {
    // A relay holds still and hands the motion to its children. Without it a
    // container that is both a group child and a group animates itself and its
    // contents, compounding two transforms.
    expect(REVEAL_GROUP.relay).toContain('m42-in-still')
    expect(REVEAL_GROUP.relay).toContain('m42-in-group')
    const lists = read('./Lists.jsx')
    expect(lists).toMatch(/REVEAL_GROUP\.relay/)
  })

  it('names group children for direction, since a direct declaration beats an inherited one', () => {
    expect(REVEAL_GROUP.right).toContain('m42-in-group-right')
    expect(css()).toMatch(/\.m42-in-group-right\s*>\s*\*\s*{\s*--reveal-name:\s*m42-in-right/)
  })

  it('orders the cascade so a per-element direction overrides its group', () => {
    const stylesheet = css()
    expect(stylesheet.indexOf('.m42-in-group-right > *')).toBeLessThan(
      stylesheet.indexOf('.m42-in-left {'),
    )
  })
})

describe('SCN-006 — the reveal declares no literal duration, easing or distance', () => {
  it('resolves every value from a token', () => {
    const stylesheet = css()
    const start = stylesheet.indexOf('@keyframes m42-in-up')
    const rules = stylesheet.slice(start, stylesheet.indexOf('.m42-band'))
    expect(rules).toMatch(/var\(--distance-reveal-y\)/)
    expect(rules).toMatch(/var\(--distance-reveal-x\)/)
    expect(rules).toMatch(/var\(--scale-reveal\)/)
    expect(rules).toMatch(/var\(--ease-reveal\)/)
    expect(rules).toMatch(/var\(--scroll-reveal\)/)
    expect(rules).toMatch(/var\(--stagger-reveal\)/)
    // Zero is exempt: it is the absence of a value, not a design decision, and
    // tokenising it would only hide that a stack is deliberately not staggered.
    expect(rules.replace(/:\s*0px/g, '')).not.toMatch(/:\s*\d+px/)
  })

  it('declares those tokens once, in the token file', () => {
    const theme = read('../../../design/tokens/theme.css')
    for (const token of [
      '--ease-m42',
      '--ease-reveal',
      '--scale-reveal',
      '--duration-reveal',
      '--distance-reveal-y',
      '--distance-reveal-x',
      '--scroll-reveal',
      '--stagger-reveal',
      '--stagger-reveal-scroll',
    ]) {
      expect(theme).toMatch(new RegExp(`${token}:`))
    }
    expect(css()).not.toMatch(/--ease-m42:\s*cubic-bezier/)
    expect(css()).not.toMatch(/--ease-reveal:\s*cubic-bezier/)
  })
})

describe('SCN-003 — reduced motion is handled once, for the whole site', () => {
  const block = () => css().slice(css().indexOf('prefers-reduced-motion: reduce'))

  it('collapses durations globally rather than removing animations', () => {
    // Collapsing preserves an animation's end state. Removing it outright would
    // strand StageJourney's panel closed, because it opens by animating a grid
    // track to its final size.
    expect(block()).toMatch(/animation-duration:\s*0\.01ms\s*!important/)
    expect(block()).toMatch(/transition-duration:\s*0\.01ms\s*!important/)
  })

  it('switches the reveal off outright, since a scroll-driven animation ignores duration', () => {
    expect(block()).toMatch(/animation:\s*none\s*!important/)
  })

  it('resets opacity too, because the fallback hides with a plain declaration', () => {
    // That declaration is not a keyframe, so it survives having the animation
    // removed and would leave content invisible.
    expect(block()).toMatch(/opacity:\s*1\s*!important/)
  })
})

describe('SCN-008 — an unsupported engine still renders the page', () => {
  it('gates the scrubbed path behind a support query', () => {
    expect(css()).toMatch(/@supports \(animation-timeline: view\(\)\)/)
  })

  it('gives the first band a time-played entrance, since it is already on screen', () => {
    // A view() timeline reports an element that is already in the viewport as
    // finished, so the opening screen would arrive complete and never move.
    expect(css()).toMatch(/main > section:first-child[^{]*{\s*animation-timeline:\s*auto/)
  })
})
