import { Eyebrow, Grain } from './primitives.jsx'

/**
 * Dewey's card catalog drawer, from the handoff in
 * design/illustrations/design_handoff_catalog_drawer (option `2a`).
 *
 * Source systems route into a drawer on the left, scoped answers fan out to
 * agents on the right, and nothing crosses. The drawer is drawn rather than
 * boxed, so the product's name is carried by the picture instead of asserted
 * beside it.
 *
 * One `role="img"` with a written-out label, following `LibrarianFlow`: the
 * parts are a single diagram, not eleven loose list items, and announcing them
 * individually would read as a scrambled list. That also means the two layouts
 * below cost nothing in the accessibility tree, since neither is exposed.
 *
 * Two layouts, because the handoff is fixed-width by construction — absolute
 * positioning over an SVG coordinate system — and says so. Its own advice is to
 * stack the groups and drop the curves rather than scale the diagram, which is
 * what the narrow form does.
 *
 *   xl and up  — the five-column grid, curves included.
 *   below xl   — the three groups stacked, connectors reduced to their labels.
 *
 * The switch is `xl` (1280px) rather than the handoff's 1160px because 1160 is
 * the *card* width, not the viewport's: at 1280 the band's padding and the
 * 1240px container leave the panel 1104px inside its own padding, which is the
 * first standard breakpoint that clears the 1080px grid.
 */

const SOURCES = ['Marketing & CRM', 'Commerce', 'ERP & finance', 'Analytics']
const AGENTS = ['Answers with sources', 'Never any credentials', 'One shared source']
const SHELF = ['Governed, read-only copy', 'Indexed automatically', 'Scoped and auditable']

const LABEL =
  'Diagram: marketing and CRM, commerce, ERP and finance, and analytics systems publish ' +
  'curated copies into Dewey, a card catalog drawer holding a governed, read-only, ' +
  'automatically indexed and auditable copy. Agents draw scoped answers out of Dewey, with ' +
  'sources and no credentials, from one shared source. Agents never reach the source systems.'

/* The handoff's `--edge`: a 1px ink ring drawn as an inset shadow rather than a
   border, so it adds no layout box inside an absolutely positioned stack, plus
   the design system's one hard shadow. */
const RING = 'shadow-[inset_0_0_0_1px_var(--color-ink)]'
const EDGE = 'shadow-[inset_0_0_0_1px_var(--color-ink),0_4px_0_0_var(--color-ink)]'
const EDGE_SM = 'shadow-[inset_0_0_0_1px_var(--color-ink),0_3px_0_0_var(--color-ink)]'

/* A filed index card behind the drawer face. Each is marked differently so the
   stack reads as separate cards rather than one thick slab. */
