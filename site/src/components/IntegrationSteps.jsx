import { Eyebrow } from './primitives.jsx'
import { REVEAL_GROUP, REVEAL_ROW } from './reveal.js'

/**
 * The five drawn moments of a Dewey integration, from the handoff in
 * design/illustrations/data-in-answers-out.html. Replaces the flat five-cell
 * `StepStrip` in the "Data in. Answers out." band of /meet-dewey.
 *
 * The strip stated the sequence. This draws it: a warm gradient blob per step
 * with the moment sketched inside it, and the gradient running continuously
 * across all five so the row reads as one arc from create to retrieve rather
 * than as five separate pictures.
 *
 * That continuity is why each blob carries the whole 1080-wide gradient rather
 * than its own. Every step is drawn in the handoff's own coordinates and the
 * group is translated to bring its blob into the local 216-wide window, so the
 * `userSpaceOnUse` gradient and the grain pattern resolve against the full row
 * — the paths below are the handoff's verbatim, unshifted.
 *
 * The artwork is drawn for exactly these five moments, so `steps` supplies the
 * copy and this file holds the pictures, the way `ExecutionContrast` takes its
 * stages and owns the funnel.
 *
 * A real `ol`: five ordered steps, with the numeral written out because an `ol`
 * alone does not survive `list-style: none` in every screen reader — the same
 * reasoning `StepStrip` carried. The blobs are decorative; the label and line
 * beside each one already say what the picture says.
 *
 * Two layouts, because the handoff is a single 1440px frame:
 *
 *   lg and up  — the five across, with the arrows between them.
 *   below lg   — the steps stacked, blob beside its copy, arrows dropped.
 *
 * `lg` (1024px) is where a fifth of the content column still leaves each step
 * about 185px, which is the point at which the sketch inside a blob is still
 * legible and the line under it is not four words wide.
 */

/* The handoff's `--gradient-warm`, written out. The site palette has no warm
   gradient and no token for two of its three stops: `--color-cta` is a paler
   yellow than #FFD500 and `--color-pink` a paler magenta than #FFA2D6. The
   third, #FF5000, is the design file's orange-500, one stop deeper than
   `--color-orange`. Approximating the ramp from tokens washes the arc out,
   which is the one thing the illustration is for. */
const WARM = [
  { offset: 0.04, color: '#FFD500' },
  { offset: 0.65, color: '#FFA2D6' },
  { offset: 0.94, color: '#FF5000' },
]

/* Every step occupies a 216-wide slice of the handoff's 1080x236 row. */
const STEP_W = 216
const ROW_W = 1080
const ROW_H = 236

const INK = 'var(--color-ink)'
const PAPER = 'var(--color-hero-heading)'

