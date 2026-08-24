import {
  Section, Wrap, Eyebrow, H2, H3, Lead, Body,
  Button, TextLink, Breadcrumb, LabelBody, FeaturePanel,
} from '../components/primitives.jsx'
import { GroupColumns, RuledGroup, CheckList } from '../components/Lists.jsx'

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
    title: 'Less invention.',
    body: 'The parts of your build that have been solved before are not rebuilt from scratch on your budget.',
  },
  {
    title: 'Less risk.',
    body: 'Proven patterns fail less often than novel ones, and they fail in ways we have already seen.',
  },
  {
    title: 'A faster start.',
    body: 'The engagement begins from something rather than from a blank page.',
  },
]

/* Follows the detail comp in design/ai-products-detail.html. The comp's magenta
   is off-palette and is corrected to --color-red, which is within a hundredth of
   its contrast in every position. */
export default function AiProducts() {
  return (
    <>
      <Section band="navy" grain pad="header">
        <Wrap>
          <Breadcrumb
            to="/what-we-do"
            parent="What we do"
            current="AI-driven Products"
            markClass="bg-red"
          />
          <H2 as="h1" tone="hero">You need proven solutions.</H2>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <H2 className="mb-3">A firm that has done the work should not arrive empty-handed.</H2>
          <Lead className="mb-9 max-w-none text-ink/70">
            Some of what you are about to build has been built before. Starting from zero is a
            choice, and it is usually the expensive one.
          </Lead>
          <Eyebrow as="span" className="mb-2 block">What we offer</Eyebrow>
          <H3 className="mb-6">Three forms, depending on what the work needs.</H3>
          <GroupColumns>
            {OFFERS.map((o) => (
              <RuledGroup key={o.title} title={o.title} ruleClass="border-t-red">
                <Body className="max-w-none text-ink/72">{o.body}</Body>
              </RuledGroup>
            ))}
          </GroupColumns>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <FeaturePanel
            spot="path-handshake"
            eyebrow="Proof"
            title="The clearest proof is what we have built ourselves."
          >
            <Body className="max-w-none">
              Our AI development pipeline is the multi-agent delivery system that lets a small team
              take on work at this scale, used on engagements rather than sold as software. Blink
              Social, our content strategy and planning tool, is built by this team and running in
              production. It is the clearest evidence that we ship products, not just advise on
              them.
            </Body>
            {/* Its own paragraph rather than an edit to the sentence above, so
                the Blink Social copy is untouched and Dewey is described at the
                same weight instead of appended to someone else's claim. */}
            <Body className="mt-[14px] max-w-none">
              Dewey, our knowledge layer for AI agents, is built the same way. It combines storage,
              automatic indexing, and multi-mode retrieval in one API, so agentic projects start
              with the retrieval problem already solved rather than rebuilding it every time.
            </Body>
            <p className="mt-5">
              <TextLink to="/meet-dewey">Meet Dewey</TextLink>
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
                <H3>Faster time to value and lower delivery risk.</H3>
              </>
            }
          >
            <CheckList items={OUTCOMES} badgeClass="bg-red" />
          </LabelBody>
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
              So the accelerators are not a marketing asset. They are the reason our commercial
              model works, and the reason it keeps improving. Each engagement should leave you with
              a better outcome, and leave us with sharper methods for the next one.
            </Body>
            <p className="mt-5">
              <TextLink to="/how-we-work/engagement-model" tone="accent">
                See the engagement model
              </TextLink>
            </p>
          </LabelBody>
        </Wrap>
      </Section>

      <Section band="navy" pad="cta">
        <Wrap className="text-center">
          <Eyebrow as="span" tone="sky" className="mb-3 block">AI-driven Products</Eyebrow>
          <H2 tone="hero" className="mb-3">Ask what already exists.</H2>
          <div className="mx-auto mb-6 max-w-[42rem]">
            <Lead tone="hero">
              Describe what you are planning to build. We will tell you honestly which parts we have
              solved before, and which are genuinely new.
            </Lead>
          </div>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
