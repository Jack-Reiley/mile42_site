import {
  Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Note, Quote,
  Button, ButtonRow, TextLink, Breadcrumb, Card,
} from '../components/primitives.jsx'
import { TermList, StepStack, GroupColumns, RuledGroup } from '../components/Lists.jsx'
import HandoffLanes from '../components/HandoffLanes.jsx'

/* Slide 4's diagnostic. Four questions rather than a definition, because the
   right process is one the people doing the work can already name. */
const QUESTIONS = [
  ['What frustrates people most?', 'Everyone knows it is slow, and quietly works around it.'],
  ['What takes the most human time?', 'Manual effort for output that barely needs judgment.'],
  [
    'Where does quality slip?',
    'Work that gets redone, or testing that is manual and skipped under pressure.',
  ],
  ['What is the low-hanging fruit?', 'The one you already suspect a machine could carry.'],
]

/* One rule colour per question, so four cells that all begin "What" are told
   apart by something other than reading them. Decorative: the colours carry no
   meaning the copy does not. */
const QUESTION_MARKS = ['border-orange', 'border-gold', 'border-brand', 'border-navy']

/* Shapes a pilot can take, not engagements we have run. The wording stays
   conditional for that reason. */
const EXAMPLES = [
  {
    title: 'Run agents on a live backlog',
    body: 'Carve off part of a real backlog, run agents on it beside your team, and compare the result against your baseline.',
    mark: 'bg-orange',
  },
  {
    title: 'Automate one business process',
    body: 'Take one process end to end, with your people reviewing what the agents produce.',
    mark: 'bg-sky',
  },
  {
    title: 'Migrate a slice off a legacy platform',
    body: 'Move one real piece with an AI-native team, before you commit to the whole replatform.',
    mark: 'bg-mint',
  },
  {
    title: 'Find and fix what is underperforming',
    body: 'Agents analyze a live surface, find what is weak, and fix it with review before it ships.',
    mark: 'bg-gold',
  },
]

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

/* One verb per person above, in the same order, because the diagram pairs them
   by column. "Check" and "Deploy to systems of record" were the deck's wording;
   they are Validate and Deploy here so the four labels are one scale. */
const AGENTS = ['Plan', 'Build', 'Validate', 'Deploy']

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

