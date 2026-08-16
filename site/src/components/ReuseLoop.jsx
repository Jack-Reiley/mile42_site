import { useState } from 'react'

/**
 * What each engagement leaves behind, drawn as a closed loop: five things on a
 * ring whose last one feeds the first, with the selected one reading in the
 * middle. Replaces the five flat `Spine` tiles on /how-we-work/delivery-model.
 *
 * These are not steps in a process. They are what accumulates while the work
 * runs, and the ring is the section's claim: the loop closes, so the next
 * engagement starts from what the last one left rather than from nothing.
 *
 * Below 700px the ring is dropped for a plain list. A circle of five labels
 * cannot be read on a phone, and shrinking it only makes the labels collide.
 * The radial placement itself lives in index.css, since each node's offset is
 * an angle rather than a utility.
 *
 * `items` is the page's own list, passed in so the copy stays beside the rest
 * of the page's copy.
 */

const PANE_ID = 'reuse-loop-detail'

/* The ring, in viewBox units: it scales with its column, so these are
   proportions rather than pixels. The box is taller and wider than the ring to
   leave room for the labels sitting outside it. */
const W = 780
const H = 624
const CX = W / 2
const CY = 312
const R = 170
const STEP = 72
const FIRST = -90

const at = (deg, r) => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)]

/**
 * The ring is drawn rather than plotted: one pass of a wobbling radius, with a
 * sweep past 360 degrees so the ends overlap instead of meeting, which is what
 * a drawn circle does. The wobble is a sum of two sines rather than anything
 * random, because a random ring would redraw differently on every render.
 */
const SWEEP = 374
const SAMPLES = 90
const wobble = (t, phase) => Math.sin(t * 5.2 + phase) * 2.6 + Math.sin(t * 11.7 + phase * 2.3) * 1.4

