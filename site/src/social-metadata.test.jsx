import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_ORIGIN,
  SHARE_IMAGE,
  SHARE_IMAGE_WIDTH,
  SHARE_IMAGE_HEIGHT,
  ICON_SVG,
  ICON_PNG,
  APPLE_TOUCH_ICON,
  APPLE_TOUCH_ICON_SIZE,
  absolute,
} from './site-meta.js'
import { HOME_HERO } from './pages/home-hero-copy.js'
import manifest from './assets/social.data.json'

/**
 * #101 — a shared link unfurls as a branded card.
 *
 * A social crawler does not run JavaScript, so none of this can live in
 * Layout.jsx the way the per-route title does. It all sits in the static
 * shell, which means it is duplicated copy with nothing holding it together —
 * the exact shape of the drift #78 was. These tests are that holding.
 *
 * Two couplings matter most. SCN-005 pins the card's words to the shell's own
 * title and description, so the three cannot be edited apart. SCN-006 pins the
 * generated artwork to the hero copy, because the image is the one artifact
 * here that can go stale silently: nothing about a PNG says which words were
 * drawn into it, so the generator records them and this compares that record
 * back to the source.
 */

const SRC = dirname(fileURLToPath(import.meta.url))
const SITE = join(SRC, '..')
const shell = () => readFileSync(join(SITE, 'index.html'), 'utf8')

const meta = (attribute, name) =>
  shell().match(new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="([^"]*)"`, 's'))?.[1] ??
  shell().match(
    new RegExp(`<meta\\s*\\n\\s*${attribute}="${name}"\\s*\\n\\s*content="([^"]*)"`, 's'),
  )?.[1]

const og = (name) => meta('property', `og:${name}`)
const twitter = (name) => meta('name', `twitter:${name}`)

const title = () => shell().match(/<title>([^<]*)<\/title>/)?.[1]
const description = () => meta('name', 'description')

const link = (rel, href) =>
  new RegExp(`<link\\s+rel="${rel}"[^>]*href="${href.replace('.', '\\.')}"`).test(shell()) ||
  new RegExp(`<link\\s+rel="${rel}"\\s+href="${href.replace('.', '\\.')}"`).test(shell())

describe('SCN-001 — a shared link unfurls as a branded card', () => {
  it.each([
    ['type', 'website'],
    ['site_name', 'Mile42'],
    ['locale', 'en_US'],
  ])('declares og:%s', (name, value) => {
    expect(og(name)).toBe(value)
  })

  it.each(['title', 'description', 'url', 'image'])('declares a non-empty og:%s', (name) => {
    expect(og(name)).toBeTruthy()
  })
})

