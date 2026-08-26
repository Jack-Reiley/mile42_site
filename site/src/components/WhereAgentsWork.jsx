import { Eyebrow } from './primitives.jsx'
import SelectorPanel, { PaneHandoff } from './SelectorPanel.jsx'

/**
 * The delivery roles as one interactive card: the seven roles standing on the
 * left, the selected role's handoff on the right — agent output, an arrow, then
 * the human decision on the brand green. Replaces the seven `Card` tiles that
 * used to stack in the "Where agents work" section of /how-we-work/delivery-model.
 *
 * The interaction carries the section's argument: agents produce, a human
 * decides, and the human side never empties. The shell that holds it is
 * `SelectorPanel`, shared with the Dewey pillars.
 *
 * `roles` is the page's own `ROLES`, passed in rather than copied: the copy is
 * verbatim from the page and belongs beside the rest of the page's copy.
 */

const PANE_ID = 'agents-handoff'

/* Design's default. Design is the role a prospective client is most likely to
   recognise the split in, and it sits mid-list so the list reads as a list. */
const DEFAULT_ROLE = 3

export default function WhereAgentsWork({ roles }) {
  return (
    <SelectorPanel
      eyebrow="Seven roles"
      items={roles}
      note="Roles, not steps. Several run at once throughout an engagement."
      paneId={PANE_ID}
      defaultIndex={DEFAULT_ROLE}
    >
      {(role) => (
        <>
          {/* No shadow, unlike the human box: the agent output is provisional
              until a person accepts it. */}
          <div className="rounded-card border border-ink bg-page px-6 py-[22px]">
            <Eyebrow tone="ink" className="mb-2">Agent output</Eyebrow>
            <p className="max-w-none text-body-lg text-ink">{role.agents}</p>
          </div>

          <PaneHandoff label="Goes to the accountable person" />

          {/* The off-white hero tone, not ink. #69 revised the green and the
              band flipped to light type: ink is 3.22:1 on this fill now and the
              off-white 4.79. Same rule the page follows on `brand`. */}
          <div className="rounded-card border border-ink bg-brand px-6 py-[22px] shadow-hard">
            <Eyebrow tone="hero" className="mb-2">Human decision</Eyebrow>
            <p className="font-heading text-[22px] font-bold leading-8 text-hero-heading text-pretty">
              {role.human}
            </p>
          </div>
        </>
      )}
    </SelectorPanel>
  )
}
