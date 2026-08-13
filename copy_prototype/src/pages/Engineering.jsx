import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { TermList } from '../components/Lists.jsx'

const GROUPS = [
  {
    kicker: 'AI and agentic systems',
    items: [
      [
        'Agentic AI implementation',
        'Agents and copilots that operate inside real workflows, not demos.',
      ],
      [
        'AI applications',
        'Enterprise applications where AI is the core of how the product works.',
      ],
      [
        'AI integration',
        'Connecting AI systems to the data, platforms, and processes you already run.',
      ],
      [
        'Workflow automation',
        'Removing manual steps that consume capacity without adding judgment.',
      ],
    ],
  },
  {
    kicker: 'Systems and platforms',
    items: [
      ['Custom software', 'Systems built for a problem no product on the market actually solves.'],
      [
        'Product engineering',
        'Building and evolving a product with a roadmap, not a one-off delivery.',
      ],
      ['Systems integration', 'Making separate systems behave like one, reliably and observably.'],
      [
        'Source data consolidation and readiness',
        'Bringing scattered, inconsistent, and undocumented source data into a state something can actually be built on',
      ],
      ['Data platforms', 'The foundation that makes AI and analytics work rather than aspire.'],
    ],
  },
  {
    kicker: 'Modernization',
    items: [
      ['Cloud modernization', 'Moving to modern infrastructure without pausing the business.'],
      [
        'Legacy modernization',
        'A sequenced path off systems that are expensive to keep and risky to replace.',
      ],
      [
        'Digital experience',
        'Customer-facing systems where the experience is the differentiator.',
      ],
    ],
  },
]

const OUTCOMES = [
  {
    title: 'Working technology.',
    body: 'Systems in production, used by the people they were built for, with the operational reality handled rather than deferred.',
  },
  {
    title: 'Better execution.',
    body: 'Your organization runs the next initiative better, because the way the work was done was part of the delivery.',
  },
  {
    title: 'Stronger capability.',
    body: 'Your team can operate, extend, and change what we built without us.',
  },
]

export default function Engineering() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="kicker">
            <Link to="/what-we-do">What we do</Link>
            <span aria-hidden="true">/</span>
            <span>Engineering</span>
          </p>
          <h1 className="h1">You need to execute.</h1>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">
            The distance between a plan and a working system is where most initiatives fail.
          </h2>
          <p className="sub mb-28">
            Something important has to work. Not designed, not scoped, not piloted. Work, in
            production, for real users, under real constraints.
          </p>
          <p className="eyebrow mb-14">Capabilities</p>
          <h3 className="card-title">What we build.</h3>
          <div className="grid g3">
            {GROUPS.map((g) => (
              <div key={g.kicker}>
                <h4 className="card-title">{g.kicker}</h4>
                <TermList items={g.items} termWidth="220px" maxWidth="820px" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="card">
            <p className="eyebrow mb-14">Core practice</p>
            <h2 className="h2">Agentic AI, implemented.</h2>
            <p className="body">
              A prototype only has to work once. A system has to work every time, on real data, for
              people who did not ask for it. Closing that gap is our core practice: agents and
              copilots that run inside your real workflows, connected to your real data, with the
              operational reality handled rather than deferred.
            </p>
            <TLink to="/agentic-ai">Inside our agentic AI practice</TLink>
          </div>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <p className="eyebrow mb-14">What you leave with</p>
          <h3 className="card-title">You end up more capable than you started.</h3>
          <dl className="grid">
            {OUTCOMES.map((o) => (
              <div key={o.title}>
                <dt className="card-title">{o.title}</dt>
                <dd className="body">{o.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">We build capability, not dependence.</h2>
          <p className="body">
            The strategy was sound, the vendor was capable, the technology was proven somewhere
            else, and the thing still did not land, because production is where the assumptions get
            tested.
          </p>
          <p className="body mb-28">
            Real data is messier than the sample. The integration has a constraint nobody
            documented. Adoption depends on a team whose incentives were never part of the plan.
            Engineering is the practice of closing that distance, and staying accountable for
            whether it works.
          </p>
          <TLink to="/how-we-work">See how we deliver</TLink>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <p className="eyebrow mb-14">Engineering</p>
          <h2 className="h2">Tell us what needs to work.</h2>
          <p className="sub mb-28">
            Bring the problem. We will tell you honestly whether we are the right firm to solve it.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
