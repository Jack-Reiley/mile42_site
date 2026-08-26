import { useRef, useState } from 'react'
import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Note } from '../components/primitives.jsx'

/* Netlify matches a submission to a form by this name. It is also the name the
   static declaration in site/public/__forms.html carries, and the two must
   agree or the submission is rejected. */
const FORM_NAME = 'Contact'

/* Netlify's honeypot: a field no person can reach, so anything that fills it in
   is not a person. The netlify-honeypot attribute naming it lives on the static
   declaration, which is the form Netlify actually parses. */
const HONEYPOT_FIELD = 'bot-field'

/* The submission is posted to the declaration's own path rather than to this
   page's. site/public/_redirects ends in `/*  /index.html  200`, and a POST to a
   path with no file behind it is consumed by that rewrite, which is Netlify's
   documented cause of a 404 on submit. A rewrite without a `!` cannot shadow a
   path that really exists, and __forms.html really exists. */
const ENDPOINT = '/__forms.html'

const EXPECTATIONS = [
  { lead: 'We read it.', rest: ' A founder, not a form queue.' },
  { lead: 'We reply with questions or a time.', rest: ' If the situation is clear enough, we will suggest a call. If it is not, we will ask what we would need to know.' },
  { lead: 'We tell you honestly whether we can help.', rest: ' Including when the answer is no, or not yet, or not us.' },
]
const FIELDS = [
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Work email', name: 'email', type: 'email' },
  { label: 'Organization', name: 'org', type: 'text' },
]

/* EXTRAPOLATED — no comp for this page, and no form-field spec exists at all
   in either PDF. Field styling is entirely invented. See EXTRAPOLATIONS.md. */
const FIELD_CLS =
  'w-full rounded-card border border-ink bg-page px-4 py-3 text-body text-ink ' +
  'focus:outline-3 focus:outline-accent focus:outline-offset-2'

/* Asked at call time rather than captured on import, matching reveal.js: a
   value fixed at module load cannot be observed changing and pins the answer to
   whenever the module happened to be evaluated. */
const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)
  const successRef = useRef(null)

  const sending = status === 'sending'
  const sent = status === 'sent'

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = formRef.current
    if (!form.reportValidity()) return

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
      /* A rejected submission comes back as a status, not as a thrown error, so
         a resolved fetch is not a delivered message. An unregistered form
         answers 404 here, which is exactly the failure this page used to hide. */
      if (!response.ok) throw new Error(`Netlify rejected the submission: ${response.status}`)
    } catch {
      setStatus('failed')
      return
    }

    setStatus('sent')
    requestAnimationFrame(() => {
      const panel = successRef.current
      if (!panel) return
      /* Focus, not just scroll: the form it replaces is hidden, and a reader who
         is not watching the viewport is otherwise told nothing. */
      panel.focus()
      /* Absent in jsdom, and the optional call is what guards it — the ref is
         set by the time this runs, so `panel?.` would not. */
      panel.scrollIntoView?.({
        block: 'center',
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    })
  }

  return (
    <>
      <Section band="brand" grain>
        <Wrap>
          <Eyebrow tone="hero" className="mb-4">Contact</Eyebrow>
          <H1 tone="hero" className="mb-6">Tell us what needs to work.</H1>
          <Lead tone="hero">Describe the situation in your own words. You do not need a scope, a budget, or a defined project. If we are not the right firm for it, we will tell you that.</Lead>
        </Wrap>
      </Section>

      <Section>
        <Wrap className="grid gap-12 lg:grid-cols-2">
          <div>
            <H2 className="mb-6">What to expect.</H2>
            <ul className="mb-8 flex flex-col gap-4">
              {EXPECTATIONS.map(({ lead, rest }, i) => (
                <li key={lead} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="text-eyebrow font-eyebrow text-accent-deep pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-body text-ink"><strong className="font-semibold">{lead}</strong>{rest}</span>
                </li>
              ))}
            </ul>
            <Body className="mb-8">No sequence of nurture emails. No sales development representative. Just a conversation.</Body>
            <Eyebrow className="mb-2">Other ways to reach us</Eyebrow>
            <a href="mailto:hello@mile42.ai" className="text-body text-ink no-underline hover:underline">
              hello@mile42.ai
            </a>
          </div>

          <div>
            <form name={FORM_NAME} method="POST" ref={formRef} noValidate hidden={sent} onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-card border border-ink bg-page shadow-hard p-8" data-netlify="true">
              <H3 as="h2">Start a conversation</H3>
              {/* Netlify injects this into a static form itself. A form it never
                  parsed has to carry its own, or the submission matches nothing. */}
              <input type="hidden" name="form-name" value={FORM_NAME} />
              {/* hidden keeps it out of the tab order and the accessibility tree
                  at once, while FormData still submits it. */}
              <p hidden>
                <label>
                  Leave this field empty
                  <input type="text" name={HONEYPOT_FIELD} autoComplete="off" />
                </label>
              </p>
              {FIELDS.map(({ label, name, type }) => (
                <label key={name} className="block">
                  <span className="text-eyebrow font-eyebrow uppercase text-accent-deep mb-2 block">{label}</span>
                  <input type={type} name={name} required className={FIELD_CLS} />
                </label>
              ))}
              <label className="block">
                <span className="text-eyebrow font-eyebrow uppercase text-accent-deep mb-2 block">What needs to work?</span>
                <textarea name="need" rows="4" required className={FIELD_CLS} />
                <Note className="mt-2">A few sentences is plenty. What is the outcome, and what is getting in the way?</Note>
              </label>
              <label className="block">
                <span className="text-eyebrow font-eyebrow uppercase text-accent-deep mb-2 block">Anything else we should know?</span>
                <textarea name="more" rows="3" className={FIELD_CLS} />
              </label>
              {status === 'failed' && (
                <p role="alert" className="text-body text-accent-deep">
                  That did not send. Try again, or email{' '}
                  <a href="mailto:hello@mile42.ai" className="text-accent-deep underline">hello@mile42.ai</a>.
                </p>
              )}
              <button type="submit" disabled={sending}
                className="inline-flex items-center justify-center self-start rounded-pill border border-ink shadow-hard bg-cta text-on-cta px-btn-x py-3 font-body font-semibold text-body transition-transform active:translate-y-1 active:shadow-none motion-reduce:transition-none disabled:opacity-60">
                {sending ? 'Sending…' : 'Send'}
              </button>
              <Note>We read every message ourselves.</Note>
            </form>

            <div ref={successRef} hidden={!sent} tabIndex={-1}
              className="flex flex-col gap-3 rounded-card border border-ink bg-page shadow-hard p-8">
              <Eyebrow>Message sent</Eyebrow>
              <H3 as="h2">Thanks. We have it.</H3>
              <Body className="max-w-none">A founder will read this and come back to you with questions or a time.</Body>
              <button type="button" onClick={() => { formRef.current?.reset(); setStatus('idle') }}
                className="inline-flex items-center justify-center self-start rounded-pill border border-ink shadow-hard bg-surface text-on-cta px-btn-x py-3 font-body font-semibold text-body transition-transform active:translate-y-1 active:shadow-none motion-reduce:transition-none">
                Send another
              </button>
            </div>
          </div>
        </Wrap>
      </Section>
    </>
  )
}
