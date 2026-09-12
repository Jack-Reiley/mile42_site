import {
  Section, Wrap, Eyebrow, H2, H3, Lead, Body,
  Button, TextLink, Breadcrumb, LabelBody, FeaturePanel,
} from '../components/primitives.jsx'
import { TermList, GroupColumns, RuledGroup, CheckList } from '../components/Lists.jsx'

/* Brand green is the faintest of the three page accents. On light backgrounds it
   is darkened 8% so the rules and badges read at comparable weight to Advisory's
   orange. On navy the pure token is stronger, so the
   breadcrumb mark keeps it.
   Written out in full at each call site because Tailwind scans source text: an
   interpolated class name never reaches the generated stylesheet. */
const GREEN_RULE = 'border-t-[color-mix(in_srgb,var(--color-brand)_92%,black)]'
const GREEN_BADGE = 'bg-[color-mix(in_srgb,var(--color-brand)_92%,black)]'

const CAPABILITIES = [
  {
    title: 'AI and agentic systems',
    items: [
      ['Agentic AI implementation', 'Agents and copilots that operate inside real workflows, not demos.'],
      ['AI applications', 'Enterprise applications where AI is the core of how the product works.'],
      ['AI integration', 'Connecting AI systems to the data, platforms, and processes you already run.'],
      ['Workflow automation', 'Removing manual steps that consume capacity without adding judgment.'],
    ],
  },
  {
    title: 'Systems and platforms',
    items: [
      ['Custom software', 'Systems built for a problem no product on the market actually solves.'],
      ['Product engineering', 'Building and evolving a product with a roadmap, not a one-off delivery.'],
      ['Systems integration', 'Making separate systems behave like one, reliably and observably.'],
      // Restored. The comp drops this one, but the prototype is the copy
      // authority and removing a claimed capability is a sales decision, not a
      // layout one. See EXTRAPOLATIONS.md.
      ['Source data consolidation and readiness', 'Bringing scattered, inconsistent, and undocumented source data into a state something can actually be built on'],
      ['Data platforms', 'The foundation that makes AI and analytics work rather than aspire.'],
    ],
  },
  {
    title: 'Modernization',
    items: [
      ['Cloud modernization', 'Moving to modern infrastructure without pausing the business.'],
      ['Legacy modernization', 'A sequenced path off systems that are expensive to keep and risky to replace.'],
      ['Digital experience', 'Customer-facing systems where the experience is the differentiator.'],
    ],
  },
]

/* What was AI-driven Products, folded in here. The accelerators are part of
   how engineering work is delivered rather than a practice of their own, and
   the page that held them spent most of its length restating that. */
const OFFERS = [
  {
    title: 'Delivery accelerators',
    body: 'Reusable methods, agents, workflows, and patterns built from prior client work. Not sold separately: they lower the risk and the cost of the engagement they are used in.',
  },
  {
    title: 'Client-owned products',
    body: 'Sometimes the right answer is a product built for one organization and owned outright by it. You own the code, the IP, and the roadmap. We build it and hand it over.',
  },
  {
    title: 'Market-facing products',
    body: 'Occasionally a pattern proves general enough to become a product in its own right. That is rare, and we treat it as rare.',
  },
]

const OUTCOMES = [
  {
    title: 'Working technology.',
    body: 'Systems in production, used by the people they were built for, with the operational reality handled rather than deferred.',
  },
  {
    title: 'Better execution.',
    body: 'Your organization runs the next initiative better, because the way the work was done was part of the delivery.',
  },
  {
    title: 'Stronger capability.',
    body: 'Your team can operate, extend, and change what we built without us.',
  },
]

