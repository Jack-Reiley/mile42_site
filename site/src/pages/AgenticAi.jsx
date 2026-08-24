import { Section, Wrap, Eyebrow, H2, H3, Lead, Body, Quote, Button, TextLink, Breadcrumb } from '../components/primitives.jsx'
import { NumList, TermList, GroupColumns, RuledGroup } from '../components/Lists.jsx'
import HardParts from '../components/HardParts.jsx'

/* The page accent darkened 8%, the same rule fill the Engineering page uses so
   the green reads at weight on a light band. Written out in full because
   Tailwind scans source text. */
const GREEN_RULE = 'border-t-[color-mix(in_srgb,var(--color-brand)_92%,black)]'

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

/**
 * The four hard parts, and the detail each one carries. Held as data rather than
 * markup so the four panels cannot drift apart in styling, and kept in the page
 * because this is the page's copy.
 *
 * The copy is the client's, supplied verbatim during the design session. Nodes
 * two and four are newer than the bands they replace.
 */
const PARTS = [
  {
    n: '01',
    title: 'Context and workflow design',
    heading: 'Context before solutions.',
    blocks: [
      { kind: 'lead', text: 'Understanding the work well enough to know where an agent belongs and, more importantly, where it does not. Most failed AI projects automated a step that was never the bottleneck.' },
      { kind: 'body', text: 'Every engagement starts by understanding the work, not by selecting a technology. That is one of the firm’s operating principles and it matters more here than anywhere else, because agentic systems are unusually sensitive to context. The same architecture that works in one organization fails in another with different data, incentives, and risk tolerance.' },
      {
        kind: 'num',
        label: 'Three questions we answer before building anything',
        items: [
          { n: '01', title: 'What outcome actually matters, and how will we know if it moved?', body: 'If nobody can name the measure, the project has no definition of done.' },
          { n: '02', title: 'Where is execution breaking down today?', body: 'Automating around a broken process usually preserves the break and hides it.' },
          { n: '03', title: 'What is the smallest system that would prove this works in production?', body: 'Not a demo. Something real, narrow, and used by actual people.' },
        ],
      },
      { kind: 'link', to: '/how-we-work/client-journey', text: 'See the client journey' },
    ],
  },
  {
    n: '02',
    title: 'Architecture and integration',
    heading: 'Connecting an agent to real systems is most of the work.',
    blocks: [
      { kind: 'lead', text: 'The reasoning is rarely the hard part. The engineering sits in everything around it: reaching the data where it actually lives, respecting the permissions that already exist, and behaving predictably when something upstream is slow, wrong, or unavailable.' },
      { kind: 'body', text: 'We design for those constraints from the start, because every one of them is cheaper to handle in the architecture than to discover in production.' },
      {
        kind: 'terms',
        label: 'What the architecture has to account for',
        items: [
          ['Permissions', 'The agent reaches what the person it acts for is allowed to reach, enforced by the access model you already run rather than a second one built beside it.'],
          ['Latency', 'A response fast enough for the workflow it sits inside. An answer that arrives after the decision was made is not an answer.'],
          ['Failure modes', 'Defined behavior when the model is wrong, the call times out, or the input looks nothing like the examples it was built against.'],
          ['Cost control', 'Knowing what a transaction costs before volume turns it into a budget conversation, and having somewhere to go when it does.'],
          ['Dependency outages', 'What the workflow does when a system the agent depends on is down, including whether the work can still be done by hand.'],
        ],
      },
      { kind: 'subhead', text: 'Multi-model by default.' },
      { kind: 'body', text: 'We stay close to the platforms shaping enterprise AI without becoming captive to any one of them. Model capability moves quickly, pricing moves quickly, and the right choice today may not be the right choice next year.' },
      { kind: 'body', text: 'So we build so the model layer can change without rebuilding the system around it, and we tell you plainly when a platform decision is being driven by genuine fit rather than by familiarity.' },
      /* No label. The platform table carries none, at the client's request, and
         the "See our partners" link that used to close this section is gone. */
      {
        kind: 'terms',
        items: [
          ['Model layer', 'Anthropic · OpenAI'],
          ['Data and AI foundation', 'Databricks · Snowflake'],
          ['Enterprise workflow', 'Salesforce Agentforce · ServiceNow'],
          ['Content platforms', 'Contentstack · Contentful'],
          ['Commerce platforms', 'commercetools · Shopify · SAP Hybris'],
        ],
      },
      { kind: 'body', text: 'We stay multi-model and partner-literate so you can move with confidence.' },
    ],
  },
  {
    n: '03',
    title: 'Governance and risk',
    heading: 'The controls are part of the build, not a review at the end.',
    blocks: [
      { kind: 'lead', text: 'Enterprise AI gets stopped by risk, legal, and security more often than it gets stopped by engineering. Treating governance as a final gate is how programs die two weeks before launch.' },
      { kind: 'body', text: 'We design for it from the start: what data the system can reach, what actions it is permitted to take, what a human has to approve, how outputs are evaluated over time, and what audit trail exists when someone asks what happened and why.' },
      {
        kind: 'checks',
        label: 'Four things every system we build has',
        items: [
          'Defined boundaries on data access and permitted actions.',
          'Evaluation that runs continuously, not once at launch.',
          'A clear human accountability point for every consequential decision.',
          'An audit trail sufficient to explain a specific output after the fact.',
        ],
      },
      { kind: 'quote', text: 'A system the business cannot trust will not be used, and an unused system has no value regardless of how good the model is.' },
    ],
  },
  {
    n: '04',
    title: 'Adoption and accountability',
    heading: 'Go-live is the middle of the project, not the end.',
    blocks: [
      { kind: 'lead', text: 'A system that works and is not used produces the same business result as a system that does not work. Adoption is not a communications exercise added at launch. It is a constraint that shapes what gets built, who it is built with, and what it is allowed to change.' },
      { kind: 'body', text: 'So we plan for the part after go-live before there is anything to go live with: who owns the system, what gets measured, how the people doing the work say it is wrong, and what happens to that signal once they do.' },
      {
        kind: 'titled',
        label: 'What is in place before launch',
        items: [
          { title: 'A named owner', body: 'One person accountable for the system after we leave, identified while it is still being built rather than at handover.' },
          { title: 'A measure that predates the agent', body: 'The number the work was already judged on, so improvement can be shown rather than asserted.' },
          { title: 'A route for the people using it', body: 'A way to report a bad output that reaches someone who can change the system, and a record of what changed as a result.' },
          { title: 'A review cadence', body: 'Scheduled examination of what the system is actually doing, because the work it supports will not hold still.' },
        ],
      },
      { kind: 'quote', text: 'The measure of the work is what the organization does differently six months after launch.' },
    ],
  },
]