function Filed({ box, spin, mark, rule }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[10px] bg-white ${RING} ${box} ${spin}`}
    >
      <div className={`absolute ${RING} ${mark}`} />
      <div className={`absolute h-px bg-ink/20 ${rule}`} />
    </div>
  )
}

function Rows({ items, className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((text) => (
        /* A rule after every row, the last one included. The handoff draws the
           group as a closed block rather than as separated rows. */
        <p key={text} className="border-b border-ink py-2 text-body text-ink">
          {text}
        </p>
      ))}
    </div>
  )
}

/* The label that sits on a connector bundle. Wider than its own column on
   purpose, and painted above the curves it crosses. */
function Pill({ children, className = '' }) {
  return (
    <span
      className={`whitespace-nowrap rounded-pill bg-surface px-[18px] pb-[6px] pt-[5px] ${RING} ${className}`}
    >
      <Eyebrow as="span" tone="ink">{children}</Eyebrow>
    </span>
  )
}

/* The artwork itself, identical in both layouts. 320 by 256, and the only part
   of the diagram whose geometry is fixed at every width. */
function Drawer() {
  return (
    /* Fluid up to its design width. Everything inside is placed with left/right
       offsets rather than fixed widths, so the drawer narrows gracefully; only
       this container pinned it, which pushed it into the panel's padding at
       375px. In the wide layout the column is exactly 320, so the cap binds and
       the handoff geometry is unchanged. */
    /* Taller below 416px, which is the width at which the panel stops being able
       to give the drawer its full 320 and the shelf lines start wrapping. At 320
       the wrapped text met the pull with zero clearance; the face grows instead
       of clipping. Above it, the container is 256 and the face resolves to
       exactly the handoff's 182. */
    <div className="relative h-[310px] w-full max-w-[320px] min-[416px]:h-[256px]">
      <Filed
        box="left-[46px] right-[24px] top-[10px] h-[76px]"
        spin="rotate-[-2.6deg]"
        mark="left-[14px] top-[3px] h-[10px] w-[10px] rounded-pill bg-orange"
        rule="left-[30px] top-[7px] w-[96px]"
      />
      <Filed
        box="left-[22px] right-[46px] top-[30px] h-[76px]"
        spin="rotate-[1.9deg]"
        mark="left-[14px] top-[3px] h-[10px] w-[10px] rounded-[2px] bg-cta"
        rule="left-[32px] top-[8px] w-[120px]"
      />
      <Filed
        box="left-[8px] right-[8px] top-[48px] h-[78px]"
        spin="rotate-[-0.5deg]"
        mark="left-[16px] top-[7px] h-[10px] w-[18px] rounded-[2px] bg-accent"
        rule="left-[42px] top-[11px] w-[122px]"
      />

      <span
        className={`absolute right-[24px] top-[2px] rotate-[-1deg] rounded-[6px] bg-cta px-[10px] pb-1 pt-[3px] font-eyebrow text-[12px] uppercase leading-4 tracking-[0.08em] text-ink ${EDGE_SM}`}
      >
        Catalog
      </span>

      {/* The drawer face. The gradient is the handoff's, and its far stop has no
          token: the palette carries `accent` at the top but nothing at #0032ca,
          which is a deeper blue than `navy`. Written out rather than
          approximated, because the depth of the face is what makes it read as a
          drawer rather than a rectangle. */}
      <div
        /* `bottom-0` rather than a fixed 182: at the design height that is the
           same 182px, and where the container grows the face grows with it
           instead of clipping its own contents. */
        className={`absolute inset-x-0 bottom-0 top-[74px] overflow-hidden rounded-card bg-[linear-gradient(180deg,var(--color-accent)_25%,#0032ca_100%)] ${EDGE}`}
      >
        {/* The handoff calls for grain-texture.jpg at 30%. The site does not use
            that raster — it is not a seamless tile and shows patch seams when
            repeated — so this is the site's own `Grain`, which is what every
            other grained surface here draws. Same intent, same opacity. */}
        <Grain opacity={0.3} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[7px] rounded-[8px] shadow-[inset_0_0_0_1px_rgba(255,251,243,0.4)]"
        />
        <div className="relative flex flex-col gap-[10px] px-[22px] pt-4">
          <span
            className={`self-start rounded-[4px] bg-hero-heading px-[10px] pb-[2px] pt-px font-eyebrow text-[12px] uppercase leading-[18px] tracking-[0.08em] text-ink ${RING}`}
          >
            Dewey
          </span>
          <div className="flex flex-col">
            {SHELF.map((line, i) => (
              <span
                key={line}
                className={`text-[14px] leading-5 text-hero-heading ${
                  i < SHELF.length - 1
                    ? 'mb-[6px] border-b border-hero-heading/45 pb-[6px]'
                    : ''
                }`}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[14px] flex items-center justify-center gap-[10px]"
        >
          <span className="h-[6px] w-[6px] rounded-pill bg-ink" />
          <span className={`h-[15px] w-[96px] rounded-pill bg-cta ${EDGE_SM}`} />
          <span className="h-[6px] w-[6px] rounded-pill bg-ink" />
        </span>
      </div>
    </div>
  )
}

/* Every connector endpoint, both pills, and the drawer's centre sit on y=207 in
   a 340px row. The source and agent groups are offset so their row centres land
   on the curve ends at a 43px pitch. Changing the number of rows means
   re-deriving both, which is why the copy lives in this file beside them. */
function Wide() {
  return (
    <div className="mx-auto hidden w-[1080px] grid-cols-[1fr_190px_320px_190px_1fr] items-center xl:grid">
      <div className="relative h-[340px]">
        <Eyebrow as="span" tone="ink" className="absolute left-0 top-[44px] whitespace-nowrap">
          Your systems of record
        </Eyebrow>
        <Rows items={SOURCES} className="absolute inset-x-0 top-[121px]" />
      </div>

      <div className="relative h-[340px]">
        <svg
          viewBox="0 0 190 340"
          width="190"
          height="340"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 overflow-visible"
        >
          {[142.5, 185.5, 228.5, 271.5].map((y) => (
            <path
              key={y}
              d={`M6 ${y} C 116 ${y} 134 207 190 207`}
              stroke="var(--color-ink)"
              strokeWidth="1.25"
            />
          ))}
          {[142.5, 185.5, 228.5, 271.5].map((y) => (
            <circle key={y} cx="6" cy={y} r="3.5" fill="var(--color-ink)" />
          ))}
        </svg>
        <Pill className="absolute left-1/2 top-[207px] -translate-x-1/2 -translate-y-1/2">
          Curated publish
        </Pill>
      </div>

      <Drawer />

      <div className="relative h-[340px]">
        <svg
          viewBox="0 0 190 340"
          width="190"
          height="340"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 overflow-visible"
        >
          <path d="M0 207 C 66 207 78 164 184 164" stroke="var(--color-ink)" strokeWidth="1.25" />
          <path d="M0 207 L 184 207" stroke="var(--color-ink)" strokeWidth="1.25" />
          <path d="M0 207 C 66 207 78 250 184 250" stroke="var(--color-ink)" strokeWidth="1.25" />
          {[164, 207, 250].map((y) => (
            <circle key={y} cx="184" cy={y} r="3.5" fill="var(--color-ink)" />
          ))}
        </svg>
        <Pill className="absolute left-1/2 top-[207px] -translate-x-1/2 -translate-y-1/2">
          Scoped answers
        </Pill>
      </div>

      <div className="relative h-[340px]">
        <Eyebrow as="span" tone="ink" className="absolute left-0 top-[44px] whitespace-nowrap">
          Your agents
        </Eyebrow>
        <Rows items={AGENTS} className="absolute inset-x-0 top-[142.5px]" />
      </div>
    </div>
  )
}

/* The handoff's own fallback: stack the three groups and drop the curves rather
   than scale a diagram built on fixed coordinates. The connectors survive as
   their labels, which is the part that carried the meaning. */
function Stacked() {
  return (
    <div className="flex flex-col items-center gap-5 xl:hidden">
      <div className="w-full max-w-[420px]">
        <Eyebrow as="span" tone="ink" className="mb-1 block">Your systems of record</Eyebrow>
        <Rows items={SOURCES} />
      </div>
      <Pill>Curated publish</Pill>
      <Drawer />
      <Pill>Scoped answers</Pill>
      <div className="w-full max-w-[420px]">
        <Eyebrow as="span" tone="ink" className="mb-1 block">Your agents</Eyebrow>
        <Rows items={AGENTS} />
      </div>
    </div>
  )
}

export default function CatalogDrawer({ className = '' }) {
  return (
    <div role="img" aria-label={LABEL} className={className}>
      <Wide />
      <Stacked />
      <p className="mt-6 text-center">
        <Eyebrow as="span" tone="ink">Agents never reach the sources</Eyebrow>
      </p>
    </div>
  )
}
