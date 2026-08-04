import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { NumList, StatementCards, TermList } from '../components/Lists.jsx'

const STAGES = [
  {
    n: '01',
    title: 'Understand',
    body: 'Build shared context: what outcome matters, why now, and where execution is breaking down',
    leave: 'Clarity',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Bring technology, architecture, delivery, and organizational reality together into a sound path',
    leave: 'Confidence',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Engineer the systems, products, integrations, and workflows, and improve how the organization executes',
    leave: 'Results',
  },
  {
    n: '04',
    title: 'Evolve',
    body: 'You know more, operate better, reuse more, and can do something you could not do before',
    leave: 'Capability',
  },
]

const UNDERSTAND_POINTS = [
  'What outcome matters, stated specifically enough to know whether it moved.',
  'Why now, and what happens if nothing changes.',
  'Where execution is breaking down today, which is often not where it appears to be.',
  'What constraints are real, and which ones are habits.',
]

const DESIGN_OUTPUTS = [
  'An architecture, with the tradeoffs named rather than assumed.',
  'A sequence, including what happens first and why.',
  'An honest read on effort, dependency, and risk.',
  'A view on what changes for the people doing the work, and what that will take.',
]

const BUILD_OUTPUTS = [
  'Systems in production, used by the people they were built for.',
  'Governance, testing, and documentation that exist because they were built in, not because someone remembered at the end.',
  'A team that understands what was built and why.',
]

const EVOLVE_OUTPUTS = [
  'Your team can change the system without calling us.',
  'The decisions and their rationale are documented somewhere your people will find them.',
  'What you learned is reusable on work we are not involved in.',
  'If you bring us back, it is because you chose to, not because you are stuck.',
]

const ENTRY_POINTS = [
  ['Understand or Design', 'Advisory'],
  ['Design or Build', 'Engineering'],
  ['Build, with parts already solved', 'AI-driven products and accelerators'],
]

export default function ClientJourney() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">The client journey</p>
          <h1 className="h1">Four stages. Four stronger positions to be in.</h1>
          <p className="sub">
            The stage describes what we do together. The outcome describes the state you are left
            in. Every stage should leave you better off than when it started, whether or not you
            continue to the next one.
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Understand, design, build, evolve.</h2>
          <div className="grid g4 mb-28">
            {STAGES.map((s) => (
              <div className="card" key={s.n}>
                <p className="kicker">{s.n}</p>
                <h3 className="card-title">{s.title}</h3>
                <p className="body">{s.body}</p>
                <div className="card__leave">
                  <span className="kicker">You leave with:</span>
                  <span className="card__leave-val">{s.leave}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="quote">
            The work is complete only when you are stronger for the next decision, build, or
            initiative.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="eyebrow mb-14">01 · Leaves clarity</p>
          <h2 className="h2">Context before solutions.</h2>
          <p className="body">
            Most engagements go wrong here, quietly. The work starts before anyone has agreed what
            outcome matters, why it matters now, or where execution is actually breaking down.
          </p>
          <p className="body mb-28">
            We spend real time on this. Not a discovery workshop that produces a summary of what you
            already told us, but enough depth to make better calls under uncertainty later.
          </p>
          <NumList items={UNDERSTAND_POINTS} className="mb-28" />
          <p className="quote">Without context, technology work becomes guesswork.</p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <p className="eyebrow mb-14">02 · Leaves confidence</p>
          <h2 className="h2">A path that survives contact with your organization.</h2>
          <p className="body">
            Design here means more than an architecture diagram. It means bringing the technology,
            the delivery approach, and the organizational reality together into something that can
            actually be executed by the people who will have to execute it.
          </p>
          <p className="body mb-28">
            A design that ignores adoption, operating model, or delivery risk is not a design. It is
            a preference.
          </p>
          <div className="grid g2 mb-28">
            <StatementCards items={DESIGN_OUTPUTS} />
          </div>
          <p className="quote">
            You should finish this stage able to explain the plan to your own leadership without us
            in the room.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="eyebrow mb-14">03 · Leaves results</p>
          <h2 className="h2">Working systems, and a better way of executing.</h2>
          <p className="body">
            This is where most of the money and most of the risk sit. We engineer the systems,
            products, integrations, and workflows, and we stay accountable for whether they work in
            production rather than whether they were delivered on schedule.
          </p>
          <p className="body mb-28">
            Two things happen at once. The system gets built, and the way your organization executes
            gets better, because how the work is done is part of what we are delivering.
          </p>
          <div className="grid g3 mb-28">
            <StatementCards items={BUILD_OUTPUTS} />
          </div>
          <TLink to="/how-we-work/delivery-model">See the delivery model</TLink>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <p className="eyebrow mb-14">04 · Leaves capability and trust</p>
          <h2 className="h2">You should be able to do something you could not do before.</h2>
          <p className="body">
            The last stage is the one most firms skip, because it is the one that reduces their
            future revenue.
          </p>
          <p className="body mb-28">
            Evolve means you can operate, extend, and change what was built without depending on us
            for every decision. It means the patterns and reasoning stayed with your team. It means
            the next initiative starts from a stronger position than this one did.
          </p>
          <div className="grid g2 mb-28">
            <StatementCards items={EVOLVE_OUTPUTS} />
          </div>
          <p className="quote">We build capability, not dependence.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">The journey is the same. Where you enter is not.</h2>
          <p className="body mb-28">
            Not everyone starts at stage one. Some organizations already have clarity and need
            execution. Some have been building for a year and need an honest read on whether the
            path still holds.
          </p>
          <TermList items={ENTRY_POINTS} termWidth="300px" maxWidth="760px" className="mb-28" />
          <p className="quote">
            Tell us where you actually are, not where a process says you should be.
          </p>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Tell us where you are.</h2>
          <p className="sub mb-28">
            We will tell you which stage you are actually in, which is not always the one it feels
            like.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
