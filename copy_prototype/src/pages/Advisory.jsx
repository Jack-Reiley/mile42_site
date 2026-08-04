import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { StatementCards, TermList } from '../components/Lists.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Build context',
    body: 'What outcome matters, why now, and where execution is currently breaking down.',
  },
  {
    n: '02',
    title: 'Pressure-test the direction',
    body: 'The tradeoffs, the risks, the constraints, and the options you have not considered.',
  },
  {
    n: '03',
    title: 'Land on a decision',
    body: 'A recommendation with the reasoning visible, and a plan specific enough to execute.',
  },
]

const ENGAGEMENTS = [
  ['AI strategy', 'There is pressure to do something with AI and no agreed view of what or why'],
  [
    'AI ingestion strategy',
    'AI systems need your content and data, and there is no plan for how it gets there, stays current, or respects permissions',
  ],
  [
    'Integration strategy',
    'Systems that need to work together do not, and the connections have grown by accident rather than by design',
  ],
  ['Discovery', 'The problem is understood in outline but not in enough detail to scope'],
  ['Modernization plan', 'A legacy estate needs a sequenced path forward, not a rewrite'],
  ['Platform selection', 'A significant platform decision is coming and the evaluation needs rigor'],
  [
    'Architecture review',
    'An existing design needs an independent read before it is committed to',
  ],
  ['Product strategy', 'A product needs direction, scope, and a defensible roadmap'],
  ['Technology education', 'Leadership needs to understand a domain well enough to govern it'],
]

const OUTCOMES = [
  'A clear recommendation, with the reasoning visible rather than asserted.',
  'The tradeoffs you are accepting, stated plainly, including the ones you will not like.',
  'A plan specific enough to execute, with sequence, effort, and dependencies named.',
  'Enough context inside your own team to defend the decision without us in the room.',
]

export default function Advisory() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Advisory</p>
          <h1 className="h1">You need clarity.</h1>
          <p className="sub mb-28">
            Before a major investment, the expensive mistake is rarely choosing the wrong option. It
            is committing before you understand what you are committing to.
          </p>
          <Link className="btn" to="/contact">
            Bring us the decision
          </Link>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Most technology decisions are made with incomplete context.</h2>
          <p className="body">
            The platform gets selected before the workflow is understood. The architecture is set
            before the real constraints surface. The budget is approved before anyone has said out
            loud what the outcome is supposed to be.
          </p>
          <p className="body">
            None of that is incompetence. It is what happens when the decision is urgent and the
            context is expensive to build.
          </p>
          <p className="body mb-28">
            Advisory work is how you build that context before it costs you. We learn your situation
            in enough depth to be useful, pressure-test the direction you are leaning toward, and
            give you a path you can defend internally. Then we tell you honestly what it will take.
          </p>
          <p className="quote">
            We sell judgment, not information. Advice that ends at a document does not hold its
            value.
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Pointed at action.</h2>
          <p className="sub mb-28">
            Advisory engagements are built to end in movement. Not a readout, not a phase two
            proposal. A decision, a sequence, and a first step that can begin on Monday.
          </p>
          <div className="grid g3">
            {STEPS.map((s) => (
              <div className="card" key={s.n}>
                <p className="kicker">{s.n}</p>
                <h3 className="card-title">{s.title}</h3>
                <p className="body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">What we are usually brought in for.</h2>
          <TermList items={ENGAGEMENTS} termWidth="220px" maxWidth="820px" className="mb-28" />
          <p className="body">
            If what you need is not on this list, describe the decision and we will tell you whether
            we can help.
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Direction, context, and decision confidence.</h2>
          <div className="grid g2 mb-28">
            <StatementCards items={OUTCOMES} />
          </div>
          <p className="quote">
            The work is complete when you can make the call, explain it, and start on it.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">We write recommendations we could execute ourselves.</h2>
          <p className="body">
            The failure mode of consulting advisory is the document. A deck lands, everyone agrees
            it is sound, and nothing changes. That happens because the people who wrote the
            recommendation never have to live with it.
          </p>
          <p className="body">
            We write advice under a different constraint. We are an execution firm, and the plan we
            hand you is one we could be held to. That rules out the elegant strategy that cannot
            survive your actual constraints. It forces us to be specific about sequence, effort,
            dependency, and risk, because vagueness is a cost we would end up paying.
          </p>
          <p className="body mb-28">
            Most advisory engagements move into build, and that is the intent rather than an upsell.
            Engineering picks up with the context already in place, which is faster and cheaper than
            starting a delivery engagement cold.
          </p>
          <p className="quote mb-28">
            Advice that leads to action holds its value. Advice that ends at a document does not.
          </p>
          <p className="body">
            If you take the plan to someone else, it will be specific enough for them to run. We
            would rather write it that way than write something only we can interpret.
          </p>
          <div className="btn-row">
            <TLink to="/what-we-do/engineering">See engineering</TLink>
            <TLink to="/how-we-work/client-journey">See the client journey</TLink>
          </div>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Tell us what you are trying to decide.</h2>
          <p className="sub mb-28">
            We will tell you what we would need to know to help, and whether we are the right firm
            to ask.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
