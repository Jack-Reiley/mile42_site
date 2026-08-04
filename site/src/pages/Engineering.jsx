import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card } from '../components/primitives.jsx'
import { TermList } from '../components/Lists.jsx'

const GROUPS = [
  { kicker: 'AI and agentic systems', items: [
    ['Agentic AI implementation', 'Agents and copilots that operate inside real workflows, not demos'],
    ['AI applications', 'Enterprise applications where AI is the core of how the product works'],
    ['AI integration', 'Connecting AI systems to the data, platforms, and processes you already run'],
    ['Workflow automation', 'Removing manual steps that consume capacity without adding judgment'],
  ]},
  { kicker: 'Systems and platforms', items: [
    ['Custom software', 'Systems built for a problem no product on the market actually solves'],
    ['Product engineering', 'Building and evolving a product with a roadmap, not a one-off delivery'],
    ['Systems integration', 'Making separate systems behave like one, reliably and observably'],
    ['Source data consolidation and readiness', 'Bringing scattered, inconsistent, and undocumented source data into a state something can actually be built on'],
    ['Data platforms', 'The foundation that makes AI and analytics work rather than aspire'],
  ]},
  { kicker: 'Modernization', items: [
    ['Cloud modernization', 'Moving to modern infrastructure without pausing the business'],
    ['Legacy modernization', 'A sequenced path off systems that are expensive to keep and risky to replace'],
    ['Digital experience', 'Customer-facing systems where the experience is the differentiator'],
  ]},
]

const OUTCOMES = [
  { title: 'Working technology.', body: 'Systems in production, used by the people they were built for, with the operational reality handled rather than deferred.' },
  { title: 'Better execution.', body: 'Your organization runs the next initiative better, because the way the work was done was part of the delivery.' },
  { title: 'Stronger capability.', body: 'Your team can operate, extend, and change what we built without us.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function Engineering() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">Engineering</Eyebrow>
          <H1 tone="hero" className="mb-6">You need to execute.</H1>
          <Lead className="mb-8">Something important has to work. Not be designed, not be scoped, not be piloted. Work, in production, for real users, under real constraints.</Lead>
          <Button to="/contact">Tell us what needs to work</Button>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">The distance between a plan and a working system is where most initiatives fail.</H2>
          <Body className="mb-4">The strategy was sound. The vendor was capable. The technology was proven somewhere else. And the thing still did not land, because production is where the assumptions get tested.</Body>
          <Body className="mb-4">Real data is messier than the sample. The integration has a constraint nobody documented. Adoption depends on a team whose incentives were never part of the plan. The system works in the demo and stalls in the business.</Body>
          <Body className="mb-8">Engineering is the practice of closing that distance. We build systems that operate inside your actual constraints, and we stay accountable for whether they work.</Body>
          <Quote>If the work does not change how you operate, it is not enough.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-10">What we build.</H2>
          <Card className="mb-10">
            <Eyebrow>Core practice</Eyebrow>
            <H3>Agentic AI, implemented</H3>
            <Body className="max-w-none">A prototype only has to work once. A system has to work every time, on real data, for people who did not ask for it, inside real constraints. Closing that gap is our core agentic AI practice.</Body>
            <div className="pt-2"><TextLink to="/agentic-ai">Inside our agentic AI practice</TextLink></div>
          </Card>
          {GROUPS.map((g) => (
            <div className="mb-10" key={g.kicker}>
              <Eyebrow className="mb-4">{g.kicker}</Eyebrow>
              <TermList items={g.items} />
            </div>
          ))}
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">You end up more capable than you started.</H2>
          <div className="mb-8 grid gap-4 lg:grid-cols-3">
            {OUTCOMES.map((o) => <Card key={o.title}><H3>{o.title}</H3><Body className="max-w-none">{o.body}</Body></Card>)}
          </div>
          <Quote>We build capability, not dependence.</Quote>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Tell us what needs to work.</H2>
          <Lead className="mx-auto mb-8">Bring the problem. We will tell you honestly whether we are the right firm to solve it.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
