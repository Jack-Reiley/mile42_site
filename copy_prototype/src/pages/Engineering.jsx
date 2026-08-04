import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { TermList } from '../components/Lists.jsx'

const GROUPS = [
  {
    kicker: 'AI and agentic systems',
    items: [
      [
        'Agentic AI implementation',
        'Agents and copilots that operate inside real workflows, not demos',
      ],
      [
        'AI applications',
        'Enterprise applications where AI is the core of how the product works',
      ],
      [
        'AI integration',
        'Connecting AI systems to the data, platforms, and processes you already run',
      ],
      [
        'Workflow automation',
        'Removing manual steps that consume capacity without adding judgment',
      ],
    ],
  },
  {
    kicker: 'Systems and platforms',
    items: [
      ['Custom software', 'Systems built for a problem no product on the market actually solves'],
      [
        'Product engineering',
        'Building and evolving a product with a roadmap, not a one-off delivery',
      ],
      ['Systems integration', 'Making separate systems behave like one, reliably and observably'],
      [
        'Source data consolidation and readiness',
        'Bringing scattered, inconsistent, and undocumented source data into a state something can actually be built on',
      ],
      ['Data platforms', 'The foundation that makes AI and analytics work rather than aspire'],
    ],
  },
  {
    kicker: 'Modernization',
    items: [
      ['Cloud modernization', 'Moving to modern infrastructure without pausing the business'],
      [
        'Legacy modernization',
        'A sequenced path off systems that are expensive to keep and risky to replace',
      ],
      [
        'Digital experience',
        'Customer-facing systems where the experience is the differentiator',
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
          <p className="eyebrow mb-14">Engineering</p>
          <h1 className="h1">You need to execute.</h1>
          <p className="sub mb-28">
            Something important has to work. Not be designed, not be scoped, not be piloted. Work,
            in production, for real users, under real constraints.
          </p>
          <Link className="btn" to="/contact">
            Tell us what needs to work
          </Link>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">
            The distance between a plan and a working system is where most initiatives fail.
          </h2>
          <p className="body">
            The strategy was sound. The vendor was capable. The technology was proven somewhere
            else. And the thing still did not land, because production is where the assumptions get
            tested.
          </p>
          <p className="body">
            Real data is messier than the sample. The integration has a constraint nobody
            documented. Adoption depends on a team whose incentives were never part of the plan. The
            system works in the demo and stalls in the business.
          </p>
          <p className="body mb-28">
            Engineering is the practice of closing that distance. We build systems that operate
            inside your actual constraints, and we stay accountable for whether they work.
          </p>
          <p className="quote">If the work does not change how you operate, it is not enough.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2 mb-28">What we build.</h2>
          <div className="card mb-28">
            <p className="kicker mb-8">Core practice</p>
            <h3 className="card-title">Agentic AI, implemented</h3>
            <p className="body">
              A prototype only has to work once. A system has to work every time, on real data, for
              people who did not ask for it, inside real constraints. Closing that gap is our core
              agentic AI practice.
            </p>
            <TLink to="/agentic-ai">Inside our agentic AI practice</TLink>
          </div>
          {GROUPS.map((g) => (
            <div className="mb-28" key={g.kicker}>
              <p className="kicker mb-14">{g.kicker}</p>
              <TermList items={g.items} termWidth="260px" maxWidth="860px" />
            </div>
          ))}
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">You end up more capable than you started.</h2>
          <div className="grid g3 mb-28">
            {OUTCOMES.map((o) => (
              <div className="card" key={o.title}>
                <h3 className="card-title">{o.title}</h3>
                <p className="body">{o.body}</p>
              </div>
            ))}
          </div>
          <p className="quote">We build capability, not dependence.</p>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
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
