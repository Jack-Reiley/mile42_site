/**
 * One platform, two outcomes, drawn as a diverging pair: a single yellow node
 * at the top, four stages of execution running down the middle, and the two
 * results at the bottom. The weak reading sits on the left, the strong one on
 * the right. Replaces the two flat cards in the "same technology" section of
 * /why-mile42.
 *
 * The cards stated the contrast. This states the section's actual claim — both
 * columns leave the same platform and separate as execution accumulates — so
 * each row's side columns are narrower than the row above it and the two
 * readings pull further apart the further down they go. That widening gap is
 * the whole illustration; the copy is unchanged.
 *
 * Nothing here is interactive, so it is markup and tokens only: no state, no
 * SVG, no measurement.
 *
 * Below 700px the funnel is dropped and the diagram becomes a plain two-column
 * comparison with the stage name above each pair. The divergence is a desktop
 * effect — at phone width the side columns are too narrow for the percentages
 * to read as anything but ragged text.
 *
 * `stages` and `result` are the page's own copy, passed in rather than held
 * here, the same way `WhereAgentsWork` takes its roles.
 */

/**
 * The width of each side column, as a share of the row. Narrowing down the
 * diagram is what opens the gap: the left cell is right-aligned and the right
 * cell left-aligned, so a shorter column pushes its text outward.
 *
 * Taken from the design handoff's own values rather than generated from a
 * step, which is why they are not evenly spaced.
 */
const SIDE = ['29%', '27.1%', '24.7%', '21.8%']
const SIDE_HEAD = '29%'

/* The three-column track the funnel rows take above 700px. The side width
   arrives per row as `--side`; the middle takes whatever is left. */
const FUNNEL = 'min-[700px]:[grid-template-columns:var(--side)_minmax(0,1fr)_var(--side)]'

/* A row of the funnel. Two columns on a phone with the stage name spanning
   both, three columns above 700px with the stage name between the pair.
   The stage name is written first either way, so the row is read as
   "Context: unclear context, clear context" rather than around the label.

   The cells are top-aligned in the stacked layout, where the two readings are
   two columns of wrapping text and a centred pair reads as ragged, and centred
   once the stage name moves between them. */
function Row({ side, label, className = '', children }) {
  return (
    <div
      className={`grid w-full grid-cols-2 items-start gap-x-5 min-[700px]:items-center ${FUNNEL} ${className}`}
      style={{ '--side': side }}
    >
      <span className="col-span-2 mb-1 flex items-center gap-[10px] min-[700px]:col-span-1 min-[700px]:col-start-2 min-[700px]:row-start-1 min-[700px]:mb-0 min-[700px]:px-6">
        <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
        {/* The handoff greys the stage name and the whole weak column to ink at
            50%, which is 3.1:1 on the surface band. `Note`'s 70% is the site's
            muted tone and reaches 5.7:1, so it is what both take. */}
        <span className="whitespace-nowrap font-eyebrow text-eyebrow uppercase text-ink/70">
          {label}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
      </span>
      {children}
    </div>
  )
}

/* The two side cells of a row. Placement is explicit rather than automatic:
   above 700px the middle column belongs to the stage name, so the strong cell
   has to be told to skip it. */
const WEAK_CELL =
  'min-[700px]:col-start-1 min-[700px]:row-start-1 min-[700px]:text-right text-body text-ink/70 lg:text-body-lg'
const STRONG_CELL =
  'min-[700px]:col-start-3 min-[700px]:row-start-1 text-body text-ink lg:text-body-lg'

/* The result chips carry the design's sticker treatment, so they read as the
   thing the diagram arrives at rather than as one more line of the list.
   The strong chip takes the brand green. It used to take `forest`, because the
   off-white label reached 2.6:1 on the old brand and 9:1 on forest. #69 revised
   the green and #84 retired forest, so the label now measures 4.79:1 here. That
   clears AA at every size, and it is the one site where retiring forest spends
   margin rather than being neutral: 9:1 to 4.79 is a deliberate, recorded
   trade, not an oversight. */
const CHIP = 'inline-block rounded-card border border-ink shadow-hard px-5 py-[6px] text-body lg:text-body-lg'

export default function ExecutionContrast({ platform, weakTitle, strongTitle, stages, result }) {
  return (
    <div className="flex flex-col items-center">
      <span className="rounded-pill border border-ink bg-cta px-6 py-[6px] font-eyebrow text-eyebrow uppercase text-on-cta shadow-hard">
        {platform}
      </span>
      <span aria-hidden="true" className="mt-[10px] h-7 w-px bg-ink" />

      <div
        className={`mt-[18px] grid w-full grid-cols-2 items-baseline gap-x-5 ${FUNNEL}`}
        style={{ '--side': SIDE_HEAD }}
      >
        <h3 className="min-[700px]:col-start-1 min-[700px]:text-right text-body font-semibold text-ink lg:text-body-lg-semibold">
          {weakTitle}
        </h3>
        <h3 className="min-[700px]:col-start-3 text-body font-semibold text-ink lg:text-body-lg-semibold">
          {strongTitle}
        </h3>
      </div>

      {stages.map((stage, i) => (
        <Row
          key={stage.label}
          side={SIDE[i] ?? SIDE[SIDE.length - 1]}
          label={stage.label}
          className={i ? 'mt-5 min-[700px]:mt-[14px]' : 'mt-5'}
        >
          <span className={WEAK_CELL}>{stage.weak}</span>
          <span className={STRONG_CELL}>{stage.strong}</span>
        </Row>
      ))}

      {/* The chips break out to the two edges of the column rather than
          right- and left-aligning on the last row's text, which is what carries
          the divergence past the end of the list. */}
      <Row side={SIDE[SIDE.length - 1]} label={result.label} className="mt-5">
        <span className="min-[700px]:col-start-1 min-[700px]:row-start-1 min-[700px]:justify-self-start">
          <span className={`${CHIP} bg-page text-ink`}>{result.weak}</span>
        </span>
        <span className="min-[700px]:col-start-3 min-[700px]:row-start-1 min-[700px]:justify-self-end">
          <span className={`${CHIP} bg-brand font-semibold text-hero-heading`}>{result.strong}</span>
        </span>
      </Row>
    </div>
  )
}
