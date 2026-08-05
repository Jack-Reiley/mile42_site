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
    // Breaks the card's TOP edge. Comp: 101x121 at x=377 (277px into col1), 38px above the card.
    spotClass: 'lg:left-[277px] lg:right-auto lg:top-[-38px] lg:w-[101px]',
    spotSizes: '(min-width: 1024px) 101px, 112px',
  },
  {
    kicker: 'When something must be built',
    title: 'You need to execute',
    body: 'Agentic AI implementation, AI applications and integration, custom software, workflow automation, data platforms, and modernization. Built to work in production.',
    leave: 'Working technology, better execution, and stronger capability',
    href: '/what-we-do/engineering',
    linkLabel: 'Explore engineering',
    spot: 'laptop',
    // Breaks its COLUMN DIVIDER, 27px into col3, while staying inside the card.
    // Bottom-anchored: the comp puts it 169px above the card's bottom, which is
    // stable as copy length changes; a top offset would drift. z-10 lifts it over
    // the divider, which is the next column's left border and paints later.
    spotClass: 'lg:left-[309px] lg:right-auto lg:top-auto lg:bottom-[169px] lg:w-32 lg:z-10',
    spotSizes: '(min-width: 1024px) 128px, 112px',
  },
  {
    kicker: 'When starting from zero is unnecessary',
    title: 'You need proven solutions',
    body: 'Accelerators and products built from patterns that already work, so you are not rebuilding what has been solved.',
    leave: 'Faster time to value and lower delivery risk',
    href: '/what-we-do/ai-products',
    linkLabel: 'Explore AI-driven products',
    spot: 'handshake',
    // Breaks the card's RIGHT edge. The comp puts it 98px below the card's top,
    // beside the heading and clear of the body copy. Our card is 456px tall
    // against the comp's 555, so that literal offset lands on the body text and
    // obscures it. Raised to 56px to restore the comp's relationship: level with
    // the heading, above the body.
    spotClass: 'lg:left-[309px] lg:right-auto lg:top-[56px] lg:w-32',
    spotSizes: '(min-width: 1024px) 128px, 112px',
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
          <Spot
            name="hero-desk"
            priority
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="h-auto w-full max-w-[34rem] justify-self-center lg:justify-self-end"
          />
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
                    sizes={o.spotSizes}
                    className={`absolute -top-12 right-4 h-auto w-28 ${o.spotClass}`}
                  />
                  <Eyebrow>{o.kicker}</Eyebrow>
                  <H3>{o.title}</H3>
                  <Body className="max-w-none">{o.body}</Body>
                  {/* The comp leaves ~107px of whitespace between the body copy and this
                      label — 120px baseline to baseline against a 26px line-height.
                      That gap is deliberate: it is where the laptop spot sits. pt-6 gave
                      column 2 only 36px, because its body is the longest and mt-auto
                      leaves it the least slack, so the laptop clipped the copy. */}
                  <div className="mt-auto pt-24">
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
