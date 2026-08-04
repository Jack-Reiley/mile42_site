import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card } from '../components/primitives.jsx'

const OFFERINGS = [
  { kicker: 'Before a major investment', title: 'You need clarity', body: 'Something significant is about to be decided and the context is not yet good enough to decide it well.', leave: 'Direction, context, and decision confidence', href: '/what-we-do/advisory', linkLabel: 'Explore advisory' },
  { kicker: 'When something must be built', title: 'You need to execute', body: 'Something important has to work in production, for real users, inside real constraints.', leave: 'Working technology, better execution, and stronger capability', href: '/what-we-do/engineering', linkLabel: 'Explore engineering' },
  { kicker: 'When starting from zero is unnecessary', title: 'You need proven solutions', body: 'Part of what you are about to build has been built before, and rebuilding it is the expensive choice.', leave: 'Faster time to value and lower delivery risk', href: '/what-we-do/ai-products', linkLabel: 'Explore AI-driven products' },
]

const STANDARDS = [
  { title: 'The work has to change something.', body: 'Advice that ends at a document, or technology delivered without an outcome, is not enough.' },
  { title: 'Context comes first.', body: 'We understand the situation before we recommend or build anything.' },
  { title: 'You should be stronger afterward.', body: 'Every engagement should leave your organization more capable than it was, not more dependent on us.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function WhatWeDo() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">What we do</Eyebrow>
          <H1 tone="hero" className="mb-6">Start with what you need right now.</H1>
          <Lead>Organizations come to us at three different moments. The right engagement follows from which one you are in.</Lead>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">Three ways organizations work with us.</H2>
          <div className="mb-10 grid gap-4 lg:grid-cols-3">
            {OFFERINGS.map((o) => (
              <Card as="article" key={o.title}>
                <Eyebrow>{o.kicker}</Eyebrow>
                <H3>{o.title}</H3>
                <Body className="max-w-none">{o.body}</Body>
                <div className="mt-auto pt-4">
                  <Eyebrow tone="ink" className="mb-1">You leave with:</Eyebrow>
                  <p className="text-body text-ink">{o.leave}</p>
                </div>
                <div className="pt-4"><TextLink to={o.href}>{o.linkLabel}</TextLink></div>
              </Card>
            ))}
          </div>
          <Body className="mb-4">It is common to need clarity and execution at the same time, or to be partway into a build and unsure whether the path still holds.</Body>
          <Body className="mb-8">That is normal and it does not need to be resolved before talking to us. Describe the situation and we will tell you which of these it actually is, which is not always the one it feels like.</Body>
          <Quote>The offering is a starting point, not a boundary.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Eyebrow className="mb-4">Core practice</Eyebrow>
          <H2 className="mb-6">Agentic AI is the core of how we execute.</H2>
          <Body className="mb-8">Most of what we build now runs on agentic AI: systems that take action inside real workflows, connected to real data, with governance the business can trust. It is the thread through advisory, engineering, and the products we ship.</Body>
          <TextLink to="/agentic-ai">Inside our agentic AI practice</TextLink>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">The same standard applies whichever one you start with.</H2>
          <div className="grid gap-4 lg:grid-cols-3">
            {STANDARDS.map((s) => (
              <Card key={s.title}><H3>{s.title}</H3><Body className="max-w-none">{s.body}</Body></Card>
            ))}
          </div>
          <p className="mt-8"><TextLink to="/how-we-work">See how we work</TextLink></p>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Not sure which one you need?</H2>
          <Lead className="mx-auto mb-8">Describe the situation. We will tell you which of these it is, and whether we are the right firm for it.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
