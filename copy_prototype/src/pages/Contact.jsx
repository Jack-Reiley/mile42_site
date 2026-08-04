import { useRef, useState } from 'react'

const EXPECTATIONS = [
  { lead: 'We read it.', rest: ' A founder, not a form queue.' },
  {
    lead: 'We reply with questions or a time.',
    rest: ' If the situation is clear enough, we will suggest a call. If it is not, we will ask what we would need to know.',
  },
  {
    lead: 'We tell you honestly whether we can help.',
    rest: ' Including when the answer is no, or not yet, or not us.',
  },
]

const FIELDS = [
  { label: 'Name', name: 'name', type: 'text' },
  { label: 'Work email', name: 'email', type: 'email' },
  { label: 'Organization', name: 'org', type: 'text' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)
  const successRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formRef.current.reportValidity()) return
    setSent(true)
    // The success panel replaces the form in place, so bring it into view.
    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    })
  }

  const handleReset = () => {
    formRef.current?.reset()
    setSent(false)
  }

  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Contact</p>
          <h1 className="h1">Tell us what needs to work.</h1>
          <p className="sub">
            Describe the situation in your own words. You do not need a scope, a budget, or a
            defined project. If we are not the right firm for it, we will tell you that.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid g2" style={{ gap: '48px' }}>
            <div>
              <h2 className="h2">What to expect.</h2>
              <ul className="nums mb-28">
                {EXPECTATIONS.map(({ lead, rest }, i) => (
                  <li key={lead}>
                    <span className="nums__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="nums__t">
                      <strong style={{ fontWeight: 640 }}>{lead}</strong>
                      {rest}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="body">
                No sequence of nurture emails. No sales development representative. Just a
                conversation.
              </p>
              <p className="kicker mb-8" style={{ marginTop: '28px' }}>
                Other ways to reach us
              </p>
              <div className="ph">
                <span className="ph__tag">Placeholder · contact details</span>
                <p className="ph__body">
                  General enquiries email and LinkedIn company page do not exist yet. Both depend on
                  the final company name.
                </p>
              </div>
            </div>

            <div>
              <form
                className="card"
                id="contact-form"
                ref={formRef}
                noValidate
                hidden={sent}
                onSubmit={handleSubmit}
              >
                <h2 className="card-title" style={{ fontSize: '20px' }}>
                  Start a conversation
                </h2>
                {FIELDS.map(({ label, name, type }) => (
                  <label className="field" key={name}>
                    <span className="kicker">{label}</span>
                    <input type={type} name={name} required />
                  </label>
                ))}
                <label className="field">
                  <span className="kicker">What needs to work?</span>
                  <textarea name="need" rows="4" required />
                  <span className="note">
                    A few sentences is plenty. What is the outcome, and what is getting in the way?
                  </span>
                </label>
                <label className="field">
                  <span className="kicker">Anything else we should know?</span>
                  <textarea name="more" rows="3" />
                </label>
                <button className="btn" type="submit">
                  Send
                </button>
                <p className="note">We read every message ourselves.</p>
              </form>

              <div className="card" id="contact-success" ref={successRef} hidden={!sent}>
                <p className="kicker">Message sent</p>
                <h2 className="card-title" style={{ fontSize: '20px' }}>
                  Thanks. We have it.
                </h2>
                <p className="body">
                  A founder will read this and come back to you with questions or a time.
                </p>
                <p className="note">
                  Prototype only. Nothing was actually sent, and no data left this page.
                </p>
                <button className="btn btn--ghost" type="button" id="contact-reset" onClick={handleReset}>
                  Send another
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
