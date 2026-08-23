import {
  Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote,
  Button, ButtonRow, TextLink, Card, Spot,
} from '../components/primitives.jsx'
import { NumList, RuledGroup } from '../components/Lists.jsx'
import CatalogDrawer from '../components/CatalogDrawer.jsx'
import { REVEAL, REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'

const OFFERINGS = [
  {
    kicker: 'Before a major investment',
    title: 'You need clarity',
    body: 'AI strategy, integration and ingestion strategy, discovery, modernization planning, platform selection, and architecture review. We help you decide before you commit.',
    leave: 'Direction, context, and decision confidence',
    href: '/what-we-do/advisory',
    linkLabel: 'Explore advisory',
    spot: 'lightbulb',
    // Breaks the card's TOP edge. Anchored 35px inside its column's right edge,
    // which is where the comp puts it, and which holds as the column narrows.
    spotClass: 'lg:-top-[54px] lg:w-[86px] xl:right-[35px] xl:top-[-38px] xl:w-[101px]',
    spotSizes: '(min-width: 1280px) 101px, (min-width: 1024px) 86px, 112px',
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
    // Anchored to the right and the bottom, so both relationships hold as the
    // card narrows and as copy length changes. Fixed left offsets drifted the
    // spot out of its column between lg and the card's 1240px max width.
    // Bottom-anchored: stable as copy length changes, where a top offset would
    // drift. The comp puts it 169px above the card's bottom; 184px sits better
    // against our slightly shorter card and is a deliberate departure. z-10
    // lifts it over the divider, which is the next column's left border and
    // paints later.
    spotClass: 'lg:-top-[35px] lg:w-24 xl:-right-[25px] xl:top-auto xl:bottom-[184px] xl:w-32 xl:z-10',
    spotSizes: '(min-width: 1280px) 128px, (min-width: 1024px) 96px, 112px',
  },
  {
    kicker: 'When starting from zero is unnecessary',
    title: 'You need proven solutions',
    body: 'Accelerators and products built from patterns that already work, so you are not rebuilding what has been solved.',
    leave: 'Faster time to value and lower delivery risk',
    href: '/what-we-do/ai-products',
    linkLabel: 'Explore AI-driven products',
    spot: 'handshake',
    // Breaks the card's RIGHT edge, anchored 24px past it so the overhang is
    // constant at any card width. The comp puts it 98px below the card's top,
    // beside the heading and clear of the body. Our card was shorter when this
    // was set, so 56px restores that relationship: level with the heading.
    spotClass: 'lg:-top-[35px] lg:w-24 xl:-right-[24px] xl:top-[56px] xl:w-32',
    spotSizes: '(min-width: 1280px) 128px, (min-width: 1024px) 96px, 112px',
  },
]

const PRINCIPLES = [
  'You know what the work costs before you commit.',
  'The risk of an estimate sits with the people who made it.',
  'We stay until the work is right.',
]

const PRACTICE = [
  { title: 'Context and workflow design', body: 'Knowing where an agent belongs, and where it does not.' },
  { title: 'Architecture and integration', body: 'Connecting agents to real data and the platforms you run.' },
  { title: 'Governance and risk', body: 'Controls and oversight the business can trust.' },
  { title: 'Adoption and accountability', body: 'Used, measured, and improved after go-live.' },
]

/* Dewey's supporting points on the homepage.

   Two, not four. The sealed systems of record and the one shared source both
   moved into the catalog drawer diagram, which shows them rather than claiming
   them; repeating them underneath would be the same sentence twice. What is
   left is the pair the picture cannot make: the approval argument and the cost
   argument. */
const DEWEY = [
  {
    title: 'Security review has something it can approve.',
    body: 'What agents are allowed to reach is an explicit decision your team makes and can audit, scoped by business unit and domain.',
  },
  {
    title: 'Every project after the first starts ahead.',
    body: 'The ingestion, indexing, and retrieval work that consumes the opening weeks of every AI initiative is already done.',
  },
]

export default function Home() {
  return (
    <>
      {/* Follows design/Homepage.pdf */}
      <Section band="brand" className="overflow-hidden">
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* A relay: the column holds still and its eyebrow, heading, lead and
              buttons each enter from the left in turn. As one block it read as
              a slab sliding; in sequence it reads as a page composing itself. */}
          <div className={`${REVEAL_GROUP.left} ${REVEAL.still}`}>
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
          {/* Enters without fading. #12 made this eager and high fetch priority
              to fix LCP, and an element at opacity 0 is not yet contentful, so
              fading the largest above-the-fold image in would give that back.
              Moving it costs nothing. */}
          <Spot
            name="hero-desk"
            priority
            sizes="(min-width: 1024px) 34rem, 90vw"
            className={`h-auto w-full max-w-[34rem] justify-self-center lg:justify-self-end ${REVEAL.right} m42-in-solid`}
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
            {/* Five explicit rows, with each column a subgrid, so every row —
                eyebrow, heading, body, "you leave with", button — lines up across
                all three cards no matter how each one wraps. Without this, a
                two-line value in one column lifts its label above the others. */}
            {/* A group, so the three offerings arrive one after another rather
                than the whole frame appearing at once. Transform on a grid item
                does not disturb the subgrid row alignment from #15. */}
            <div
              className={`${REVEAL_GROUP.up} ${REVEAL_ROW} grid lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto_auto]`}
            >
              {OFFERINGS.map((o, i) => (
                <article
                  key={o.title}
                  className={`relative flex flex-col gap-3 p-card lg:row-span-5 lg:grid lg:grid-rows-subgrid ${
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
                  {/* The comp leaves ~107px between the body copy and this label —
                      120px baseline to baseline against a 26px line-height — and the
                      laptop spot sits in that gap. From lg up only: below that the
                      spots sit inside the column, so the space would be dead. */}
                  {/* mt-auto bottoms this block in the stacked flex layout. From lg
                      up the subgrid already places the row, and leaving mt-auto on
                      would bottom-align each block inside its own row — which is what
                      pushed the shorter columns' labels below the taller one's. */}
                  <div className="mt-auto pt-6 lg:mt-0 xl:pt-24">
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

      {/* EXTRAPOLATED. The practice and the product it produced were two bands
          and are now one: the argument for agentic AI implementation, then the
          thing that argument built. Splitting them made the reader meet Dewey
          with no idea why this firm would have one. */}
      <Section band="surface">
        <Wrap>
          <Eyebrow className="mb-4">Core practice</Eyebrow>
          <H2 className="mb-4">Our core practice is agentic AI implementation and integration.</H2>
          <Lead className="mb-10">
            AI is not valuable because it is impressive. It is valuable when it changes work.
          </Lead>
          {/* Ruled columns rather than the cards this band used to draw. Four
              bordered cards above a bordered panel read as five objects of equal
              weight, and the panel has to be the one that carries. */}
          <div className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} mb-10 grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-4`}>
            {PRACTICE.map((p) => (
              <RuledGroup key={p.title} as="h3" title={p.title} ruleClass="border-t-brand-deep">
                <Body className="max-w-none text-ink/72">{p.body}</Body>
              </RuledGroup>
            ))}
          </div>
          <Body className="mb-6">
            We will also tell you when the answer is not an agent. Some problems are better solved
            by fixing a process or writing conventional software, and we say so.
          </Body>
          <Quote className="mb-6">The opportunity is AI. The constraint is implementation.</Quote>
          <p className="mb-12">
            <TextLink to="/what-we-do/engineering/agentic-ai">Inside our agentic AI practice</TextLink>
          </p>

          {/* Dewey, inside the practice band rather than beside it. `tint` on
              cream, so the product reads as an object sitting on the argument
              that produced it. */}
          <Card fill="tint" className="p-6 md:p-card">
            <Eyebrow tone="ink">A Mile42 product</Eyebrow>
            <H3 as="h3" className="max-w-[34ch] text-balance">
              Meet Dewey, the knowledge layer that keeps agents out of your systems of record.
            </H3>
            <Body className="max-w-[66rem]">
              Most AI projects stall in the same place. The prototype worked, then it met the real
              business: the documents holding the answers were scattered, the systems holding the
              rest could not be opened to autonomous software, and security review ended the
              conversation. Dewey holds a governed copy of what your agents are allowed to know,
              indexes it automatically, and answers their questions with sources attached.
            </Body>
            <CatalogDrawer className="mt-4" />
            {/* h4, not h3: these sit under the panel's own h3, where the practice
                columns above sit under the band's h2. */}
            <div className="mt-4 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {DEWEY.map((d) => (
                <RuledGroup key={d.title} as="h4" title={d.title} ruleClass="border-t-accent">
                  <Body className="max-w-none text-ink/72">{d.body}</Body>
                </RuledGroup>
              ))}
            </div>
            <div className="mt-4">
              <Button to="/meet-dewey">Meet Dewey</Button>
            </div>
          </Card>
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