/* EXTRAPOLATED — no comp for this page. */
export default function AgenticAi() {
  return (
    <>
      {/* This page sits under Engineering, so it takes the same header the
          What we do detail pages draw: navy band, breadcrumb, hero heading. */}
      <Section band="navy" grain pad="header">
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
          <H2 className="mb-3">Agentic systems that operate inside real business constraints.</H2>
          {/* The framing that opened the page before the capability listing took
              the first slot. Muted, above the list, as on the sibling pages. */}
          <Lead className="mb-9 max-w-none text-ink/70">Most organizations do not have an AI strategy problem. They have an AI implementation problem. The models work. Getting them to change how work happens is the hard part.</Lead>
          <Eyebrow as="span" className="mb-2 block">Capabilities</Eyebrow>
          <H3 className="mb-6">What we build.</H3>
          <GroupColumns>
            {SYSTEM_GROUPS.map((g) => (
              <RuledGroup key={g.title} title={g.title} ruleClass={GREEN_RULE}>
                <TermList items={g.items} variant="ruled" />
              </RuledGroup>
            ))}
          </GroupColumns>
          {/* Directly under the listing rather than in a band of its own: the
              group above claims knowledge and retrieval work, and this is the
              thing that does it. Default ink, not the page accent — accent on
              the cream band lands on the AA boundary for body-sized text. */}
          <p className="mt-8">
            <TextLink to="/meet-dewey">Meet Dewey, our knowledge layer for agents</TextLink>
          </p>
        </Wrap>
      </Section>

      {/* The four hard parts, and everything that used to sit in four bands of
          their own. White, because the panel's own fill is the cream. */}
      <Section>
        <Wrap>
          <H2 className="mb-5">The distance between an AI pilot and an AI system.</H2>
          <Body className="mb-4">Almost every organization has run the pilot. Someone built a prototype, it demonstrated well, leadership was encouraged, and then it stopped.</Body>
          <Lead className="mb-10">Anyone can call an API. The difficulty sits in everything around the call.</Lead>
          <HardParts parts={PARTS} />
        </Wrap>
      </Section>

      {/* Cream rather than white: the drill-down above took the white band, and
          two white bands in a row read as one section with no division. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">We will tell you when the answer is not an agent.</H2>
          <Body className="mb-8">Some problems are better solved by fixing a process, deleting a step, integrating two systems properly, or writing conventional software that behaves predictably every time. Reaching for an agent in those cases adds cost, latency, and a new category of failure in exchange for very little.</Body>
          <Eyebrow className="mb-4">When an agent is usually the wrong tool</Eyebrow>
          <NumList items={WRONG_TOOL} className="mb-8" />
          <Quote>A no you can trust early is cheaper than a yes that fails seven months in.</Quote>
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
