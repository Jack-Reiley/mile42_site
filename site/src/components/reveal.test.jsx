import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Section } from './primitives.jsx'

/**
 * The static-content reveal (#54).
 *
 * The behaviour that matters is mostly CSS, so these cover the parts a
 * component test can actually prove: that every section opts in by default,
 * that the opt-out works and is used where it must be, and that the motion is
 * declared with tokens rather than literals.
 *
 * The reveal's visual behaviour, the reduced-motion position and the
 * unsupported-browser fallback are browser checks; see the verification report.
 */

const HERE = dirname(fileURLToPath(import.meta.url))
const read = (p) => readFileSync(resolve(HERE, p), 'utf8')

describe('SCN-002 — content never waits on JavaScript to become visible', () => {
  it('drives the reveal from CSS, with no observer or timer in the component layer', () => {
    const primitives = read('./primitives.jsx')
    expect(primitives).not.toMatch(/IntersectionObserver/)
    expect(primitives).not.toMatch(/requestAnimationFrame|setTimeout/)
  })

  it('leaves the revealed state as the resting state, so removing the animation shows content', () => {
    const css = read('../styles/index.css')
    const keyframes = css.slice(css.indexOf('@keyframes m42-reveal'))
    // `to` is opacity 1 with no transform: the state an element falls back to
    // when the animation is absent, which is what makes `animation: none` safe
    // under reduced motion.
    expect(keyframes).toMatch(/to\s*{\s*opacity:\s*1;\s*transform:\s*none;/)
  })
})

describe('SCN-004 — the hero does not animate', () => {
  it('gives Section an opt-out', () => {
    const { container } = render(<Section reveal={false}>hero</Section>)
    expect(container.querySelector('section').className).not.toMatch(/m42-reveal/)
  })

  it('uses that opt-out on the home hero', () => {
    const home = read('../pages/Home.jsx')
    const firstSection = home.slice(home.indexOf('<Section'))
    expect(firstSection.slice(0, 200)).toMatch(/reveal=\{false\}/)
  })
})

describe('SCN-005 — every other section opts in without being asked', () => {
  it('reveals by default', () => {
    const { container } = render(<Section>body</Section>)
    expect(container.querySelector('section').className).toMatch(/m42-reveal/)
  })
})

describe('SCN-006 — the reveal declares no literal duration or easing', () => {
  it('resolves its duration and easing from tokens', () => {
    const css = read('../styles/index.css')
    const rule = css.slice(css.indexOf('.m42-reveal'), css.indexOf('.m42-reveal') + 400)
    expect(rule).toMatch(/var\(--duration-reveal\)/)
    expect(rule).toMatch(/var\(--ease-m42\)/)
    expect(rule).not.toMatch(/\d+m?s\b/)
  })

  it('declares those tokens once, in the token file', () => {
    const theme = read('../../../design/tokens/theme.css')
    expect(theme).toMatch(/--ease-m42:/)
    expect(theme).toMatch(/--duration-reveal:/)
    // and no longer in the site's own stylesheet
    expect(read('../styles/index.css')).not.toMatch(/--ease-m42:\s*cubic-bezier/)
  })
})

describe('SCN-003 — reduced motion is handled once, for the whole site', () => {
  it('collapses durations globally rather than removing animations', () => {
    const css = read('../styles/index.css')
    const block = css.slice(css.indexOf('prefers-reduced-motion'))
    // Collapsing the duration preserves an animation's end state. Removing the
    // animation outright would strand StageJourney's panel closed, because it
    // opens by animating a grid track to its final size.
    expect(block).toMatch(/animation-duration:\s*0\.01ms\s*!important/)
    expect(block).toMatch(/transition-duration:\s*0\.01ms\s*!important/)
  })

  it('switches the reveal off outright, since a scroll-driven animation ignores duration', () => {
    const css = read('../styles/index.css')
    const block = css.slice(css.indexOf('prefers-reduced-motion'))
    expect(block).toMatch(/\.m42-reveal\s*{\s*animation:\s*none\s*!important/)
  })
})
