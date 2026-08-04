import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { TermList } from '../components/Lists.jsx'

const PRICING = [
  ['Advisory', 'The value is the decision, not the hours spent reaching it'],
  ['Engineering', 'You should know the cost of the outcome before committing to it'],
  ['AI-driven products', 'The value recurs, so the pricing should too'],
]

export default function EngagementModel() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">How we engage</p>
          <h1 className="h1">We price for value, not for effort.</h1>
          <p className="sub">
            The goal is not to sell more hours. Selling hours means our incentive improves when the
            work takes longer, and we would rather not build a business on that.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Clients want a partner with skin in the game.</h2>
          <p className="body">
            Large time and materials programs are getting harder to justify, and reasonably so. They
            place the risk of overrun entirely on the buyer, and they reward the seller for the
            thing the buyer least wants.
          </p>
          <p className="body mb-28">
            At the same time, buyers expect AI to create real efficiency. If a firm claims AI has
            transformed its delivery and still bills the same hourly way it did five years ago, one
            of those two things is not true.
          </p>
          <p className="quote">Our progress is measured by value created, not effort expended.</p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">
            Pricing should match how value is created, so no single model fits everything.
          </h2>
          <TermList items={PRICING} termWidth="240px" maxWidth="820px" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">The delivery model is what makes the commercial model possible.</h2>
          <p className="body">
            When delivery speed is set by headcount, the only honest thing to sell is time, and the
            risk of everything taking longer sits with you. Our delivery runs AI agents across every
            major role in an engagement, which compresses the work enough that we can carry the risk
            of an estimate instead of passing it to you.
          </p>
          <p className="body mb-28">
            Reuse compounds the same effect. Each engagement produces methods and patterns that
            lower the cost of the next one, so a meaningful share of the work is not being invented
            on your budget.
          </p>
          <p className="quote mb-28">
            Larger firms can offer this. Their economics make it hard to mean it. Ours are built to
            mean it.
          </p>
          <div className="btn-row">
            <TLink to="/how-we-work/delivery-model">See the delivery model</TLink>
            <TLink to="/what-we-do/ai-products">See AI-driven products</TLink>
          </div>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Ask us what it would cost.</h2>
          <p className="sub mb-28">
            Describe the outcome you need. We will tell you what we would need to know to price it,
            and how we would structure the work.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
