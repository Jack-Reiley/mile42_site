import { Section, Wrap, Eyebrow, H2, Lead, Button, Breadcrumb, LabelBody } from '../components/primitives.jsx'
import { ControlRegister } from '../components/Lists.jsx'

/**
 * The controls page, for the person who has to explain an agent's controls to
 * an external auditor rather than the person who builds it.
 *
 * The copy is data, one array per control, the way Meet Vickee and Agentic AI
 * hold theirs, so the five registers read in one place. Every row traces to a
 * line on Meet Vickee or Agentic AI, or to one of the two confirmed facts (the
 * per-query log export, the writeback setting); the requirements document
 * lists the source of each. Rows that describe an engagement practice rather
 * than a product feature open "Set up during the engagement:" so the reader
 * does not take them for a default.
 */

const COLUMNS = ['Control', 'How it works', 'Evidence you receive']

/* The first cell is a row header a quarter of the register wide, so Control
   names stay short. */
const CONTROLS = [
  {
    title: 'Access control',
    lead: 'What an agent can reach, and what it cannot.',
    rows: [
      ['Scope by tenant and namespace', 'Every agent works inside a tenant and namespace created on purpose. Nothing lands by accident, and an agent sees only what its scope holds.', 'The tenant and namespace configuration'],
      ['Least privilege by construction', 'Access is scoped by tenant, namespace, and tags, so the narrowest scope is the starting point rather than something added later.', 'The scope assigned to each agent'],
      ['Credential isolation', 'No source-system credentials sit in an agent’s context window, prompts, or logs. The keys stay with you.', 'The publication list: what was copied into Vickee, and from where'],
    ],
  },
  {
    title: 'Change control and separation of duties',
    lead: 'What an agent can change, and who has to approve it.',
    rows: [
      ['Governed copy', 'Agents read from a governed copy of curated extracts. The source system is never touched.', 'The publication list'],
      ['Writeback setting', 'Outbound writeback is off, or gated by a named approver. Which one is a setting your team chooses, and it is visible.', 'The writeback setting as configured'],
      ['Deterministic connectors', 'Data moves through connectors written as plain code. No model sits in the sync path, so the same input shapes the same way every run.', 'The approval record for any change that landed'],
    ],
  },
  {
    title: 'Logging and evidence',
    lead: 'What record exists after an agent has answered.',
    rows: [
      ['Cited answers', 'Every answer names the sources it drew on, so a control can be evidenced rather than asserted.', 'A sample cited answer'],
      ['Per-query log', 'An exportable log records who or what asked, what was retrieved, which sources were cited, and when.', 'The log export'],
    ],
  },
  {
    title: 'Monitoring and review',
    lead: 'How you know it still behaves next quarter.',
    rows: [
      ['Continuous evaluation', 'Set up during the engagement: evaluation keeps running after launch rather than stopping at a one-time check.', 'The evaluation results'],
      ['Review cadence', 'Set up during the engagement: a scheduled examination of what the system is actually doing.', 'The review schedule'],
      ['Route for bad outputs', 'Set up during the engagement: the people using it can report a bad output to someone who can change the system, and what changed is recorded.', 'The change record'],
    ],
  },
  {
    title: 'When it is wrong',
    lead: 'Who answers for it, and how far a mistake can reach.',
    rows: [
      ['Named accountability', 'Set up during the engagement: one named person is accountable for every consequential decision.', 'The accountability assignment'],
      ['Bounded blast radius', 'A misbehaving agent reaches a read-only knowledge layer rather than the system of record. Your ERP never sees it.', 'The writeback setting as configured'],
      ['Reversible content', 'Content can be replaced or removed, and the index follows.', 'The removal record'],
    ],
  },
]

/* The band sequence is what carries the page's rhythm: no two consecutive
   control areas read the same, and the middle one is drawn on navy so the
   register's hairlines are not the only thing separating five identical
   shapes. A `surface` band after a `page` band takes a hairline on top, since
   the two light fills do not separate on their own; `page` after navy or after
   the statement needs none. */
const BANDS = [
  { band: 'surface', rule: true },
  { band: 'page' },
  { band: 'navy' },
  { band: 'page' },
  { band: 'surface', rule: true },
]

export default function Controls() {
  return (
    <>
      {/* Navy with a sky breadcrumb, the header the other child pages draw.
          The design's first choice was the parent's orange-deep, but the
          breadcrumb's two tones both fail AA on it: sky measures 3.32:1 and
          ink 3.19. The orange identity survives in the breadcrumb mark and the
          closing band. The heading stands alone; the lead that used to sit
          under it is the next band. */}
      <Section band="navy" grain pad="band">
        <Wrap>
          <Breadcrumb to="/meet-vickee" parent="Meet Vickee" current="Controls" markClass="bg-orange" />
          <H2 as="h1" tone="hero">How agents are controlled.</H2>
        </Wrap>
      </Section>

      {/* One statement, under no heading, before any control. */}
      <Section band="page" pad="band">
        <Wrap>
          <Lead>
            What an agent can reach, what it can change, what record it leaves, and what
            you would show an auditor. Written for the person who has to sign off, not the
            person who builds it.
          </Lead>
        </Wrap>
      </Section>

      {CONTROLS.map((control, i) => {
        const { band, rule } = BANDS[i]
        const onNavy = band === 'navy'
        const tone = onNavy ? 'hero' : 'ink'
        return (
          <Section
            key={control.title}
            band={band}
            pad="band"
            className={rule ? 'border-t border-ink/16' : ''}
          >
            <Wrap>
              <LabelBody
                tracks="wide"
                label={
                  <>
                    <Eyebrow as="span" tone={onNavy ? 'sky' : 'accent'} className="block">
                      {String(i + 1).padStart(2, '0')}
                    </Eyebrow>
                    <H2 tone={tone} className="mt-1.5 mb-2.5">{control.title}</H2>
                    <Lead tone={tone}>{control.lead}</Lead>
                  </>
                }
              >
                <ControlRegister columns={COLUMNS} rows={control.rows} tone={tone} />
              </LabelBody>
            </Wrap>
          </Section>
        )
      })}

      {/* The parent page's closing field, so the child ends where Meet Vickee
          does. Off-white on this fill measures 4.85:1. */}
      <Section band="orange-deep">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-4">Bring your control framework.</H2>
          <Lead tone="hero" className="mx-auto mb-8">
            Send the questionnaire, the control list, or the questions your auditors asked
            last time. We will answer each one against what is on this page, and say plainly
            where the answer is not yet.
          </Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
