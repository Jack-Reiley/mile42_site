import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import App, { PAGES } from './App.jsx'

/**
 * #97 — the site went live.
 *
 * It used to mount under /working, with a coming-soon splash answering every
 * other path and `noindex, nofollow` on the shell and the hosting config. All
 * three came off together, so this file is the guard for the whole posture
 * rather than for the router change alone.
 *
 * The scenarios worth the most here are SCN-009 and SCN-007. SCN-009 sweeps the
 * shipped tree for the retired prefix, because the failure this change invites
 * is a single surviving `/working` in a redirect or an href that nothing else
 * looks at. SCN-007 pins the shell title to the route table: lifting `noindex`
 * is what makes the shell's own copy reach a crawler, and duplicated copy that
 * nothing holds together is exactly the drift #78 was.
 */

const SELF = fileURLToPath(import.meta.url)
const SRC = dirname(SELF)
const SITE = join(SRC, '..')
const ROOT = join(SITE, '..')
const rootFile = (...parts) => readFileSync(join(ROOT, ...parts), 'utf8')

const at = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

const heading = () => screen.getByRole('heading', { level: 1 }).textContent

const HOME_HEADING = 'The consulting model is broken'

/* Every file the deploy ships or that configures it. `_redirects` carries no
   extension and is the single most important file in this sweep, so the walk
   excludes what is binary rather than allowlisting suffixes.

   The historical requirements documents are deliberately absent: they narrate
   the prefix in past tense as records of work that shipped that way, and
   rewriting them would falsify the record. */
const BINARY = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.ico', '.woff', '.woff2']

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return walk(path)
    return BINARY.includes(extname(entry.name).toLowerCase()) ? [] : [path]
  })

/* This file is excluded from its own sweeps. It has to name the thing it
   forbids in order to forbid it, and a guard that fails on its own assertions
   guards nothing. */
const shippedFiles = () =>
  [
    ...walk(join(SITE, 'src')),
    ...walk(join(SITE, 'public')),
    join(SITE, 'index.html'),
    join(ROOT, 'netlify.toml'),
  ].filter((file) => file !== SELF)

/* The scenario forbids the prefix in links, routes, and redirect targets, not
   in prose. A comment explaining why a test stopped reproducing the old mount
   is exactly the historical record the scenario permits, so comments come out
   before the sweep rather than being caught by it. */
