import { useRef, useState } from 'react'
import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Note } from '../components/primitives.jsx'

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

export default function Contact() {
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)
  const successRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formRef.current.reportValidity()) return
    setSent(true)
    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    })
  }

  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">Contact</Eyebrow>
          <H1 tone="hero" className="mb-6">Tell us what needs to work.</H1>
          <Lead>Describe the situation in your own words. You do not need a scope, a budget, or a defined project. If we are not the right firm for it, we will tell you that.</Lead>
        </Wrap>
      </Section>

      <Section>
        <Wrap className="grid gap-12 lg:grid-cols-2">
          <div>
            <H2 className="mb-6">What to expect.</H2>
            <ul className="mb-8 flex flex-col gap-4">
              {EXPECTATIONS.map(({ lead, rest }, i) => (
                <li key={lead} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="text-eyebrow font-eyebrow text-accent pt-1">{String(i + 1).padStart(2, '0')}</span>
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
            <form ref={formRef} noValidate hidden={sent} onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-card border border-ink bg-page shadow-hard p-8">
              <H3 as="h2">Start a conversation</H3>
              {FIELDS.map(({ label, name, type }) => (
                <label key={name} className="block">
                  <span className="text-eyebrow font-eyebrow uppercase text-accent mb-2 block">{label}</span>
                  <input type={type} name={name} required className={FIELD_CLS} />
                </label>
              ))}
              <label className="block">
                <span className="text-eyebrow font-eyebrow uppercase text-accent mb-2 block">What needs to work?</span>
                <textarea name="need" rows="4" required className={FIELD_CLS} />
                <Note className="mt-2">A few sentences is plenty. What is the outcome, and what is getting in the way?</Note>
              </label>
              <label className="block">
                <span className="text-eyebrow font-eyebrow uppercase text-accent mb-2 block">Anything else we should know?</span>
                <textarea name="more" rows="3" className={FIELD_CLS} />
              </label>
              <button type="submit"
                className="inline-flex items-center justify-center self-start rounded-pill border border-ink shadow-hard bg-cta text-on-cta px-btn-x py-3 font-body font-semibold text-body transition-transform active:translate-y-1 active:shadow-none motion-reduce:transition-none">
                Send
              </button>
              <Note>We read every message ourselves.</Note>
            </form>

            <div ref={successRef} hidden={!sent}
              className="flex flex-col gap-3 rounded-card border border-ink bg-page shadow-hard p-8">
              <Eyebrow>Message sent</Eyebrow>
              <H3 as="h2">Thanks. We have it.</H3>
              <Body className="max-w-none">A founder will read this and come back to you with questions or a time.</Body>
              <Note>Prototype only. Nothing was actually sent, and no data left this page.</Note>
              <button type="button" onClick={() => { formRef.current?.reset(); setSent(false) }}
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
