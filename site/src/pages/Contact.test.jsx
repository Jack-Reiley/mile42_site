import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Contact from './Contact.jsx'

/**
 * The contact form is the site's only conversion point, and its two failure
 * modes are both silent: a form Netlify never registered answers 404 while
 * `fetch` resolves happily, and a field named here but not in the static
 * declaration is accepted and then discarded. Neither shows up in a build, a
 * screenshot, or a manual pass that only ever sees the happy path.
 *
 * Everything here queries by role and accessible name. Nothing asserts on a
 * class or on DOM position, so a restyle does not break a test.
 */

/* import.meta.url is not a file URL under the jsdom environment, so the
   publish directory is reached from the vitest root instead. */
const publicFile = (path) => resolve(process.cwd(), 'public', path.replace(/^\//, ''))
const DECLARATION = publicFile('__forms.html')

/** The form Netlify's deploy-time parser reads, as that parser would see it. */
const declaredForm = () => {
  const doc = new DOMParser().parseFromString(readFileSync(DECLARATION, 'utf8'), 'text/html')
  return doc.querySelector('form')
}

const namesIn = (form) => [...form.querySelectorAll('[name]')].map((el) => el.getAttribute('name'))

const renderedForm = () => document.querySelector('form')

/* The hint under "What needs to work?" sits inside the label, so it lands in
   that field's accessible name. The name is matched from its start rather than
   whole; changing where the hint lives is not this ticket's business. */
const NEED = /^What needs to work\?/

const field = (label) => screen.getByLabelText(label)

const fill = async (user, values = {}) => {
  const answers = [
    ['Name', 'Ada Lovelace'],
    ['Work email', 'ada@example.com'],
    ['Organization', 'Analytical Engines'],
    [NEED, 'Our intake is manual and slow.'],
  ]
  for (const [label, value] of answers) {
    const answer = label === NEED && 'need' in values ? values.need : values[label] ?? value
    if (answer) await user.type(field(label), answer)
  }
}

const send = () => screen.getByRole('button', { name: /^Send$|^Sending/ })
const successPanel = () => screen.getByRole('heading', { name: 'Thanks. We have it.' }).closest('div')

const ok = () => Promise.resolve({ ok: true, status: 200 })
const rejected = () => Promise.resolve({ ok: false, status: 404 })

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(ok))
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('SCN-001 — the deploy declares the form Netlify must register', () => {
  it('declares a form under the name the rendered form submits', () => {
    render(<Contact />)
    expect(declaredForm().getAttribute('name')).toBe(renderedForm().getAttribute('name'))
  })

  it('names every field the rendered form sends, and no field neither sends', () => {
    render(<Contact />)
    /* form-name is excluded on purpose: Netlify injects it into the form it
       parsed, so declaring it here would duplicate what post-processing adds. */
    const submitted = namesIn(renderedForm()).filter((name) => name !== 'form-name')

    expect(namesIn(declaredForm()).sort()).toEqual(submitted.sort())
  })

  it('leaves form-name to Netlify rather than declaring it', () => {
    expect(namesIn(declaredForm())).not.toContain('form-name')
  })

  it('names the spam trap on the form Netlify actually parses', () => {
    const declared = declaredForm()
    const trap = declared.getAttribute('netlify-honeypot')

    expect(trap).toBeTruthy()
    expect(namesIn(declared)).toContain(trap)
  })

  it('is marked for detection, which is the whole reason the file exists', () => {
    expect(declaredForm().getAttribute('data-netlify')).toBe('true')
  })
})

describe('SCN-002 — what a completed form sends (the automatable half)', () => {
  it('posts every answer, url-encoded, with the form name Netlify matches on', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(fetch).toHaveBeenCalled())
    const [url, init] = fetch.mock.calls[0]
    const body = new URLSearchParams(init.body)

    expect(init.method).toBe('POST')
    expect(init.headers['Content-Type']).toBe('application/x-www-form-urlencoded')
    expect(body.get('form-name')).toBe(renderedForm().getAttribute('name'))
    expect(body.get('name')).toBe('Ada Lovelace')
    expect(body.get('email')).toBe('ada@example.com')
    expect(body.get('org')).toBe('Analytical Engines')
    expect(body.get('need')).toBe('Our intake is manual and slow.')
    expect(body.get('more')).toBe('')
    expect(url).toBe('/__forms.html')
  })

  it('posts to a path with a real file behind it, which the SPA fallback cannot shadow', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(fetch).toHaveBeenCalled())
    /* The redirect in site/public/_redirects rewrites every path with no file
       behind it. Posting to the page's own path would be consumed by it. */
    expect(fetch.mock.calls[0][0]).not.toMatch(/contact/i)
    expect(() => readFileSync(publicFile(fetch.mock.calls[0][0]))).not.toThrow()
  })
})

describe('SCN-003 — success is claimed only once the submission is accepted', () => {
  it('replaces the form with the success panel when Netlify accepts it', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(successPanel()).toBeVisible())
    expect(renderedForm()).not.toBeVisible()
  })

  it('no longer claims that nothing was sent', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(successPanel()).toBeVisible())
    expect(document.body).not.toHaveTextContent(/nothing was actually sent/i)
    expect(document.body).not.toHaveTextContent(/prototype only/i)
  })
})

