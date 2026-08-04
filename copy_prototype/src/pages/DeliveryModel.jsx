import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { NumList } from '../components/Lists.jsx'

const ROLES = [
  {
    title: 'Context and analysis',
    agents:
      'Read the estate, the data, the documentation, and the code. Surface what is actually there rather than what the diagram says',
    human: 'Deciding what matters and what the findings mean for your situation',
  },
  {
    title: 'Planning',
    agents: 'Draft sequences, dependencies, and estimates from the analysis',
    human: 'Committing to a plan and standing behind the estimate',
  },
  {
    title: 'Architecture',
    agents: 'Generate options, trace implications, check consistency against constraints',
    human: 'The architectural decision and the tradeoffs accepted',
  },
  {
    title: 'Design',
    agents: 'Produce and iterate interface and interaction work at speed',
    human: 'Whether the design serves the user and the outcome',
  },
  {
    title: 'Development',
    agents: 'Write, refactor, and document code against a defined specification',
    human: 'Specification, review, and accountability for what ships',
  },
  {
    title: 'Testing and QA',
    agents: 'Generate and run test coverage continuously rather than at the end',
    human: 'Defining what correct means and what risk is unacceptable',
  },
  {
    title: 'Knowledge',
    agents: 'Capture decisions, patterns, and rationale as the work happens',
    human: 'Judging what is worth reusing and what was situational',
  },
]

const HUMAN_ONLY = [
  'Every consequential decision, with a named person accountable for it.',
  'Every judgment that depends on your context rather than on general knowledge.',
  'Every commitment we make to you about scope, cost, or date.',
]

const BENEFITS = [
  {
    title: 'Cost is predictable.',
    body: 'We can commit to a price because we are not guessing at how many hours a team will need.',
  },
  {
    title: 'Quality is more consistent.',
    body: 'Test coverage and documentation happen continuously rather than depending on whether the schedule held.',
  },
  {
    title: 'Context is not lost.',
    body: 'Decisions and rationale are captured as the work happens, so the reasoning survives past the engagement.',
  },
  {
    title: 'Smaller teams, less overhead.',
    body: 'Fewer people means fewer handoffs, fewer status meetings, and less of your time spent managing us.',
  },
]

const SPINE = [
  'Client work',
  'What we learn',
  'Methods and reusable assets',
  'Better delivery',
  'Next engagement',
]

export default function DeliveryModel() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">How we deliver</p>
          <h1 className="h1">An AI-assisted operating system, directed by people.</h1>
          <p className="sub">
            AI agents work across every major role in a modern engagement. Humans stay responsible
            for judgment, your context, the decisions, and the outcome.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">The delivery model is the reason the commercial model works.</h2>
          <p className="body">
            Most firms sell hours because hours are the only thing they can predict. If delivery
            speed is set by headcount, then time and materials is the honest way to price it, and
            the client carries the risk of everything taking longer than expected.
          </p>
          <p className="body mb-28">
            We built delivery differently so we could price differently. Agents handle the parts of
            an engagement that are repeatable, documentable, and slow when done by hand. That
            compresses the work enough that we can price a fixed scope or a milestone schedule and
            carry the estimate risk ourselves rather than passing it to you.
          </p>
          <p className="quote">Our progress is measured by value created, not effort expended.</p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Where agents work, and what a human is still responsible for.</h2>
          <p className="sub mb-28">
            These are roles in a delivery system, not sequential steps. Several run at once
            throughout an engagement.
          </p>
          <div className="grid" style={{ gap: '12px' }}>
            {ROLES.map((r) => (
              <div className="card" key={r.title}>
                <h3 className="card-title">{r.title}</h3>
                <div className="grid g2" style={{ gap: '14px' }}>
                  <div>
                    <span className="kicker">What agents do</span>
                    <p className="body" style={{ margin: '6px 0 0' }}>
                      {r.agents}
                    </p>
                  </div>
                  <div>
                    <span className="kicker">What a human owns</span>
                    <p className="body" style={{ margin: '6px 0 0' }}>
                      {r.human}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="quote mt-28">
            Humans provide judgment. Agents accelerate execution. We own the work.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">This is not AI writing your systems unsupervised.</h2>
          <p className="body">
            There is a version of this claim that is marketing, and we want to be clear we are not
            making it.
          </p>
          <p className="body">
            Agents do not decide your architecture. They do not judge whether a design serves your
            customers. They do not carry accountability, because accountability cannot be delegated
            to a system that cannot be held responsible.
          </p>
          <p className="body mb-28">
            What they do is remove the drag: the reading, the drafting, the scaffolding, the test
            coverage, the documentation that usually gets written last or not at all. That is a
            large share of any engagement, and compressing it is what creates the speed.
          </p>
          <p className="kicker mb-14">Three things that remain human</p>
          <NumList items={HUMAN_ONLY} />
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Speed, consistency, and a commercial model that matches.</h2>
          <div className="grid g4 mb-28">
            {BENEFITS.map((b) => (
              <div className="card" key={b.title}>
                <h3 className="card-title">{b.title}</h3>
                <p className="body">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="quote">
            Execution without the overhead is not a slogan. It is what this model produces.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Each engagement should improve the next one.</h2>
          <p className="body">
            A firm built around execution cannot treat every engagement as a blank page. What we
            learn on your work becomes reusable methods, patterns, and components, which lowers the
            cost and the risk of the work that follows.
          </p>
          <p className="body mb-28">
            That benefits you directly. You are not paying us to rediscover something we already
            solved for someone else.
          </p>
          <div className="spine mb-28">
            <div
              className="spine__nodes"
              style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))' }}
            >
              {SPINE.map((node) => (
                <div className="node" key={node}>
                  {node}
                </div>
              ))}
            </div>
          </div>
          <p className="kicker mb-8">Note on ownership</p>
          <p className="body mb-28">
            Reusable assets are our methods and patterns, never your data, your business logic, or
            anything specific to your organization. Where we build something for you, you own it.
            Ownership terms are explicit in every engagement.
          </p>
          <TLink to="/what-we-do/ai-products">See AI-driven products</TLink>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">See it on real work.</h2>
          <p className="sub mb-28">
            The fastest way to judge a delivery model is to put a real problem in front of it. Bring
            one.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
