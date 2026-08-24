import { useState } from 'react'
import { Eyebrow } from './primitives.jsx'
import {
  AGENTS,
  AnswerCurves,
  COLUMN,
  CatalogStack,
  DRAWER_BOX,
  DrawerFace,
  PILL_ON_LINE,
  Pill,
  PublishCurves,
  Rows,
  SOURCES,
} from './CatalogDrawer.jsx'

/**
 * The card catalog diagram with an interactive layer over it, from the handoff
 * in design/illustrations/Dewey Homepage Graphic Integration. Replaces three
 * consecutive bands on /meet-dewey — "Every library needs a librarian",
 * "Connectors are code, not prompts", and "One source of truth, every agent" —
 * with one picture whose parts explain themselves.
 *
 * Those bands said the same thing three times in three shapes: a diagram, then
 * two cards, then three ruled columns. Every claim they made is still here,
 * attached to the part of the system it is about, which is the argument the
 * bands were making in prose.
 *
 * The picture is `CatalogDrawer`'s, imported part by part rather than redrawn.
 * The handoff redraws it because it was authored against a main that did not
 * have that component yet; drawing it twice would leave the homepage and this
 * page free to drift. The homepage stays static — this file is the only place
 * the diagram is interactive.
 *
 * The handoff scales a fixed 1500px stage down with a CSS transform, which
 * takes the 12px labels with it: at 1024 they land near 7px. The geometry is
 * `CatalogDrawer`'s real 1080 grid instead, so every label renders at its own
 * size and the narrow form drops to stacked text, which is what that component
 * and its handoff already concluded.
 *
 * The copy lives here rather than on the page, following `CatalogDrawer`'s own
 * note: it is keyed to regions of a drawing, so it has to be re-derived
 * whenever the drawing changes and belongs beside it.
 */

/* The handoff's dim. Everything not being pointed at drops to near-invisible,
   so the diagram reads as one part at a time. Decorative only: the same words
   are in the panel below at full contrast, and the stacked layout never dims. */
const DIM = 0.16

const PANE_ID = 'librarian-part'

/* The parts, in reading order along the path: in from the sources, through the
   drawer, out to the agents, and finally the return leg.
 *
 * This is not tab order, and the difference is worth stating because it looks
 * like it should be. Tab order is DOM order, and the hotspots are placed in the
 * grid column each one sits over, so `outbound` — drawn beneath `publish` in
 * the same corridor — is tabbed third rather than last. That still reads left to
 * right across the diagram, which is what matters; it just is not this array. */
