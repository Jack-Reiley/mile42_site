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
 * The How We Work topic panel fills: the topic's mark colour laid over the
 * surface band. Exported because a topic's own child page can carry its panel
 * fill as the page header, and the two blocks of colour have to be the same
 * one rather than two literals that drift apart.
 */
export const PANEL_FILL = {
  accent: 'bg-[color-mix(in_srgb,var(--color-accent)_16%,var(--color-surface))]',
  forest: 'bg-[color-mix(in_srgb,var(--color-forest)_18%,var(--color-surface))]',
  orange: 'bg-[color-mix(in_srgb,var(--color-orange)_16%,var(--color-surface))]',
}

/**
 * The same mix taken ten points deeper, for a panel that is itself a link. The
 * ink type still sits on a tint of the surface, so nothing about the contrast
 * changes; the panel just admits it is a target.
 */
export const PANEL_FILL_HOVER = {
  accent: 'hover:bg-[color-mix(in_srgb,var(--color-accent)_26%,var(--color-surface))]',
  forest: 'hover:bg-[color-mix(in_srgb,var(--color-forest)_28%,var(--color-surface))]',
  orange: 'hover:bg-[color-mix(in_srgb,var(--color-orange)_26%,var(--color-surface))]',
}

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
  // The detail comps' `#e6f1fe`, which is the accent at 10% over white.
  tint: 'bg-[color-mix(in_srgb,var(--color-accent)_10%,white)]',
  // A light band, unlike every other coloured band here. Nothing off-white
  // survives on it — the hero heading colour reaches 1.7:1 — so headings on a
  // `gold` band take the default ink tone, which reaches 8.9:1. The deeper gold
  // is used rather than `--color-cta` so the yellow CTA button still separates
  // from the band it sits on.
  gold: 'bg-gold',
  // The three How We Work topic panels, each carried onto that topic's own page
  // as its header so the child page reads as the same block of colour. Light,
  // like `gold`, so nothing on them takes the off-white hero tone.
  'panel-accent': PANEL_FILL.accent,
  'panel-forest': PANEL_FILL.forest,
  'panel-orange': PANEL_FILL.orange,
}

/**
 * `tight` is the comp's shorter band rhythm, drawn only on the blue core
 * practice band. It is a prop rather than an override class because two padding
 * utilities on one element resolve by stylesheet order, not by the order they
 * are written in.
 */
const SECTION_PAD = {
  default: 'py-16 lg:py-24',
  // For a band whose own panels carry the padding. Anything here would show as
  // a strip of the section's fill between it and the bands it sits against.
  none: '',
  tight: 'py-10 lg:py-15',
  // The detail comps run a shorter rhythm than the homepage language: a compact
  // navy page header, tighter bands, and a full-height CTA.
  header: 'py-[22px] lg:py-[30px]',
  band: 'py-[34px] lg:py-[54px]',
  cta: 'py-[52px] lg:py-23',
}

/**
 * `flush` drops the horizontal inset so a band can carry full-bleed panels that
 * run to the viewport edge. It is a prop for the same reason `pad` is: a padding
 * utility passed through `className` would resolve by stylesheet order rather
 * than by being written last.
 */
const SECTION_INSET = {
  default: 'px-6 md:px-12',
  flush: '',
}

