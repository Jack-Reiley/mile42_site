import {
  Section, Wrap, Eyebrow, H2, H3, Lead, Body, Note, Quote,
  Button, ButtonRow, TextLink, Breadcrumb, LabelBody, Card,
} from '../components/primitives.jsx'
import { CheckList, StepStrip, StatementCards } from '../components/Lists.jsx'

/* The deck runs five stages. Scoring is folded into Analyze here: on a slide
   the readiness gates earn their own column because someone is talking over
   them, and on the page they are detail the reader has not asked for yet. */
const STAGES = [
  {
    label: 'Identify',
    line: 'The process you named, its baseline today, who owns it, and what good looks like.',
  },
  {
    label: 'Analyze',
    line: 'What surrounds it. Whether the knowledge is findable, the data usable, and the systems actionable.',
  },
  {
    label: 'Pilot',
    line: 'A working solution on your process, running beside production and measured against that baseline.',
  },
  {
    label: 'Roadmap',
    line: 'A sequenced map of what comes next, with an implementation estimate specific enough to execute.',
  },
]

/* Each human touchpoint carries the consequence of skipping it, which is the
   deck's actual argument: the failure is never the model. */
const PEOPLE = [
  {
    title: 'Name the outcome',
    body: 'The metric and the baseline, before any tool. Without this, there is no way to prove value.',
  },
  {
    title: 'Give context',
    body: 'The rules, the edge cases, what good looks like. Without this, a generic tool nobody adopts.',
  },
  {
    title: 'Review the work',
    body: 'Judgment on what the agent produced. Without this, quality drifts.',
  },
  {
    title: 'Approve to land',
    body: 'Agreed up front, so nothing waits on a decision. Without this, working software sits frozen.',
  },
]

const AGENTS = ['Plan', 'Build', 'Check', 'Deploy to systems of record']

const WORTH = [
  {
    title: 'Low risk.',
    body: 'It runs beside production, never through it, and it is reversible on day one.',
  },
  {
    title: 'Real proof.',
    body: 'Something working on your own process, measured against your own baseline rather than a vendor benchmark.',
  },
  {
    title: 'Built to last.',
    body: 'The proof is the first increment rather than a dead end, and the governance around it outlives the pilot.',
  },
]

/* EXTRAPOLATED — no comp for this page. Content is the Phase Zero deck, cut to
   the offer itself: what it is, how it runs, and why it is worth doing. The
   firm introduction, the problem framing, and the readiness-gate drilldown all
   stay in the deck, where someone is present to talk over them. */
export default function PhaseZero() {
  return (
    <>
      <Section band="navy" grain pad="header">
        <Wrap>
          <Breadcrumb
            to="/what-we-do"
            parent="What we do"
            current="Phase Zero"
            markClass="bg-orange"
          />
          {/* The comp family sets the page header at 38px, which snaps to the
              H2 token rather than H1's 57px. It is still the page's only h1. */}
          <H2 as="h1" tone="hero">Proof, not a proposal.</H2>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <Eyebrow as="span" className="mb-2 block">Offering · Phase Zero pilot</Eyebrow>
          <H2 className="mb-3">Name a process. See it working. Map what comes next.</H2>
          <Lead className="mb-4 max-w-none text-ink/70">
            Most firms answer an AI question with a roadmap and a demo. Both die on a shelf. We
            build a real working solution on one process you name, in a fraction of the time and at
            a fraction of the cost.
          </Lead>
          <Body className="mb-7 max-w-none">
            You name the workflow. We assess the readiness around it, build something that actually
            runs on it, and hand you a sequenced roadmap for what comes after the proof. One
            engagement, fixed scope.
          </Body>

          {/* The offer's terms sit above the fold of the argument rather than
              under it. A free build from a firm you have not worked with reads
              as a catch until the catch is answered, and the answer is the
              second sentence. */}
          <Card className="mb-6">
            <H3 className="mb-2">Phase Zero is free.</H3>
            <Body className="max-w-none">
              You pay when you decide to scale it. The scope is fixed and agreed before we start,
              there is no obligation to continue, and the roadmap is yours either way.
            </Body>
          </Card>

          <ButtonRow>
            <Button to="/contact">Start with Phase Zero</Button>
            <Button to="/what-we-do" variant="secondary">See what we do</Button>
          </ButtonRow>
        </Wrap>
      </Section>

      <Section band="tint" pad="band">
        <Wrap>
          <LabelBody
            label={
              <>
                <Eyebrow as="span" className="mb-2 block">How it runs</Eyebrow>
                <H3>Four stages, one engagement.</H3>
                <Note className="mt-[14px] text-[15px]">
                  Fixed scope, and every stage produces something you keep whether or not you
                  continue.
                </Note>
              </>
            }
          >
            <StepStrip items={STAGES} />
          </LabelBody>

          <LabelBody
            className="mt-[30px] lg:mt-[46px]"
            label={
              <>
                <Eyebrow as="span" className="mb-2 block">How we build it</Eyebrow>
                <H3>The build starts and ends with human oversight.</H3>
                <Note className="mt-[14px] text-[15px]">
                  An AI-native build, not a demo. It runs in parallel to production and is measured
                  against the baseline from stage one.
                </Note>
              </>
            }
          >
            {/* Real headings, not styled labels: they name the two halves of the
                band and are the only thing distinguishing the lists beneath
                them, so a reader moving by heading needs them. */}
            <Eyebrow as="h4" className="mb-2">People</Eyebrow>
            <CheckList items={PEOPLE} columns={2} />

            <Eyebrow as="h4" className="mt-7 mb-2">Agents</Eyebrow>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatementCards items={AGENTS} />
            </div>
          </LabelBody>

          <Quote className="mt-[38px]">
            AI work rarely stalls on the technology. It stalls where people and machines are
            supposed to meet.
          </Quote>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          {/* Full width rather than the two-column label shape the bands above
              use. Three cards inside a 1.6fr column are narrow enough that a
              six-word heading wraps to two lines and its body to four, and the
              label column has no note to fill it here. */}
          <H2 className="mb-3">The smallest, lowest-risk way to find out.</H2>
          <Lead className="mb-9 max-w-none text-ink/70">
            Phase Zero puts a working thing in front of you on work you already care about, at the
            smallest scale that still proves something. What it costs you is the process you name
            and the people who know it.
          </Lead>
          <div className="grid gap-4 md:grid-cols-3">
            {WORTH.map((w) => (
              <Card key={w.title}>
                <H3>{w.title}</H3>
                <Body className="max-w-none">{w.body}</Body>
              </Card>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-[26px]">
            <TextLink to="/how-we-work/client-journey" tone="accent">
              See where it sits in the client journey
            </TextLink>
            <TextLink to="/how-we-work/engagement-model" tone="accent">
              See the engagement model
            </TextLink>
          </div>
        </Wrap>
      </Section>

      <Section band="navy" pad="cta">
        <Wrap className="text-center">
          <Eyebrow as="span" tone="sky" className="mb-3 block">Phase Zero</Eyebrow>
          <H2 tone="hero" className="mb-3">What is the one process you would fix first?</H2>
          <div className="mx-auto mb-6 max-w-[42rem]">
            <Lead tone="hero">
              The one everyone works around, or the one eating human time for output that barely
              needs judgment. Name it and we will tell you whether it is a good Phase Zero.
            </Lead>
          </div>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
