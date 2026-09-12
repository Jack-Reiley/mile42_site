import { describe, it, expect, afterEach, beforeAll } from 'vitest'
import { render, screen, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App, { PAGES } from '../App.jsx'

/**
 * The copy rules from the September 2026 review, pinned on rendered copy so a
 * later copy ticket cannot reintroduce a pattern without the suite saying so.
 *
 * Everything here is counted on what a reader can see, one screen state at a
 * time: header and footer, the header's section panels once opened, and every
 * pane a page can show by selection (the two selector panels, the hard-parts
 * tabs and disclosures, the client journey's stages, the reuse loop's nodes).
 * A page is walked through each of those states and a rule that says "at most
 * one" holds in every state; a rule that says "appears once" holds in the
 * state that shows the copy. Code comments, `aria-label` text, and the source
 * itself are outside the rules, so nothing here reads a file.
 *
 * Rules that are judgment calls (rhythm triads, sentence shape) are not
 * counted here; the copy-pass log and the requirements contract carry those.
 */

const ROUTES = PAGES.map((p) => p.path)

/* A construction is counted inside one text node, which is how it appears in
   copy. "Not sure where to start" and "Not everyone starts at stage one" begin
   a node rather than following a full stop inside one, so neither counts. */
const CONTRAST = [/,\s*not\s/g, /\.\s+Not\s/g]

/* jsdom has no matchMedia. The header asks it whether hovering is real before
   opening a panel on hover, and userEvent's pointer movement reaches that
   handler. False: these tests click, the path a touch device takes too. */
beforeAll(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })
})

afterEach(cleanup)

const textNodes = (root) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const out = []
  for (let n = walker.nextNode(); n; n = walker.nextNode()) out.push(n.nodeValue)
  return out
}

/**
 * Some panels keep a desktop form and a phone form in the DOM at once and let
 * CSS hide one (the hard-parts tabs and disclosures, the reuse loop's two
 * label positions, the Meet Vickee contrast). jsdom applies no stylesheet, so
 * a count over the whole tree would see the same sentence twice. Each count is
 * taken on the two forms a reader can actually see and the larger one is used:
 * the phone form drops anything Tailwind's `hidden` hides, and the desktop
 * form drops anything a breakpoint variant hides. `[hidden]` is dropped from
 * both, the way a browser would.
 */
const views = (root) => {
  const prune = (test) => {
    const clone = root.cloneNode(true)
    for (const el of [...clone.querySelectorAll('[class],[hidden]')]) {
      const tokens = (el.getAttribute('class') || '').split(/\s+/)
      if (el.hasAttribute('hidden') || tokens.some(test)) el.remove()
    }
    return clone
  }
  return [prune((t) => t === 'hidden'), prune((t) => /:hidden$/.test(t))]
}

const countIn = (root, patterns) =>
  Math.max(
    ...views(root).map((v) =>
      textNodes(v).reduce(
        (sum, t) => sum + patterns.reduce((s, p) => s + (t.match(p) || []).length, 0),
        0,
      ),
    ),
  )

const countText = (root, re) =>
  Math.max(...views(root).map((v) => (v.textContent.match(re) || []).length))

const eyebrows = (root) =>
  [...root.querySelectorAll('.font-eyebrow')].map((e) => e.textContent.trim())

/**
 * Render the route and call `check` in every screen state the page can reach:
 * as loaded, with each header panel open, and after each selectable control
 * has been activated in turn. Controls are re-queried before each click, since
 * opening one pane can replace another.
 */
const walk = async (path, check) => {
  const user = userEvent.setup()
  const { container } = render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  check(container)
  for (const name of ['What we do menu', 'How we work menu']) {
    await user.click(screen.getAllByRole('button', { name })[0])
    check(container)
  }
  const selectors = ['button[aria-pressed]', '[role="tab"]', 'button[aria-expanded="false"]']
  for (const selector of selectors) {
    const count = container.querySelectorAll(selector).length
    for (let i = 0; i < count; i++) {
      const control = container.querySelectorAll(selector)[i]
      if (!control) continue
      await user.click(control)
      check(container)
    }
  }
  return container
}

