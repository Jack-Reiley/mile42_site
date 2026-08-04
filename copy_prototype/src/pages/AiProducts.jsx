import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const FORMS = [
  {
    title: 'Delivery accelerators',
    body: 'Reusable methods, agents, workflows, components, and patterns built from prior client work. These are not sold separately. They lower the risk and the cost of the engagement they are used in.',
  },
  {
    title: 'Client-owned products',
    body: 'Sometimes the right answer is a product built for one organization and owned outright by that organization. You own the code, the IP, and the roadmap. We build it and hand it over.',
  },
  {
    title: 'Market-facing products',
    body: 'Occasionally a pattern proves general enough to become a product in its own right. That is rare and we treat it as rare.',
  },
]

const BENEFITS = [
  {
    title: 'Less invention.',
    body: 'The parts of your build that have been solved before are not rebuilt from scratch on your budget.',
  },
  {
    title: 'Less risk.',
    body: 'Proven patterns fail less often than novel ones, and they fail in ways we have already seen.',
  },
  {
    title: 'A faster start.',
    body: 'The engagement begins from something rather than from a blank page.',
  },
]

export default function AiProducts() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">AI-driven Products</p>
          <h1 className="h1">You need proven solutions.</h1>
          <p className="sub mb-28">
            Some of what you are about to build has been built before. Starting from zero is a
            choice, and it is usually the expensive one.
          </p>
          <Link className="btn" to="/contact">
            Ask what already exists
          </Link>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">A firm that has done the work should not arrive empty-handed.</h2>
          <p className="body">
            Every engagement produces something reusable. A method that worked. An integration
            pattern that held up. A set of agents that turned out to be right for a class of problem
            rather than one client.
          </p>
          <p className="body">
            Most consulting firms let that evaporate at the end of the engagement, then bill the
            next client to rebuild it. We capture it instead, and the next client gets there faster.
          </p>
          <p className="body mb-28">
            That is what we mean by AI-driven products. Not a catalog you buy from. A body of proven
            work that reduces what your engagement has to invent.
          </p>
          <p className="quote">Use what already works when starting from zero is unnecessary.</p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Three forms, depending on what the work needs.</h2>
          <div className="grid g3">
            {FORMS.map((f) => (
              <div className="card" key={f.title}>
                <h3 className="card-title">{f.title}</h3>
                <p className="body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Reuse is why the economics work.</h2>
          <p className="body">
            Committing to an outcome is difficult when every engagement starts from nothing. It
            becomes practical when a meaningful share of the work has been solved, tested, and
            proven somewhere else.
          </p>
          <p className="body mb-28">
            So the accelerators are not a marketing asset. They are the reason our commercial model
            works, and the reason it keeps improving. Each engagement should leave you with a better
            outcome and leave us with sharper methods for the next one.
          </p>
          <p className="quote mb-18">The work should not disappear when the engagement ends.</p>
          <TLink to="/how-we-work/engagement-model">See the engagement model</TLink>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">The clearest proof is what we have built and run ourselves.</h2>
          <div className="grid g2">
            <div className="card">
              <h3 className="card-title">AI development pipeline</h3>
              <p className="body">
                Our multi-agent delivery system. It is how the seven delivery roles actually run,
                and it is the most direct reason a small team can take on work at this scale. Used
                on engagements, not sold as software.
              </p>
            </div>
            <div className="card">
              <h3 className="card-title">Blink Social</h3>
              <p className="body">
                A content strategy and planning tool. It handles the part of content operations that
                usually happens in spreadsheets and inboxes: deciding what to produce, why it
                matters, who it is for, and when it ships. Planning carries through to generation,
                review, and publishing, so the strategy and the execution stay connected instead of
                drifting apart.
              </p>
              <p className="body">
                Built by this team and running in production. It is the clearest evidence that we
                ship products rather than only advise on them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Faster time to value and lower delivery risk.</h2>
          <div className="grid g3">
            {BENEFITS.map((b) => (
              <div className="card" key={b.title}>
                <h3 className="card-title">{b.title}</h3>
                <p className="body">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Ask what already exists.</h2>
          <p className="sub mb-28">
            Describe what you are planning to build. We will tell you honestly which parts we have
            solved before and which parts are genuinely new.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
