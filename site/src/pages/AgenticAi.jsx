import { Section, Wrap, Eyebrow, H2, H3, Lead, Body, Quote, Button, TextLink, Breadcrumb, Card } from '../components/primitives.jsx'
import {
  NumList, TermList, StatementCards, CheckList, GroupColumns, RuledGroup,
} from '../components/Lists.jsx'

/* The page accent darkened 8%, the same rule and badge fills the Engineering
   page uses so the green reads at weight on a light band. Written out in full
   because Tailwind scans source text. */
const GREEN_RULE = 'border-t-[color-mix(in_srgb,var(--color-brand)_92%,black)]'
const GREEN_BADGE = 'bg-[color-mix(in_srgb,var(--color-brand)_92%,black)]'

const QUESTIONS = [
  { n: '01', title: 'What outcome actually matters, and how will we know if it moved?', body: 'If nobody can name the measure, the project has no definition of done.' },
  { n: '02', title: 'Where is execution breaking down today?', body: 'Automating around a broken process usually preserves the break and hides it.' },
  { n: '03', title: 'What is the smallest system that would prove this works in production?', body: 'Not a demo. Something real, narrow, and used by actual people.' },
]
const HARD_PARTS = [
  { title: 'Context and workflow design', body: 'Understanding the work well enough to know where an agent belongs and, more importantly, where it does not. Most failed AI projects automated a step that was never the bottleneck.' },
  { title: 'Architecture and integration', body: 'Connecting agents to real data, real systems, and the platforms you already run. Permissions, latency, failure modes, cost control, and what happens when a system the agent depends on is down.' },
  { title: 'Governance and risk', body: 'Controls, evaluation, and oversight that let the business trust what it deploys. What the agent is allowed to do, how you know it is working, who is accountable when it is wrong, and how you prove any of that to a regulator or an auditor.' },
  { title: 'Adoption and accountability', body: 'Getting the system used, measured, and improved after go-live. An agent nobody trusts is an expensive way to do nothing.' },
]
/* The prototype's flat systems list, grouped into the Engineering page's
   capability columns. The six terms and their definitions are unchanged; the
   three group titles are DRAFT COPY, since the flat list had none. */
const SYSTEM_GROUPS = [
  {
    title: 'Agents and copilots',
    items: [
      ['Agents', 'Systems that take action inside a workflow, not just answer questions about it'],
      ['Copilots', 'Assistance embedded where the work already happens, rather than in a separate tool'],
    ],
  },
  {
    title: 'Knowledge and automation',
    items: [
      ['RAG and knowledge systems', 'Retrieval that is accurate, current, permission-aware, and traceable to a source'],
      ['Workflow automation', 'Removing manual steps that consume capacity without adding judgment'],
    ],
  },
  {
    title: 'Applications and data',
    items: [
      ['Enterprise AI applications', 'Applications where AI is the core of how the product works, not a feature bolted on'],
      ['Data and systems integration', 'The foundation the rest of it depends on, which is usually the real project. Agentic systems fail on data and integration far more often than they fail on reasoning.'],
    ],
  },
]
const WRONG_TOOL = ['The task is fully deterministic and already well specified.', 'The cost of being occasionally wrong is higher than the cost of being always slow.', 'The real bottleneck is a decision nobody is empowered to make, which no technology fixes.', 'The underlying data is not good enough yet, and the agent would only surface that faster and more expensively.']
const CONTROLS = ['Defined boundaries on data access and permitted actions.', 'Evaluation that runs continuously, not once at launch.', 'A clear human accountability point for every consequential decision.', 'An audit trail sufficient to explain a specific output after the fact.']
/* DRAFT COPY — written for this section, not carried from the prototype.
   Expands the "Adoption and accountability" card, which had no section. */
