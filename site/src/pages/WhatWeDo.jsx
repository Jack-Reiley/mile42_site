import {
  Section, Wrap, Eyebrow, H1, H2, Lead, Body,
  Button, ButtonRow, TextLink, PathCard, FeaturePanel,
} from '../components/primitives.jsx'
import { REVEAL, REVEAL_GROUP } from '../components/reveal.js'

/* The title names the practice the card leads to, so the three headings are the
   three service names rather than three sentences beginning "You need". The
   situation stays on the card as the eyebrow above it. */
const PATHS = [
  {
    eyebrow: 'You need clarity',
    title: 'Advisory',
    body: 'Before a major investment.',
    href: '/what-we-do/advisory',
    spot: 'path-lightbulb',
  },
  {
    eyebrow: 'You need to execute',
    title: 'Engineering',
    body: 'When something must be built.',
    href: '/what-we-do/engineering',
    spot: 'path-gears',
  },
  {
    eyebrow: 'You need proven solutions',
    title: 'AI products and accelerators',
    body: 'Reuse what already works.',
    href: '/what-we-do/ai-products',
    spot: 'path-handshake',
  },
]

/* Follows the combined-hero comp in design/what-we-do-combined.html. */
export default function WhatWeDo() {
  return (
    <>
      {/* The hero carries the three paths rather than introducing a band that
          lists them, which is what makes the choice the first thing on the page. */}
      <Section band="navy" grain>
        <Wrap className="grid items-center gap-11 lg:grid-cols-[0.92fr_1.08fr]">
          {/* A relay: the column holds still and its eyebrow, heading, lead and
              buttons each enter from the left in turn. As one block it read as
              a slab sliding; in sequence it reads as a page composing itself. */}
          <div className={`${REVEAL_GROUP.left} ${REVEAL.still}`}>
            <Eyebrow tone="sky" className="mb-4">What we do</Eyebrow>
            <H1 tone="hero" className="mb-4">Start with what you need right now.</H1>
            <Lead tone="hero">
              We meet you at three moments. The right engagement follows from which one you are in.
            </Lead>
            <ButtonRow className="mt-7">
              <Button to="/contact">Start a conversation</Button>
              <Button to="/how-we-work" variant="secondary">See how we work</Button>
            </ButtonRow>
          </div>

          {/* The band's own heading is the h1, so the cards take h2.

              A group, so the three cards arrive from the right one after
              another rather than as a single slab. */}
          <div className={`${REVEAL_GROUP.right} flex flex-col gap-4`}>
            {PATHS.map((p) => (
              <PathCard
                key={p.title}
                to={p.href}
                spot={p.spot}
                eyebrow={p.eyebrow}
                title={p.title}
              >
                {p.body}
              </PathCard>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section band="blue" pad="tight">
        <Wrap className="grid items-start gap-11 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow tone="ice" className="mb-4">Core practice</Eyebrow>
            <H2 tone="hero">Agentic AI is the core of how we execute.</H2>
          </div>
          <div>
            <Body tone="hero" className="mb-5">
              Most of what we build now runs on agentic AI: systems that take action inside real
              workflows, connected to real data, with governance the business can trust. It is the
              thread through advisory, engineering, and the products we ship.
            </Body>
            <TextLink to="/what-we-do/engineering/agentic-ai" tone="on-dark">Inside our agentic AI practice</TextLink>
          </div>
        </Wrap>
      </Section>

      {/* Phase Zero stands where the delivery-benefits band used to. Those four
          cards were the Delivery model page's own content repeated verbatim, so
          the page spent its middle band summarizing the operating model a second
          time instead of naming a first step. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-3">Before you choose, there is a smaller way to start.</H2>
          <Lead className="mb-9 max-w-none text-ink/70">
            Phase Zero is a working pilot on one process you name, built beside production and
            measured against your own baseline. It is priced to be a decision, not an investment.
          </Lead>
          <FeaturePanel
            spot="path-clipboard"
            eyebrow="Offering · Phase Zero"
            title="The low-risk way in."
            note="Name a process. See it working. Map what comes next."
          >
            <Body className="max-w-none">
              Name your messiest, most manual workflow. We assess the readiness around it, build a
              working solution on it, and hand you a sequenced roadmap of what comes next. It runs
              in parallel to production, it is reversible on day one, and it proves something
              against a number you already recognize.
            </Body>
            <p className="mt-4">
              <TextLink to="/what-we-do/phase-zero" tone="accent">See how Phase Zero works</TextLink>
            </p>
          </FeaturePanel>
        </Wrap>
      </Section>

      <Section band="navy">
        <Wrap className="flex flex-col items-center text-center">
          <H2 tone="hero" className="mb-3">Not sure which one you need?</H2>
          {/* The comp caps the lead at 34rem. Wrapping rather than overriding
              Lead's own max-width, which would resolve by stylesheet order. */}
          <div className="mb-7 max-w-[34rem]">
            <Lead tone="hero">
              Describe the situation. We will tell you which of these it is, and whether we are the
              right firm for it.
            </Lead>
          </div>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
