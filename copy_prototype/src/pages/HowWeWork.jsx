import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'

const TOPICS = [
  {
    kicker: 'What happens, and in what order?',
    title: 'Client journey',
    body: 'Four stages, and the stronger position each one leaves you in. Understand, design, build, evolve.',
    get: 'A view of where you would enter and what changes at each stage',
    href: '/how-we-work/client-journey',
    linkLabel: 'See the client journey',
  },
  {
    kicker: 'How does the work get done?',
    title: 'Delivery model',
    body: 'An AI-assisted operating system with agents across every major role, and humans accountable for judgment and outcomes.',
    get: 'The specifics of who does what, including what stays human',
    href: '/how-we-work/delivery-model',
    linkLabel: 'See the delivery model',
  },
  {
    kicker: 'How do we engage commercially?',
    title: 'Engagement model',
    body: 'How we think about pricing, and why we would rather sell an outcome than a timesheet.',
    get: 'Our posture, before the conversation about specifics',
    href: '/how-we-work/engagement-model',
    linkLabel: 'See the engagement model',
  },
]

export default function HowWeWork() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">How we work</p>
          <h1 className="h1">Execution is the product, so how we work is the product.</h1>
          <p className="sub">
            Most firms describe what they sell. Fewer are willing to show how the work actually
            runs, because that is where the difference between firms is real.
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Three things worth understanding before you engage us.</h2>
          <div className="grid g3">
            {TOPICS.map((t) => (
              <article className="card" key={t.title}>
                <p className="kicker">{t.kicker}</p>
                <h3 className="card-title">{t.title}</h3>
                <p className="body">{t.body}</p>
                <div className="card__leave">
                  <span className="kicker">You get:</span>
                  <span className="card__leave-val">{t.get}</span>
                </div>
                <TLink to={t.href}>{t.linkLabel}</TLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Any firm can claim it executes well.</h2>
          <p className="body">
            The claim is free. What is not free is describing the operating model in enough detail
            that a client can check it, and then being held to that description on a real
            engagement.
          </p>
          <p className="body mb-28">
            So these pages are more specific than they need to be for marketing. That is deliberate.
            If our delivery model does not survive being written down, it is not a delivery model,
            it is a story.
          </p>
          <p className="quote">Read them, then test them against something real.</p>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">The fastest way to judge this is to use it.</h2>
          <p className="sub mb-28">
            Bring us a problem that has to work. How we operate will be obvious within the first
            conversation.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
