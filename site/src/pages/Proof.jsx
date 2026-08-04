import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Button, TextLink, Card, Placeholder } from '../components/primitives.jsx'

const STATEMENTS = ['Proof statement 1 · commerce', 'Proof statement 2 · content', 'Proof statement 3 · integration']

/* EXTRAPOLATED — no comp for this page. */
export default function Proof() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">Proof</Eyebrow>
          <H1 tone="hero" className="mb-6">The firm is new. The people are not.</H1>
          <Placeholder tag="Placeholder · hero copy" className="max-w-2xl">
            Headline and subhead to be written once B1 lands. The page owns the honest position: there are no case studies yet, and here is why we are still worth talking to.
          </Placeholder>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">The work.</H2>
          <Lead className="mb-10">Three anonymized statements. Category and scale, no client named. This is the section that does the actual persuading.</Lead>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {STATEMENTS.map((tag) => (
              <Placeholder key={tag} tag={tag}>Anonymized client work by category and scale, one to two lines, no client named. Blocked by B1.</Placeholder>
            ))}
          </div>
          <Placeholder tag="Rules for whoever writes these">
            Must be true and substantiable by a specific named founder. Category and scale are what make it proof. Write them from real engagements and then remove the identifying detail, rather than writing marketing copy and hoping it is close enough.
          </Placeholder>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">What we have built.</H2>
          <Lead className="mb-10">Product work requires no client permission to discuss, so it is the easiest proof to publish.</Lead>
          <div className="grid gap-4 md:grid-cols-2">
            <Card><H3>Blink Social</H3><Body className="max-w-none">A content strategy and planning tool, built by this team and running in production.</Body></Card>
            <Card><H3>AI development pipeline</H3><Body className="max-w-none">The multi-agent delivery system used on engagements, and the reason a small team can take on work at this scale.</Body></Card>
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">How we work is evidence too.</H2>
          <Body className="mb-8">When you cannot show what you shipped, show how you operate. The delivery model is specific, unusual, and verifiable in a conversation.</Body>
          <TextLink to="/how-we-work/delivery-model">See the delivery model</TextLink>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Test the claim rather than read more of it.</H2>
          <Lead className="mx-auto mb-8">Bring us something real. That is a faster way to judge a firm than any page of credentials.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
