import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Privacy from './Privacy.jsx'

/**
 * #94 — the page stopped being a stub and became a legal representation of what
 * this site does with a visitor's information.
 *
 * That changes what is worth testing. Copy assertions guard the shape of the
 * page, but the scenarios with lasting value are SCN-005 and SCN-006: they pin
 * the policy's factual claims to the source, so adding a tracker or renaming
 * the spam trap fails here rather than quietly turning the policy into a false
 * statement. The counsel notes call that out as a standing rule; this is the
 * enforceable half of it.
 *
 * Tone is checked by source scan for the reason brand-band-tones.test.jsx
 * gives: the suite omits the Tailwind plugin, so jsdom never resolves a utility
 * to a colour and a rendered contrast assertion would measure nothing.
 */

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SRC, '..', '..')
const source = (...parts) => readFileSync(join(SRC, ...parts), 'utf8')
const rootFile = (...parts) => readFileSync(join(ROOT, ...parts), 'utf8')

/* The page has no router links of its own, but page tests here render inside a
   router so that adding one later does not fail with a context error instead of
   the assertion that matters. */
const page = () =>
  render(
    <MemoryRouter>
      <Privacy />
    </MemoryRouter>,
  )

const sections = (container) => [...container.querySelectorAll('section')]

describe('SCN-001 — the page carries real policy copy rather than a placeholder', () => {
  const TOPICS = [
    'Who we are, and how to reach us.',
    'What we collect.',
    'How we collect it.',
    'Why we process it.',
    'Who we share it with.',
    'How long we keep it.',
    'Where it is stored.',
    'Cookies and tracking signals.',
    'Your rights.',
    'Security.',
    'Children.',
    'Changes to this policy.',
  ]

  it.each(TOPICS)('answers "%s"', (heading) => {
    const { container } = page()
    const headings = [...container.querySelectorAll('h2')].map((h) => h.textContent.trim())
    expect(headings).toContain(heading)
  })

  it('leaves no placeholder on the page', () => {
    const { container } = page()
    /* The stub used the Placeholder primitive, which stamps its own tag. Both
       the component and the word it renders have to be gone. */
    expect(source('pages', 'Privacy.jsx')).not.toMatch(/<Placeholder/)
    expect(container.textContent).not.toMatch(/Placeholder/i)
  })

  it('no longer admits that no policy has been written', () => {
    const { container } = page()
    expect(container.textContent).not.toMatch(/no privacy policy has been written/i)
    expect(container.textContent).not.toMatch(/counsel must draft/i)
  })
})

describe('SCN-002 — the page carries a real heading hierarchy', () => {
  it('carries exactly one h1, and it names the page', () => {
    const { container } = page()
    const h1s = container.querySelectorAll('h1')

    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent('Privacy policy.')
  })

  it('introduces each policy section with an h2', () => {
    const { container } = page()
    expect(container.querySelectorAll('h2').length).toBeGreaterThanOrEqual(12)
  })

  it('nests the two jurisdiction subsections under the rights heading as h3', () => {
    const { container } = page()
    /* Scoped to the block the rights heading owns. Asserting the strings exist
       anywhere on the page passes just as happily when both headings sit under
       "Security.", which is the regression F-001 found this test missing. */
    const rights = [...container.querySelectorAll('h2')].find((h) =>
      /Your rights/.test(h.textContent),
    )
    const nested = [...rights.closest('div').querySelectorAll('h3')].map((h) =>
      h.textContent.trim(),
    )

    expect(nested).toEqual([
      'If you are in the United Kingdom or the EEA',
      'If you are in a US state with a privacy law',
    ])
  })

  it('skips no heading level', () => {
    const { container } = page()
    const levels = [...container.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
      Number(h.tagName[1]),
    )

    /* Each heading may stay level, go up any amount, or step down by one. A
       jump from h2 straight to h4 is what this catches. */
    levels.forEach((level, i) => {
      if (i === 0) return
      expect(level - levels[i - 1]).toBeLessThanOrEqual(1)
    })
  })
})

