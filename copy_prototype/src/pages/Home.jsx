import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const OFFERINGS = [
  {
    kicker: 'Before a major investment',
    title: 'You need clarity',
    body: 'AI strategy, integration and ingestion strategy, discovery, modernization planning, platform selection, and architecture review. We help you decide before you commit.',
    leave: 'Direction, context, and decision confidence',
    href: '/what-we-do/advisory',
    linkLabel: 'Explore advisory',
  },
  {
    kicker: 'When something must be built',
    title: 'You need to execute',
    body: 'Agentic AI implementation, AI applications and integration, custom software, workflow automation, data platforms, and modernization. Built to work in production.',
    leave: 'Working technology, better execution, and stronger capability',
    href: '/what-we-do/engineering',
    linkLabel: 'Explore engineering',
  },
  {
    kicker: 'When starting from zero is unnecessary',
    title: 'You need proven solutions',
    body: 'Accelerators and products built from patterns that already work, so you are not rebuilding what has been solved.',
    leave: 'Faster time to value and lower delivery risk',
    href: '/what-we-do/ai-products',
    linkLabel: 'Explore AI-driven products',
  },
]

const PRINCIPLES = [
  'You know what the work costs before you commit.',
  'The risk of an estimate sits with the people who made it.',
  'We stay until the work is right.',
]

const PRACTICE = [
  {
    title: 'Context and workflow design',
    body: 'Understanding the work well enough to know where an agent belongs and where it does not.',
  },
  {
    title: 'Architecture and integration',
    body: 'Connecting agents to real data, real systems, and the platforms you already run.',
  },
  {
    title: 'Governance and risk',
    body: 'Controls, evaluation, and oversight that let the business trust what it deploys.',
  },
  {
    title: 'Adoption and accountability',
    body: 'Getting the system used, measured, and improved after go-live.',
  },
]

const PROOF = [
  'Proof statement 1 · commerce',
  'Proof statement 2 · content',
  'Proof statement 3 · integration',
]

export default function Home() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Execution without the overhead.</p>
          <h1 className="h1">We help organizations deliver their most important work.</h1>
          <p className="sub mb-28">
            Advisory, engineering, and AI systems that change how work actually gets done. We own
            the work, you own the results.
          </p>
          <div className="btn-row">
            <Link className="btn" to="/contact">
              Start a conversation
            </Link>
            <Link className="btn btn--ghost" to="/how-we-work/delivery-model">
              See how we deliver
            </Link>
          </div>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Three ways organizations work with us.</h2>
          <p className="sub mb-28">
            Start with what you need right now. The right engagement follows from that.
          </p>
          <div className="grid g3">
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
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Our engagements are built around your outcomes.</h2>
          <p className="body mb-28">
            Most firms are structured to protect their margin when work goes wrong. We are
            structured to protect your result. That principle shapes how we scope, price, and staff
            every engagement.
          </p>
          <ol className="nums mb-28">
            {PRINCIPLES.map((text, i) => (
              <li key={text}>
                <span className="nums__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="nums__t">{text}</span>
              </li>
            ))}
          </ol>
          <p className="quote">
            &#8220;Larger firms can say this. Their economics make it hard to mean it. Ours are
            built to mean it.&#8221;
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <p className="eyebrow mb-14">Core practice</p>
          <h2 className="h2">Our core practice is agentic AI implementation and integration.</h2>
          <p className="sub mb-28">
            AI is not valuable because it is impressive. It is valuable when it changes work.
          </p>
          <div className="grid g4 mb-28">
            {PRACTICE.map((p) => (
              <div className="card" key={p.title}>
                <h3 className="card-title">{p.title}</h3>
                <p className="body">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="body mb-18">
            We will also tell you when the answer is not an agent. Some problems are better solved
            by fixing a process or writing conventional software, and we say so.
          </p>
          <p className="quote mb-18">The opportunity is AI. The constraint is implementation.</p>
          <TLink to="/agentic-ai">Inside our agentic AI practice</TLink>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">
            Deep experience where it counts, in a firm shaped for what comes next.
          </h2>
          <p className="sub mb-28">
            Enterprise and mid-market content, commerce, and large-scale integration work.
          </p>
          <div className="grid g3 mb-28">
            {PROOF.map((tag) => (
              <div className="ph" key={tag}>
                <span className="ph__tag">{tag}</span>
                <p className="ph__body">
                  Anonymized client work by category and scale, one to two lines, no client named.
                </p>
              </div>
            ))}
          </div>
          <p className="note mb-14">
            We stay multi-model and partner-literate so you can move with confidence.
          </p>
          <div className="logos mb-28">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="logo-slot" key={n}>
                LOGO {n}
              </div>
            ))}
          </div>
          <TLink to="/proof">Why organizations trust us</TLink>
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
