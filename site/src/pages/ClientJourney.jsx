import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card } from '../components/primitives.jsx'
import { NumList, TermList, StatementCards } from '../components/Lists.jsx'

const STAGES = [
  { n: '01', title: 'Understand', body: 'Build shared context: what outcome matters, why now, and where execution is breaking down', leave: 'Clarity' },
  { n: '02', title: 'Design', body: 'Bring technology, architecture, delivery, and organizational reality together into a sound path', leave: 'Confidence' },
  { n: '03', title: 'Build', body: 'Engineer the systems, products, integrations, and workflows, and improve how the organization executes', leave: 'Results' },
  { n: '04', title: 'Evolve', body: 'You know more, operate better, reuse more, and can do something you could not do before', leave: 'Capability' },
]
const UNDERSTAND = ['What outcome matters, stated specifically enough to know whether it moved.', 'Why now, and what happens if nothing changes.', 'Where execution is breaking down today, which is often not where it appears to be.', 'What constraints are real, and which ones are habits.']
const DESIGN = ['An architecture, with the tradeoffs named rather than assumed.', 'A sequence, including what happens first and why.', 'An honest read on effort, dependency, and risk.', 'A view on what changes for the people doing the work, and what that will take.']
const BUILD = ['Systems in production, used by the people they were built for.', 'Governance, testing, and documentation that exist because they were built in, not because someone remembered at the end.', 'A team that understands what was built and why.']
const EVOLVE = ['Your team can change the system without calling us.', 'The decisions and their rationale are documented somewhere your people will find them.', 'What you learned is reusable on work we are not involved in.', 'If you bring us back, it is because you chose to, not because you are stuck.']
const ENTRY = [['Understand or Design', 'Advisory'], ['Design or Build', 'Engineering'], ['Build, with parts already solved', 'AI-driven products and accelerators']]

/* EXTRAPOLATED — no comp for this page. */
export default function ClientJourney() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">The client journey</Eyebrow>
          <H1 tone="hero" className="mb-6">Four stages. Four stronger positions to be in.</H1>
          <Lead>The stage describes what we do together. The outcome describes the state you are left in. Every stage should leave you better off than when it started, whether or not you continue to the next one.</Lead>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">Understand, design, build, evolve.</H2>
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {STAGES.map((s) => (
              <Card key={s.n}>
                <Eyebrow>{s.n}</Eyebrow><H3>{s.title}</H3>
                <Body className="max-w-none">{s.body}</Body>
                <div className="mt-auto pt-4">
                  <Eyebrow tone="ink" className="mb-1">You leave with:</Eyebrow>
                  <p className="text-body text-ink">{s.leave}</p>
                </div>
              </Card>
            ))}
          </div>
          <Quote>The work is complete only when you are stronger for the next decision, build, or initiative.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Eyebrow className="mb-4">01 · Leaves clarity</Eyebrow>
          <H2 className="mb-6">Context before solutions.</H2>
          <Body className="mb-4">Most engagements go wrong here, quietly. The work starts before anyone has agreed what outcome matters, why it matters now, or where execution is actually breaking down.</Body>
          <Body className="mb-8">We spend real time on this. Not a discovery workshop that produces a summary of what you already told us, but enough depth to make better calls under uncertainty later.</Body>
          <NumList items={UNDERSTAND} className="mb-8" />
          <Quote>Without context, technology work becomes guesswork.</Quote>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <Eyebrow className="mb-4">02 · Leaves confidence</Eyebrow>
          <H2 className="mb-6">A path that survives contact with your organization.</H2>
          <Body className="mb-4">Design here means more than an architecture diagram. It means bringing the technology, the delivery approach, and the organizational reality together into something that can actually be executed by the people who will have to execute it.</Body>
          <Body className="mb-8">A design that ignores adoption, operating model, or delivery risk is not a design. It is a preference.</Body>
          <div className="mb-8 grid gap-4 md:grid-cols-2"><StatementCards items={DESIGN} /></div>
          <Quote>You should finish this stage able to explain the plan to your own leadership without us in the room.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Eyebrow className="mb-4">03 · Leaves results</Eyebrow>
          <H2 className="mb-6">Working systems, and a better way of executing.</H2>
          <Body className="mb-4">This is where most of the money and most of the risk sit. We engineer the systems, products, integrations, and workflows, and we stay accountable for whether they work in production rather than whether they were delivered on schedule.</Body>
          <Body className="mb-8">Two things happen at once. The system gets built, and the way your organization executes gets better, because how the work is done is part of what we are delivering.</Body>
          <div className="mb-8 grid gap-4 lg:grid-cols-3"><StatementCards items={BUILD} /></div>
          <TextLink to="/how-we-work/delivery-model">See the delivery model</TextLink>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <Eyebrow className="mb-4">04 · Leaves capability and trust</Eyebrow>
          <H2 className="mb-6">You should be able to do something you could not do before.</H2>
          <Body className="mb-4">The last stage is the one most firms skip, because it is the one that reduces their future revenue.</Body>
          <Body className="mb-8">Evolve means you can operate, extend, and change what was built without depending on us for every decision. It means the patterns and reasoning stayed with your team. It means the next initiative starts from a stronger position than this one did.</Body>
          <div className="mb-8 grid gap-4 md:grid-cols-2"><StatementCards items={EVOLVE} /></div>
          <Quote>We build capability, not dependence.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">The journey is the same. Where you enter is not.</H2>
          <Body className="mb-8">Not everyone starts at stage one. Some organizations already have clarity and need execution. Some have been building for a year and need an honest read on whether the path still holds.</Body>
          <TermList items={ENTRY} className="mb-8" />
          <Quote>Tell us where you actually are, not where a process says you should be.</Quote>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Tell us where you are.</H2>
          <Lead className="mx-auto mb-8">We will tell you which stage you are actually in, which is not always the one it feels like.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
