# #37 — Make the What We Do path card icons legible on the navy band

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/37
- Pull request: pending
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The three path card icons carry enough ink at their rendered size to read on the
navy band: dilated before the downscale, re-weighted after it, rendered at 64px,
and served from a pixel-exact source at both screen densities.

## Scope

- `site/scripts/illustrations.mjs`: `DILATE_RADIUS` and a separable max-pass
  dilate on the alpha channel for tinted entries; `ALPHA_GAMMA` and its lookup
  table applied after resize; a 64w variant for the three path icons; and
  pruning of variants no longer emitted, since the manifest globs the output
  directory.
- `site/src/components/primitives.jsx`: `PathCard` renders the spot at 64px.
- `site/src/pages/WhatWeDo.jsx`: the card copy leads with the practice name.

## Out of scope

- Any other illustration on the site.
- The full-size masters in `design/illustrations`, which are untouched.

## Behavioral scenarios

SCN-001 through SCN-010 are carried from the ticket unchanged. SCN-008 is
superseded within this delivery unit; see Deliberate deviations.

### SCN-001 — The path card icons read on the navy band

Given a visitor on the What We Do page
When they look at the three path cards
Then each card's icon is visibly present against the navy band rather than disappearing into it

### SCN-002 — The icons render at the larger size

Given a path card
When its icon is measured as rendered
Then it occupies a 64px square rather than the 48px it started at

### SCN-003 — Each screen density gets an exact source

Given a screen at standard density and a screen at double density
When each loads the What We Do page
Then each is served an icon variant matching the rendered size exactly
And neither has to downscale a larger variant to fit the slot

### SCN-004 — The processed variants carry the intended ink

Given the emitted path icon variants
When their alpha channel is measured
Then the average ink alpha falls in the intended band rather than the third of full alpha it arrived at before
And the average ink pixel composites against the navy band at the intended contrast rather than under 2:1

### SCN-005 — The busiest drawing survives the thickening

Given the handshake icon at its rendered size
When it is inspected
Then its knuckle hatching is still open rather than closed into a solid mass

### SCN-006 — The masters and the full-size assets are untouched

Given the build runs
When the full-size assets are compared with their trimmed masters
Then the lossless comparison passes for untinted artwork
And every tinted asset still carries byte-identical alpha and exactly its tint
And the master files themselves are unchanged

### SCN-007 — Variants that are no longer emitted stop shipping

Given the output directory holds variants from a previous build
When the build runs with a changed width list
Then variants no longer emitted are removed
And the bundle contains only the variants the current build produced

### SCN-008 — Each card names the practice it leads to

Given the three path cards
When a visitor reads one
Then its eyebrow names the practice the card links to
And the situation it used to lead with reads on the line under the title

### SCN-009 — The icons stay decorative

Given a visitor using a screen reader
When they reach a path card
Then the card is announced as one link named by its practice and title
And the icon is not announced as content

### SCN-010 — The build is repeatable

Given the build has already run
When it is run again with no input change
Then the emitted assets and the manifest are unchanged

## Non-functional requirements

- The icons remain decorative. They are not held to a text contrast floor, and
  no meaning is placed on them that only colour or stroke would carry.
- The full-size assets remain the pixel-exact reference for the artwork.
- The build stays idempotent and prunes rather than accumulates.
- No new dependency.

## Verification map

This ticket's central claim is numeric, so SCN-004 is reported as measured
alpha statistics rather than as an impression. SCN-006 has real automated
coverage: the illustration build's own lossless and tint assertions.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | The three cards captured on the navy band |
| SCN-002 | Manual | — | N/A | Rendered icon box measured at 64px |
| SCN-003 | Manual | — | N/A | Variant chosen at 1x and 2x, read from network requests |
| SCN-004 | Measured | — | N/A | Alpha statistics computed over the emitted variants, reported as numbers |
| SCN-005 | Manual | — | N/A | Handshake icon captured at rendered size |
| SCN-006 | Automated | `site/scripts/illustrations.mjs` lossless and tint assertions | N/A | Masters shown unmodified in `git status` |
| SCN-007 | Manual | — | N/A | Two builds compared, one with a removed width |
| SCN-008 | Superseded | — | N/A | See Deliberate deviations |
| SCN-009 | Manual | — | N/A | Link accessible name; icon absent from it |
| SCN-010 | Manual | — | N/A | Two consecutive builds compared with no input change |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`. `lint`, `typecheck`, and `coverage` are configured as
empty strings in `.agents/software-delivery.config.json` and do not exist yet.

The alpha figures quoted on the ticket are the measured outcome of the shipped
pipeline, not a threshold chosen in advance. Verification reports what it
measures rather than asserting a pass against a number it did not compute.

## Deliberate deviations

- **SCN-008 is superseded by #43 inside this delivery unit.** This ticket put the
  practice name in the eyebrow and the situation in the title. #43, designed
  afterwards and landing on the same branch, swaps them: the practice name
  becomes the card heading and the situation becomes the eyebrow. Both cannot
  hold at once. #43's SCN-004 is the surviving contract for the card's reading
  order, and SCN-008's underlying intent, that the card leads with the practice
  it links to, is preserved by it in the stronger slot. Recorded here rather than
  silently dropped, and pending developer confirmation before verification treats
  it as anything other than a failure.
- **The average ink pixel reaches roughly 2:1 against the navy band even after
  all three levers.** Acceptable for decoration, and recorded as a ceiling.
- **`npm run copy:parity` is red for `/what-we-do`.** Accepted as designed
  divergence and routed to a follow-up ticket; not treated as a pass criterion
  here.
- **The commits named in the ticket body do not resolve.** The branch was rebased
  after design, so `ffb4e83`, `7fb6c11`, `4b5b791`, and `9185da0` are now
  `739d129` (alpha curve), `0f81dbd` (eyebrow leads with the practice, since
  superseded), `01b3092` (64px render), and `26916f1` (dilated masks and the 1x
  variant).

## Open questions

- If these icons are ever given informational weight rather than decorative
  weight, the roughly 2:1 ceiling has to be revisited. Carried forward from the
  ticket unresolved.