const ADOPTION = [
  { title: 'A named owner', body: 'One person accountable for the system after we leave, identified while it is still being built rather than at handover.' },
  { title: 'A measure that predates the agent', body: 'The number the work was already judged on, so improvement can be shown rather than asserted.' },
  { title: 'A route for the people using it', body: 'A way to report a bad output that reaches someone who can change the system, and a record of what changed as a result.' },
  { title: 'A review cadence', body: 'Scheduled examination of what the system is actually doing, because the work it supports will not hold still.' },
]

/* DRAFT COPY — written for this section, not carried from the prototype.
   Each row expands one clause of the "Architecture and integration" card. */
const OPERATIONAL = [
  ['Permissions', 'The agent reaches what the person it acts for is allowed to reach, enforced by the access model you already run rather than a second one built beside it.'],
  ['Latency', 'A response fast enough for the workflow it sits inside. An answer that arrives after the decision was made is not an answer.'],
  ['Failure modes', 'Defined behavior when the model is wrong, the call times out, or the input looks nothing like the examples it was built against.'],
  ['Cost control', 'Knowing what a transaction costs before volume turns it into a budget conversation, and having somewhere to go when it does.'],
  ['Dependency outages', 'What the workflow does when a system the agent depends on is down, including whether the work can still be done by hand.'],
]
const STACK = [['Model layer', 'Anthropic · OpenAI'], ['Data and AI foundation', 'Databricks · Snowflake'], ['Enterprise workflow', 'Salesforce Agentforce · ServiceNow'], ['Content platforms', 'Contentstack · Contentful'], ['Commerce platforms', 'commercetools · Shopify · SAP Hybris']]

