import { Eyebrow } from './primitives.jsx'
import SelectorPanel, { PaneHandoff } from './SelectorPanel.jsx'

/**
 * The seven reasons teams put Dewey between their data and their agents, each
 * pairing what you get with where it lives in the product. Pick one and both
 * halves change together.
 *
 * That pairing is the section's argument: every claim is answerable in the
 * product today rather than on a roadmap, so the benefit is never shown without
 * the thing that backs it.
 *
 * The shell is `SelectorPanel`, shared with the delivery model's roles. The
 * comp this page was ported from says as much in its own source — the tab
 * component was "adapted from the seven-roles pattern".
 *
 * `pillars` is the page's own list, passed in so the copy stays beside the rest
 * of the page's copy.
 */

const PANE_ID = 'dewey-pillar'

export default function DeweyPillars({ pillars }) {
  return (
    <SelectorPanel
      eyebrow="Seven pillars"
      items={pillars}
      note="One platform. Every pillar is live in the product today, not a roadmap."
      paneId={PANE_ID}
    >
      {(pillar) => (
        <>
          {/* No shadow, unlike the proof box: the benefit is the claim, and the
              claim is not what carries weight here. */}
          <div className="rounded-card border border-ink bg-page px-6 py-[22px]">
            <Eyebrow tone="ink" className="mb-2">The benefit</Eyebrow>
            <p className="max-w-none text-body-lg text-ink">{pillar.benefit}</p>
          </div>

          <PaneHandoff label="Where it lives in the product" />

          {/* Navy, so the evidence reads as the settled half of the pair. A sky
              eyebrow on this fill measures 6.0:1, the same pairing the dark
              bands elsewhere use. */}
          <div className="rounded-card border border-ink bg-navy px-6 py-[22px] shadow-hard">
            <Eyebrow tone="ice" className="mb-2">In the product</Eyebrow>
            <ul className="flex flex-col gap-2.5">
              {pillar.proof.map((line) => (
                <li key={line} className="flex gap-3 text-body text-hero-heading">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-[9px] w-[9px] flex-none rounded-[2px] bg-sky"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </SelectorPanel>
  )
}
