import { Body, H3 } from './primitives.jsx'
import { REVEAL_GROUP, REVEAL_ROW } from './reveal.js'

/** The prototype's recurring list shapes, restyled onto the theme.
 *
 * Every shape here is a relay: the container holds still and its items arrive
 * one at a time. A list is not one thing entering, it is several, and treating
 * it as one is what made an earlier pass read as blocks sliding around. Doing
 * it here rather than at each call site means all sixteen routes get it, and a
 * new page cannot forget. */

/** Numbered list: 01 / 02 / 03 in the gutter, statement alongside. */
export function NumList({ items, as: Tag = 'ul', className = '' }) {
  return (
    <Tag className={`${REVEAL_GROUP.relay} flex flex-col gap-4 ${className}`}>
      {items.map((text, i) => (
        <li key={typeof text === 'string' ? text : i} className="grid grid-cols-[2.5rem_1fr] gap-3">
          <span className="text-eyebrow font-eyebrow text-accent-deep pt-1">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-body text-ink">{text}</span>
        </li>
      ))}
    </Tag>
  )
}

/** Column counts for the ruled variant, which steps 3 -> 2 -> 1. */
const RULED_COLUMNS = {
  1: '',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
}

/**
 * Two-column term/definition list. `items` are [term, definition] pairs.
 *
 * `ruled` is the detail comps' treatment: the same terms laid out in columns,
 * each row divided from the one above by a hairline, with a smaller muted
 * definition. It is a variant rather than a second component because the
 * semantics are identical; six pages render the default and none of them change.
 *
 * `wide` is the same hairline division run full width instead of in columns: one
 * row per term, a fixed term column, and a definition at full ink rather than
 * muted. It exists for a term list inside a panel that is already inset, where
 * two-up columns would break the definitions into three and four words a line.
 */
