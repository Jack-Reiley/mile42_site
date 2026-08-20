import { Eyebrow } from './primitives.jsx'
import { PlainList } from './Lists.jsx'
import { REVEAL_GROUP } from './reveal.js'

/**
 * The buffer, drawn: systems of record on the left, Dewey in the middle, agents
 * on the right, with the direction of travel marked between them. It states the
 * section's claim — data flows in on a schedule, answers flow out, and agents
 * never reach past the middle column.
 *
 * Dewey's column is the only one on a fill with a shadow, because the whole
 * point is that it is a thing standing between the other two rather than a
 * third peer.
 *
 * Nothing here is interactive, so it is markup and tokens only: no state, no
 * SVG, no measurement — the same way `ExecutionContrast` is built.
 *
 * Below 900px the row becomes a stack and the arrows rotate to point down. Three
 * columns of list items cannot be read side by side on a phone, and the flow
 * still reads in order once it is vertical.
 *
 * The whole diagram is one `img` role with a written-out label, because the
 * meaning is in the arrangement rather than in any one cell. Read as twelve
 * separate list items it says nothing.
 */

const LABEL =
  'Diagram: inbound connectors carry data from systems of record into Dewey on a ' +
  'schedule, and agents retrieve scoped answers from Dewey. Agents never touch ' +
  'the systems of record.'

const COLUMN = 'rounded-card border border-ink px-[22px] py-5'

function Column({ eyebrow, items, className }) {
  return (
    <div className={`${COLUMN} ${className}`}>
      <Eyebrow tone="ink" className="mb-2 block">{eyebrow}</Eyebrow>
      <PlainList items={items} variant="ruled" />
    </div>
  )
}

/* The arrow turns to point down once the columns stack, so the direction of
   travel still matches the reading order. */
function Link({ label }) {
  return (
    <div className="flex items-center justify-center px-[14px] py-1.5">
      <span className="text-center text-eyebrow font-eyebrow uppercase text-ink">
        <span
          aria-hidden="true"
          className="mb-0.5 block rotate-90 font-heading text-[24px] font-bold leading-none min-[900px]:rotate-0"
        >
          &#8594;
        </span>
        {label}
      </span>
    </div>
  )
}

export default function LibrarianFlow({ sources, dewey, agents }) {
  return (
    <div
      role="img"
      aria-label={LABEL}
      /* A relay, so the diagram assembles in the direction the data travels
         rather than appearing all at once. Its parts are already hidden from
         assistive tech behind the `img` role, so this is purely visual. */
      className={`${REVEAL_GROUP.relay} grid items-stretch gap-3 min-[900px]:grid-cols-[1fr_auto_1.1fr_auto_1fr] min-[900px]:gap-0`}
    >
      <Column eyebrow="Systems of record" items={sources} className="bg-surface" />
      <Link label="Inbound connectors" />
      {/* Ink on the green rather than the off-white hero tone, the same rule the
          rest of the site follows on `brand`: cream-50 measures 2.51:1 here. */}
      <Column eyebrow="Dewey · The librarian" items={dewey} className="bg-brand shadow-hard" />
      <Link label="Scoped retrieval" />
      <Column eyebrow="Agents" items={agents} className="bg-ice" />
    </div>
  )
}
