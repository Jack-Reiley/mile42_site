import { useState } from 'react'
import { Eyebrow, H3 } from './primitives.jsx'

/**
 * A numbered list of choices beside the chosen one's detail, in one bordered
 * card. The shell only: what fills the pane belongs to the page using it.
 *
 * Extracted when the Dewey pillars turned out to need the same thing the
 * delivery model's roles already had — an eyebrow, a run of `aria-pressed`
 * buttons divided by rules, a footnote, and a live pane. The comp for Dewey
 * says as much in its own source: "adapted from the seven-roles pattern".
 *
 * There is no closed state. One choice is always selected and selecting
 * another swaps the pane, so this is `aria-pressed` rather than
 * `aria-expanded`: nothing is being revealed or hidden.
 *
 * The pane is a function of the selected item rather than markup passed in,
 * which keeps each page's copy beside the rest of that page's copy — the same
 * reason `WhereAgentsWork` and `ExecutionContrast` take their content as data
 * instead of holding it.
 */
export default function SelectorPanel({
  eyebrow,
  items,
  note,
  paneId,
  defaultIndex = 0,
  children,
}) {
  /* Clamped, because the default is chosen by the call site while the list is
     data. A default that outruns a shorter list would leave the pane with no
     item and take the page down — latent while this had one caller with a fixed
     list, worth guarding now that it does not. */
  const [open, setOpen] = useState(Math.min(defaultIndex, items.length - 1))
  const item = items[open]

  return (
    <div className="flex flex-wrap items-start gap-[30px] rounded-card border border-ink bg-surface px-[30px] pt-7 pb-[26px] shadow-hard">
      <div className="flex max-w-[270px] shrink grow-0 basis-[250px] flex-col">
        <Eyebrow tone="ink" className="mb-3">{eyebrow}</Eyebrow>

        {items.map((choice, i) => (
          /* The top border on every row, including the first, is the divider
             system. A box per row would read as a stack of cards inside a
             card. */
          <button
            key={choice.title}
            type="button"
            aria-pressed={open === i}
            aria-controls={paneId}
            onClick={() => setOpen(i)}
            className={`flex items-baseline gap-[10px] border-t border-ink p-3 text-left transition-colors duration-[160ms] ease-linear motion-reduce:transition-none ${
              open === i ? 'bg-cta' : 'bg-transparent'
            }`}
          >
            <span className="font-eyebrow text-eyebrow text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-heading text-[16px] font-bold leading-[22px] text-ink">
              {choice.title}
            </span>
          </button>
        ))}

        {/* Not the `Note` primitive only in size: this is the section's lead
            compressed to a footnote, so it runs at 14px rather than body. */}
        {note ? (
          <p className="mt-1 border-t border-ink pt-[14px] text-[14px] leading-[22px] text-ink/70">
            {note}
          </p>
        ) : null}
      </div>

      {/* `aria-live` so the swap is announced. The pane is never empty, so there
          is nothing for a screen reader to be handed as an emptied region. */}
      <div
        id={paneId}
        aria-live="polite"
        /* The design's 340px floor, capped at the card's interior. Taken
           literally it is wider than the card below a ~400px viewport, and the
           boxes inside run out through the card's right border. */
        className="flex min-w-[min(340px,100%)] shrink grow basis-[380px] flex-col"
      >
        <H3 className="mb-4">{item.title}</H3>
        {children(item)}
      </div>
    </div>
  )
}

/**
 * The step down from one pane card to the next. Both users of this shell put
 * something provisional above and something settled below, and read the gap
 * between them as a handoff.
 */
export function PaneHandoff({ label }) {
  return (
    <div className="flex items-center gap-[14px] px-6 py-[26px]">
      <span
        aria-hidden="true"
        className="ml-[6px] font-heading text-[28px] font-bold leading-none text-ink"
      >
        &#8595;
      </span>
      <Eyebrow tone="ink">{label}</Eyebrow>
    </div>
  )
}
