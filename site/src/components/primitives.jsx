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

/**
 * `blue` is the accent darkened 8%. No palette colour reaches AA on
 * `--color-accent` — white peaks at 4.41 — so the band, not the text, is what
 * moves. At 92% the ice eyebrow reaches 4.55 and the on-dark body 4.92. It is
 * derived from the token rather than added as a hex; if a second page needs it,
 * promote it to a token then.
 */
const BAND = {
  page: 'bg-page',
  surface: 'bg-surface',
  brand: 'bg-brand',
  navy: 'bg-navy',
  blue: 'bg-[color-mix(in_srgb,var(--color-accent)_92%,black)]',
}

/**
 * `tight` is the comp's shorter band rhythm, drawn only on the blue core
 * practice band. It is a prop rather than an override class because two padding
 * utilities on one element resolve by stylesheet order, not by the order they
 * are written in.
 */
const SECTION_PAD = {
  default: 'py-16 lg:py-24',
  tight: 'py-10 lg:py-15',
}

export function Section({ band = 'page', pad = 'default', className = '', children, ...rest }) {
  return (
    <section
      className={`${BAND[band]} px-6 ${SECTION_PAD[pad]} md:px-12 ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}

export function Wrap({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-site ${className}`}>{children}</div>
}

/** `sky` and `ice` are the on-dark tones: sky on navy, ice on the blue band. */
const EYEBROW_TONE = {
  accent: 'text-accent',
  ink: 'text-ink',
  sky: 'text-sky',
  ice: 'text-ice',
}

export function Eyebrow({ as: Tag = 'p', tone = 'accent', className = '', children }) {
  return (
    <Tag className={`text-eyebrow font-eyebrow uppercase ${EYEBROW_TONE[tone]} ${className}`}>
      {children}
    </Tag>
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

export function H2({ as: Tag = 'h2', tone = 'ink', className = '', children }) {
  const color = tone === 'hero' ? 'text-hero-heading' : 'text-ink'
  return (
    <Tag className={`font-heading text-heading-3 lg:text-heading-2 ${color} ${className}`}>
      {children}
    </Tag>
  )
}

export function H3({ as: Tag = 'h3', tone = 'ink', className = '', children }) {
  const color = tone === 'hero' ? 'text-hero-heading' : 'text-ink'
  return <Tag className={`font-heading text-heading-3 ${color} ${className}`}>{children}</Tag>
}

export function Lead({ tone = 'ink', className = '', children }) {
  const color = tone === 'hero' ? 'text-hero-heading' : 'text-ink'
  return <p className={`text-body-lg ${color} max-w-[46rem] ${className}`}>{children}</p>
}

export function Body({ as: Tag = 'p', tone = 'ink', className = '', children }) {
  const color = tone === 'hero' ? 'text-hero-heading' : 'text-ink'
  return <Tag className={`text-body ${color} max-w-[46rem] ${className}`}>{children}</Tag>
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
export function TextLink({ to, tone = 'ink', className = '', children }) {
  const color = tone === 'on-dark' ? 'text-hero-heading' : 'text-ink'
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-body font-semibold ${color} no-underline ${className}`}
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

/**
 * A whole-card link on a dark band: icon, eyebrow, heading, one line of body,
 * and a trailing chevron.
 *
 * Deliberately not `Card`. It has no ink border and no hard shadow, because it
 * reads as a target rather than as a raised object, so its fill is transparent
 * and its edge is a white hairline that brightens on hover.
 *
 * `heading` is the element to render the title as. It has to sit one level
 * below whatever heading the band already carries, and the band decides that,
 * not the card.
 */
export function PathCard({ to, spot, eyebrow, title, heading = 'h2', className = '', children }) {
  return (
    <Link
      to={to}
      className={`group grid grid-cols-[3rem_1fr_auto] items-center gap-[18px] rounded-card border border-white/15 px-[22px] py-[15px] no-underline transition-colors hover:border-white/30 hover:bg-white/5 motion-reduce:transition-none ${className}`}
    >
      <Spot name={spot} decorative priority sizes="48px" className="h-12 w-12 object-contain" />
      <span>
        <Eyebrow as="span" tone="sky" className="block">{eyebrow}</Eyebrow>
        <H3 as={heading} tone="hero" className="mt-1">{title}</H3>
        <span className="mt-1 block text-body text-hero-heading/72">{children}</span>
      </span>
      {/* A character, not an icon, so it has to be hidden or it lands in the
          link's accessible name. */}
      <span
        aria-hidden="true"
        className="text-[22px] leading-none text-hero-heading/75 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
      >
        &#8250;
      </span>
    </Link>
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
 *
 * `width`/`height` are the artwork's intrinsic pixels, not its rendered size.
 * The browser uses their ratio to reserve space before the image arrives, which
 * is what stops content shifting as illustrations load.
 *
 * `sizes` must describe the real rendered width or the browser cannot pick
 * sensibly from `srcSet`; it defaults to the spot layout and the hero overrides it.
 *
 * `priority` is opt-in and belongs only to an above-the-fold image. Everything
 * else stays lazy.
 *
 * `decorative` empties the alt so the artwork is skipped by assistive
 * technology. Use it when the image sits beside a full text label that already
 * says what it says — inside a link, an announced alt would otherwise be
 * concatenated into the link's accessible name.
 */
export function Spot({ name, className = '', sizes = '128px', priority = false, decorative = false }) {
  const art = illustrations[name]
  if (!art) return null
  return (
    <img
      src={art.src}
      srcSet={art.srcSet}
      sizes={sizes}
      alt={decorative ? '' : art.alt}
      width={art.width}
      height={art.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={`pointer-events-none select-none ${className}`}
    />
  )
}
