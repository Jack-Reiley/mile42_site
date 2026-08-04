import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, ButtonRow, Card } from '../components/primitives.jsx'
import { TermList, StatementCards } from '../components/Lists.jsx'

const STEPS = [
  { n: '01', title: 'Build context', body: 'What outcome matters, why now, and where execution is currently breaking down.' },
  { n: '02', title: 'Pressure-test the direction', body: 'The tradeoffs, the risks, the constraints, and the options you have not considered.' },
  { n: '03', title: 'Land on a decision', body: 'A recommendation with the reasoning visible, and a plan specific enough to execute.' },
]

const ENGAGEMENTS = [
  ['AI strategy', 'There is pressure to do something with AI and no agreed view of what or why'],
  ['AI ingestion strategy', 'AI systems need your content and data, and there is no plan for how it gets there, stays current, or respects permissions'],
  ['Integration strategy', 'Systems that need to work together do not, and the connections have grown by accident rather than by design'],
  ['Discovery', 'The problem is understood in outline but not in enough detail to scope'],
  ['Modernization plan', 'A legacy estate needs a sequenced path forward, not a rewrite'],
  ['Platform selection', 'A significant platform decision is coming and the evaluation needs rigor'],
  ['Architecture review', 'An existing design needs an independent read before it is committed to'],
  ['Product strategy', 'A product needs direction, scope, and a defensible roadmap'],
  ['Technology education', 'Leadership needs to understand a domain well enough to govern it'],
]

const OUTCOMES = [
  'A clear recommendation, with the reasoning visible rather than asserted.',
  'The tradeoffs you are accepting, stated plainly, including the ones you will not like.',
  'A plan specific enough to execute, with sequence, effort, and dependencies named.',
  'Enough context inside your own team to defend the decision without us in the room.',
]

/* EXTRAPOLATED — no comp for this page. */
export default function Advisory() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">Advisory</Eyebrow>
          <H1 tone="hero" className="mb-6">You need clarity.</H1>
          <Lead className="mb-8">Before a major investment, the expensive mistake is rarely choosing the wrong option. It is committing before you understand what you are committing to.</Lead>
          <Button to="/contact">Bring us the decision</Button>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Most technology decisions are made with incomplete context.</H2>
          <Body className="mb-4">The platform gets selected before the workflow is understood. The architecture is set before the real constraints surface. The budget is approved before anyone has said out loud what the outcome is supposed to be.</Body>
          <Body className="mb-4">None of that is incompetence. It is what happens when the decision is urgent and the context is expensive to build.</Body>
          <Body className="mb-8">Advisory work is how you build that context before it costs you. We learn your situation in enough depth to be useful, pressure-test the direction you are leaning toward, and give you a path you can defend internally. Then we tell you honestly what it will take.</Body>
          <Quote>We sell judgment, not information. Advice that ends at a document does not hold its value.</Quote>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Pointed at action.</H2>
          <Lead className="mb-10">Advisory engagements are built to end in movement. Not a readout, not a phase two proposal. A decision, a sequence, and a first step that can begin on Monday.</Lead>
          <div className="grid gap-4 lg:grid-cols-3">
            {STEPS.map((s) => <Card key={s.n}><Eyebrow>{s.n}</Eyebrow><H3>{s.title}</H3><Body className="max-w-none">{s.body}</Body></Card>)}
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-10">What we are usually brought in for.</H2>
          <TermList items={ENGAGEMENTS} className="mb-8" />
          <Body>If what you need is not on this list, describe the decision and we will tell you whether we can help.</Body>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">Direction, context, and decision confidence.</H2>
          <div className="mb-8 grid gap-4 md:grid-cols-2"><StatementCards items={OUTCOMES} /></div>
          <Quote>The work is complete when you can make the call, explain it, and start on it.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">We write recommendations we could execute ourselves.</H2>
          <Body className="mb-4">The failure mode of consulting advisory is the document. A deck lands, everyone agrees it is sound, and nothing changes. That happens because the people who wrote the recommendation never have to live with it.</Body>
          <Body className="mb-4">We write advice under a different constraint. We are an execution firm, and the plan we hand you is one we could be held to. That rules out the elegant strategy that cannot survive your actual constraints. It forces us to be specific about sequence, effort, dependency, and risk, because vagueness is a cost we would end up paying.</Body>
          <Body className="mb-8">Most advisory engagements move into build, and that is the intent rather than an upsell. Engineering picks up with the context already in place, which is faster and cheaper than starting a delivery engagement cold.</Body>
          <Quote className="mb-8">Advice that leads to action holds its value. Advice that ends at a document does not.</Quote>
          <Body className="mb-8">If you take the plan to someone else, it will be specific enough for them to run. We would rather write it that way than write something only we can interpret.</Body>
          <ButtonRow>
            <TextLink to="/what-we-do/engineering">See engineering</TextLink>
            <TextLink to="/how-we-work/client-journey">See the client journey</TextLink>
          </ButtonRow>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Tell us what you are trying to decide.</H2>
          <Lead className="mx-auto mb-8">We will tell you what we would need to know to help, and whether we are the right firm to ask.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