/* The one construction each route is allowed, from the design table. */
const RETAINED = {
  '/': 'Consulting should create momentum, not overhead.',
  '/what-we-do/advisory': 'A legacy estate needs a sequenced path forward, not a rewrite.',
  '/what-we-do/engineering': 'Agents and copilots that operate inside real workflows, not demos.',
  '/what-we-do/engineering/agentic-ai': 'The controls are part of the build, not a review at the end.',
  '/how-we-work': 'Execution is a system, not a sales pitch.',
  '/how-we-work/delivery-model': 'Our progress is measured by value created, not effort expended.',
  '/why-mile42': 'Judgment, not information',
  '/contact': 'A founder, not a form queue.',
  '/insights': 'Arguments, not explainers.',
}

describe('SCN-001 — at most one contrast construction per page', () => {
  it.each(ROUTES)('%s', async (path) => {
    let most = 0
    const container = await walk(path, (c) => {
      most = Math.max(most, countIn(c, CONTRAST))
    })
    expect(most).toBeLessThanOrEqual(1)
    if (RETAINED[path]) {
      expect(most).toBe(1)
      expect(container.textContent).toContain(RETAINED[path])
    } else {
      expect(most).toBe(0)
    }
  })
})

describe('SCN-002 — "tell you honestly" is Contact’s alone', () => {
  it.each(ROUTES)('%s', async (path) => {
    let most = 0
    await walk(path, (c) => {
      most = Math.max(most, countText(c.querySelector('main'), /tell you honestly/gi))
      expect(c.textContent).not.toMatch(/We will tell you honestly/)
      expect(c.textContent).not.toMatch(/Bring the problem/)
    })
    expect(most).toBe(path === '/contact' ? 1 : 0)
  })
})

describe('SCN-003 — no two closing bands match', () => {
  /* Routes that close on a band: everything but Contact (a form) and Privacy. */
  const CLOSING = ROUTES.filter((r) => r !== '/contact' && r !== '/legal/privacy')

  it('collects a distinct heading and lead from every closing band', () => {
    const headings = []
    const leads = []
    for (const path of CLOSING) {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      )
      const bands = [...screen.getByRole('main').querySelectorAll('section')]
      const last = bands.at(-1)
      const h2 = last.querySelector('h2')
      expect(h2, path).not.toBeNull()
      headings.push(h2.textContent.trim())
      const lead = last.querySelector('p')
      leads.push(lead ? lead.textContent.trim() : `(no lead on ${path})`)
      cleanup()
    }
    expect(new Set(headings).size).toBe(headings.length)
    expect(new Set(leads).size).toBe(leads.length)
    expect(headings).not.toContain('Tell us what needs to work.')
  })
})

describe('SCN-004 — the "That is not X. It is Y." move is gone', () => {
  it.each(ROUTES)('%s', async (path) => {
    await walk(path, (c) => {
      for (const t of textNodes(c)) {
        expect(t).not.toMatch(/\b(That|This|It) is not\b[^.]*\.\s+It is\b/)
      }
    })
  })
})

describe('SCN-005 — four phrases appear once site-wide', () => {
  const PHRASES = [
    ['blank page', '/how-we-work/delivery-model'],
    ['skin in the game', '/how-we-work'],
    ['table stakes', '/meet-vickee'],
    ['in the room', '/what-we-do/advisory'],
  ]

  it.each(PHRASES)('"%s" is on %s and nowhere else', async (phrase, home) => {
    const re = new RegExp(phrase, 'gi')
    for (const path of ROUTES) {
      let most = 0
      await walk(path, (c) => {
        const main = c.querySelector('main')
        most = Math.max(most, countText(main, re))
        const chrome = document.body.textContent.replace(main.textContent, '')
        expect(chrome, `${path} header/footer`).not.toMatch(re)
      })
      expect(most, path).toBe(path === home ? 1 : 0)
      cleanup()
    }
  })
})

