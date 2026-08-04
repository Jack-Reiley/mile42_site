import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { PlainList, TermList } from '../components/Lists.jsx'

const WEAK_EXECUTION = [
  'Unclear context',
  'Slow decisions',
  'Poor adoption',
  'Fragmented delivery',
  'Expensive potential',
]

const STRONG_EXECUTION = [
  'Clear context',
  'Better decisions',
  'Sound engineering',
  'Adoption and follow-through',
  'Measurable value',
]

const DOCTRINE = [
  ['Purpose', 'Better customer outcomes are our purpose'],
  ['Domain', 'Technology is our domain'],
  ['Craft', 'Execution is our craft'],
  ['Legacy', 'Your increased capabilities are our legacy'],
]

const MOST_FIRMS_SELL = [
  'Advice that ends at a document',
  'Technology delivered without an outcome',
  'Execution without context',
]

const WE_REQUIRE = [
  'Judgment tied to action',
  'Technology built for outcomes',
  'Execution that leaves capability',
]

const PRINCIPLES = [
  {
    title: 'Clarity over complexity',
    body: 'If an idea needs jargon to sound important, we have probably not expressed it clearly enough. Clear language is not cosmetic. It reflects clear thinking, and clear thinking leads to better execution. Prefer the simplest idea that remains true.',
  },
  {
    title: 'Context before solutions',
    body: 'Good execution begins with understanding. That is especially true in an AI-native world, where context improves decisions, engineering, delivery, and the AI systems themselves. Without context, technology work becomes guesswork.',
  },
  {
    title: 'Judgment, not information',
    body: 'AI is making information, frameworks, and generic playbooks nearly free. What does not commoditize is judgment: knowing a specific situation, making the right call under uncertainty, and standing behind what happens next.',
  },
  {
    title: 'Meet you where you are',
    body: 'You are trying to make a decision, execute important work, reduce risk, or move faster without losing control. We start with the need you recognize, then explain the expertise required and what the work should change.',
  },
]

export default function WhyMile42() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Why we exist</p>
          <h1 className="h1">We were built around the part that is actually hard.</h1>
          <p className="sub">Not the ideas. Not the technology. The execution.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Meaningful progress is still difficult.</h2>
          <p className="body">
            The tools are stronger and the playbooks are easier to reach. Organizations still have
            to turn all of that into working systems, changed behavior, better decisions, and
            results someone can measure.
          </p>
          <p className="body mb-28">
            That has not become easier. In some ways abundance made it harder, because there are
            more plausible options, more pressure to act, and less agreement about which direction
            is right.
          </p>
          <p className="quote">
            The gap is not access to ideas. It is the ability to turn them into outcomes.
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">The same technology produces very different outcomes.</h2>
          <p className="sub mb-28">
            If technology were the differentiator, two organizations buying the same platform would
            get the same result. They do not, and the gap between them is often enormous.
          </p>
          <div className="grid g2 mb-28">
            <div className="card">
              <h3 className="card-title">Same technology, weak execution</h3>
              <PlainList items={WEAK_EXECUTION} style={{ gap: '8px' }} />
            </div>
            <div className="card">
              <h3 className="card-title">Same technology, strong execution</h3>
              <PlainList items={STRONG_EXECUTION} style={{ gap: '8px' }} />
            </div>
          </div>
          <p className="quote">The tool is not the advantage. The execution system around it is.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Our doctrine.</h2>
          <p className="body mb-28">
            Four commitments define the firm, and everything about how we operate follows from them.
          </p>
          <TermList items={DOCTRINE} termWidth="160px" maxWidth="760px" />
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Our engagements are built around your outcomes.</h2>
          <p className="body">
            Most firms are structured to protect their margin when work goes wrong. We are
            structured to protect your result. That principle shapes how we scope, staff, and run
            every engagement.
          </p>
          <p className="body mb-28">We own the work. You own the results.</p>
          <p className="kicker mb-14">What most firms sell</p>
          <PlainList
            items={MOST_FIRMS_SELL}
            className="mb-18"
            style={{ gap: '8px', maxWidth: '820px' }}
          />
          <p className="body mb-28">
            Each of these is normal, defensible, and billable. None of them is enough.
          </p>
          <p className="kicker mb-14">What we require instead</p>
          <PlainList
            items={WE_REQUIRE}
            variant="title"
            className="mb-28"
            style={{ gap: '8px', maxWidth: '820px' }}
          />
          <p className="body mb-28">
            If the work does not change how you operate, it is not enough.
          </p>
          <p className="quote mb-18">
            Larger firms can say this. Their economics make it hard to mean it. Ours are built to
            mean it.
          </p>
          <TLink to="/proof">Why organizations trust us</TLink>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Four principles that hold under pressure.</h2>
          <p className="sub mb-28">
            A firm built around execution needs more than capability. It needs a way of thinking
            that improves decisions when the situation is uncertain and the pressure is real.
          </p>
          <div className="grid g2">
            {PRINCIPLES.map((p) => (
              <div className="card" key={p.title}>
                <h3 className="card-title">{p.title}</h3>
                <p className="body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Each engagement should improve the next one.</h2>
          <p className="body">
            A firm built around execution cannot treat every engagement as a blank page. What we
            learn becomes reusable methods, patterns, and components, which lowers the cost and the
            risk of the work that follows.
          </p>
          <p className="body mb-28">
            That benefits you directly. You are not paying us to rediscover something we solved
            somewhere else.
          </p>
          <p className="quote">The work should not disappear when the engagement ends.</p>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">That is the reasoning. Here is the test.</h2>
          <p className="sub mb-28">
            Bring us something that has to work. The argument on this page is only worth as much as
            what happens next.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
