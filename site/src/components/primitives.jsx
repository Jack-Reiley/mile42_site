import { Link } from 'react-router'
import { illustrations } from '../assets/illustrations/manifest.js'

/**
 * The mapping from the copy prototype's ~15 recurring patterns onto the design
 * tokens. Pages compose these rather than writing utility strings, so a change
 * to the visual language happens here once.
 *
 * Responsive type steps DOWN the existing scale rather than introducing mobile
 * tokens — the comp is desktop-only at 1440px, so every breakpoint choice is
 * EXTRAPOLATED. See EXTRAPOLATIONS.md.
 */

const BAND = {
  page: 'bg-page',
  surface: 'bg-surface',
  brand: 'bg-brand',
}

export function Section({ band = 'page', className = '', children, ...rest }) {
  return (
    <section className={`${BAND[band]} px-6 py-16 md:px-12 lg:py-24 ${className}`} {...rest}>
      {children}
    </section>
  )
}

export function Wrap({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-site ${className}`}>{children}</div>
}

export function Eyebrow({ tone = 'accent', className = '', children }) {
  const color = tone === 'ink' ? 'text-ink' : 'text-accent'
  return (
    <p className={`text-eyebrow font-eyebrow uppercase ${color} ${className}`}>{children}</p>
  )
}

export function H1({ tone = 'ink', className = '', children }) {
  const color = tone === 'hero' ? 'text-hero-heading' : 'text-ink'
  return (
    <h1 className={`font-heading text-heading-2 lg:text-heading-1 ${color} ${className}`}>
      {children}
    </h1>
  )
}

export function H2({ className = '', children }) {
  return (
    <h2 className={`font-heading text-heading-3 lg:text-heading-2 text-ink ${className}`}>
      {children}
    </h2>
  )
}

export function H3({ as: Tag = 'h3', className = '', children }) {
  return <Tag className={`font-heading text-heading-3 text-ink ${className}`}>{children}</Tag>
}

export function Lead({ className = '', children }) {
  return <p className={`text-body-lg text-ink max-w-[46rem] ${className}`}>{children}</p>
}

export function Body({ as: Tag = 'p', className = '', children }) {
  return <Tag className={`text-body text-ink max-w-[46rem] ${className}`}>{children}</Tag>
}

export function Quote({ className = '', children }) {
  return (
    <p className={`font-heading text-heading-3 text-ink max-w-[46rem] ${className}`}>{children}</p>
  )
}

/** The design has no muted text colour. EXTRAPOLATED: ink at reduced opacity. */
export function Note({ className = '', children }) {
  return <p className={`text-body text-ink/70 ${className}`}>{children}</p>
}

const BTN_BASE =
  'inline-flex items-center justify-center rounded-pill border border-ink shadow-hard ' +
  'px-btn-x py-3 font-body font-semibold text-body no-underline transition-transform ' +
  // EXTRAPOLATED: no interaction states are specified. The 4px hard shadow
  // implies a press-down, so active translates into the shadow and drops it.
  'active:translate-y-1 active:shadow-none motion-reduce:transition-none'

const BTN_TONE = {
  primary: 'bg-cta text-on-cta',
  secondary: 'bg-surface text-on-cta',
}

export function Button({ to, href, variant = 'primary', className = '', children }) {
  const cls = `${BTN_BASE} ${BTN_TONE[variant]} ${className}`
  if (href) return <a className={cls} href={href}>{children}</a>
  return <Link className={cls} to={to}>{children}</Link>
}

export function ButtonRow({ className = '', children }) {
  return <div className={`flex flex-wrap gap-btn-gap ${className}`}>{children}</div>
}

/** The style guide's "Tertiary Link": label plus a trailing arrow, no underline. */
export function TextLink({ to, className = '', children }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-body font-semibold text-ink no-underline ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        &#8250;
      </span>
    </Link>
  )
}

export function Card({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag
      className={`flex flex-col gap-3 rounded-card border border-ink bg-page shadow-hard p-8 ${className}`}
    >
      {children}
    </Tag>
  )
}

/** Prototype scaffolding, not design. Kept visibly provisional. */
export function Placeholder({ tag, className = '', children }) {
  return (
    <div className={`rounded-card border border-dashed border-ink/40 bg-surface p-6 ${className}`}>
      <span className="text-eyebrow font-eyebrow uppercase text-ink/60 block mb-2">{tag}</span>
      <p className="text-body text-ink/70">{children}</p>
    </div>
  )
}

/**
 * A spot illustration that deliberately overlaps its container's edge. That
 * break-out is the design's signature move, so containers must not clip it.
 */
export function Spot({ name, className = '', width }) {
  const art = illustrations[name]
  if (!art) return null
  return (
    <img
      src={art.src}
      alt={art.alt}
      width={width}
      loading="lazy"
      className={`pointer-events-none select-none ${className}`}
    />
  )
}