describe('SCN-004 — a failed submission is recoverable', () => {
  it('shows an error instead of success when Netlify rejects the submission', async () => {
    vi.stubGlobal('fetch', vi.fn(rejected))
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/did not send/i)
    /* hidden takes the panel out of the accessibility tree, so a role query
       finding nothing is the evidence that it is not being offered. */
    expect(screen.queryByRole('heading', { name: 'Thanks. We have it.' })).toBeNull()
  })

  it('treats a request that never lands the same as a rejected one', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))))
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    expect(await screen.findByRole('alert')).toHaveTextContent(/did not send/i)
  })

  it('names another way to reach Mile42', async () => {
    vi.stubGlobal('fetch', vi.fn(rejected))
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    const alert = await screen.findByRole('alert')
    expect(within(alert).getByRole('link')).toHaveAttribute('href', 'mailto:hello@mile42.ai')
  })

  it('keeps every value the visitor typed, so nothing is retyped', async () => {
    vi.stubGlobal('fetch', vi.fn(rejected))
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await screen.findByRole('alert')
    expect(field('Name')).toHaveValue('Ada Lovelace')
    expect(field('Work email')).toHaveValue('ada@example.com')
    expect(field('Organization')).toHaveValue('Analytical Engines')
    expect(field(NEED)).toHaveValue('Our intake is manual and slow.')
  })

  it('clears the error when the visitor tries again and it works', async () => {
    const fetchMock = vi.fn(rejected)
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)
    await user.click(send())
    await screen.findByRole('alert')

    fetchMock.mockImplementation(ok)
    await user.click(send())

    await waitFor(() => expect(successPanel()).toBeVisible())
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('SCN-005 — a submission in flight cannot be sent twice', () => {
  it('reports that it is working and refuses a second activation', async () => {
    let settle
    const fetchMock = vi.fn(() => new Promise((resolve) => { settle = resolve }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(send()).toHaveTextContent('Sending'))
    expect(send()).toBeDisabled()

    await user.click(send())
    expect(fetchMock).toHaveBeenCalledTimes(1)

    settle({ ok: true, status: 200 })
    await waitFor(() => expect(successPanel()).toBeVisible())
  })
})

describe('SCN-006 — an incomplete form still cannot be submitted', () => {
  it('sends nothing when a required answer is missing', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user, { need: '' })

    await user.click(send())

    expect(fetch).not.toHaveBeenCalled()
    /* hidden takes the panel out of the accessibility tree, so a role query
       finding nothing is the evidence that it is not being offered. */
    expect(screen.queryByRole('heading', { name: 'Thanks. We have it.' })).toBeNull()
  })
})

describe('SCN-007 — the spam trap is invisible to people and to assistive technology', () => {
  it('is never announced and never reached by tabbing', () => {
    render(<Contact />)
    const trap = renderedForm().querySelector(`[name="${declaredForm().getAttribute('netlify-honeypot')}"]`)

    expect(trap).toBeInTheDocument()
    expect(trap).not.toBeVisible()
    expect(screen.getAllByRole('textbox')).not.toContain(trap)
  })

  it('does not stop an ordinary submission that leaves it empty', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(fetch).toHaveBeenCalled())
    const trap = declaredForm().getAttribute('netlify-honeypot')
    expect(new URLSearchParams(fetch.mock.calls[0][1].body).get(trap)).toBe('')
  })
})

describe('SCN-008 — the success panel is announced, not just scrolled to', () => {
  it('moves focus into the panel', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(successPanel()).toHaveFocus())
  })

  it('does not animate the scroll for a visitor who prefers reduced motion', async () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    window.matchMedia = () => ({ matches: true })
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
    expect(scrollIntoView.mock.calls[0][0].behavior).toBe('auto')
    delete Element.prototype.scrollIntoView
    delete window.matchMedia
  })

  it('animates it for everyone else', async () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    window.matchMedia = () => ({ matches: false })
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)

    await user.click(send())

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
    expect(scrollIntoView.mock.calls[0][0].behavior).toBe('smooth')
    delete Element.prototype.scrollIntoView
    delete window.matchMedia
  })
})

describe('SCN-009 — the rest of the contact page is untouched', () => {
  it('still explains what to expect, in order', () => {
    render(<Contact />)
    const items = within(screen.getByRole('list')).getAllByRole('listitem')

    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('We read it.')
    expect(items[1]).toHaveTextContent('We reply with questions or a time.')
    expect(items[2]).toHaveTextContent('We tell you honestly whether we can help.')
  })

  it('still offers the mail fallback', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: 'hello@mile42.ai' })).toHaveAttribute('href', 'mailto:hello@mile42.ai')
  })

  it('still asks for the same five answers', () => {
    render(<Contact />)
    ;['Name', 'Work email', 'Organization', NEED, 'Anything else we should know?']
      .forEach((label) => expect(field(label)).toBeInTheDocument())
  })

  it('still returns an empty form to anyone who wants to send another', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await fill(user)
    await user.click(send())
    await waitFor(() => expect(successPanel()).toBeVisible())

    await user.click(screen.getByRole('button', { name: 'Send another' }))

    expect(renderedForm()).toBeVisible()
    expect(field('Name')).toHaveValue('')
  })
})
