import {
  Section, Wrap, Eyebrow, H2, H3, Lead, Body, Note,
  Button, TextLink, Breadcrumb, LabelBody, FeaturePanel,
} from '../components/primitives.jsx'
import { TermList, NumberedSteps, CheckList } from '../components/Lists.jsx'

const ENGAGEMENTS = [
  ['AI strategy', 'Pressure to do something with AI and no agreed view of what or why.'],
  ['AI ingestion strategy', 'No plan for how AI gets your data, keeps it current, or respects permissions.'],
  ['Integration strategy', 'Systems that should work together do not, and the connections grew by accident.'],
  ['Discovery', 'The problem is understood in outline but not in enough detail to scope.'],
  ['Modernization plan', 'A legacy estate needs a sequenced path forward, not a rewrite.'],
  ['Platform selection', 'A significant platform decision is coming and the evaluation needs rigor.'],
  ['Architecture review', 'An existing design needs an independent read before it is committed to.'],
  ['Product strategy', 'A product needs direction, scope, and a defensible roadmap.'],
  ['Technology education', 'Leadership needs to understand a domain well enough to govern it.'],
]

const STEPS = [
  { title: 'Build context', body: 'What outcome matters, why now, and where execution is currently breaking down.' },
  { title: 'Pressure-test the direction', body: 'The tradeoffs, the risks, the constraints, and the options you have not considered.' },
  { title: 'Land on a decision', body: 'A recommendation with the reasoning visible, and a plan specific enough to execute.' },
]

const OUTCOMES = [
  { body: 'A clear recommendation, with the reasoning visible rather than asserted.' },
  { body: 'The tradeoffs you are accepting, stated plainly, including the ones you will not like.' },
  { body: 'A plan specific enough to execute, with sequence, effort, and dependencies named.' },
  { body: 'Enough context inside your team to defend the decision without us in the room.' },
]

/* Follows the detail comp in design/advisory-detail.html. */
export default function Advisory() {
  return (
    <>
      <Section band="navy" pad="header">
        <Wrap>
          <Breadcrumb to="/what-we-do" parent="What we do" current="Advisory" markClass="bg-orange" />
          {/* The comp sets the page header at 38px, which snaps to the H2 token
              rather than H1's 57px. It is still the page's only h1. */}
          <H2 as="h1" tone="hero">You need clarity.</H2>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <H2 className="mb-3">Most technology decisions are made with incomplete context.</H2>
          <Lead className="mb-9 max-w-none text-ink/70">
            Before a major investment, the expensive mistake is rarely choosing the wrong option. It
            is committing before you understand what you are committing to.
          </Lead>
          <Eyebrow as="span" className="mb-2 block">Engagements</Eyebrow>
          <H3 className="mb-[22px]">What we are usually brought in for.</H3>
          <TermList items={ENGAGEMENTS} variant="ruled" columns={3} />
          <Note className="mt-[18px]">
            If what you need is not on this list, describe the decision and we will tell you whether
            we can help.
          </Note>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          {/* Phase Zero has no page yet. It points at /contact until the ticket
              that owns the route lands and flips it, because App.jsx bounces an
              unknown path to the homepage, which reads as a broken site. */}
          <FeaturePanel
            spot="path-clipboard"
            eyebrow="Offering · Phase Zero"
            title="The low-risk way in."
            note="Name a process. Prove the fix. Map what comes next."
          >
            <Body className="max-w-none">
              Name your messiest, most manual workflow. We assess its readiness, run a working pilot
              beside production, and hand you a roadmap of next steps. It runs in parallel, it is
              reversible on day one, and it is measured against your own baseline. Proof, not a
              proposal.
            </Body>
            <p className="mt-4">
              <TextLink to="/contact" tone="accent">Start with Phase Zero</TextLink>
            </p>
          </FeaturePanel>
        </Wrap>
      </Section>

      <Section band="tint" pad="band">
        <Wrap>
          <LabelBody
            label={
              <>
                <Eyebrow as="span" className="mb-2 block">How advisory works</Eyebrow>
                <H3>Pointed at action.</H3>
                <Note className="mt-[14px] text-[15px]">
                  Built to end in movement. A decision, a sequence, and a first step that can begin
                  on Monday.
                </Note>
              </>
            }
          >
            <NumberedSteps items={STEPS} />
          </LabelBody>

          {/* The two blocks need separation from each other, not just from the
              band edges, and it has to survive the collapse to one column. */}
          <LabelBody
            className="mt-[30px] lg:mt-[46px]"
            label={
              <>
                <Eyebrow as="span" className="mb-2 block">What you leave with</Eyebrow>
                <H3>Direction, context, and decision confidence.</H3>
              </>
            }
          >
            <CheckList items={OUTCOMES} columns={2} />
          </LabelBody>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <LabelBody label={<H2>We write recommendations we could execute ourselves.</H2>}>
            <Body className="max-w-none">
              The failure mode of consulting advisory is the document. A deck lands, everyone agrees
              it is sound, and nothing changes, because the people who wrote the recommendation
              never have to live with it.
            </Body>
            <Body className="mt-[14px] max-w-none">
              We write advice under a different constraint. We are an execution firm, and the plan
              we hand you is one we could be held to. That forces us to be specific about sequence,
              effort, dependency, and risk.
            </Body>
            <Body className="mt-[14px] max-w-none">
              Most advisory engagements move into build, and that is the intent rather than an
              upsell. Engineering picks up with the context already in place.
            </Body>
            <div className="mt-5 flex flex-wrap gap-[26px]">
              <TextLink to="/what-we-do/engineering" tone="accent">See engineering</TextLink>
              <TextLink to="/how-we-work/client-journey" tone="accent">See the client journey</TextLink>
            </div>
          </LabelBody>
        </Wrap>
      </Section>

      <Section band="navy" pad="cta">
        <Wrap className="text-center">
          <Eyebrow as="span" tone="sky" className="mb-3 block">Advisory</Eyebrow>
          <H2 tone="hero" className="mb-3">Tell us what you are trying to decide.</H2>
          <div className="mx-auto mb-6 max-w-[42rem]">
            <Lead tone="hero">
              We will tell you what we would need to know to help, and whether we are the right firm
              to ask.
            </Lead>
          </div>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
