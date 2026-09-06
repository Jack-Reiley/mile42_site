import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import App, { PAGES } from './App.jsx'

/**
 * #107 — the product was renamed from Dewey to Vickee.
 *
 * The per-page suites assert the new name where a reader meets it. This file
 * carries the claims that are about the tree rather than about a page, which is
 * why it sits beside `go-live.test.jsx` rather than under `pages/`: the failure
 * a rename invites is a single surviving mention in a file nothing else looks
 * at, and only a sweep catches that.
 *
 * SCN-010 is the one worth the most. A rename this broad is done with a
 * substitution, and a substitution either rewrites too little or too much. The
 * three citations it must not touch are named here with their reasons, so an
 * over-broad pass fails as loudly as an incomplete one.
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

const BINARY = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.ico', '.woff', '.woff2']
const SKIP_DIR = ['node_modules', 'dist', '.vite']

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return SKIP_DIR.includes(entry.name) ? [] : walk(path)
    return [path]
  })

/* Text the sweep can read. Paths are checked separately, so a binary is still
   walked for its name and only skipped for its contents. */
const readable = (path) => !BINARY.includes(extname(path).toLowerCase())

/* This file names the retired product in order to forbid it, so it is excluded
   from its own sweeps. Requirements documents are excluded for the reason #103
   applied to #60 and #97 applied to `/working`: they are versioned records of
   what was true when they shipped, and rewriting them would falsify the record.
   They live outside the walked directories, so nothing here reaches them. */
const sweptFiles = () =>
  [...walk(join(SITE, 'src')), ...walk(join(SITE, 'public')), ...walk(join(SITE, 'scripts'))]
    .filter((file) => file !== SELF)

describe('SCN-002 — the old route permanently redirects', () => {
  const redirects = () => rootFile('site', 'public', '_redirects')

  it('sends the host redirect from the old path to the new one', () => {
    expect(redirects()).toMatch(/^\/meet-dewey\s+\/meet-vickee\s+301$/m)
  })

  /* Netlify takes the first match, so a rule below the catch-all never runs.
     The catch-all returns 200, which would make the old path serve the app and
     resolve client-side instead of redirecting, and a crawler would never see
     the 301 that moves the inbound links. */
  it('places the rule above the SPA fallback so it is matched first', () => {
    const text = redirects()

    expect(text.indexOf('/meet-dewey')).toBeLessThan(text.indexOf('/*  /index.html'))
  })

  /* Not redundant with the rule above. `_redirects` is read by Netlify and
     never runs for a navigation that happens inside the loaded app, which is
     the case an in-app link to the old path would hit. */
  it('resolves the old path to the new page inside the app', () => {
    at('/meet-dewey')

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Intelligence is table stakes. Context is where you win.',
    )
  })

  it('serves the page at the new path with the renamed title', () => {
    const page = PAGES.find((p) => p.path === '/meet-vickee')

    expect(page).toBeDefined()
    expect(page.title).toBe('Meet Vickee · Mile42')
    expect(PAGES.some((p) => p.path === '/meet-dewey')).toBe(false)
  })
})

describe('SCN-004 — no user-visible surface names the retired product', () => {
  /* Rendered text and the accessible names beside it. The catalog drawer and
     the librarian diagram carry their meaning in `aria-label` rather than in
     text, so a check on `textContent` alone would miss exactly the surfaces
     that were hardest to get right. */
  it.each(PAGES.map((p) => [p.path]))('%s', (path) => {
    const { container } = at(path)

    expect(container.textContent).not.toMatch(/dewey/i)

    const labels = [...container.querySelectorAll('[aria-label],[alt],[title]')].flatMap((el) =>
      ['aria-label', 'alt', 'title'].map((a) => el.getAttribute(a)).filter(Boolean),
    )

    expect(labels.filter((value) => /dewey/i.test(value))).toEqual([])
  })
})

