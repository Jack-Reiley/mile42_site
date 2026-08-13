import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { TermList } from '../components/Lists.jsx'

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
  ['AI strategy', 'Pressure to do something with AI and no agreed view of what or why.'],
  [
    'AI ingestion strategy',
    'No plan for how AI gets your data, keeps it current, or respects permissions.',
  ],
  [
    'Integration strategy',
    'Systems that should work together do not, and the connections grew by accident.',
  ],
  ['Discovery', 'The problem is understood in outline but not in enough detail to scope.'],
  ['Modernization plan', 'A legacy estate needs a sequenced path forward, not a rewrite.'],
  [
    'Platform selection',
    'A significant platform decision is coming and the evaluation needs rigor.',
  ],
  [
    'Architecture review',
    'An existing design needs an independent read before it is committed to.',
  ],
  ['Product strategy', 'A product needs direction, scope, and a defensible roadmap.'],
  ['Technology education', 'Leadership needs to understand a domain well enough to govern it.'],
]

const OUTCOMES = [
  'A clear recommendation, with the reasoning visible rather than asserted.',
  'The tradeoffs you are accepting, stated plainly, including the ones you will not like.',
  'A plan specific enough to execute, with sequence, effort, and dependencies named.',
  'Enough context inside your team to defend the decision without us in the room.',
]

export default function Advisory() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="kicker">
            <Link to="/what-we-do">What we do</Link>
            <span aria-hidden="true">/</span>
            <span>Advisory</span>
          </p>
          <h1 className="h1">You need clarity.</h1>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Most technology decisions are made with incomplete context.</h2>
          <p className="sub mb-28">
            Before a major investment, the expensive mistake is rarely choosing the wrong option. It
            is committing before you understand what you are committing to.
          </p>
          <p className="eyebrow mb-14">Engagements</p>
          <h3 className="card-title">What we are usually brought in for.</h3>
          <TermList items={ENGAGEMENTS} termWidth="220px" maxWidth="820px" className="mb-28" />
          <p className="body">
            If what you need is not on this list, describe the decision and we will tell you whether
            we can help.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="card">
            <p className="eyebrow mb-14">Offering · Phase Zero</p>
            <h2 className="h2">The low-risk way in.</h2>
            <p className="body">Name a process. Prove the fix. Map what comes next.</p>
            <p className="body">
              Name your messiest, most manual workflow. We assess its readiness, run a working pilot
              beside production, and hand you a roadmap of next steps. It runs in parallel, it is
              reversible on day one, and it is measured against your own baseline. Proof, not a
              proposal.
            </p>
            <TLink to="/contact">Start with Phase Zero</TLink>
          </div>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <p className="eyebrow mb-14">How advisory works</p>
          <h3 className="card-title">Pointed at action.</h3>
          <p className="body mb-28">
            Built to end in movement. A decision, a sequence, and a first step that can begin on
            Monday.
          </p>
          <ol className="grid g3 mb-28">
            {STEPS.map((s) => (
              <li className="card" key={s.n}>
                <p className="kicker">{s.n}</p>
                <h3 className="card-title">{s.title}</h3>
                <p className="body">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="eyebrow mb-14">What you leave with</p>
          <h3 className="card-title">Direction, context, and decision confidence.</h3>
          <ul className="grid g2">
            {OUTCOMES.map((text) => (
              <li className="body" key={text}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">We write recommendations we could execute ourselves.</h2>
          <p className="body">
            The failure mode of consulting advisory is the document. A deck lands, everyone agrees
            it is sound, and nothing changes, because the people who wrote the recommendation never
            have to live with it.
          </p>
          <p className="body">
            We write advice under a different constraint. We are an execution firm, and the plan we
            hand you is one we could be held to. That forces us to be specific about sequence,
            effort, dependency, and risk.
          </p>
          <p className="body mb-28">
            Most advisory engagements move into build, and that is the intent rather than an upsell.
            Engineering picks up with the context already in place.
          </p>
          <div className="btn-row">
            <TLink to="/what-we-do/engineering">See engineering</TLink>
            <TLink to="/how-we-work/client-journey">See the client journey</TLink>
          </div>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <p className="eyebrow mb-14">Advisory</p>
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