describe('SCN-006 — abstractions have a subject', () => {
  it.each(ROUTES)('%s names no "senior judgment" or "humans"', async (path) => {
    await walk(path, (c) => {
      expect(c.textContent).not.toMatch(/senior judgment/i)
      expect(c.textContent).not.toMatch(/\bhumans\b/i)
    })
  })

  it('the delivery model names the engineer who owns the work', async () => {
    const container = await walk('/how-we-work/delivery-model', () => {})
    expect(
      screen.getByRole('heading', {
        name: 'Where agents work, and what stays with the engineer who owns it.',
      }),
    ).toBeInTheDocument()
    expect(eyebrows(container)).toContain('Three things that stay with a named person')
    expect(eyebrows(container)).toContain('Engineer’s decision')
  })

  it('the agentic AI page names the team and the person', async () => {
    const seen = new Set()
    await walk('/what-we-do/engineering/agentic-ai', (c) => {
      for (const s of [
        'what your team has to approve',
        'A named person accountable for every consequential decision.',
      ]) {
        if (c.textContent.includes(s)) seen.add(s)
      }
    })
    expect([...seen]).toHaveLength(2)
  })
})

describe('SCN-008 — label-only eyebrows are gone, audience eyebrows stay', () => {
  const RETIRED = [
    'Core practice', 'How we engage', 'Offering · Phase Zero', 'Offering · Phase Zero pilot',
    'Proof', 'Capabilities', 'Engagements', 'What we offer', 'What we bring',
  ]

  it.each(ROUTES)('%s renders none of the retired labels as an eyebrow', async (path) => {
    await walk(path, (c) => {
      expect(eyebrows(c).filter((t) => RETIRED.includes(t)), path).toEqual([])
    })
  })

  it.each([
    ['/what-we-do', ['Not sure where to start', 'You need clarity', 'You need to execute']],
    ['/', ['Before a major investment']],
    ['/how-we-work', ['Client journey', 'Delivery model', 'Engagement model']],
  ])('%s still carries its audience and section eyebrows', async (path, expected) => {
    const container = await walk(path, () => {})
    const present = eyebrows(container)
    for (const e of expected) expect(present, e).toContain(e)
  })

  it.each(['/what-we-do', '/what-we-do/advisory', '/how-we-work'])(
    '%s opens its Phase Zero panel on the title',
    async (path) => {
      await walk(path, () => {})
      const title = screen
        .getAllByRole('heading', { level: 2 })
        .find((h) => /Start with a pilot|The low-risk way in/.test(h.textContent))
      expect(title).toBeDefined()
      expect(title.parentElement.querySelector('.font-eyebrow')).toBeNull()
    },
  )
})

describe('SCN-010 — the Why Mile42 principles are a title and one sentence', () => {
  it('renders five rows in order', async () => {
    await walk('/why-mile42', () => {})
    const heading = screen.getByRole('heading', { name: 'Five principles that hold under pressure.' })
    const list = within(heading.closest('section')).getByRole('list')
    const rows = within(list).getAllByRole('listitem')
    expect(rows.map((r) => r.querySelector('h3').textContent)).toEqual([
      'Clarity over complexity',
      'Context before solutions',
      'Judgment, not information',
      'Meet you where you are',
      'Each engagement improves the next',
    ])
    for (const r of rows) {
      const body = r.querySelector('p').textContent.trim()
      expect(body.match(/[.!?](\s|$)/g), body).toHaveLength(1)
    }
  })
})

describe('SCN-012 — no em dash in rendered copy', () => {
  it.each(ROUTES)('%s', async (path) => {
    await walk(path, (c) => {
      expect(c.textContent).not.toContain('—')
    })
  })
})
