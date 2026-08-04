import { Link } from 'react-router'

const ARTICLES = [
  {
    tag: 'Article 1',
    body: 'Title, one-line standfirst, named founder, date. A specific call made under uncertainty, and what happened.',
  },
  {
    tag: 'Article 2',
    body: 'Title, one-line standfirst, named founder, date. An argument the firm is willing to be wrong about in public.',
  },
  {
    tag: 'Article 3',
    body: 'Title, one-line standfirst, named founder, date. A clear no. Where AI does not belong, or when not to modernize.',
  },
]

export default function Insights() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Insights</p>
          <h1 className="h1">Arguments, not explainers.</h1>
          <p className="sub">
            We write when we have something specific to say, which is not often.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="ph mb-28">
            <span className="ph__tag">Placeholder · B5, blocked</span>
            <p className="ph__body">
              No articles exist yet. This page and its nav item should not go live until there are
              at least three. An empty insights index actively damages a firm whose positioning is
              that it sells judgment rather than information. The headline and subhead above are
              candidate directions, not approved copy.
            </p>
          </div>
          <div className="grid" style={{ gap: '12px' }}>
            {ARTICLES.map((a) => (
              <div className="ph" key={a.tag}>
                <span className="ph__tag">{a.tag}</span>
                <p className="ph__body">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">What belongs here, and what does not.</h2>
          <div className="grid g2">
            <div className="card">
              <p className="kicker">Do not publish</p>
              <p className="body">
                Explainers a reader can get from any vendor blog. Framework content. Anything that
                reads as a lead magnet with a gate in front of it.
              </p>
            </div>
            <div className="card">
              <p className="kicker">Do publish</p>
              <p className="body">
                A specific call made under uncertainty and what happened. Something learned from
                real delivery that contradicts the consensus. A clear no.
              </p>
            </div>
          </div>
          <p className="quote mt-28">
            If a competitor could publish the same piece with their logo swapped in, do not publish
            it.
          </p>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Would rather talk than read?</h2>
          <p className="sub mb-28">
            Most of what we know does not make it onto a page. Ask us directly.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
