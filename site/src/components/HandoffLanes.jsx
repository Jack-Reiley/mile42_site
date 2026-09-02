import { Eyebrow } from './primitives.jsx'
import { CheckBadge } from './Lists.jsx'
import { REVEAL, REVEAL_GROUP, REVEAL_ROW } from './reveal.js'

/**
 * The Phase Zero build, drawn as two lanes: what a person does along the top,
 * what an agent does along the bottom, and the direction of the handoff between
 * them. From design/design_handoff_phase_zero, option 2A band 5.
 *
 * It replaces two separate lists, People then Agents, which stated the pairing
 * in their ordering and nowhere else. A reader had to hold four items in mind to
 * see that "Review the work" is the answer to "Validate". Drawn as columns, the
 * pairing is the picture.
 *
 * Nothing here is interactive, so it is markup and tokens only: no state, no
 * measurement, the same way `LibrarianFlow` and `ExecutionContrast` are built.
 */

/**
 * Which way each column hands off. Three columns take their input from the
 * person above them; Validate is the exception, handing its output back UP to
 * the reviewer, which is the whole claim of the band's heading.
 *
 * It lives here rather than on the page because it is a fact about the drawing,
 * not about the copy, the same reason `LibrarianDiagram` owns its own keying.
 * Indexed against the agent list the page passes in.
 */
const UP_AT = 2

/* 96px gutter for the lane names, then the four columns. The two lane lists and
   the arrow row are separate grids sharing the same track definition, rather
   than one grid with `display: contents` on the lists: a `dl` may only contain
   `dt`, `dd` and their `div` wrappers, so the lane name cannot be a cell of it. */
const LANES = 'grid grid-cols-4 gap-x-5'

const PEOPLE_ID = 'handoff-lanes-people'
const AGENTS_ID = 'handoff-lanes-agents'

/* A CSS-drawn arrow rather than the ▼ / ▲ glyphs the prototype uses, so it does
   not depend on a font covering the geometric shapes block. */
function Arrow({ up = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 9 32"
      width="9"
      height="32"
      fill="none"
      aria-hidden="true"
      className={`text-ink ${up ? 'rotate-180' : ''} ${className}`}
    >
      <path d="M4.5 0V25" stroke="currentColor" strokeWidth="1" />
      <path d="M0 24.5h9L4.5 32Z" fill="currentColor" />
    </svg>
  )
}

/* The white cell carrying one person's step. Written out rather than composed
   from `Card`, which sets its own padding: two padding utilities on one element
   resolve by stylesheet order, not by the order they are written. */
const PERSON_CELL = 'rounded-card border border-ink bg-page p-5 shadow-hard'
const PERSON_LABEL = 'font-heading text-[16px] font-bold leading-[22px] text-ink'
const PERSON_BODY = 'text-[14px] leading-[21px] text-ink/72'
const AGENT_LABEL = 'font-heading text-[20px] font-bold leading-[26px] text-ink'

export default function HandoffLanes({ people, agents, className = '' }) {
  return (
    /* Still, so the panel does not arrive as one slab. The motion is on the two
       lane rows, which relay across their four columns. */
    <div className={`${REVEAL.still} ${className}`}>
      {/* The tint the detail comps draw, `--color-accent` at 10% over white.
          Written out rather than shared with `BAND.tint`, for the reason
          `CARD_FILL` writes it out too: one is a band and one is a panel, and a
          change made for one should not silently move the other. */}
      <div className="hidden rounded-card border border-ink bg-[color-mix(in_srgb,var(--color-accent)_10%,white)] px-10 py-9 shadow-hard min-[900px]:block">
        <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-5">
          <Eyebrow id={PEOPLE_ID} tone="ink" className="flex items-center">People</Eyebrow>
          <dl
            aria-labelledby={PEOPLE_ID}
            className={`${REVEAL_GROUP.up} ${REVEAL_ROW} ${LANES}`}
          >
            {people.map(({ title, body }) => (
              <div key={title} className={PERSON_CELL}>
                <CheckBadge className="mb-3" />
                <dt className={PERSON_LABEL}>{title}</dt>
                <dd className={`mt-1.5 ${PERSON_BODY}`}>{body}</dd>
              </div>
            ))}
          </dl>

          {/* Decoration. The argument is carried by the labels either side. */}
          <div />
          <div aria-hidden="true" className={LANES}>
            {agents.map((agent, i) => (
              <span key={agent} className="flex justify-center py-3">
                <Arrow up={i === UP_AT} />
              </span>
            ))}
          </div>

          <Eyebrow id={AGENTS_ID} tone="ink" className="flex items-start pt-[18px]">Agents</Eyebrow>
          {/* The rule is on the list rather than on each cell so it runs
              unbroken across the column gaps. */}
          <ol
            aria-labelledby={AGENTS_ID}
            className={`${REVEAL_GROUP.up} ${REVEAL_ROW} ${LANES} border-t border-ink pt-[18px]`}
          >
            {agents.map((agent) => (
              <li key={agent} className={`text-center ${AGENT_LABEL}`}>{agent}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Below 900px four columns cannot be read side by side, so the lanes
          become four handoffs stacked one per row, each keeping its arrow. The
          gutter names go with the columns they labelled; what distinguishes the
          two halves here is the drawing itself, a bordered cell with a ticked
          badge above and bare heading type below, so the list is named instead.

          Two forms rather than one reordered grid, following `LibrarianDiagram`:
          the person and the agent belong to different lists at full width and to
          the same group when stacked, and no single DOM order is both. */}
      <ol
        aria-label="Handoffs from people to agents"
        className={`${REVEAL_GROUP.relay} flex flex-col gap-5 min-[900px]:hidden`}
      >
        {agents.map((agent, i) => (
          <li key={agent}>
            <div className={PERSON_CELL}>
              <CheckBadge className="mb-3" />
              <p className={PERSON_LABEL}>{people[i].title}</p>
              <p className={`mt-1.5 ${PERSON_BODY}`}>{people[i].body}</p>
            </div>
            <Arrow up={i === UP_AT} className="mx-auto my-3" />
            <p className={`text-center ${AGENT_LABEL}`}>{agent}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