export function Section({
  band = 'page',
  pad = 'default',
  inset = 'default',
  className = '',
  children,
  ...rest
}) {
  return (
    <section
      className={`${BAND[band]} ${SECTION_INSET[inset]} ${SECTION_PAD[pad]} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}

/**
 * `detail` is the narrower content column the three detail comps draw: 1120px
 * against the site's 1240px. Above 1336px the cap binds before the horizontal
 * padding does, so the measure — not the padding — is what sets the inset.
 */
const MEASURE = {
  site: 'max-w-site',
  detail: 'max-w-detail',
}

export function Wrap({ measure = 'site', className = '', children }) {
  return <div className={`mx-auto w-full ${MEASURE[measure]} ${className}`}>{children}</div>
}

/**
 * An even film of grain over a colour field.
 *
 * The tile is 256px per-pixel noise, so it repeats with no visible seam at any
 * band size. The design system's `grain-texture.jpg` is not a seamless tile and
 * shows patch seams when repeated; scaling one raster to `cover` instead pools
 * the texture in one area, which is what this replaces.
 *
 * The band must be `relative`. Content above it needs no z-index as long as it
 * follows this element in the markup, so the overlay is written first.
 */
export function Grain({ opacity = 0.5, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
      style={{
        background: "url('/grain-fine.png') repeat",
        backgroundSize: '256px 256px',
        opacity,
      }}
    />
  )
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

/** `as` carries the top of the type scale onto a lower heading level, for a
 *  statement that has to dominate a band it does not own the h1 of. */
export function H1({ as: Tag = 'h1', tone = 'ink', className = '', children }) {
  const color = tone === 'hero' ? 'text-hero-heading' : 'text-ink'
  return (
    <Tag className={`font-heading text-heading-2 lg:text-heading-1 ${color} ${className}`}>
      {children}
    </Tag>
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
const TEXT_LINK_TONE = {
  ink: 'text-ink',
  accent: 'text-accent',
  'on-dark': 'text-hero-heading',
}

export function TextLink({ to, tone = 'ink', className = '', children }) {
  const color = TEXT_LINK_TONE[tone]
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

/**
 * The detail pages' page header trail. The comp draws it as decoration with no
 * link markup; a breadcrumb has to be real navigation, so this is authored
 * rather than copied — a landmark, a link to the parent, and the current page
 * marked as current rather than linked.
 *
 * `markClass` carries the page accent, which differs per detail page.
 *
 * `tone` follows the band: sky on the navy header the comps draw, ink on a
 * light header, where sky reaches 1.4:1 against the fill.
 */
export function Breadcrumb({ to, parent, current, markClass, tone = 'sky' }) {
  const color = tone === 'ink' ? 'text-ink' : 'text-sky'
  return (
    <nav aria-label="Breadcrumb" className="mb-[10px] flex items-center gap-[10px]">
      <span aria-hidden="true" className={`h-[5px] w-6 rounded-[3px] ${markClass}`} />
      <ol className={`flex items-center gap-2 text-eyebrow font-eyebrow uppercase ${color}`}>
        <li>
          <Link to={to} className={`${color} no-underline hover:underline`}>{parent}</Link>
        </li>
        {/* Decoration. Hidden so it is not announced between the two levels. */}
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  )
}

/**
 * The detail comps' recurring two-column section: an eyebrow, heading, and
 * optional note on the left, the content on the right. Collapses to one column
 * below `lg`, label above body.
 */
export function LabelBody({ label, className = '', children }) {
  return (
    <div
      className={`grid items-start gap-[18px] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.6fr)] lg:gap-14 ${className}`}
    >
      <div>{label}</div>
      <div>{children}</div>
    </div>
  )
}

/**
 * A single bordered panel carrying one named offering: icon, eyebrow, heading,
 * and note on the left, body and link on the right.
 *
 * The eyebrow is ink rather than the page accent. Every detail page's accent
 * fails AA as 12px text on the surface fill, and darkening it far enough to
 * pass stops it reading as the accent at all. The icon beside it carries the
 * colour instead.
 */
export function FeaturePanel({ spot, eyebrow, title, note, className = '', children }) {
  return (
    <div
      className={`grid items-center gap-5 rounded-card border border-ink bg-surface p-7 shadow-hard lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.5fr)] lg:gap-12 lg:p-[46px] ${className}`}
    >
      <div>
        <Spot name={spot} decorative sizes="52px" className="mb-[14px] h-[52px] w-[52px] object-contain" />
        <Eyebrow as="span" tone="ink" className="mb-2 block">{eyebrow}</Eyebrow>
        <H2>{title}</H2>
        {note ? <Note className="mt-3 text-[15px]">{note}</Note> : null}
      </div>
      <div>{children}</div>
    </div>
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
