import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const LAYERS = [
  {
    kicker: 'Model layer',
    title: 'Anthropic · OpenAI',
    body: 'Capability moves fastest here, and the right choice today may not be the right choice next year',
  },
  {
    kicker: 'Data and AI foundation',
    title: 'Databricks · Snowflake',
    body: 'Agentic systems fail on data far more often than they fail on reasoning',
  },
  {
    kicker: 'Enterprise workflow',
    title: 'Salesforce Agentforce · ServiceNow',
    body: 'Where agents meet the processes an organization already runs',
  },
  {
    kicker: 'Content platforms',
    title: 'Contentstack · Contentful',
    body: 'Content operations are where AI changes the day to day work first',
  },
  {
    kicker: 'Commerce platforms',
    title: 'commercetools · Shopify · SAP Hybris',
    body: 'Our first market focus, and where our deepest prior experience sits',
  },
]

const EXPECTATIONS = [
  {
    title: 'A straight answer on fit.',
    body: 'We will tell you when a platform you already own is the right answer, and when it is not, including when that is inconvenient for us.',
  },
  {
    title: 'No hidden incentive.',
    body: 'If a commercial relationship would shape a recommendation we make to you, you will hear about it from us first.',
  },
  {
    title: 'Access when it matters.',
    body: 'Being close to these platforms means escalation paths and early visibility that a general contractor does not have.',
  },
]

export default function Partners() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Partners</p>
          <h1 className="h1">Close to the platforms, captive to none of them.</h1>
          <p className="sub">
            Enterprise AI demand is moving faster than the capacity to implement it. Partnerships
            keep us close to where our clients are already investing, without turning us into a
            reseller for any one platform.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">
            Partnerships should make our judgment better, not our pitch louder.
          </h2>
          <p className="body">
            Plenty of firms collect partner badges. The badge is not the point. What matters is
            whether being close to a platform changes the quality of the advice and the delivery.
          </p>
          <p className="body mb-28">
            For us a partnership is useful when it does three things: gets us early access to what
            is changing, gives us people to call when something breaks in a way the documentation
            does not cover, and keeps us honest about where a platform genuinely fits rather than
            where we would like it to.
          </p>
          <p className="quote">Partners help source demand. Our execution earns the right to keep it.</p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Five layers of the enterprise AI stack.</h2>
          <p className="sub mb-28">
            These are the layers where the work actually happens. Most engagements touch three or
            four of them.
          </p>
          <div className="grid" style={{ gap: '12px' }}>
            {LAYERS.map((l) => (
              <div className="card" key={l.kicker}>
                <p className="kicker">{l.kicker}</p>
                <h3 className="card-title">{l.title}</h3>
                <p className="body" style={{ margin: 0 }}>
                  {l.body}
                </p>
              </div>
            ))}
          </div>
          <div className="ph mt-28">
            <span className="ph__tag">Placeholder · B2, partner marks</span>
            <p className="ph__body">
              Logos are not cleared for display yet. Populate only marks with confirmed display
              rights, and only platforms the firm can demonstrate real experience in.
            </p>
          </div>
          <div className="logos mt-28">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="logo-slot" key={n}>
                LOGO {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">We build so the model layer can change.</h2>
          <p className="body">
            Model capability and pricing both move quickly. A system architected around one
            provider's current strengths is a system that will need rebuilding sooner than
            anyone budgeted for.
          </p>
          <p className="body mb-28">
            So we design for substitution. That does not mean pretending every model is equivalent,
            because they are not. It means the choice is deliberate, documented, and reversible
            without tearing the system apart.
          </p>
          <p className="quote mb-18">
            We stay multi-model and partner-literate so you can move with confidence.
          </p>
          <TLink to="/agentic-ai">Inside our agentic AI practice</TLink>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Three things you should be able to expect.</h2>
          <div className="grid g3">
            {EXPECTATIONS.map((e) => (
              <div className="card" key={e.title}>
                <h3 className="card-title">{e.title}</h3>
                <p className="body">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Already invested in one of these?</h2>
          <p className="sub mb-28">
            Tell us what you are running and what you are trying to do with it. We will tell you
            honestly whether the platform is the constraint or something else is.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
