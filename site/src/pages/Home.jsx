import {
  Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Note,
  Button, ButtonRow, TextLink, Card, Placeholder, Spot,
} from '../components/primitives.jsx'
import { NumList, LogoSlots } from '../components/Lists.jsx'

const OFFERINGS = [
  {
    kicker: 'Before a major investment',
    title: 'You need clarity',
    body: 'AI strategy, integration and ingestion strategy, discovery, modernization planning, platform selection, and architecture review. We help you decide before you commit.',
    leave: 'Direction, context, and decision confidence',
    href: '/what-we-do/advisory',
    linkLabel: 'Explore advisory',
    spot: 'lightbulb',
  },
  {
    kicker: 'When something must be built',
    title: 'You need to execute',
    body: 'Agentic AI implementation, AI applications and integration, custom software, workflow automation, data platforms, and modernization. Built to work in production.',
    leave: 'Working technology, better execution, and stronger capability',
    href: '/what-we-do/engineering',
    linkLabel: 'Explore engineering',
    spot: 'laptop',
  },
  {
    kicker: 'When starting from zero is unnecessary',
    title: 'You need proven solutions',
    body: 'Accelerators and products built from patterns that already work, so you are not rebuilding what has been solved.',
    leave: 'Faster time to value and lower delivery risk',
    href: '/what-we-do/ai-products',
    linkLabel: 'Explore AI-driven products',
    spot: 'handshake',
  },
]

const PRINCIPLES = [
  'You know what the work costs before you commit.',
  'The risk of an estimate sits with the people who made it.',
  'We stay until the work is right.',
]

const PRACTICE = [
  { title: 'Context and workflow design', body: 'Understanding the work well enough to know where an agent belongs and where it does not.' },
  { title: 'Architecture and integration', body: 'Connecting agents to real data, real systems, and the platforms you already run.' },
  { title: 'Governance and risk', body: 'Controls, evaluation, and oversight that let the business trust what it deploys.' },
  { title: 'Adoption and accountability', body: 'Getting the system used, measured, and improved after go-live.' },
]

const PROOF = [
  'Proof statement 1 · commerce',
  'Proof statement 2 · content',
  'Proof statement 3 · integration',
]

export default function Home() {
  return (
    <>
      {/* Follows design/Homepage.pdf */}
      <Section band="brand" className="overflow-hidden">
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="text-body-lg text-ink mb-6">Execution without the overhead.</p>
            <H1 tone="hero" className="mb-6">
              We help organizations deliver their most important work.
            </H1>
            <Lead className="mb-8">
              Advisory, engineering, and AI systems that change how work actually gets done. We own
              the work, you own the results.
            </Lead>
            <ButtonRow>
              <Button to="/contact">Start a conversation</Button>
              <Button to="/how-we-work/delivery-model" variant="secondary">
                See how we deliver
              </Button>
            </ButtonRow>
          </div>
          <Spot name="hero-desk" className="w-full max-w-[34rem] justify-self-center lg:justify-self-end" />
        </Wrap>
      </Section>

      {/* Follows design/Homepage.pdf: one card, vertical dividers, spots breaking the edge */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-4 text-center">Three ways organizations work with us.</H2>
          <Lead className="mx-auto mb-16 text-center">
            Start with what you need right now. The right engagement follows from that.
          </Lead>

          <div className="relative rounded-card border border-ink bg-page shadow-hard">
            <div className="grid lg:grid-cols-3">
              {OFFERINGS.map((o, i) => (
                <article
                  key={o.title}
                  className={`relative flex flex-col gap-3 p-card ${
                    i > 0 ? 'border-t border-ink lg:border-t-0 lg:border-l' : ''
                  }`}
                >
                  <Spot
                    name={o.spot}
                    className="pointer-events-none absolute -top-12 right-4 w-28 lg:w-32"
                  />
                  <Eyebrow>{o.kicker}</Eyebrow>
                  <H3>{o.title}</H3>
                  <Body className="max-w-none">{o.body}</Body>
                  <div className="mt-auto pt-6">
                    <Eyebrow tone="ink" className="mb-1">You leave with:</Eyebrow>
                    <p className="text-body text-ink">{o.leave}</p>
                  </div>
                  <div className="pt-6">
                    <Button to={o.href} variant="secondary">{o.linkLabel}</Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Wrap>
      </Section>

      {/* EXTRAPOLATED — no comp below this point */}
      <Section>
        <Wrap>
          <H2 className="mb-6">Our engagements are built around your outcomes.</H2>
          <Body className="mb-8">
            Most firms are structured to protect their margin when work goes wrong. We are
            structured to protect your result. That principle shapes how we scope, price, and staff
            every engagement.
          </Body>
          <NumList items={PRINCIPLES} as="ol" className="mb-8" />
          <Quote>
            &#8220;Larger firms can say this. Their economics make it hard to mean it. Ours are
            built to mean it.&#8221;
          </Quote>
        </Wrap>
      </Section>

      {/* EXTRAPOLATED */}
      <Section band="surface">
        <Wrap>
          <Eyebrow className="mb-4">Core practice</Eyebrow>
          <H2 className="mb-4">Our core practice is agentic AI implementation and integration.</H2>
          <Lead className="mb-10">
            AI is not valuable because it is impressive. It is valuable when it changes work.
          </Lead>
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            {PRACTICE.map((p) => (
              <Card key={p.title}>
                <H3>{p.title}</H3>
                <Body className="max-w-none">{p.body}</Body>
              </Card>
            ))}
          </div>
          <Body className="mb-6">
            We will also tell you when the answer is not an agent. Some problems are better solved
            by fixing a process or writing conventional software, and we say so.
          </Body>
          <Quote className="mb-6">The opportunity is AI. The constraint is implementation.</Quote>
          <TextLink to="/agentic-ai">Inside our agentic AI practice</TextLink>
        </Wrap>
      </Section>

      {/* EXTRAPOLATED */}
      <Section>
        <Wrap>
          <H2 className="mb-4">
            Deep experience where it counts, in a firm shaped for what comes next.
          </H2>
          <Lead className="mb-10">
            Enterprise and mid-market content, commerce, and large-scale integration work.
          </Lead>
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {PROOF.map((tag) => (
              <Placeholder key={tag} tag={tag}>
                Anonymized client work by category and scale, one to two lines, no client named.
              </Placeholder>
            ))}
          </div>
          <Note className="mb-4">
            We stay multi-model and partner-literate so you can move with confidence.
          </Note>
          <div className="mb-10">
            <LogoSlots />
          </div>
          <TextLink to="/proof">Why organizations trust us</TextLink>
        </Wrap>
      </Section>

      {/* EXTRAPOLATED */}
      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Tell us what needs to work.</H2>
          <Lead className="mx-auto mb-8">
            Bring the problem. We will tell you honestly whether we are the right firm to solve it.
          </Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
