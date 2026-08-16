import { useState } from 'react'
import { Eyebrow, H3 } from './primitives.jsx'

/**
 * The delivery roles as one interactive card: the seven roles standing on the
 * left, the selected role's handoff on the right — agent output, an arrow, then
 * the human decision on the brand green. Replaces the seven `Card` tiles that
 * used to stack in the "Where agents work" section of /how-we-work/delivery-model.
 *
 * The interaction carries the section's argument: agents produce, a human
 * decides, and the human side never empties. So there is no closed state — one
 * role is always selected, and selecting another swaps the pane rather than
 * revealing or hiding anything. `aria-pressed`, not `aria-expanded`.
 *
 * `roles` is the page's own `ROLES`, passed in rather than copied: the copy is
 * verbatim from the page and belongs beside the rest of the page's copy.
 */

const PANE_ID = 'agents-handoff'

/* Design's default. Design is the role a prospective client is most likely to
   recognise the split in, and it sits mid-list so the list reads as a list. */
const DEFAULT_ROLE = 3

export default function WhereAgentsWork({ roles }) {
  const [open, setOpen] = useState(DEFAULT_ROLE)
  const role = roles[open]

  return (
    <div className="flex flex-wrap items-start gap-[30px] rounded-card border border-ink bg-surface px-[30px] pt-7 pb-[26px] shadow-hard">
      <div className="flex max-w-[270px] shrink grow-0 basis-[250px] flex-col">
        <Eyebrow tone="ink" className="mb-3">Seven roles</Eyebrow>

        {roles.map((r, i) => (
          /* The top border on every row, including the first, is the divider
             system. A box per row would read as seven cards inside a card. */
          <button
            key={r.title}
            type="button"
            aria-pressed={open === i}
            aria-controls={PANE_ID}
            onClick={() => setOpen(i)}
            className={`flex items-baseline gap-[10px] border-t border-ink p-3 text-left transition-colors duration-[160ms] ease-linear motion-reduce:transition-none ${
              open === i ? 'bg-cta' : 'bg-transparent'
            }`}
          >
            <span className="font-eyebrow text-eyebrow text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-heading text-[16px] font-bold leading-[22px] text-ink">
              {r.title}
            </span>
          </button>
        ))}

        {/* Not the `Note` primitive only in size: this is the section's lead
            compressed to a footnote, so it runs at 14px rather than body. */}
        <p className="mt-1 border-t border-ink pt-[14px] text-[14px] leading-[22px] text-ink/70">
          Roles, not steps. Several run at once throughout an engagement.
        </p>
      </div>

      {/* `aria-live` so the swap is announced. The pane is never empty, so there
          is nothing for a screen reader to be handed as an emptied region. */}
      <div
        id={PANE_ID}
        aria-live="polite"
        /* The design's 340px floor, capped at the card's interior. Taken
           literally it is wider than the card below a ~400px viewport, and the
           two boxes run out through the card's right border. */
        className="flex min-w-[min(340px,100%)] shrink grow basis-[380px] flex-col"
      >
        <H3 className="mb-4">{role.title}</H3>

        {/* No shadow, unlike the human box: the agent output is provisional
            until a person accepts it. */}
        <div className="rounded-card border border-ink bg-page px-6 py-[22px]">
          <Eyebrow tone="ink" className="mb-2">Agent output</Eyebrow>
          <p className="max-w-none text-body-lg text-ink">{role.agents}</p>
        </div>

        <div className="flex items-center gap-[14px] px-6 py-[26px]">
          <span aria-hidden="true" className="ml-[6px] font-heading text-[28px] font-bold leading-none text-ink">
            &#8595;
          </span>
          <Eyebrow tone="ink">Goes to the accountable person</Eyebrow>
        </div>

        {/* Ink on the green, not the off-white hero tone: cream-50 on this fill
            is 2.51:1, ink is 6.16:1. Same rule the page follows on `brand`. */}
        <div className="rounded-card border border-ink bg-brand px-6 py-[22px] shadow-hard">
          <Eyebrow tone="ink" className="mb-2">Human decision</Eyebrow>
          <p className="font-heading text-[22px] font-bold leading-8 text-ink text-pretty">
            {role.human}
          </p>
        </div>
      </div>
    </div>
  )
}