describe('SCN-002 — the card artwork is reachable by a remote crawler', () => {
  it('gives the image an absolute https URL on the production origin', () => {
    expect(og('image')).toBe(absolute(SHARE_IMAGE))
    expect(og('image')).toMatch(/^https:\/\//)
  })

  it('gives the page an absolute url rather than a path', () => {
    expect(og('url')).toBe(`${SITE_ORIGIN}/`)
    expect(og('url')).not.toMatch(/^\//)
  })

  it('ships the file that URL names', () => {
    expect(existsSync(join(SITE, 'public', SHARE_IMAGE))).toBe(true)
  })

  /* A crawler resolves og:image against its own host, so a site-relative path
     silently becomes a URL on whichever domain last linked the page. */
  it('leaves no social URL site-relative', () => {
    for (const value of [og('image'), og('url'), twitter('image')]) {
      expect(value.startsWith(SITE_ORIGIN)).toBe(true)
    }
  })

  /* www.mile42.ai is the canonical host, which makes the bare apex a different
     URL rather than a shorter spelling of the same one. A card advertising the
     apex splits every share between two hosts and attributes none of them to
     the canonical one. */
  it('names the canonical host rather than the bare apex', () => {
    expect(SITE_ORIGIN).toBe('https://www.mile42.ai')

    for (const value of [og('image'), og('url'), twitter('image')]) {
      expect(value).not.toMatch(/^https:\/\/mile42\.ai/)
    }
  })
})

describe('SCN-003 — the card declares its shape and describes itself', () => {
  it('declares the dimensions the artwork actually has', () => {
    expect(og('image:width')).toBe(String(SHARE_IMAGE_WIDTH))
    expect(og('image:height')).toBe(String(SHARE_IMAGE_HEIGHT))
    expect(manifest.shareCard.width).toBe(SHARE_IMAGE_WIDTH)
    expect(manifest.shareCard.height).toBe(SHARE_IMAGE_HEIGHT)
  })

  it('describes what the card shows rather than repeating the description', () => {
    expect(og('image:alt')).toBeTruthy()
    expect(og('image:alt')).not.toBe(description())
    expect(twitter('image:alt')).toBe(og('image:alt'))
  })
})

describe('SCN-004 — X renders the large-format card', () => {
  it('asks for the large-image card', () => {
    expect(twitter('card')).toBe('summary_large_image')
  })

  it.each(['title', 'description', 'image', 'image:alt'])(
    'carries twitter:%s alongside the og equivalent',
    (name) => {
      expect(twitter(name)).toBe(og(name))
    },
  )
})

describe('SCN-005 — the card words cannot drift from the page words', () => {
  it('gives the card the shell title', () => {
    expect(og('title')).toBe(title())
  })

  it('gives the card the shell description', () => {
    expect(og('description')).toBe(description())
  })

  /* The description is the hero's lead. If the page's argument is rewritten and
     the shell keeps the old sentence, a share still sells the old argument. */
  it('keeps the shell description saying what the hero says', () => {
    expect(description()).toBe(HOME_HERO.lead)
  })

  it('keeps the shell title carrying the hero kicker', () => {
    expect(title()).toContain(HOME_HERO.kicker)
  })
})

describe('SCN-006 — the artwork cannot outlive the copy it shows', () => {
  it.each(['kicker', 'heading', 'lead'])('drew the current %s', (part) => {
    expect(manifest.shareCard.copy[part]).toBe(HOME_HERO[part])
  })

  it('drew every heading line from the heading itself', () => {
    expect(manifest.shareCard.headingLines.join(' ')).toBe(HOME_HERO.heading)
  })

  it('drew every lead line from the lead itself', () => {
    expect(manifest.shareCard.leadLines.join(' ')).toBe(HOME_HERO.lead)
  })

  /* The band is resolved from the token rather than transcribed, so this
     catches a palette change that never reached the artwork. */
  it('drew the band the theme currently defines', () => {
    const css = readFileSync(join(SITE, '..', 'design', 'tokens', 'theme.css'), 'utf8')
    const accent = css.match(/--color-accent:\s*(#[0-9a-fA-F]{6});/)[1]
    const mixed =
      '#' +
      [1, 3, 5]
        .map((i) => Math.round(parseInt(accent.slice(i, i + 2), 16) * 0.92))
        .map((c) => c.toString(16).padStart(2, '0'))
        .join('')

    expect(manifest.shareCard.band).toBe(mixed)
    expect(meta('name', 'theme-color')).toBe(mixed)
  })
})

describe('SCN-007 — the card is drawn in the brand typefaces', () => {
  it('records the brand families rather than a fallback', () => {
    expect(manifest.fonts).toEqual(['Merriweather Sans', 'Figtree'])
  })
})

describe('SCN-008 — a browser tab carries the brand mark', () => {
  it.each([
    ['icon', ICON_SVG],
    ['icon', ICON_PNG],
    ['apple-touch-icon', APPLE_TOUCH_ICON],
  ])('declares rel="%s" pointing at %s', (rel, href) => {
    expect(link(rel, href)).toBe(true)
  })

  it.each([ICON_SVG, ICON_PNG, APPLE_TOUCH_ICON])('ships %s', (href) => {
    expect(existsSync(join(SITE, 'public', href))).toBe(true)
  })

  it('cuts the mark from the lockup rather than inventing artwork', () => {
    const icon = readFileSync(join(SITE, 'public', ICON_SVG.slice(1)), 'utf8')
    const lockup = readFileSync(join(SITE, 'src', 'assets', 'mile42-logo.svg'), 'utf8')

    const paths = [...icon.matchAll(/<path\b[^>]*?\bd="([^"]*)"/gs)].map((m) => m[1])
    expect(paths).toHaveLength(3)
    for (const d of paths) expect(lockup).toContain(d)
  })
})

describe('SCN-009 — an iOS home-screen shortcut carries the brand mark', () => {
  it('generates the touch icon at the size iOS asks for', () => {
    expect(manifest.icon.appleTouchSize).toBe(APPLE_TOUCH_ICON_SIZE)
  })
})