/* Follows the detail comp in design/engineering-detail.html. */
export default function Engineering() {
  return (
    <>
      <Section band="navy" grain pad="header">
        <Wrap>
          <Breadcrumb
            to="/what-we-do"
            parent="What we do"
            current="Engineering"
            markClass="bg-brand"
          />
          <H2 as="h1" tone="hero">You need to execute.</H2>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <H2 className="mb-3">
            The distance between a plan and a working system is where most initiatives fail.
          </H2>
          <Lead className="mb-9 max-w-none text-ink/70">
            Something important has to work. Not designed, not scoped, not piloted. Work, in
            production, for real users, under real constraints.
          </Lead>
          <Eyebrow as="span" className="mb-2 block">Capabilities</Eyebrow>
          <H3 className="mb-6">What we build.</H3>
          {/* #21's ruled column wrapping #20's term rows, composed rather than built. */}
          <GroupColumns>
            {CAPABILITIES.map((g) => (
              <RuledGroup key={g.title} title={g.title} ruleClass={GREEN_RULE}>
                <TermList items={g.items} variant="ruled" />
              </RuledGroup>
            ))}
          </GroupColumns>
        </Wrap>
      </Section>

      <Section band="surface" pad="band">
        <Wrap>
          <H2 className="mb-3">What you do not have to build from scratch.</H2>
          <Lead className="mb-9 max-w-none text-ink/70">
            Some of what you are about to build has been built before. Starting from zero is a
            choice, and it is usually the expensive one.
          </Lead>
          <Eyebrow as="span" className="mb-2 block">What we bring</Eyebrow>
          <H3 className="mb-6">Three forms, depending on what the work needs.</H3>
          <GroupColumns>
            {OFFERS.map((o) => (
              <RuledGroup key={o.title} title={o.title} ruleClass={GREEN_RULE}>
                <Body className="max-w-none text-ink/72">{o.body}</Body>
              </RuledGroup>
            ))}
          </GroupColumns>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <LabelBody label={<H2>Reuse is why the economics work.</H2>}>
            <Body className="max-w-none">
              Committing to an outcome is difficult when every engagement starts from nothing. It
              becomes practical when a meaningful share of the work has been solved, tested, and
              proven somewhere else.
            </Body>
            <Body className="mt-[14px] max-w-none">
              The accelerators are the reason our commercial model works, and the reason it keeps
              improving. Each engagement should leave you with a better outcome and leave us with
              sharper methods for the next one.
            </Body>
            <p className="mt-5">
              <TextLink to="/how-we-work#engagement-model" tone="accent">
                See the engagement model
              </TextLink>
            </p>
          </LabelBody>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <FeaturePanel
            spot="path-gears"
            eyebrow="Core practice"
            title="Agentic AI, implemented."
          >
            <Body className="max-w-none">
              A prototype only has to work once. A system has to work every time, on real data, for
              people who did not ask for it. Closing that gap is our core practice: agents and
              copilots that run inside your real workflows, connected to your real data, with the
              operational reality handled rather than deferred.
            </Body>
            <p className="mt-4">
              <TextLink to="/what-we-do/engineering/agentic-ai" tone="accent">Inside our agentic AI practice</TextLink>
            </p>
          </FeaturePanel>
        </Wrap>
      </Section>

      <Section band="tint" pad="band">
        <Wrap>
          <LabelBody
            label={
              <>
                <Eyebrow as="span" className="mb-2 block">What you leave with</Eyebrow>
                <H3>You end up more capable than you started.</H3>
              </>
            }
          >
            <CheckList items={OUTCOMES} badgeClass={GREEN_BADGE} />
          </LabelBody>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <LabelBody label={<H2>We build capability, not dependence.</H2>}>
            <Body className="max-w-none">
              The strategy was sound, the vendor was capable, the technology was proven somewhere
              else, and the thing still did not land, because production is where the assumptions
              get tested.
            </Body>
            <Body className="mt-[14px] max-w-none">
              Real data is messier than the sample. The integration has a constraint nobody
              documented. Adoption depends on a team whose incentives were never part of the plan.
              Engineering is the practice of closing that distance, and staying accountable for
              whether it works.
            </Body>
            <p className="mt-5">
              <TextLink to="/how-we-work" tone="accent">See how we deliver</TextLink>
            </p>
          </LabelBody>
        </Wrap>
      </Section>

      <Section band="navy" pad="cta">
        <Wrap className="text-center">
          <Eyebrow as="span" tone="sky" className="mb-3 block">Engineering</Eyebrow>
          <H2 tone="hero" className="mb-3">Tell us what needs to work.</H2>
          <div className="mx-auto mb-6 max-w-[42rem]">
            <Lead tone="hero">
              Bring the problem. We will tell you honestly whether we are the right firm to solve
              it.
            </Lead>
          </div>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
