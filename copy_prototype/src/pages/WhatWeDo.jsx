import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const OFFERINGS = [
  {
    kicker: 'Before a major investment',
    title: 'You need clarity',
    body: 'Something significant is about to be decided and the context is not yet good enough to decide it well.',
    leave: 'Direction, context, and decision confidence',
    href: '/what-we-do/advisory',
    linkLabel: 'Explore advisory',
  },
  {
    kicker: 'When something must be built',
    title: 'You need to execute',
    body: 'Something important has to work in production, for real users, inside real constraints.',
    leave: 'Working technology, better execution, and stronger capability',
    href: '/what-we-do/engineering',
    linkLabel: 'Explore engineering',
  },
  {
    kicker: 'When starting from zero is unnecessary',
    title: 'You need proven solutions',
    body: 'Part of what you are about to build has been built before, and rebuilding it is the expensive choice.',
    leave: 'Faster time to value and lower delivery risk',
    href: '/what-we-do/ai-products',
    linkLabel: 'Explore AI-driven products',
  },
]

const STANDARDS = [
  {
    title: 'The work has to change something.',
    body: 'Advice that ends at a document, or technology delivered without an outcome, is not enough.',
  },
  {
    title: 'Context comes first.',
    body: 'We understand the situation before we recommend or build anything.',
  },
  {
    title: 'You should be stronger afterward.',
    body: 'Every engagement should leave your organization more capable than it was, not more dependent on us.',
  },
]

export default function WhatWeDo() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">What we do</p>
          <h1 className="h1">Start with what you need right now.</h1>
          <p className="sub">
            Organizations come to us at three different moments. The right engagement follows from
            which one you are in.
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Three ways organizations work with us.</h2>
          <div className="grid g3 mb-28">
            {OFFERINGS.map((o) => (
              <article className="card" key={o.title}>
                <p className="kicker">{o.kicker}</p>
                <h3 className="card-title">{o.title}</h3>
                <p className="body">{o.body}</p>
                <div className="card__leave">
                  <span className="kicker">You leave with:</span>
                  <span className="card__leave-val">{o.leave}</span>
                </div>
                <TLink to={o.href}>{o.linkLabel}</TLink>
              </article>
            ))}
          </div>
          <p className="body">
            It is common to need clarity and execution at the same time, or to be partway into a
            build and unsure whether the path still holds.
          </p>
          <p className="body mb-28">
            That is normal and it does not need to be resolved before talking to us. Describe the
            situation and we will tell you which of these it actually is, which is not always the
            one it feels like.
          </p>
          <p className="quote">The offering is a starting point, not a boundary.</p>
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
          <h2 className="h2">The same standard applies whichever one you start with.</h2>
          <div className="grid g3">
            {STANDARDS.map((s) => (
              <div className="card" key={s.title}>
                <h3 className="card-title">{s.title}</h3>
                <p className="body">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-28">
            <TLink to="/how-we-work">See how we work</TLink>
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
