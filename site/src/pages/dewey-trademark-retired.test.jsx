import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter } from 'react-router'
import Home from './Home.jsx'
import MeetDewey from './MeetDewey.jsx'

/**
 * #103 — the trademark symbol is retired from every Dewey mark.
 *
 * #60 applied it to headings and brand marks with a legal rationale that held
 * on its own terms. The decision changed; the site no longer claims the mark.
 *
 * One suite across both pages rather than two files, because the claim is a
 * single one: nowhere on the site does the name carry a mark.
 *
 * The rendered assertions and the source scan are not redundant. React decodes
 * `&#8482;` in JSX children, so a rendered assertion cannot tell the entity
 * from the literal, and both spellings were in use here. The scan reads source,
 * which is also what catches the symbol inside a comment — the form it took in
 * MeetDewey.jsx, where a comment from #91 asserted the name "still carries its
 * mark everywhere else on the page".
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const MARKS = ['™', '&#8482;', '&trade;']

const draw = (Page) =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Page />
    </MemoryRouter>,
  )

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name)
    if (e.isDirectory()) return e.name === 'assets' ? [] : sourceFiles(path)
    const text = /\.(jsx|js|css|json)$/.test(e.name)
    return e.isFile() && text && !e.name.includes('.test.') ? [path] : []
  })
}

describe('SCN-001 — the Dewey page carries no trademark symbol', () => {
  it('states the pillars heading without a mark', () => {
    const { container } = draw(MeetDewey)
    const headings = [...container.querySelectorAll('h2')].map((h) => h.textContent)

    // The exact string, not a prefix. `toHaveTextContent` matches substrings,
    // so an assertion shaped that way passes just as happily on the marked
    // heading this replaces.
    expect(headings).toContain('Why teams put Dewey between their data and their agents.')
  })

  it('renders no trademark symbol anywhere on the page', () => {
    const { container } = draw(MeetDewey)
    expect(container.textContent).not.toContain('™')
  })
})

describe('SCN-002 — the homepage carries no trademark symbol', () => {
  it('states the Dewey panel heading without a mark', () => {
    draw(Home)
    const heading = screen.getByRole('heading', { level: 3, name: /Meet Dewey/i })

    expect(heading.textContent).toBe(
      'Meet Dewey, the knowledge layer that keeps agents out of your systems of record.',
    )
  })

  /* The drawer plate is the one that was written as an entity rather than the
     literal character, so it is the mark a rendered check could most easily
     have been written to miss. */
  it('labels the catalog drawer plate with the bare name', () => {
    const { container } = draw(Home)
    const plate = [...container.querySelectorAll('span')].find(
      (s) => s.textContent.trim() === 'Dewey',
    )

    expect(plate).toBeDefined()
  })

  it('renders no trademark symbol anywhere on the page', () => {
    const { container } = draw(Home)
    expect(container.textContent).not.toContain('™')
  })
})

describe('SCN-003 — the homepage heading returns to its pre-trademark measure', () => {
  /* The line count itself is a browser observation: the suite omits the
     Tailwind plugin, so jsdom never resolves `max-w-[66rem]` to a width. What
     is asserted here is the constant, which is the thing a later change would
     get wrong. 66rem is the measured pre-#60 value; #60 raised it to 68 only to
     fit the symbol. */
  it('caps the Dewey heading at the width it had before the symbol', () => {
    const home = readFileSync(join(SRC, 'pages', 'Home.jsx'), 'utf8')

    expect(home).toContain('<H3 as="h3" className="max-w-[66rem]">')
    expect(home).not.toContain('max-w-[68rem]')
  })
})

describe('SCN-005 — the symbol cannot return unnoticed', () => {
  /* PR #66 once dropped the mark by accident and #77 existed to put it back.
     The same class of merge can put it back now, and a rendered assertion on
     two pages would not see it land in a third. */
  it('leaves no trademark symbol, in any spelling, anywhere in the source', () => {
    const offenders = sourceFiles(SRC)
      .flatMap((path) =>
        readFileSync(path, 'utf8')
          .split('\n')
          .map((line, i) => ({ path: path.slice(SRC.length + 1), n: i + 1, line }))
          .filter(({ line }) => MARKS.some((mark) => line.includes(mark))),
      )
      .map(({ path, n, line }) => `${path}:${n} ${line.trim()}`)

    expect(offenders).toEqual([])
  })
})
