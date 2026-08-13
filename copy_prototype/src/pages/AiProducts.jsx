import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const FORMS = [
  {
    title: 'Delivery accelerators',
    body: 'Reusable methods, agents, workflows, and patterns built from prior client work. Not sold separately: they lower the risk and the cost of the engagement they are used in.',
  },
  {
    title: 'Client-owned products',
    body: 'Sometimes the right answer is a product built for one organization and owned outright by it. You own the code, the IP, and the roadmap. We build it and hand it over.',
  },
  {
    title: 'Market-facing products',
    body: 'Occasionally a pattern proves general enough to become a product in its own right. That is rare, and we treat it as rare.',
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
          <p className="kicker">
            <Link to="/what-we-do">What we do</Link>
            <span aria-hidden="true">/</span>
            <span>AI-driven Products</span>
          </p>
          <h1 className="h1">You need proven solutions.</h1>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">A firm that has done the work should not arrive empty-handed.</h2>
          <p className="sub mb-28">
            Some of what you are about to build has been built before. Starting from zero is a
            choice, and it is usually the expensive one.
          </p>
          <p className="eyebrow mb-14">What we offer</p>
          <h3 className="card-title">Three forms, depending on what the work needs.</h3>
          <div className="grid g3">
            {FORMS.map((f) => (
              <div className="card" key={f.title}>
                <h4 className="card-title">{f.title}</h4>
                <p className="body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="card">
            <p className="eyebrow mb-14">Proof</p>
            <h2 className="h2">The clearest proof is what we have built ourselves.</h2>
            <p className="body">
              Our AI development pipeline is the multi-agent delivery system that lets a small team
              take on work at this scale, used on engagements rather than sold as software. Blink
              Social, our content strategy and planning tool, is built by this team and running in
              production. It is the clearest evidence that we ship products, not just advise on
              them.
            </p>
            <TLink to="/proof">See what we have shipped</TLink>
          </div>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <p className="eyebrow mb-14">What you leave with</p>
          <h3 className="card-title">Faster time to value and lower delivery risk.</h3>
          <dl className="grid">
            {BENEFITS.map((b) => (
              <div key={b.title}>
                <dt className="card-title">{b.title}</dt>
                <dd className="body">{b.body}</dd>
              </div>
            ))}
          </dl>
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
            outcome, and leave us with sharper methods for the next one.
          </p>
          <TLink to="/how-we-work/engagement-model">See the engagement model</TLink>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <p className="eyebrow mb-14">AI-driven Products</p>
          <h2 className="h2">Ask what already exists.</h2>
          <p className="sub mb-28">
            Describe what you are planning to build. We will tell you honestly which parts we have
            solved before, and which are genuinely new.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
