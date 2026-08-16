import { Section, Wrap, Eyebrow, H2, H3, Lead, Body, Quote, Button, TextLink, Breadcrumb, Card } from '../components/primitives.jsx'
import { NumList } from '../components/Lists.jsx'
import WhereAgentsWork from '../components/WhereAgentsWork.jsx'
import ReuseLoop from '../components/ReuseLoop.jsx'

const ROLES = [
  { title: 'Context and analysis', agents: 'Read the estate, the data, the documentation, and the code. Surface what is actually there rather than what the diagram says', human: 'Deciding what matters and what the findings mean for your situation' },
  { title: 'Planning', agents: 'Draft sequences, dependencies, and estimates from the analysis', human: 'Committing to a plan and standing behind the estimate' },
  { title: 'Architecture', agents: 'Generate options, trace implications, check consistency against constraints', human: 'The architectural decision and the tradeoffs accepted' },
  { title: 'Design', agents: 'Produce and iterate interface and interaction work at speed', human: 'Whether the design serves the user and the outcome' },
  { title: 'Development', agents: 'Write, refactor, and document code against a defined specification', human: 'Specification, review, and accountability for what ships' },
  { title: 'Testing and QA', agents: 'Generate and run test coverage continuously rather than at the end', human: 'Defining what correct means and what risk is unacceptable' },
  { title: 'Knowledge', agents: 'Capture decisions, patterns, and rationale as the work happens', human: 'Judging what is worth reusing and what was situational' },
]
const HUMAN_ONLY = ['Every consequential decision, with a named person accountable for it.', 'Every judgment that depends on your context rather than on general knowledge.', 'Every commitment we make to you about scope, cost, or date.']
const BENEFITS = [
  { title: 'Cost is predictable.', body: 'We can commit to a price because we are not guessing at how many hours a team will need.' },
  { title: 'Quality is more consistent.', body: 'Test coverage and documentation happen continuously rather than depending on whether the schedule held.' },
  { title: 'Context is not lost.', body: 'Decisions and rationale are captured as the work happens, so the reasoning survives past the engagement.' },
  { title: 'Smaller teams, less overhead.', body: 'Fewer people means fewer handoffs, fewer status meetings, and less of your time spent managing us.' },
]
/* Not steps in a process. These are the things that accumulate across
   engagements, which is why they are named as things rather than as actions. */
const REUSE = [
  { title: 'Client work', line: 'Real engagements, with real constraints. Everything else here comes out of them.' },
  { title: 'Lessons learned', line: 'What worked, what did not, and why, captured while the work is happening rather than reconstructed at the end.' },
  { title: 'Reusable methods and assets', line: 'The patterns worth keeping become methods, components, and accelerators we can run again.' },
  { title: 'Delivery improvements', line: 'Each pass makes the way we deliver better, so the next engagement runs on tested methods rather than a blank page.' },
  { title: 'A stronger starting point', line: 'Your next initiative starts further along, so more of the budget goes to what is genuinely new.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function DeliveryModel() {
  return (
    <>
      {/* The compact page header the detail pages draw, in the fill this page's
          topic panel carries on How We Work. The measure stays the page's own
          rather than the detail comps' narrower column, so the header aligns
          with the sections below it. */}
      <Section band="panel-forest" pad="header">
        <Wrap>
          <Breadcrumb
            to="/how-we-work"
            parent="How we work"
            current="Delivery model"
            markClass="bg-forest"
            tone="ink"
          />
          <H2 as="h1">An AI-assisted operating system, directed by people.</H2>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          {/* The roles are the evidence for the claim above them, so the two are
              one band rather than two. The gap under the claim is the seam: the
              band's own rhythm, not a section break, is what separates them. */}
          <H2 className="mb-14 lg:mb-20">Speed, consistency, and a commercial model that matches.</H2>

          <H2 className="mb-4">Where agents work, and what a human is still responsible for.</H2>
          <Lead className="mb-3">AI agents work across every major role in a modern engagement. Humans stay responsible for judgment, your context, the decisions, and the outcome.</Lead>
          <Lead className="mb-10">These are roles in a delivery system, not sequential steps. Several run at once throughout an engagement.</Lead>
          <WhereAgentsWork roles={ROLES} />
          <Quote className="mt-8">Humans provide judgment. Agents accelerate execution. We own the work.</Quote>
        </Wrap>
      </Section>

      {/* Every band below this one flips: merging the roles into the section
          above removed a band, and without the flip this section and the one
          it follows are both `page`, so the boundary between them disappears. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">This is not AI writing your systems unsupervised.</H2>
          <Body className="mb-4">There is a version of this claim that is marketing, and we want to be clear we are not making it.</Body>
          <Body className="mb-4">Agents do not decide your architecture. They do not judge whether a design serves your customers. They do not carry accountability, because accountability cannot be delegated to a system that cannot be held responsible.</Body>
          <Body className="mb-8">What they do is remove the drag: the reading, the drafting, the scaffolding, the test coverage, the documentation that usually gets written last or not at all. That is a large share of any engagement, and compressing it is what creates the speed.</Body>
          <Eyebrow className="mb-4">Three things that remain human</Eyebrow>
          <NumList items={HUMAN_ONLY} />
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-10">Our progress is measured by value created, not effort expended.</H2>
          <div className="grid gap-4 md:grid-cols-2">
            {BENEFITS.map((b) => <Card key={b.title}><H3>{b.title}</H3><Body className="max-w-none">{b.body}</Body></Card>)}
          </div>
        </Wrap>
      </Section>

      <Section band="surface">
        {/* The argument on the left, the loop it describes on the right. The
            columns are centred on each other rather than top-aligned: the ring
            has no top edge to align a paragraph to. */}
        {/* The split is three quarters to the loop, and it waits for `xl`: at
            `lg` the quarter left to the argument is too narrow to set 36px
            headings in, so the two stack and the loop takes the full measure. */}
        <Wrap className="grid items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] xl:gap-16">
          <div>
            <H2 className="mb-6">Each engagement should improve the next one.</H2>
            <Body className="mb-4">A firm built around execution cannot treat every engagement as a blank page. What we learn on your work becomes reusable methods, patterns, and components, which lowers the cost and the risk of the work that follows.</Body>
            <Body className="mb-8">That benefits you directly. You are not paying us to rediscover something we already solved for someone else.</Body>
            <Eyebrow className="mb-2">Note on ownership</Eyebrow>
            <Body className="mb-8">Reusable assets are our methods and patterns, never your data, your business logic, or anything specific to your organization. Where we build something for you, you own it. Ownership terms are explicit in every engagement.</Body>
            <TextLink to="/what-we-do/ai-products">See AI-driven products</TextLink>
          </div>

          <ReuseLoop items={REUSE} />
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">See it on real work.</H2>
          <Lead className="mx-auto mb-8">The fastest way to judge a delivery model is to put a real problem in front of it. Bring one.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
