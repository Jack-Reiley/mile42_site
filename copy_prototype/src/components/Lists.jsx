/** The prototype's three recurring `.nums` list shapes. */

/** Numbered list: 01 / 02 / 03 in the gutter, statement alongside. */
export function NumList({ items, as: Tag = 'ul', className = '' }) {
  return (
    <Tag className={`nums ${className}`.trim()}>
      {items.map((text, i) => (
        <li key={text}>
          <span className="nums__n">{String(i + 1).padStart(2, '0')}</span>
          <span className="nums__t">{text}</span>
        </li>
      ))}
    </Tag>
  )
}

/** Two-column term/definition list. `items` are [term, definition] pairs. */
export function TermList({ items, termWidth, maxWidth, className = '' }) {
  return (
    <ul className={`nums ${className}`.trim()} style={{ maxWidth }}>
      {items.map(([term, definition]) => (
        <li key={term} style={{ gridTemplateColumns: `${termWidth} 1fr` }}>
          <span className="card-title">{term}</span>
          <span className="body" style={{ margin: 0 }}>
            {definition}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Single-column list of short statements. */
export function PlainList({ items, className = '', style, variant = 'body' }) {
  return (
    <ul className={`nums ${className}`.trim()} style={style}>
      {items.map((text) => (
        <li key={text} style={{ gridTemplateColumns: '1fr' }}>
          {variant === 'body' ? (
            <span className="body" style={{ margin: 0 }}>
              {text}
            </span>
          ) : (
            <span className="card-title">{text}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

/** Card holding a single body paragraph, used in `.grid` blocks. */
export function StatementCards({ items }) {
  return items.map((text) => (
    <div className="card" key={text}>
      <p className="body" style={{ margin: 0 }}>
        {text}
      </p>
    </div>
  ))
}
