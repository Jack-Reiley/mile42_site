import {
  Section, Wrap, Eyebrow, H2, H3, Lead, Body,
  Button, TextLink, Breadcrumb, LabelBody, FeaturePanel,
} from '../components/primitives.jsx'
import { TermList, GroupColumns, RuledGroup, CheckList } from '../components/Lists.jsx'

/* Brand green is the faintest of the three page accents. On light backgrounds it
   is darkened 8% so the rules and badges read at comparable weight to Advisory's
   orange and AI-driven Products' red. On navy the pure token is stronger, so the
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
      <Section band="navy" pad="header">
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
              <TextLink to="/agentic-ai" tone="accent">Inside our agentic AI practice</TextLink>
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
