import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const STATEMENTS = [
  'Proof statement 1 · commerce',
  'Proof statement 2 · content',
  'Proof statement 3 · integration',
]

export default function Proof() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Proof</p>
          <h1 className="h1">The firm is new. The people are not.</h1>
          <div className="ph" style={{ maxWidth: '640px' }}>
            <span className="ph__tag">Placeholder · hero copy</span>
            <p className="ph__body">
              Headline and subhead to be written once B1 lands. The page owns the honest position:
              there are no case studies yet, and here is why we are still worth talking to.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">The work.</h2>
          <p className="sub mb-28">
            Three anonymized statements. Category and scale, no client named. This is the section
            that does the actual persuading.
          </p>
          <div className="grid g3 mb-28">
            {STATEMENTS.map((tag) => (
              <div className="ph" key={tag}>
                <span className="ph__tag">{tag}</span>
                <p className="ph__body">
                  Anonymized client work by category and scale, one to two lines, no client named.
                  Blocked by B1.
                </p>
              </div>
            ))}
          </div>
          <div className="ph">
            <span className="ph__tag">Rules for whoever writes these</span>
            <p className="ph__body">
              Must be true and substantiable by a specific named founder. Category and scale are
              what make it proof. Write them from real engagements and then remove the identifying
              detail, rather than writing marketing copy and hoping it is close enough.
            </p>
          </div>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">What we have built.</h2>
          <p className="sub mb-28">
            Product work requires no client permission to discuss, so it is the easiest proof to
            publish.
          </p>
          <div className="grid g2">
            <div className="card">
              <h3 className="card-title">Blink Social</h3>
              <p className="body">
                A content strategy and planning tool, built by this team and running in production.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">AI development pipeline</h3>
              <p className="body">
                The multi-agent delivery system used on engagements, and the reason a small team can
                take on work at this scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">How we work is evidence too.</h2>
          <p className="body mb-28">
            When you cannot show what you shipped, show how you operate. The delivery model is
            specific, unusual, and verifiable in a conversation.
          </p>
          <TLink to="/how-we-work/delivery-model">See the delivery model</TLink>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Test the claim rather than read more of it.</h2>
          <p className="sub mb-28">
            Bring us something real. That is a faster way to judge a firm than any page of
            credentials.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
