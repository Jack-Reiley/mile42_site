import { Body } from './primitives.jsx'

/** The prototype's recurring list shapes, restyled onto the theme. */

/** Numbered list: 01 / 02 / 03 in the gutter, statement alongside. */
export function NumList({ items, as: Tag = 'ul', className = '' }) {
  return (
    <Tag className={`flex flex-col gap-4 ${className}`}>
      {items.map((text, i) => (
        <li key={typeof text === 'string' ? text : i} className="grid grid-cols-[2.5rem_1fr] gap-3">
          <span className="text-eyebrow font-eyebrow text-accent pt-1">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-body text-ink">{text}</span>
        </li>
      ))}
    </Tag>
  )
}

/** Two-column term/definition list. `items` are [term, definition] pairs. */
export function TermList({ items, className = '' }) {
  return (
    <dl className={`flex flex-col gap-5 ${className}`}>
      {items.map(([term, definition]) => (
        <div key={term} className="grid gap-1 md:grid-cols-[16rem_1fr] md:gap-6">
          <dt className="font-heading text-body font-bold text-ink">{term}</dt>
          <dd className="text-body text-ink">{definition}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Single-column list of short statements. */
export function PlainList({ items, variant = 'body', className = '' }) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
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
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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

/** Logo placeholder slots. Prototype scaffolding. */
export function LogoSlots({ count = 6 }) {
  return (
    <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="grid min-h-14 place-items-center rounded-card border border-dashed border-ink/40 bg-surface text-eyebrow font-eyebrow uppercase text-ink/50"
        >
          LOGO {i + 1}
        </div>
      ))}
    </div>
  )
}
