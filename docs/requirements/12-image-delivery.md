# #12 — Fix image delivery: eager hero, intrinsic dimensions, responsive sources

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/12
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/14
- Parent epic: none
- Delivery unit: `unit-2-image-delivery`
- Requirement version: 1

## Objective

The hero stops being deferred, illustrations reserve their space before loading,
and small viewports receive small sources.

## Scope

- `site/scripts/illustrations.mjs` emits responsive variants and
  `illustrations.data.json` alongside the full-size assets
- `manifest.js` merges generated dimensions and variants with human-authored
  alt text, level, and placeholder state
- `Spot` gains `priority` and `sizes`; emits `srcSet`, `width`, `height`,
  `loading`, `fetchPriority`, `decoding`
- The homepage hero opts into `priority`

## Out of scope

Altering artwork, including lossy recompression of full-size assets. Layout,
placement, or break-out changes.

## Behavioral scenarios

Scenarios SCN-001 to SCN-006 are carried verbatim from the ticket.

## Non-functional requirements

- No artwork altered; full-size assets remain lossless
- Generated data is never hand-edited
- No layout or placement change

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | Browser | Hero reports `loading=eager`, `fetchpriority=high`, and renders on first paint |
| SCN-002 | Manual | — | Browser | Every image has a computed `aspect-ratio` from its intrinsic attributes |
| SCN-003 | Manual | — | Browser | Cold-cache selection at real `sizes`: 544px → 1100w, 343px → 768w, 160px → 384w |
| SCN-004 | Manual | — | Browser | All three card spots report `loading=lazy` with no fetch priority |
| SCN-005 | Integration | `site/scripts/illustrations.mjs` | N/A | Re-run regenerates variants and data; no dimension hand-maintained |
| SCN-006 | Integration | `site/scripts/illustrations.mjs` | N/A | Lossless check still gates the full-size assets |

## Deliberate deviations

- **SCN-003 was proven by driving `sizes`, not by resizing the viewport.** The
  browser extension reports successful window resizes while `window.innerWidth`
  remains 1920, exactly as during #5. Selection was therefore observed on a cold
  cache at the `sizes` values a narrow viewport produces. This observes real
  browser selection rather than inferring it, but it is not a physical
  narrow-viewport test.

## Open questions

- A physical narrow-viewport pass remains unperformed. Worth a manual check on a
  real device.
