import { NumList } from '../components/Lists.jsx'

const SECTIONS = [
  'Who we are, and how to contact us about privacy',
  'What information we collect',
  'How we collect it, including the contact form and any analytics',
  'Why we process it, and the lawful basis where that applies',
  'Who we share it with, naming processors',
  'How long we keep it',
  'Where it is stored and transferred',
  'Your rights, and how to exercise them',
  'Cookies, or a link to a separate cookie notice',
  'How changes to the policy are communicated',
  'Last updated date',
]

export default function Privacy() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Legal</p>
          <h1 className="h1">Privacy policy.</h1>
          <div className="ph" style={{ maxWidth: '680px' }}>
            <span className="ph__tag">Placeholder · not legal copy</span>
            <p className="ph__body">
              This page is a stub so the footer link resolves in the prototype. No privacy policy
              has been written. Counsel must draft it, and nothing here has been reviewed by a
              lawyer.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" style={{ maxWidth: '720px' }}>
          <h2 className="h2">Structure counsel will most likely need.</h2>
          <p className="body mb-28">
            Listed so the page can be laid out before the copy exists. Section names and content are
            counsel's call.
          </p>
          <NumList items={SECTIONS} />
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap" style={{ maxWidth: '720px' }}>
          <h2 className="h2">Before counsel can draft it.</h2>
          <p className="body">
            The facts counsel needs are written up in the project's copy documents: what the
            contact form collects, where submissions go, retention, jurisdiction, and the privacy
            contact point. A policy that does not accurately describe what the site does is worse
            than having none.
          </p>
        </div>
      </section>
    </>
  )
}