const PARTS = [
  {
    key: 'sources',
    label: 'Your systems of record',
    eyebrow: 'Your systems of record',
    title: 'Agents never touch the system of record.',
    body:
      'Marketing and CRM, commerce, ERP and finance, analytics: these systems were built for ' +
      'controlled transactions, not for autonomous software running open-ended queries. You ' +
      'don’t hand a patron the keys to the archive.',
    proof: [
      ['Scalability', 'Retrieval load hits Dewey, not production. Your ERP never fields a thousand exploratory queries at 2 a.m.'],
      ['Stability', 'SOR schemas change on their own release cycles. Dewey decouples agents from those changes, so an upstream migration doesn’t break every agent overnight.'],
    ],
  },
  {
    key: 'publish',
    label: 'Curated publish, inbound',
    eyebrow: 'Inbound · SOR to Dewey',
    title: 'Connectors are code, not prompts.',
    body:
      'The acquisitions desk. Deterministic connectors pull from source systems on your schedule ' +
      'and shape data on the way in, so everything arrives cataloged and shelved. No LLM in the ' +
      'sync path means no inference cost per run and no behavior that drifts with a model.',
    proof: [
      ['Deterministic', 'Plain code with transformation and validation built in: testable, versioned, and the same result every run.'],
      ['Freshness, on your terms', 'Connector schedules are configurable, so the copy updates on your publication cadence. Replace a file in place and the index follows.'],
    ],
  },
  {
    key: 'catalog',
    label: 'The card catalog',
    eyebrow: 'The card catalog',
    title: 'One source of truth, every agent.',
    body:
      'Multi-agent systems drift when each agent carries its own context: every private copy is a ' +
      'fork of reality. The catalog is the shared map of what is known.',
    proof: [
      ['Update once', 'Change a document and every consumer sees it. No per-agent copies, no reconciliation, no version archaeology.'],
      ['Shared map', 'The catalog shows every agent what is known, not just what it happened to ingest.'],
    ],
  },
  {
    key: 'dewey',
    label: 'Dewey, the librarian',
    eyebrow: 'Dewey · the librarian',
    title: 'Every library needs a librarian.',
    body:
      'Publish curated extracts into Dewey and agents work against the copy, never the source. ' +
      'The librarian retrieves what’s appropriate and keeps the stacks intact.',
    proof: [
      ['Governed', 'A read-optimized copy, scoped by tenant and namespace, indexed automatically and answerable.'],
      ['Readable by both', 'A task-oriented agent guide for machines and a wiki-style admin console for people, over the same data.'],
    ],
  },
  {
    key: 'answers',
    label: 'Scoped answers',
    eyebrow: 'Scoped retrieval',
    title: 'Agents get answers, never the keys.',
    body: 'Every request is bounded by the tenant and namespace it was published into.',
    proof: [
      ['Security', 'No source-system credentials in agent context windows, prompts, or logs. The SOR attack surface never grows with agent count.'],
      ['Least privilege', 'Agents see only what was deliberately published into their tenant and namespace, scoped and tagged.'],
      ['Auditability', 'What agents can reach is an explicit, reviewable publication decision, not a side effect of a service account’s permissions.'],
    ],
  },
  {
    key: 'agents',
    label: 'Your agents',
    eyebrow: 'Your agents',
    title: 'Orchestrators, sub-agents, and humans.',
    body:
      'Every consumer reads from the same catalog: semantic search for meaning, hybrid search for ' +
      'exact terms, ask for a synthesized answer with cited sources.',
    proof: [
      ['Humans included', 'The wiki-style admin console reads the same shelf, with browse, search, and cited answers built in.'],
      ['No drift', 'One platform serving orchestrators, sub-agents, and humans from the same store, so no agent carries a private fork of reality.'],
    ],
  },
  /* The seventh, and the only one the handoff does not have. The "Connectors are
     code, not prompts" band argued in two directions, and the outbound half —
     agent-proposed writes, gated by a human — appears in none of the handoff's
     six parts. Without this the claim leaves the site. */
  {
    key: 'outbound',
    label: 'Outbound, Dewey to your systems of record',
    eyebrow: 'Outbound · Dewey to SOR',
    title: 'Agents propose. Humans approve. Code executes.',
    body:
      'Circulation with a signature. When agent work should flow back to a source system, updates ' +
      'travel as deterministic code, and nothing ships without the librarian’s stamp.',
    proof: [
      ['Proposed, never written', 'Agents propose changes in Dewey, never in the SOR.'],
      ['Gated', 'Human review and signoff before anything reaches a source system.'],
      ['Repeatable', 'Approved updates execute as plain, repeatable code.'],
    ],
  },
]

/* What the panel says before anything is pointed at, and what the whole picture
   is for. */
const IDLE = {
  eyebrow: 'Seven parts, one path',
  title: 'Point at any part of the diagram.',
  body:
    'Curated extracts flow in on a schedule. Scoped answers flow out. Approved writes go back ' +
    'under a human signature. Agents never reach past the middle column.',
  proof: [
    ['Data in', 'Extracts arrive from your systems of record through deterministic connectors, on a schedule you configure.'],
    ['Answers out', 'Agents search by meaning, match exact terms, or ask a question and get an answer with cited sources.'],
  ],
}

const byKey = Object.fromEntries(PARTS.map((p) => [p.key, p]))