/* Shared by every sketch: single-weight ink line work over an off-white fill. */
const STROKE = {
  stroke: INK,
  strokeWidth: 2.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* Each sketch is drawn around its own origin and placed by `at`, so the blob it
   sits in can be re-centred without touching the drawing. */
const CREATE = (
  <>
    <path fill={PAPER} d="M-38 -14h26l8 10h42v52h-76z" />
    <path fill="none" d="M-38 -4h76" />
    <path fill="none" d="M0 -46v24M-12 -34h24" />
  </>
)

const UPLOAD = (
  <>
    <rect x="-28" y="-58" width="56" height="68" rx="4" fill={PAPER} />
    <path fill="none" d="M-16 -40h32M-16 -26h32M-16 -12h20" />
    <path fill="none" d="M0 20v18M-9 31l9 9 9-9" />
    <path fill="none" d="M-36 48c0 12 8 18 20 18h32c12 0 20-6 20-18" />
  </>
)

const INDEX = (
  <>
    <rect x="-40" y="-56" width="62" height="34" rx="3" fill={PAPER} />
    <rect x="-32" y="-16" width="62" height="34" rx="3" fill={PAPER} />
    <rect x="-24" y="24" width="62" height="34" rx="3" fill={PAPER} />
    <path fill="none" d="M-30 -44h34M-30 -34h22M-22 -4h34M-22 6h22M-14 36h34M-14 46h22" />
    <path fill="none" d="M30 -42l5 5 9-11M38 -2l5 5 9-11M46 38l5 5 9-11" />
  </>
)

const SEARCH = (
  <>
    <rect x="-58" y="-32" width="62" height="34" rx="3" fill={PAPER} />
    <rect x="-50" y="8" width="62" height="34" rx="3" fill={PAPER} />
    <path fill="none" d="M-48 -20h34M-48 -10h22M-40 20h34M-40 30h22" />
    <circle cx="22" cy="-2" r="34" fill={PAPER} />
    <path fill="none" d="M46 22l26 26" />
  </>
)

const RETRIEVE = (
  <>
    <g transform="rotate(-13 -26 -20)">
      <rect x="-52" y="-52" width="46" height="60" rx="3" fill={PAPER} />
      <path fill="none" d="M-42 -34h26M-42 -22h18" />
    </g>
    <rect x="-23" y="-58" width="46" height="60" rx="3" fill={PAPER} />
    <path fill="none" d="M-13 -40h26M-13 -28h18" />
    <g transform="rotate(13 26 -20)">
      <rect x="4" y="-52" width="46" height="60" rx="3" fill={PAPER} />
      <path fill="none" d="M14 -34h26M14 -22h18" />
    </g>
    <rect x="-58" y="14" width="116" height="56" rx="5" fill={PAPER} />
    <path fill="none" d="M-58 24h116" />
    <rect x="-19" y="30" width="38" height="15" rx="2.5" fill="none" />
    <path fill="none" d="M-12 37h24" />
    <rect x="-19" y="53" width="38" height="11" rx="5.5" fill="var(--color-cta)" />
    <circle cx="-27" cy="58.5" r="2.6" fill={INK} stroke="none" />
    <circle cx="27" cy="58.5" r="2.6" fill={INK} stroke="none" />
  </>
)

/* The blobs are drawn, not generated: no two are the same circle, which is what
   keeps the row from reading as five buttons. `at` is where the sketch sits
   inside its blob — a couple of them ride high or low of centre. */
const MOMENTS = [
  {
    blob: 'M108 22C158 18 200 62 200 116C200 170 158 214 108 214C58 214 16 170 16 116C16 62 58 26 108 22Z',
    at: 'translate(108 118)',
    art: CREATE,
  },
  {
    blob: 'M324 20C378 24 416 66 416 120C416 174 372 214 320 212C268 210 232 168 232 114C232 60 272 16 324 20Z',
    at: 'translate(324 116)',
    art: UPLOAD,
  },
  {
    blob: 'M540 18C594 22 632 68 630 122C628 176 584 216 532 214C480 212 448 168 448 114C448 60 486 14 540 18Z',
    at: 'translate(540 116)',
    art: INDEX,
  },
  {
    blob: 'M756 22C808 20 848 62 848 116C848 170 806 216 752 214C698 212 664 168 664 114C664 60 704 24 756 22Z',
    at: 'translate(756 116)',
    art: SEARCH,
  },
  {
    blob: 'M972 18C1026 22 1064 66 1062 120C1060 174 1016 216 964 214C912 212 880 168 880 114C880 60 918 14 972 18Z',
    at: 'translate(972 110)',
    art: RETRIEVE,
  },
]

/* One arrow in each of the four gaps, on the blobs' own centre line. Drawn as
   an overlay across the whole row rather than inside the steps, because each
   arrow straddles the boundary between two of them. */
const ARROWS =
  'M206 116h20M220 110l6 6-6 6' +
  'M422 116h20M436 110l6 6-6 6' +
  'M638 116h20M652 110l6 6-6 6' +
  'M854 116h20M868 110l6 6-6 6'

/**
 * One step's picture. The gradient and the grain are declared per instance
 * because two SVGs cannot share a `defs` id, but both are laid out in the full
 * row's coordinates, so step five ends on the orange the single wide drawing
 * ends on.
 */
function Moment({ index, blob, at, art }) {
  const clipId = `m42-blob-${index}`
  const warmId = `m42-warm-${index}`
  const grainId = `m42-grain-${index}`
  return (
    <svg
      viewBox={`0 0 ${STEP_W} ${ROW_H}`}
      fill="none"
      aria-hidden="true"
      className="block w-full"
    >
      <g transform={`translate(${-STEP_W * index} 0)`}>
        <defs>
          <clipPath id={clipId}>
            <path d={blob} />
          </clipPath>
          <linearGradient id={warmId} x1="16" y1="20" x2="1062" y2="214" gradientUnits="userSpaceOnUse">
            {WARM.map(({ offset, color }) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
          </linearGradient>
          {/* The site's own 256px seamless tile, not the design system's
              grain-texture.jpg — that raster is a single patch and shows its
              seams the moment it repeats. Same intent, same 30%. */}
          <pattern id={grainId} width="256" height="256" patternUnits="userSpaceOnUse">
            <image href="/grain-fine.png" width="256" height="256" />
          </pattern>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect width={ROW_W} height={ROW_H} fill={`url(#${warmId})`} />
          <rect
            width={ROW_W}
            height={ROW_H}
            fill={`url(#${grainId})`}
            opacity="0.3"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>
        <g transform={at} {...STROKE}>
          {art}
        </g>
      </g>
    </svg>
  )
}

export default function IntegrationSteps({ steps, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <ol
        className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-6 lg:grid-cols-5 lg:gap-0`}
      >
        {MOMENTS.map((moment, i) => {
          const step = steps[i]
          if (!step) return null
          return (
            <li
              key={step.label}
              className="flex items-center gap-5 lg:flex-col lg:items-stretch lg:gap-0"
            >
              <span className="block w-[96px] shrink-0 lg:w-full">
                <Moment index={i} {...moment} />
              </span>
              <span className="block lg:mt-4 lg:px-[10px] lg:text-center">
                <Eyebrow as="span" className="block">
                  {String(i + 1).padStart(2, '0')}
                </Eyebrow>
                <span className="mt-1 block font-heading text-[18px] font-bold leading-6 text-ink">
                  {step.label}
                </span>
                <span className="mt-1 block text-[15px] leading-6 text-ink">{step.line}</span>
              </span>
            </li>
          )
        })}
      </ol>
      {/* Sits on the blob row, which is the top of the list at `lg` — every
          blob has the same aspect, so the row is exactly this drawing's height
          at the same width. Dropped with the five-across layout. */}
      <svg
        viewBox={`0 0 ${ROW_W} ${ROW_H}`}
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden w-full lg:block"
      >
        <path d={ARROWS} {...STROKE} />
      </svg>
    </div>
  )
}
