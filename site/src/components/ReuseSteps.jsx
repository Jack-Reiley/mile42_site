import { useState } from 'react'
import { Eyebrow, H3 } from './primitives.jsx'

/**
 * What each engagement leaves behind, drawn as a climb: five things, each one
 * standing higher than the last, with the selected one's line opening below the
 * row. Replaces the five flat `Spine` tiles on /how-we-work/delivery-model.
 *
 * These are not steps in a process. They are what accumulates while the work
 * runs, which is why the row ascends rather than pointing along an arrow: the
 * shape is the section's claim that each engagement starts further along than
 * the last one did.
 *
 * `items` is the page's own list, passed in so the copy stays beside the rest
 * of the page's copy.
 */

const PANE_ID = 'reuse-steps-detail'

/* The climb. Five rungs, 22px apart, tall enough at the bottom for two lines of
   title. The tallest sets the row's height, so it is also the SVG's viewBox. */
const HEIGHTS = [104, 126, 148, 170, 192]
const TALLEST = HEIGHTS[HEIGHTS.length - 1]

export default function ReuseSteps({ items }) {
  const [open, setOpen] = useState(0)
  const item = items[open]

  return (
    <div>
      <div className="relative">
        {/* The dashed line across the tops of the risers, which is what makes the
            ascent read as one climb rather than five unrelated heights. The
            viewBox is normalised on x so the points track the equal-width
            columns at any width; `non-scaling-stroke` keeps that distortion off
            the line itself. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 100 ${TALLEST}`}
          preserveAspectRatio="none"
          style={{ height: `${TALLEST}px` }}
          className="pointer-events-none absolute inset-x-0 top-0 hidden w-full min-[700px]:block"
        >
          <polyline
            points={HEIGHTS.map((h, i) => `${(i + 0.5) * 20},${TALLEST - h}`).join(' ')}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1"
            strokeDasharray="4 5"
            opacity=".6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="flex flex-col gap-3 min-[700px]:flex-row min-[700px]:items-end min-[700px]:gap-4 min-[700px]:border-b min-[700px]:border-ink">
          {items.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-pressed={open === i}
              aria-controls={PANE_ID}
              onClick={() => setOpen(i)}
              className="flex-1 text-left"
            >
              {/* `justify-end` sits the label at the foot of the riser, so the
                  titles line up along the baseline however tall the box is. */}
              <span
                className={`flex flex-col justify-end gap-2 rounded-card border border-ink shadow-hard px-[18px] py-4 transition-colors duration-[160ms] ease-linear motion-reduce:transition-none min-[700px]:mb-1 min-[700px]:h-[var(--riser)] ${
                  open === i ? 'bg-cta' : 'bg-page'
                }`}
                style={{ '--riser': `${HEIGHTS[i]}px` }}
              >
                <Eyebrow as="span" className="block">{String(i + 1).padStart(2, '0')}</Eyebrow>
                <span className="font-heading text-[16px] font-bold leading-[22px] text-ink">
                  {s.title}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Never empty, so there is no closed state to announce. */}
      <div
        id={PANE_ID}
        aria-live="polite"
        className="mt-7 max-w-[46rem] rounded-card border border-ink bg-page px-6 py-[22px]"
      >
        <H3 className="mb-[6px]">{item.title}</H3>
        <p className="text-body text-ink">{item.line}</p>
      </div>
    </div>
  )
}
