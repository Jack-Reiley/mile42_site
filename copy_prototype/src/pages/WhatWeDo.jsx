import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const PATHS = [
  {
    kicker: 'Before a major investment',
    title: 'You need clarity',
    body: 'Decide well before you commit.',
    href: '/what-we-do/advisory',
  },
  {
    kicker: 'When something must be built',
    title: 'You need to execute',
    body: 'Make it work in production, not just a demo.',
    href: '/what-we-do/engineering',
  },
  {
    kicker: 'When starting from zero is unnecessary',
    title: 'You need proven solutions',
    body: 'Reuse what already works.',
    href: '/what-we-do/ai-products',
  },
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

export default function WhatWeDo() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">What we do</p>
          <h1 className="h1">Start with what you need right now.</h1>
          <p className="sub mb-28">
            We meet you at three moments. The right engagement follows from which one you are in.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
          <Link className="btn" to="/how-we-work">
            See how we work
          </Link>
          <div className="grid g3 mt-28">
            {PATHS.map((p) => (
              <Link className="card" key={p.title} to={p.href}>
                <p className="kicker">{p.kicker}</p>
                <h2 className="card-title">{p.title}</h2>
                <p className="body">{p.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="eyebrow mb-14">Core practice</p>
          <h2 className="h2">Agentic AI is the core of how we execute.</h2>
          <p className="body mb-28">
            Most of what we build now runs on agentic AI: systems that take action inside real
            workflows, connected to real data, with governance the business can trust. It is the
            thread through advisory, engineering, and the products we ship.
          </p>
          <TLink to="/agentic-ai">Inside our agentic AI practice</TLink>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Speed, consistency, and a commercial model that matches.</h2>
          <div className="grid g3 mb-28">
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

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Not sure which one you need?</h2>
          <p className="sub mb-28">
            Describe the situation. We will tell you which of these it is, and whether we are the
            right firm for it.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