describe('SCN-003 — the last-updated date sits below the header', () => {
  it('keeps the header band to its eyebrow, heading, and lead', () => {
    const { container } = page()
    const header = sections(container)[0]

    expect(header).not.toHaveTextContent(/Last updated/i)
    expect(header.querySelector('h1')).toHaveTextContent('Privacy policy.')
  })

  it('places the date at the top of the content column', () => {
    const { container } = page()
    const body = sections(container)[1]

    expect(body).toHaveTextContent(/Last updated/i)
    /* First line of the band, ahead of the first policy heading. */
    const firstHeading = body.querySelector('h2')
    const date = [...body.querySelectorAll('p')].find((p) => /Last updated/i.test(p.textContent))
    expect(date.compareDocumentPosition(firstHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('states the month and year it was last updated', () => {
    const { container } = page()
    expect(container).toHaveTextContent('Last updated August 2026')
  })
})

describe('SCN-004 — the date takes a tone legible on the band it sits on', () => {
  const privacy = () => source('pages', 'Privacy.jsx')

  it('gives the date the ink tone', () => {
    const line = privacy()
      .split('\n')
      .find((l) => l.includes('Last updated'))

    expect(line).toContain('tone="ink"')
  })

  it('keeps the date off the brand band, where ink would fail contrast', () => {
    const text = privacy()
    const open = text.indexOf('<Section band="brand"')
    const close = text.indexOf('</Section>', open)

    expect(text.slice(open, close)).not.toContain('Last updated')
  })
})

describe('SCN-005 — the no-tracking claim matches the site', () => {
  /* Vendor signatures, not the word "analytics": the word appears legitimately
     in page copy and in the policy's own claim. */
  const VENDORS = [
    'googletagmanager',
    'google-analytics',
    'gtag(',
    'plausible.io',
    'usefathom',
    'segment.com',
    'hotjar',
    'recaptcha',
    'hcaptcha',
    'doubleclick',
    'fbevents',
    'clarity.ms',
    'mixpanel',
  ]

  /* The scenario covers "the application source or the HTML shell". Scanning
     only the shell, which is what F-002 found, leaves a gtag( call inside a
     component free to ship with this guard still green. Test files are excluded
     because this one names every signature it is looking for. */
  const appSource = () =>
    readdirSync(SRC, { recursive: true })
      .filter((f) => typeof f === 'string' && /\.(jsx?|css)$/.test(f) && !f.includes('.test.'))
      .map((f) => readFileSync(join(SRC, f), 'utf8'))
      .join('\n')
      .toLowerCase()

  it.each(VENDORS)('ships no %s in the HTML shell', (vendor) => {
    expect(rootFile('site', 'index.html').toLowerCase()).not.toContain(vendor)
  })

  it.each(VENDORS)('ships no %s in the application source', (vendor) => {
    expect(appSource()).not.toContain(vendor)
  })

  it('loads no third-party script from the HTML shell', () => {
    const shell = rootFile('site', 'index.html')
    const srcs = [...shell.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1])

    /* Local module entry only. Anything absolute is a third party. */
    expect(srcs.every((src) => src.startsWith('/'))).toBe(true)
  })

  it('states the claim the assertions above are protecting', () => {
    const { container } = page()
    expect(container).toHaveTextContent(/no analytics/i)
    expect(container).toHaveTextContent(/no CAPTCHA vendor/i)
  })
})

describe('SCN-006 — the contact-form description matches the form', () => {
  it('describes a hidden field that only automated spam completes', () => {
    const { container } = page()
    expect(container).toHaveTextContent(/hidden field that no person can see or fill in/i)
  })

  it('is describing a trap the contact form actually carries', () => {
    /* Named here, exercised in depth by Contact.test.jsx. This asserts only
       that the thing the policy describes still exists. */
    expect(source('pages', 'Contact.jsx')).toMatch(/HONEYPOT_FIELD\s*=\s*'[^']+'/)
  })

  it('names Netlify as the processor that receives submissions', () => {
    const { container } = page()
    expect(container).toHaveTextContent(/Netlify/)
  })
})

describe('SCN-008 — a reader can act on the policy', () => {
  it('offers the privacy address in the body', () => {
    const { container } = page()
    const mailtos = [...container.querySelectorAll('a[href^="mailto:"]')]

    expect(mailtos.length).toBeGreaterThanOrEqual(2)
  })

  it('closes on the same address it gives in the body', () => {
    const { container } = page()
    const hrefs = [...container.querySelectorAll('a[href^="mailto:"]')].map((a) =>
      a.getAttribute('href'),
    )

    expect(new Set(hrefs).size).toBe(1)
  })
})

describe('SCN-009 — the counsel notes record what was verified and what is open', () => {
  const notes = () => rootFile('docs', 'legal', 'privacy-counsel-notes.md')

  it('names the page and the route it serves at', () => {
    expect(notes()).toContain('site/src/pages/Privacy.jsx')
    expect(notes()).toContain('/working/legal/privacy')
  })

  it('states plainly that no lawyer has reviewed the copy', () => {
    /* The document is hard-wrapped, so the phrase spans a line break. Match
       across whitespace rather than asserting on where the wrap happens to
       fall. */
    expect(notes()).toMatch(/not been reviewed by a\s+lawyer/i)
  })

  it('lists the open items counsel must decide', () => {
    expect(notes()).toMatch(/Open items counsel needs to decide or supply/i)
  })

  it('records the verified facts the policy was written against', () => {
    expect(notes()).toMatch(/What the site actually does/i)
  })
})

describe('SCN-010 — shipping this page does not make it public', () => {
  it('keeps the shell asking not to be indexed', () => {
    expect(rootFile('site', 'index.html')).toMatch(
      /<meta name="robots" content="noindex, nofollow"/,
    )
  })

  it('keeps the same directive on the hosting configuration', () => {
    expect(rootFile('netlify.toml')).toMatch(/X-Robots-Tag\s*=\s*"noindex, nofollow"/)
  })

  it('keeps the designed site behind the working mount', () => {
    const main = source('main.jsx')

    expect(main).toMatch(/WORKING_BASE\s*=\s*'\/working'/)
    expect(main).toContain('ComingSoon')
  })
})
