import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Quote, Button, Placeholder, Card } from '../components/primitives.jsx'
import { REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'

const ARTICLES = [
  { tag: 'Article 1', body: 'Title, one-line standfirst, named founder, date. A specific call made under uncertainty, and what happened.' },
  { tag: 'Article 2', body: 'Title, one-line standfirst, named founder, date. An argument the firm is willing to be wrong about in public.' },
  { tag: 'Article 3', body: 'Title, one-line standfirst, named founder, date. A clear no. Where AI does not belong, or when not to modernize.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function Insights() {
  return (
    <>
      <Section band="brand" grain>
        <Wrap>
          <Eyebrow tone="hero" className="mb-4">Insights</Eyebrow>
          <H1 tone="hero" className="mb-6">Arguments, not explainers.</H1>
          <Lead tone="hero">We write when we have something specific to say, which is not often.</Lead>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Placeholder tag="Placeholder · B5, blocked" className="mb-8">
            No articles exist yet. This page and its nav item should not go live until there are at least three. An empty insights index actively damages a firm whose positioning is that it sells judgment rather than information. The headline and subhead above are candidate directions, not approved copy.
          </Placeholder>
          <div className={`${REVEAL_GROUP.relay} grid gap-3`}>
            {ARTICLES.map((a) => <Placeholder key={a.tag} tag={a.tag}>{a.body}</Placeholder>)}
          </div>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">What belongs here, and what does not.</H2>
          <div className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-4 md:grid-cols-2`}>
            <Card>
              <Eyebrow>Do not publish</Eyebrow>
              <Body className="max-w-none">Explainers a reader can get from any vendor blog. Framework content. Anything that reads as a lead magnet with a gate in front of it.</Body>
            </Card>
            <Card>
              <Eyebrow>Do publish</Eyebrow>
              <Body className="max-w-none">A specific call made under uncertainty and what happened. Something learned from real delivery that contradicts the consensus. A clear no.</Body>
            </Card>
          </div>
          <Quote className="mt-8">If a competitor could publish the same piece with their logo swapped in, do not publish it.</Quote>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-4">Would rather talk than read?</H2>
          <Lead tone="hero" className="mx-auto mb-8">Most of what we know does not make it onto a page. Ask us directly.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