const ringPath = (phase) => {
  let d = ''
  for (let s = 0; s <= SAMPLES; s++) {
    const t = s / SAMPLES
    const [x, y] = at(FIRST - 6 + SWEEP * t, R + wobble(t * Math.PI * 2, phase))
    d += `${s ? ' L ' : 'M '}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

/**
 * How far outside the ring a node's label sits, measured in rendered pixels
 * rather than viewBox units because the label's own type does not scale.
 *
 * A label centred on a fixed radial offset collides with the ring on the two
 * side nodes, whose labels reach sideways, and floats away from it on the top
 * node, whose label reaches down. So the offset is the node's radius plus
 * however much of the label lies along that direction: its half-width when the
 * label sits beside the ring, its half-height when it sits above or below.
 */
const NODE_R = 29
const labelOffset = (ux, uy, halfW, halfH) =>
  NODE_R + 10 + Math.abs(ux) * halfW + Math.abs(uy) * halfH

/* The two label sizes index.css switches between: the 110px one for the ring at
   its own width, the 150px one for the ring in three quarters of the row. */
const LABEL = { sm: [58, 30], lg: [78, 36] }

/**
 * A fill per node, carrying white numerals.
 *
 * EXTRAPOLATED. The style guide has no numbered-node treatment, and white text
 * is what forces the choice: at 12px it needs 4.5:1, which rules out most of the
 * palette. `orange` reaches 3.2 against white and `red` 3.8, so both are mixed
 * toward ink until they clear it, and `accent` is darkened the same way and for
 * the same reason the `blue` band in primitives.jsx is. `forest` and `navy` are
 * dark enough to be used as they are.
 */
const FILLS = [
  'color-mix(in srgb, var(--color-accent) 88%, black)',
  'var(--color-forest)',
  'color-mix(in srgb, var(--color-orange) 62%, var(--color-ink))',
  'var(--color-navy)',
  'color-mix(in srgb, var(--color-red) 58%, var(--color-ink))',
]

export default function ReuseLoop({ items }) {
  const [open, setOpen] = useState(0)
  const item = items[open]

  return (
    /* The live region wraps the ring and the line together: both change on
       selection, and they cannot share one id. */
    <div id={PANE_ID} aria-live="polite">
      <div className="relative mx-auto w-full min-[700px]:aspect-[780/624] min-[700px]:max-w-[600px] lg:max-w-[780px] xl:max-w-none">
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${W} ${H}`}
          className="pointer-events-none absolute inset-0 hidden h-full w-full min-[700px]:block"
        >
          <path
            d={ringPath(0)}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />


          {/* Arrowheads at the arc midpoints, so the circle reads as a
              direction rather than as decoration. Open chevrons rather than
              filled triangles: a filled shape reads as printed next to a drawn
              line. The second stroke is short, the way a quick tick is. */}
          {items.map((s, i) => {
            const mid = FIRST + STEP / 2 + i * STEP
            const [x, y] = at(mid, R + wobble(((i + 0.5) / items.length) * Math.PI * 2, 0))
            return (
              <path
                key={s.title}
                d="M -7 -7 L 6 0 L -6.4 6.6"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${mid + 90})`}
              />
            )
          })}

          {/* The return, named on the arc that closes the loop. */}
          <text
            x={at(FIRST - STEP / 2, R + 46)[0].toFixed(1)}
            y={at(FIRST - STEP / 2, R + 46)[1].toFixed(1)}
            textAnchor="middle"
            className="fill-ink font-eyebrow text-eyebrow uppercase"
          >
            Returns to 01
          </text>
        </svg>

        {items.map((s, i) => {
          const deg = FIRST + i * STEP
          const [x, y] = at(deg, R)
          const ux = Math.cos((deg * Math.PI) / 180)
          const uy = Math.sin((deg * Math.PI) / 180)
          const off = labelOffset(ux, uy, ...LABEL.sm)
          const offLg = labelOffset(ux, uy, ...LABEL.lg)
          return (
            <button
              key={s.title}
              type="button"
              aria-pressed={open === i}
              aria-controls={PANE_ID}
              onClick={() => setOpen(i)}
              className={`m42-loop-node flex w-full items-center gap-4 border-ink py-3 text-left min-[700px]:w-auto min-[700px]:border-0 min-[700px]:py-0 ${
                i ? 'border-t' : ''
              }`}
              style={{
                left: `${((x / W) * 100).toFixed(2)}%`,
                top: `${((y / H) * 100).toFixed(2)}%`,
                '--dx': `${(ux * off).toFixed(0)}px`,
                '--dy': `${(uy * off).toFixed(0)}px`,
                '--dx-lg': `${(ux * offLg).toFixed(0)}px`,
                '--dy-lg': `${(uy * offLg).toFixed(0)}px`,
              }}
            >
              {/* Each node keeps its own colour whether or not it is chosen, so
                  the press state the style guide implies is what carries the
                  selection: the chosen node sits down into its own shadow. */}
              <span
                className={`grid h-[58px] w-[58px] flex-none place-items-center rounded-pill border border-ink font-eyebrow text-eyebrow text-page transition-all duration-[160ms] ease-linear motion-reduce:transition-none ${
                  open === i ? 'translate-y-[2px] shadow-[0_1px_0_var(--color-ink)]' : 'shadow-hard'
                }`}
                style={{ backgroundColor: FILLS[i % FILLS.length] }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="m42-loop-label font-heading text-[15px] font-bold leading-[20px] text-ink min-[700px]:text-[14px] lg:text-[16px] lg:leading-[22px]">
                {s.title}
              </span>
            </button>
          )
        })}

        {/* The selection reads inside the ring, which is the whole point of
            drawing a ring. The width is a share of the box rather than a fixed
            measure, so the text stays inside the circle as the circle grows,
            and it is set by the ring's waist rather than by its diameter: the
            two side nodes are what the text has to clear, not the circle. */}
        <div className="hidden min-[700px]:absolute min-[700px]:left-1/2 min-[700px]:top-1/2 min-[700px]:block min-[700px]:w-[32%] min-[700px]:-translate-x-1/2 min-[700px]:-translate-y-1/2 min-[700px]:text-center">
          <p className="mb-2 font-heading text-[20px] font-bold leading-[28px] text-ink">
            {item.title}
          </p>
          <p className="text-body text-ink">{item.line}</p>
        </div>
      </div>

      {/* The phone layout, where there is no ring to put anything inside of.
          The list above it already names the selection. */}
      <p className="mt-5 text-body text-ink min-[700px]:hidden">{item.line}</p>
    </div>
  )
}
