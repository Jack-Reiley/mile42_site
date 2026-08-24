import {
  Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body,
  Button, ButtonRow, TextLink, Card, Spot, LabelBody,
} from '../components/primitives.jsx'
import { NumList, RuledGroup } from '../components/Lists.jsx'
import CatalogDrawer from '../components/CatalogDrawer.jsx'
import { REVEAL, REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'

const OFFERINGS = [
  {
    kicker: 'Before a major investment',
    title: 'You need clarity',
    body: 'AI strategy, integration and ingestion strategy, discovery, modernization planning, platform selection, and architecture review. We help you decide before you commit. You move forward with direction, context, and decision confidence.',
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
    body: 'Agentic AI implementation, AI applications and integration, custom software, workflow automation, data platforms, and modernization. Built to work in production. You gain working technology, better execution, and stronger capability.',
    href: '/what-we-do/engineering',
    linkLabel: 'Explore engineering',
    spot: 'laptop',
    // Breaks its COLUMN DIVIDER, 27px into col3, while staying inside the card.
    // Anchored to the right and the bottom, so both relationships hold as the
    // card narrows and as copy length changes. Fixed left offsets drifted the
    // spot out of its column between lg and the card's 1240px max width.
    // Bottom-anchored: stable as copy length changes, where a top offset would
    // drift. The comp puts it 169px above the card's bottom. 184px sat better
    // against the taller card that carried a "You leave with" row; with that row
    // gone the card is shorter, and 105px is what centres the spot in the gap
    // between the body and the button. z-10 lifts it over the divider, which is
    // the next column's left border and paints later.
    spotClass: 'lg:-top-[35px] lg:w-24 xl:-right-[25px] xl:top-auto xl:bottom-[105px] xl:w-32 xl:z-10',
    spotSizes: '(min-width: 1280px) 128px, (min-width: 1024px) 96px, 112px',
  },
  {
    kicker: 'When starting from zero is unnecessary',
    title: 'You need proven solutions',
    body: 'Accelerators and products built from patterns that already work, so you are not rebuilding what has been solved. You get faster time to value and lower delivery risk.',
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
      <Section band="brand" grain className="overflow-hidden">
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* A relay: the column holds still and its eyebrow, heading, lead and
              buttons each enter from the left in turn. As one block it read as
              a slab sliding; in sequence it reads as a page composing itself. */}
          <div className={`${REVEAL_GROUP.left} ${REVEAL.still}`}>
            <p className="text-body-lg text-ink mb-6">The anti-consulting company</p>
            <H1 tone="hero" className="mb-6">
              The consulting model is broken. We didn’t bring it with us.
            </H1>
            <Lead className="mb-8">
              Mile42 combines senior judgment with AI-native delivery, without bloated teams,
              endless billing, or recommendations that never become results.
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

      {/* The economic argument, between the position the hero states and the
          work the next band describes. Without it "the anti-consulting company"
          is a claim the reader has to take on faith.

          On surface rather than page: the core practice band below is page, and
          two bands of the same fill in a row read as one. That makes the run
          from here down alternate (surface, page, surface) instead of the hero
          handing off to a single undivided field.

          Prose, not columns. It is one argument that builds across three
          paragraphs, and splitting it into ruled groups would turn a line of
          reasoning into three unrelated claims. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Consulting should create momentum, not overhead.</H2>
          <Body>
            Traditional firms make more money when projects require more people, more meetings, and
            more time. That is not a delivery model. It is a conflict of interest.
          </Body>
          <Body className="mt-[14px]">
            Mile42 was built differently. Our senior teams use AI throughout the work to move
            faster, preserve context, and eliminate unnecessary overhead. We price around the
            outcome, take responsibility for our estimates, and stay accountable for making the
            work succeed.
          </Body>
          <Body className="mt-[14px]">
            You get experienced people doing the work, fewer layers between decisions and
            execution, and more of your investment directed toward the result.
          </Body>
        </Wrap>
      </Section>

      {/* EXTRAPOLATED. The practice and the product it produced were two bands
          and are now one: the argument for agentic AI implementation, then the
          thing that argument built. Splitting them made the reader meet Dewey
          with no idea why this firm would have one.

          First band under the hero: what we actually do, before the three ways
          in. On the page band rather than surface, because the offerings card
          below is white and the comp draws it on surface; two cream bands in a
          row would also read as one. */}
      <Section>
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
          <p className="mb-12">
            <TextLink to="/what-we-do/engineering/agentic-ai">Inside our agentic AI practice</TextLink>
          </p>

          {/* Dewey, inside the practice band rather than beside it. `tint`, so
              the product reads as an object sitting on the argument that
              produced it. It sat on cream when this band did; the band is white
              now and the panel separates from it either way. */}
          <Card fill="tint" className="p-6 md:p-card">
            <Eyebrow tone="ink">A Mile42 product</Eyebrow>
            {/* 66rem, and the number is load-bearing. `H3` balances — #56 put
                `text-balance` on every heading — and balance targets equal lines
                rather than full ones, so between 46rem and 62rem this heading
                breaks at exactly the same place and the extra width goes unused.
                It needs 1039px to set on one line, so anything under 65rem is a
                cap that does nothing. Below roughly a 1215px viewport the panel
                is narrower than that and it balances onto two lines again, which
                is the intended behaviour rather than a fallback.

                68rem, not 66: the trademark symbol added 29px and pushed the
                single line from 1039 to 1068, straight past a 1056px cap and
                back onto two lines. 67rem is the first that clears it; 68 is
                taken so the next word added to this heading does not silently
                re-wrap it. */}
            <H3 as="h3" className="max-w-[68rem]">
              Meet Dewey™, the knowledge layer that keeps agents out of your systems of record.
            </H3>
            {/* Two paragraphs: the problem, then the answer. The break falls where
                the subject changes from the reader's stalled project to the
                product, so the second opens on the name.

                56rem rather than `Body`'s default 46rem. Measured, the widest
                line goes from 79 characters to 94 — wider, and still inside what
                a reader can track back. The heading above sits at 66rem, but
                matching it would set these at 114 characters a line, which is
                past where the eye reliably finds the next line. A heading and a
                paragraph do not want the same measure. */}
            <Body className="max-w-[56rem]">
              Most AI projects stall in the same place. The prototype worked, then it met the real
              business: the documents holding the answers were scattered, the systems holding the
              rest could not be opened to autonomous software, and security review ended the
              conversation.
            </Body>
            <Body className="max-w-[56rem]">
              Dewey holds a governed copy of what your agents are allowed to know, indexes it
              automatically, and answers their questions with sources attached.
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

      {/* Follows design/Homepage.pdf: one card, vertical dividers, spots breaking
          the edge. The engagement principles that used to be their own band now
          close this one: the three ways in are the offer, and the principles are
          how any of the three is scoped, priced, and staffed. One band, one
          heading. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-4 text-center">Three ways organizations work with us.</H2>
          <Lead className="mx-auto mb-16 text-center">
            Start with what you need right now. The right engagement follows from that.
          </Lead>

          <div className="relative rounded-card border border-ink bg-page shadow-hard">
            {/* Four explicit rows, with each column a subgrid, so every row —
                eyebrow, heading, body, button — lines up across all three cards
                no matter how each one wraps. Without this, a body that wraps one
                line further in one column lifts its button above the others. */}
            {/* A group, so the three offerings arrive one after another rather
                than the whole frame appearing at once. Transform on a grid item
                does not disturb the subgrid row alignment from #15. */}
            <div
              className={`${REVEAL_GROUP.up} ${REVEAL_ROW} grid lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto]`}
            >
              {OFFERINGS.map((o, i) => (
                <article
                  key={o.title}
                  className={`relative flex flex-col gap-3 p-card lg:row-span-4 lg:grid lg:grid-rows-subgrid ${
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
                  {/* The gap #15 opened between the body copy and the row beneath
                      it is where the laptop spot sits, so it outlives the "You leave
                      with" block that used to fill it: the button row inherits it,
                      widened to hold the spot against a shorter card. From lg up
                      only: below that the spots sit inside the column, so the space
                      would be dead. */}
                  {/* mt-auto bottoms this block in the stacked flex layout. From lg
                      up the subgrid already places the row, and leaving mt-auto on
                      would bottom-align it inside its own row — which is what
                      pushed the shorter columns' buttons below the taller one's. */}
                  <div className="mt-auto pt-6 lg:mt-0 xl:pt-32">
                    <Button to={o.href} variant="secondary">{o.linkLabel}</Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Merged in from the former "Our engagements are built around your
              outcomes" band. A rule and the two-column label/body shape rather
              than a second centred heading, so it reads as the back half of this
              section instead of a band that lost its own. */}
          <LabelBody
            className="mt-16 border-t border-ink/16 pt-12 lg:mt-20 lg:pt-14"
            label={
              <>
                <Eyebrow className="mb-3">How we engage</Eyebrow>
                <H3>Our engagements are built around your outcomes.</H3>
              </>
            }
          >
            <Body className="mb-8 max-w-none">
              Most firms are structured to protect their margin when work goes wrong. We are
              structured to protect your result. That principle shapes how we scope, price, and
              staff every engagement.
            </Body>
            <NumList items={PRINCIPLES} as="ol" />
          </LabelBody>
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