describe('SCN-007 — no shipped path is named after the retired product', () => {
  it('leaves no file or directory carrying the old name', () => {
    const named = [...sweptFiles(), ...walk(join(ROOT, 'design'))]
      .filter((path) => /dewey/i.test(path))
      .map((path) => path.slice(ROOT.length + 1))

    expect(named).toEqual([])
  })
})

describe('SCN-009 — the illustration carries the new name end to end', () => {
  const assets = join(SRC, 'assets', 'illustrations')
  const data = () => JSON.parse(readFileSync(join(assets, 'illustrations.data.json'), 'utf8'))

  it('keys the entry and its generated variants by the new name', () => {
    expect(data()['vickee-librarian']).toBeDefined()
    expect(data()['dewey-librarian']).toBeUndefined()
  })

  /* The variants are emitted by `npm run illustrations:build` from the source
     master's filename, so a key renamed by hand without re-running the build
     leaves the JSON describing files that are not on disk. The records carry
     dimensions rather than paths, so the filenames are rebuilt from the key the
     same way the build writes them. */
  it('ships every variant the data file declares', () => {
    const files = ['vickee-librarian.webp'].concat(
      data()['vickee-librarian'].variants.map((v) => `vickee-librarian-${v.width}.webp`),
    )

    for (const file of files) {
      expect(existsSync(join(assets, file))).toBe(true)
    }
  })

  it('describes the artwork without naming the product', () => {
    const manifest = readFileSync(join(assets, 'manifest.js'), 'utf8')

    expect(manifest).toContain("'vickee-librarian'")
    expect(manifest).not.toMatch(/dewey/i)
  })
})

describe('SCN-010 — the citations that must survive the rename are named here', () => {
  /* Each of these mentions the old name for a reason other than describing the
     product, so rewriting it would make the comment wrong rather than stale.
     They are listed with their file so that moving one still fails this. */
  const PRESERVED = [
    {
      file: join(SRC, 'pages', 'MeetVickee.jsx'),
      line: 'heading was "Meet Dewey. The librarian for AI agents (and humans)."',
      why: 'a verbatim quotation of the heading #77 shipped, under the name it shipped with',
    },
    {
      file: join(SRC, 'pages', 'MeetVickee.jsx'),
      line: 'design_handoff_meet_dewey_context_section',
      why: 'the filename of a design handoff that is named that outside this repository',
    },
    {
      file: join(SRC, 'components', 'LibrarianDiagram.jsx'),
      line: 'design/illustrations/Dewey Homepage Graphic Integration',
      why: 'the same, for the handoff the diagram was drawn from',
    },
  ]

  /* The redirect is the one place the old path has to survive as a live value
     rather than as prose: a 301 that does not name what it moves cannot move
     it. SCN-002 asserts both of these exist; they are listed again here so the
     sweep below permits them by name instead of by a pattern loose enough to
     let a stray mention through with them. */
  const REDIRECT = [
    "{ from: '/meet-dewey', to: '/meet-vickee' },",
    '/meet-dewey  /meet-vickee  301',
    '# The product was renamed from Dewey to Vickee. The old path is public and has',
  ]

  it.each(PRESERVED.map((p) => [p.why, p]))('preserves %s', (_why, { file, line }) => {
    expect(readFileSync(file, 'utf8')).toContain(line)
  })

  /* The claim that makes the exemptions safe: nothing else survived. Without
     this, the lists above would document a handful of permitted mentions while
     any number of others sat unnoticed beside them. */
  it('permits no other mention anywhere in the shipped source', () => {
    const permitted = PRESERVED.map((p) => p.line).concat(REDIRECT)

    const offenders = sweptFiles()
      .filter(readable)
      .flatMap((path) =>
        readFileSync(path, 'utf8')
          .split('\n')
          .map((line, i) => ({ path: path.slice(ROOT.length + 1), n: i + 1, line }))
          .filter(({ line }) => /dewey/i.test(line))
          .filter(({ line }) => !permitted.some((allowed) => line.includes(allowed))),
      )
      .map(({ path, n, line }) => `${path}:${n} ${line.trim()}`)

    expect(offenders).toEqual([])
  })
})