export function TermList({ items, variant = 'stacked', columns = 1, className = '' }) {
  if (variant === 'wide') {
    return (
      <dl className={`${REVEAL_GROUP.relay} ${className}`}>
        {items.map(([term, definition]) => (
          <div
            key={term}
            className="grid gap-2 border-t border-ink/16 py-[14px] md:grid-cols-[230px_1fr] md:gap-6"
          >
            <dt className="font-heading text-body font-bold leading-6 text-ink">{term}</dt>
            <dd className="text-[15px] leading-6 text-ink text-pretty">{definition}</dd>
          </div>
        ))}
      </dl>
    )
  }

  if (variant === 'ruled') {
    return (
      <dl
        className={`${REVEAL_GROUP.relay} ${columns > 1 ? `${REVEAL_ROW} ` : ''}grid gap-x-10 ${RULED_COLUMNS[columns]} ${className}`}
      >
        {items.map(([term, definition]) => (
          <div key={term} className="border-t border-ink/14 py-4">
            <dt className="text-body font-semibold text-ink">{term}</dt>
            <dd className="mt-1 text-[14px] leading-[1.5] text-ink/72">{definition}</dd>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <dl className={`${REVEAL_GROUP.relay} flex flex-col gap-5 ${className}`}>
      {items.map(([term, definition]) => (
        <div key={term} className="grid gap-1 md:grid-cols-[16rem_1fr] md:gap-6">
          <dt className="font-heading text-body font-bold text-ink">{term}</dt>
          <dd className="text-body text-ink">{definition}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * Single-column list of short statements.
 *
 * `ruled` divides the items with hairlines instead of spacing them, for a list
 * sitting inside a card where the gap alone does not read as separation. It is
 * the treatment the Dewey comp uses in both its connector cards and its
 * librarian diagram, which is why it is a variant here rather than markup
 * written twice.
 */
export function PlainList({ items, variant = 'body', tone = 'ink', className = '' }) {
  /* `hero` is for a list drawn on a dark fill. The rule between items takes the
     same tone as the text, so it does not stay ink on a band the type has left. */
  const onDark = tone === 'hero'

  if (variant === 'ruled') {
    return (
      <ul
        className={`${REVEAL_GROUP.relay} text-[15px] leading-6 ${
          onDark ? 'text-hero-heading' : 'text-ink'
        } ${className}`}
      >
        {items.map((text) => (
          <li
            key={text}
            className={`border-t py-1.5 first:border-t-0 first:pt-0 ${
              onDark ? 'border-hero-heading/25' : 'border-ink/25'
            }`}
          >
            {text}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={`${REVEAL_GROUP.relay} flex flex-col gap-2 ${className}`}>
      {items.map((text) => (
        <li
          key={text}
          className={
            variant === 'title'
              ? 'font-heading text-body font-bold text-ink'
              : 'text-body text-ink'
          }
        >
          {text}
        </li>
      ))}
    </ul>
  )
}

/**
 * Numbered process steps: a large accent numeral beside a heading and body.
 *
 * An `ol` rather than styled divs, because the numerals carry sequence. The
 * accent is darkened 6% to clear 3:1 as large text against the tint band; at
 * full strength `--color-orange` measures 2.68.
 */
export function NumberedSteps({ items, className = '' }) {
  return (
    <ol className={`${REVEAL_GROUP.relay} flex flex-col gap-5 ${className}`}>
      {items.map(({ title, body }, i) => (
        <li key={title} className="grid grid-cols-[50px_1fr] items-start gap-4">
          {/* Announced, not hidden. The numeral carries sequence, and an `ol`
              alone does not survive `list-style: none` in every screen reader. */}
          <span className="font-heading text-[27px] leading-none text-[color-mix(in_srgb,var(--color-orange)_94%,black)]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <H3 className="mb-[5px]">{title}</H3>
            <Body className="max-w-none">{body}</Body>
          </div>
        </li>
      ))}
    </ol>
  )
}

/**
 * Outcomes with a ticked badge. The badge is decorative: it repeats nothing the
 * text does not already say, and its ink border carries the 3:1 the accent fill
 * on its own would not.
 *
 * Items carrying a `title` render as a description list, which is what they are
 * — a label and its explanation. Items that are a bare statement render as a
 * plain list instead, because wrapping a sentence in a `dt` with no `dd` would
 * be a description list that describes nothing.
 */
export function CheckList({ items, columns = 1, badgeClass = 'bg-orange', className = '' }) {
  const titled = items.some((i) => i.title)
  const grid = `${REVEAL_GROUP.relay} grid gap-4 ${
    columns === 2 ? `${REVEAL_ROW} md:grid-cols-2 md:gap-x-9` : ''
  } ${className}`
  // The tick is drawn as generated content rather than as a text node: it is a
  // glyph, not copy, and copy parity compares the two projects' text.
  const Badge = () => (
    <span
      aria-hidden="true"
      className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-pill border border-ink text-[12px] font-bold text-white shadow-hard before:content-['✓'] ${badgeClass}`}
    />
  )

  if (titled) {
    return (
      <dl className={grid}>
        {items.map(({ title, body }) => (
          <div key={title} className="grid grid-cols-[auto_1fr] items-start gap-3">
            <Badge />
            <div>
              <dt className="font-heading text-body font-bold text-ink">{title}</dt>
              <dd className="mt-0.5 text-[14px] leading-[1.5] text-ink/72">{body}</dd>
            </div>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <ul className={grid}>
      {items.map(({ body }) => (
        <li key={body} className="grid grid-cols-[auto_1fr] items-start gap-3">
          <Badge />
          <p className="text-[14px] leading-[1.5] text-ink">{body}</p>
        </li>
      ))}
    </ul>
  )
}

/**
 * The detail comps' ruled group columns: three across, then two, then one.
 *
 * Separate from `TermList` rather than another variant of it, because the two
 * are structurally different. A term list is sibling rows divided by hairlines;
 * a group is one column with an accent rule on top and arbitrary content
 * beneath. `RuledGroup` takes children for exactly that reason — the AI-driven
 * Products page passes a paragraph and the Engineering page passes term rows,
 * and neither has to fork the other's shape.
 */
export function GroupColumns({ className = '', children }) {
  return (
    <div
      className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-[34px] md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  )
}

export function RuledGroup({ title, ruleClass, as = 'h4', className = '', children }) {
  return (
    <div className={`border-t-[3px] pt-4 ${ruleClass} ${className}`}>
      {/* Balanced because these titles are short sentences in a narrow column.
          Left to the default, "Context is not lost." breaks after the negation
          and strands one word on the second line at the delivery model's 202px
          columns. Balancing evens the two lines and is a no-op for a title that
          already fits on one. */}
      <H3 as={as} className="mb-[10px] text-balance">{title}</H3>
      {children}
    </div>
  )
}

/** Card holding a single body paragraph, used in grid blocks. */
export function StatementCards({ items }) {
  return items.map((text) => (
    <div key={text} className="rounded-card border border-ink bg-page shadow-hard p-6">
      <Body className="max-w-none">{text}</Body>
    </div>
  ))
}

/** The delivery-model spine. EXTRAPOLATED — no comp. */
export function Spine({ items }) {
  return (
    <ol className={`${REVEAL_GROUP.relay} grid gap-3 sm:grid-cols-2 lg:grid-cols-5`}>
      {items.map((node) => (
        <li
          key={node}
          className="rounded-card border border-ink bg-page shadow-hard px-4 py-5 text-center text-body text-ink"
        >
          {node}
        </li>
      ))}
    </ol>
  )
}

/**
 * A row of numbered steps sharing one bordered card, divided rather than boxed.
 * Stacks below 900px, where five columns would each be too narrow to read.
 *
 * The same divider system the home page's offerings band uses: one container
 * with a border, and rules between the cells. Separate cards would read as five
 * things rather than one sequence.
 */
export function StepStrip({ items, className = '' }) {
  return (
    <ol
      className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} flex flex-wrap overflow-hidden rounded-card border border-ink bg-page ${className}`}
    >
      {items.map(({ label, line }, i) => (
        <li
          key={label}
          className="shrink grow basis-[150px] border-t border-ink px-5 py-[18px] first:border-t-0 min-[900px]:border-t-0 min-[900px]:border-l min-[900px]:first:border-l-0"
        >
          {/* Announced, not hidden. The numeral carries sequence, and an `ol`
              alone does not survive `list-style: none` in every screen reader. */}
          <span className="mb-1.5 block text-eyebrow font-eyebrow uppercase text-accent-deep">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="mb-1 block font-heading text-[16px] font-bold leading-[22px] text-ink">
            {label}
          </span>
          <span className="block text-[14px] leading-[22px] text-ink">{line}</span>
        </li>
      ))}
    </ol>
  )
}

/**
 * A real `table`, because this is tabular data: every row compares the same
 * three things. `columns` are the headers and `rows` are arrays in that order.
 *
 * The first cell of each row is a `th` with `scope="row"` — the row is *about*
 * that alternative, and a screen reader reading a cell out of context needs to
 * know which one. It does not wrap, because an alternative's name breaking
 * across lines is what makes a comparison hard to scan.
 *
 * Scrolls inside its own container below the point where three columns fit.
 * Shrinking the type instead would make the longest cell unreadable on a phone,
 * and a page that scrolls sideways is worse than a table that does.
 */
export function CompareTable({ columns, rows, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden rounded-card border border-ink bg-page">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="border-ink bg-navy px-[18px] py-[14px] text-left align-top text-eyebrow font-eyebrow uppercase text-hero-heading"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([term, ...cells]) => (
            <tr key={term}>
              <th
                scope="row"
                className="border-t border-ink px-[18px] py-[14px] text-left align-top font-heading text-[15px] font-bold leading-6 whitespace-nowrap text-ink"
              >
                {term}
              </th>
              {cells.map((cell, i) => (
                <td
                  key={cell}
                  className={`border-t border-l border-t-ink border-l-ink/25 px-[18px] py-[14px] align-top text-[15px] leading-6 text-ink ${
                    i === cells.length - 1
                      ? 'bg-[color-mix(in_srgb,var(--color-mint)_45%,var(--color-page))]'
                      : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