/* Built from design/design_handoff_phase_zero, option 2A. The band rhythm is
   the one the sibling What We Do detail pages draw: navy header, content bands,
   navy CTA.
 *
 * The page opens with the reader's own question rather than closing on it. A
 * reader arriving here has not yet decided they have a process worth naming, so
 * the offer means nothing until they do; the four questions that surface one
 * come first and everything after them is the answer to "then what happens".
 *
 * The firm introduction, the problem framing, and the readiness-gate drilldown
 * stay in the deck, where someone is present to talk over them. */
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

      {/* The page's largest block of type, and not its h1: the navy header still
          owns that, so the question takes the top type step at h2.
     *
     * No grain, where the handoff draws it. The site films the opening band of
     * a page and nothing below it — see hero-grain.test.jsx — and this band is
     * the second. On `tint` the film is close to a no-op anyway: the recipe in
     * BAND_GRAIN is overlay at full opacity because that fill has no headroom
     * for a symmetric blend, so it reads as a faint tooth rather than grain. */}
      <Section band="tint" pad="band">
        <Wrap>
          <H1 as="h2" className="mb-5 max-w-[22ch]">
            What is the one process you would fix first?
          </H1>
          {/* Full ink rather than the muted tone a lead usually takes here. It
              is carrying the band rather than annotating a heading above it. */}
          <Lead className="mb-9">
            The one everyone works around, or the one eating human time for output that barely needs
            judgment. Name it and we will tell you whether it is a good Phase Zero.
          </Lead>
          <TermList
            items={QUESTIONS}
            variant="marked"
            columns={4}
            marks={QUESTION_MARKS}
            className="mb-10"
          />
          {/* One button and no price. The commercial line is the closing band's,
              and repeating it here would answer a question nobody has reached. */}
          <ButtonRow>
            <Button to="/contact">Start with Phase Zero</Button>
          </ButtonRow>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow as="span" className="mb-2 block">Offering · Phase Zero pilot</Eyebrow>
              <H2 className="mb-4">Name a process. See it working. Map what comes next.</H2>
              <Lead className="mb-[14px] max-w-none text-ink/70">
                Most firms answer an AI question with a roadmap and a demo. Both die on a shelf. We
                build a real working solution on one process you name, in a fraction of the time and
                at a fraction of the cost.
              </Lead>
              <Body className="max-w-none">
                You name the workflow. We assess the readiness around it, build something that
                actually runs on it, and hand you a sequenced roadmap for what comes after the
                proof. One engagement, fixed scope.
              </Body>
            </div>
            <div>
              <StepStack items={STAGES} />
              <Note className="mt-[14px] text-[15px]">
                Fixed scope, and every stage produces something you keep whether or not you
                continue.
              </Note>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section band="surface" pad="band">
        <Wrap>
          {/* Baseline-aligned rather than stacked: the sentence on the right
              qualifies the heading rather than following it, and reading it
              second is the point. */}
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-10">
            <H2>Four shapes it can take.</H2>
            <div className="max-w-[34rem]">
              <Body className="max-w-none text-ink/70">
                One named process, not a department and not a category. The right one is usually
                already obvious to the people doing the work.
              </Body>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {EXAMPLES.map((e) => (
              <Card key={e.title}>
                {/* Decorative. It separates four cards of the same length at a
                    glance; the colours mean nothing the titles do not say. */}
                <span aria-hidden="true" className={`h-[5px] w-8 rounded-[3px] ${e.mark}`} />
                {/* A step down from the 26px token. These columns are 275px at
                    the comp width, where the full step breaks every title onto
                    three lines. */}
                <H3 className="text-[20px] leading-[26px]">{e.title}</H3>
                <Body className="max-w-none text-[15px] leading-6">{e.body}</Body>
              </Card>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap>
          <Eyebrow as="span" className="mb-2 block">How we build it</Eyebrow>
          <H2 className="mb-[14px]">The build starts and ends with human oversight.</H2>
          <Lead className="mb-10 text-ink/70">
            An AI-native build, not a demo. It runs in parallel to production and is measured
            against the baseline from stage one.
          </Lead>
          <HandoffLanes people={PEOPLE} agents={AGENTS} />
          <Quote className="mt-[38px]">
            AI work rarely stalls on the technology. It stalls where people and machines are
            supposed to meet.
          </Quote>
        </Wrap>
      </Section>

      {/* Ruled columns rather than the three cards this band used to draw. The
          statements are one sentence each, which a box makes look emptier than
          it is, and the rule echoes the question band that opens the page.
     *
     * Surface rather than the page white the handoff README names, following
     * the prototype it ships beside: on white this band and the build band
     * above it run together as one field, and the three columns read as a
     * continuation of the diagram rather than as the page's own summing up. */}
      <Section band="surface" pad="band">
        <Wrap>
          <GroupColumns>
            {WORTH.map((w) => (
              <RuledGroup key={w.title} title={w.title} as="h3" ruleClass="border-orange">
                <Body className="max-w-none">{w.body}</Body>
              </RuledGroup>
            ))}
          </GroupColumns>
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

      {/* Flat navy, no grain: it is the page header's fill returning to close
          the argument, and a second textured band would read as a third one. */}
      <Section band="navy" pad="cta">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-3">Priced to be a decision, not an investment.</H2>
          <div className="mx-auto mb-6 max-w-[42rem]">
            <Lead tone="hero">
              The scope is fixed and agreed before we start, there is no obligation to continue, and
              the roadmap is yours either way.
            </Lead>
          </div>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