const withoutComments = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/^\s*(\/\/|#).*$/gm, ' ')

describe('SCN-001 — the site answers at the root', () => {
  it('renders the Home page at /', () => {
    at('/')
    expect(heading()).toContain(HOME_HEADING)
  })

  it('no longer ships a coming-soon splash to render instead', () => {
    expect(screen.queryByText(/coming soon/i)).toBeNull()
  })
})

describe('SCN-002 — every designed route is reachable at its unprefixed path', () => {
  it.each(PAGES.map((p) => [p.path]))('%s renders without a prefix', (path) => {
    const { container } = at(path)
    expect(container.querySelector('main section')).not.toBeNull()
  })

  it('declares every route root-relative rather than prefixed', () => {
    for (const { path } of PAGES) expect(path).toMatch(/^\/(?!working\b)/)
  })
})

describe('SCN-003 — the coming-soon splash no longer exists', () => {
  it('has no splash component on disk', () => {
    expect(existsSync(join(SRC, 'pages', 'ComingSoon.jsx'))).toBe(false)
  })

  it('leaves no code path rendering one', () => {
    for (const file of shippedFiles()) {
      expect(readFileSync(file, 'utf8')).not.toContain('ComingSoon')
    }
  })
})

describe('SCN-004 — an old prefixed URL lands on the site rather than an error', () => {
  it.each(['/working', '/working/', '/working/legal/privacy'])(
    '%s arrives at the Home page',
    (path) => {
      at(path)
      expect(heading()).toContain(HOME_HEADING)
    },
  )

  /* The prefix was never a path segment the router knew about, so nothing here
     should treat a path that merely starts with those letters as special. */
  it('does not give an unrelated path beginning with the same letters a special case', () => {
    at('/workinggroup')
    expect(heading()).toContain(HOME_HEADING)
  })
})

describe('SCN-005 — the moved Agentic AI page redirects at its root path', () => {
  const redirects = () => rootFile('site', 'public', '_redirects')

  it('sends the host redirect to the unprefixed source path', () => {
    expect(redirects()).toMatch(
      /^\/agentic-ai\s+\/what-we-do\/engineering\/agentic-ai\s+301$/m,
    )
  })

  it('resolves the same path in the app to the same destination', () => {
    at('/agentic-ai')
    expect(heading()).toBe('Agentic AI, implemented.')
  })
})

describe('SCN-006 — search engines are no longer asked to skip the site', () => {
  it('leaves no robots directive on the shell', () => {
    expect(rootFile('site', 'index.html')).not.toMatch(/name="robots"/)
  })

  it('leaves no robots directive on the hosting configuration', () => {
    expect(rootFile('netlify.toml')).not.toMatch(/X-Robots-Tag/)
  })
})

describe('SCN-007 — the shell describes the site rather than the splash', () => {
  const shell = () => rootFile('site', 'index.html')
  const tag = (pattern) => shell().match(pattern)?.[1]

  const homeTitle = () => PAGES.find((p) => p.path === '/').title

  it('carries the Home page title so the two cannot drift apart', () => {
    expect(tag(/<title>([^<]*)<\/title>/)).toBe(homeTitle())
  })

  it('describes the offering rather than announcing a launch', () => {
    const description = tag(/<meta\s+name="description"\s+content="([^"]*)"/)

    expect(description).not.toMatch(/coming soon/i)
    expect(description.length).toBeGreaterThan(50)
  })
})

describe('SCN-008 — the form declaration stays out of the index', () => {
  it('keeps its own robots directive', () => {
    expect(rootFile('site', 'public', '__forms.html')).toMatch(
      /<meta name="robots" content="noindex, nofollow"/,
    )
  })

  it('is still linked by nothing a visitor can reach', () => {
    const linked = shippedFiles().filter((file) =>
      /(href|to)=["'][^"']*__forms\.html/.test(readFileSync(file, 'utf8')),
    )

    expect(linked).toEqual([])
  })
})

describe('SCN-009 — no link, route, or redirect carries the retired prefix', () => {
  it('carries no link, route, or redirect target using it', () => {
    const offenders = shippedFiles().filter((file) =>
      withoutComments(readFileSync(file, 'utf8')).includes('/working'),
    )

    expect(offenders.map((f) => f.slice(ROOT.length + 1))).toEqual([])
  })

  /* The files the mount actually lived in get the blunt check: not even a
     comment should still describe them as prefixed. */
  it('leaves no trace at all in the files that carried the mount', () => {
    const carriers = [
      join(SRC, 'main.jsx'),
      join(SITE, 'public', '_redirects'),
      join(SITE, 'index.html'),
      join(ROOT, 'netlify.toml'),
    ]

    for (const file of carriers) {
      expect(readFileSync(file, 'utf8')).not.toContain('/working')
    }
  })
})

describe('SCN-011 — a superseded contract clause is recorded rather than dropped', () => {
  it('records in the shipped contract which ticket retired its scenario', () => {
    const contract = rootFile('docs', 'requirements', '94-privacy-policy-copy.md')

    expect(contract).toMatch(/SCN-010[\s\S]{0,400}superseded by #97/i)
  })

  it('leaves no test asserting the mount or the directives it removed', () => {
    const privacy = readFileSync(join(SRC, 'pages', 'Privacy.test.jsx'), 'utf8')

    expect(privacy).not.toContain('WORKING_BASE')
    expect(privacy).not.toContain('X-Robots-Tag')
  })
})