/* EXTRAPOLATED — no comp for this page. */
export default function AgenticAi() {
  return (
    <>
      {/* This page sits under Engineering, so it takes the same header the
          What we do detail pages draw: navy band, breadcrumb, hero heading. */}
      <Section band="navy" pad="header">
        <Wrap>
          <Breadcrumb
            ancestors={[['/what-we-do', 'What we do']]}
            to="/what-we-do/engineering"
            parent="Engineering"
            current="Agentic AI"
            markClass="bg-brand"
          />
          <H2 as="h1" tone="hero">Agentic AI, implemented.</H2>
        </Wrap>
      </Section>

      {/* The What we do detail pages' capability listing: eyebrow, list heading,
          then accent-ruled groups of term rows. It opens the page, so what we
          build is answered before the argument about why it is hard. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">Agentic systems that operate inside real business constraints.</H2>
          <Eyebrow as="span" className="mb-2 block">Capabilities</Eyebrow>
          <H3 className="mb-6">What we build.</H3>
          <GroupColumns>
            {SYSTEM_GROUPS.map((g) => (
              <RuledGroup key={g.title} title={g.title} ruleClass={GREEN_RULE}>
                <TermList items={g.items} variant="ruled" />
              </RuledGroup>
            ))}
          </GroupColumns>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Context before solutions.</H2>
          {/* Carried down from the old hero so the page still opens on the
              implementation framing. */}
          <Lead className="mb-6">Most organizations do not have an AI strategy problem. They have an AI implementation problem. The models work. Getting them to change how work happens is the hard part.</Lead>
          <Body className="mb-8">Every engagement starts by understanding the work, not by selecting a technology. That is one of the firm&#39;s operating principles and it matters more here than anywhere else, because agentic systems are unusually sensitive to context. The same architecture that works in one organization fails in another with different data, incentives, and risk tolerance.</Body>
          <div className="mb-8 grid gap-4 lg:grid-cols-3">
            {QUESTIONS.map((q) => <Card key={q.n}><Eyebrow>{q.n}</Eyebrow><H3>{q.title}</H3><Body className="max-w-none">{q.body}</Body></Card>)}
          </div>
          <TextLink to="/how-we-work/client-journey">See the client journey</TextLink>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">The distance between an AI pilot and an AI system.</H2>
          <Body className="mb-8">Almost every organization has run the pilot. Someone built a prototype, it demonstrated well, leadership was encouraged, and then it stopped.</Body>
          <Lead className="mb-8">Anyone can call an API. The difficulty sits in everything around the call.</Lead>
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {HARD_PARTS.map((h) => <Card key={h.title}><H3>{h.title}</H3><Body className="max-w-none">{h.body}</Body></Card>)}
          </div>
          <Quote>The opportunity is AI. The constraint is implementation.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">We will tell you when the answer is not an agent.</H2>
          <Body className="mb-8">Some problems are better solved by fixing a process, deleting a step, integrating two systems properly, or writing conventional software that behaves predictably every time. Reaching for an agent in those cases adds cost, latency, and a new category of failure in exchange for very little.</Body>
          <Eyebrow className="mb-4">When an agent is usually the wrong tool</Eyebrow>
          <NumList items={WRONG_TOOL} className="mb-8" />
          <Quote>A no you can trust early is cheaper than a yes that fails seven months in.</Quote>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">The controls are part of the build, not a review at the end.</H2>
          <Body className="mb-4">Enterprise AI gets stopped by risk, legal, and security more often than it gets stopped by engineering. Treating governance as a final gate is how programs die two weeks before launch.</Body>
          <Body className="mb-8">We design for it from the start: what data the system can reach, what actions it is permitted to take, what a human has to approve, how outputs are evaluated over time, and what audit trail exists when someone asks what happened and why.</Body>
          <div className="mb-8 grid gap-4 md:grid-cols-2"><StatementCards items={CONTROLS} /></div>
          <Quote>A system the business cannot trust will not be used, and an unused system has no value regardless of how good the model is.</Quote>
        </Wrap>
      </Section>

      {/* The "Architecture and integration" hard part, with the model layer as
          one part of it rather than the whole subject. */}
      <Section>
        <Wrap>
          <H2 className="mb-6">Connecting an agent to real systems is most of the work.</H2>
          <Body className="mb-4">The reasoning is rarely the hard part. The engineering sits in everything around it: reaching the data where it actually lives, respecting the permissions that already exist, and behaving predictably when something upstream is slow, wrong, or unavailable.</Body>
          <Body className="mb-8">We design for those constraints from the start, because every one of them is cheaper to handle in the architecture than to discover in production.</Body>
          <Eyebrow className="mb-4">What the architecture has to account for</Eyebrow>
          <TermList items={OPERATIONAL} className="mb-12" />
          <H3 className="mb-4">Multi-model by default.</H3>
          <Body className="mb-4">We stay close to the platforms shaping enterprise AI without becoming captive to any one of them. Model capability moves quickly, pricing moves quickly, and the right choice today may not be the right choice next year.</Body>
          <Body className="mb-8">So we build so the model layer can change without rebuilding the system around it, and we tell you plainly when a platform decision is being driven by genuine fit rather than by familiarity.</Body>
          <TermList items={STACK} className="mb-8" />
          <Body>We stay multi-model and partner-literate so you can move with confidence.</Body>
        </Wrap>
      </Section>

      {/* The "Adoption and accountability" hard part, which had no section of
          its own until now. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">Go-live is the middle of the project, not the end.</H2>
          <Body className="mb-4">A system that works and is not used produces the same business result as a system that does not work. Adoption is not a communications exercise added at launch. It is a constraint that shapes what gets built, who it is built with, and what it is allowed to change.</Body>
          <Body className="mb-8">So we plan for the part after go-live before there is anything to go live with: who owns the system, what gets measured, how the people doing the work say it is wrong, and what happens to that signal once they do.</Body>
          <Eyebrow className="mb-4">What is in place before launch</Eyebrow>
          <CheckList items={ADOPTION} columns={2} badgeClass={GREEN_BADGE} className="mb-8" />
          <Quote>The measure of the work is what the organization does differently six months after launch.</Quote>
        </Wrap>
      </Section>

      {/* Same navy as the page header, matching the detail pages' CTA band. */}
      <Section band="navy" pad="cta">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-4">Tell us what you are trying to automate.</H2>
          <Lead tone="hero" className="mx-auto mb-8">Describe the work. We will tell you honestly whether an agent is the right answer, what it would take, and where the risk sits.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
