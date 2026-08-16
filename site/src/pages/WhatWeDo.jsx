import {
  Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote,
  Button, ButtonRow, TextLink, Card, PathCard,
} from '../components/primitives.jsx'

/* The eyebrow names the practice the card leads to, so the three cards read as
   the three services before they read as three situations. The situation moves
   down to the line under the title. */
const PATHS = [
  {
    eyebrow: 'Advisory',
    title: 'You need clarity',
    body: 'Before a major investment.',
    href: '/what-we-do/advisory',
    spot: 'path-lightbulb',
  },
  {
    eyebrow: 'Engineering',
    title: 'You need to execute',
    body: 'When something must be built.',
    href: '/what-we-do/engineering',
    spot: 'path-gears',
  },
  {
    eyebrow: 'AI products and accelerators',
    title: 'You need proven solutions',
    body: 'Reuse what already works.',
    href: '/what-we-do/ai-products',
    spot: 'path-handshake',
  },
]

const BENEFITS = [
  {
    title: 'Cost is predictable.',
    body: 'We can commit to a price because we are not guessing at how many hours a team will need.',
  },
  {
    title: 'Quality is more consistent.',
    body: 'Test coverage and documentation happen continuously rather than depending on whether the schedule held.',
  },
  {
    title: 'Context is not lost.',
    body: 'Decisions and rationale are captured as the work happens, so the reasoning survives past the engagement.',
  },
  {
    title: 'Smaller teams, less overhead.',
    body: 'Fewer people means fewer handoffs, fewer status meetings, and less of your time spent managing us.',
  },
]

/* Follows the combined-hero comp in design/what-we-do-combined.html. */
export default function WhatWeDo() {
  return (
    <>
      {/* The hero carries the three paths rather than introducing a band that
          lists them, which is what makes the choice the first thing on the page. */}
      <Section band="navy">
        <Wrap className="grid items-center gap-11 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
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

          {/* The band's own heading is the h1, so the cards take h2. */}
          <div className="flex flex-col gap-4">
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

      <Section band="surface">
        <Wrap>
          <H2>Speed, consistency, and a commercial model that matches.</H2>
          <div className="mt-11 mb-7 grid gap-6 md:grid-cols-2">
            {BENEFITS.map((b) => (
              <Card key={b.title}>
                <H3>{b.title}</H3>
                <Body className="max-w-none">{b.body}</Body>
              </Card>
            ))}
          </div>
          <Quote>
            Execution without the overhead is not a slogan. It is what this model produces.
          </Quote>
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