/* The return leg, drawn under the inbound bundle in the same corridor. It is
   the one mark here that is not in `CatalogDrawer`: the homepage graphic has no
   outbound path because the homepage never makes that claim. */
function OutboundArrow() {
  return (
    <svg
      viewBox="0 0 190 340"
      width="190"
      height="340"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 overflow-visible"
    >
      <path d="M184 305 L14 305" stroke="var(--color-ink)" strokeWidth="1.25" />
      <path
        d="M20 299 L8 305 L20 311"
        stroke="var(--color-ink)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* A region of the picture. Dims when a different region is the active one, and
   never traps the pointer — the hotspot above it is what listens. */
function Region({ active, part, className = '', children }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block transition-opacity duration-[160ms] ease-m42 motion-reduce:transition-none ${className}`}
      style={{ opacity: active && active !== part ? DIM : 1 }}
    >
      {children}
    </span>
  )
}

/* One hotspot per region, absolutely placed over it. A button rather than a
   hover target so the picture is reachable by keyboard: focus does what the
   pointer does, and the panel it drives is named by `aria-controls`.
 *
 * Declared here rather than inside `LibrarianDiagram`. A component built during
 * render is a new type on every render, so React unmounts and remounts the
 * whole button on each state change — which threw focus away the moment a
 * keyboard user arrived, and dropped the pointer's own leave event. */
function Hotspot({ part, box, pressed, onEnter, onLeave, onPick }) {
  return (
    <button
      type="button"
      aria-label={byKey[part].label}
      aria-pressed={pressed}
      aria-controls={PANE_ID}
      onMouseEnter={() => onEnter(part)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(part)}
      onBlur={onLeave}
      onClick={() => onPick(part)}
      className={`absolute z-10 cursor-pointer rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${box}`}
    />
  )
}

export default function LibrarianDiagram({ className = '' }) {
  /* `lock` is a click that pins a part so it survives the pointer leaving, for
     a reader who wants to keep one panel up while they look at the picture.
     `active` is what the panel is actually showing. */
  const [active, setActive] = useState(null)
  const [lock, setLock] = useState(null)

  const shown = byKey[active] ?? IDLE
  const enter = (key) => { if (!lock) setActive(key) }
  const leave = () => { if (!lock) setActive(null) }
  const pick = (key) => {
    const next = lock === key ? null : key
    setLock(next)
    setActive(next ?? key)
  }

  const spot = (part, box) => (
    <Hotspot
      part={part}
      box={box}
      pressed={lock === part}
      onEnter={enter}
      onLeave={leave}
      onPick={pick}
    />
  )

  return (
    <div className={className}>
      {/* xl and up, matching `CatalogDrawer`: the 1080 grid is what the geometry
          was derived against, and below it the curves have nowhere to go.

          The tinted frame belongs to the picture, so it is on this half rather
          than around both. Wrapping the stacked list in it too painted a 3500px
          block of colour down a phone. */}
      <div className="hidden rounded-card border border-ink bg-[color-mix(in_srgb,var(--color-accent)_9%,white)] px-10 py-8 xl:block">
        <div className="relative mx-auto w-[1080px]">
          <div className="grid grid-cols-[1fr_190px_320px_190px_1fr] items-center">
            <div className={COLUMN}>
              <Region active={active} part="sources">
                <Eyebrow as="span" tone="ink" className="absolute left-0 top-[44px] whitespace-nowrap">
                  Your systems of record
                </Eyebrow>
                <Rows items={SOURCES} className="absolute inset-x-0 top-[121px]" />
              </Region>
              {spot('sources', 'inset-x-0 top-[36px] h-[280px]')}
            </div>

            <div className={COLUMN}>
              <Region active={active} part="publish">
                <PublishCurves />
                <Pill className={PILL_ON_LINE}>Curated publish</Pill>
              </Region>
              <Region active={active} part="outbound">
                <OutboundArrow />
                <Pill className="absolute left-1/2 top-[305px] -translate-x-1/2 -translate-y-1/2">
                  Outbound
                </Pill>
              </Region>
              {spot('publish', 'inset-x-0 top-[160px] h-[96px]')}
              {spot('outbound', 'inset-x-0 top-[280px] h-[52px]')}
            </div>

            <div className={DRAWER_BOX}>
              <Region active={active} part="catalog">
                <CatalogStack />
              </Region>
              <Region active={active} part="dewey">
                <DrawerFace />
              </Region>
              {spot('catalog', 'inset-x-0 top-0 h-[72px]')}
              {spot('dewey', 'inset-x-0 bottom-0 top-[74px]')}
            </div>

            <div className={COLUMN}>
              <Region active={active} part="answers">
                <AnswerCurves />
                <Pill className={PILL_ON_LINE}>Scoped answers</Pill>
              </Region>
              {spot('answers', 'inset-x-0 top-[160px] h-[96px]')}
            </div>

            <div className={COLUMN}>
              <Region active={active} part="agents">
                <Eyebrow as="span" tone="ink" className="absolute left-0 top-[44px] whitespace-nowrap">
                  Your agents
                </Eyebrow>
                <Rows items={AGENTS} className="absolute inset-x-0 top-[142.5px]" />
              </Region>
              {spot('agents', 'inset-x-0 top-[36px] h-[280px]')}
            </div>
          </div>

          {/* The standing caption steps aside once a part is speaking for
              itself, which is what the handoff does. */}
          <p
            aria-hidden="true"
            className="mt-2 text-center transition-opacity duration-[160ms] ease-m42 motion-reduce:transition-none"
            style={{ opacity: active ? 0 : 1 }}
          >
            <Eyebrow as="span" tone="ink">Agents never reach the sources</Eyebrow>
          </p>

          {/* Floored at the tallest part, so moving between them does not shove
              the rest of the page up and down. Measured across all eight
              states at the panel's own fixed 1080: they run 278 to 332, and the
              extra few pixels are headroom for a webfont that has not landed
              yet. The panel is only ever drawn at that one width, so this does
              not change with the viewport. */}
          <div
            id={PANE_ID}
            className="mt-6 grid min-h-[340px] grid-cols-[380px_1fr] gap-10 rounded-card border border-ink bg-page p-7 shadow-hard"
          >
            <div>
              <Eyebrow className="mb-2">{shown.eyebrow}</Eyebrow>
              <p className="font-heading text-balance text-heading-3 text-ink">{shown.title}</p>
            </div>
            <div>
              <p className="text-body-lg text-pretty text-ink">{shown.body}</p>
              <div className="mt-5 flex items-start gap-7">
                {shown.proof.map(([term, text]) => (
                  <div key={term} className="flex-1 border-t-2 border-ink pt-[10px]">
                    <p className="font-heading text-[17px] font-bold leading-6 text-ink">{term}</p>
                    <p className="mt-[3px] text-[15px] leading-[23px] text-ink">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below xl the picture goes and the seven parts become what they are: a
          list. The handoff's own fallback, and `CatalogDrawer`'s. Nothing here
          hides behind a pointer. */}
      <ul className="flex flex-col xl:hidden">
        {PARTS.map((part) => (
          <li key={part.key} className="border-t-2 border-ink py-[18px] first:border-t-0 first:pt-0">
            <Eyebrow className="mb-1.5">{part.eyebrow}</Eyebrow>
            <h3 className="mb-2 font-heading text-balance text-[22px] font-bold leading-[30px] text-ink">
              {part.title}
            </h3>
            <p className="mb-3 text-body text-pretty text-ink">{part.body}</p>
            <div className="flex flex-col gap-[10px]">
              {part.proof.map(([term, text]) => (
                <div key={term} className="border-t border-ink/20 pt-2">
                  <p className="font-heading text-[16px] font-bold leading-[22px] text-ink">{term}</p>
                  <p className="mt-0.5 text-[15px] leading-[23px] text-ink">{text}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
