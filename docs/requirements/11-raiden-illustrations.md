# #11 — Replace placeholder illustrations with Raiden's artwork

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/11
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/13
- Parent epic: none
- Delivery unit: `unit-1-raiden-illustrations`
- Requirement version: 1

## Objective

All four illustrations are the custom artwork, preserved exactly, and no
placeholder remains.

## Scope

- Masters at `design/illustrations/`, derived WebP at `site/src/assets/illustrations/`
- `site/scripts/illustrations.mjs` — trim to alpha bounding box, encode lossless WebP,
  verify losslessness, exposed as `npm run illustrations:build`
- `sharp` as a dev dependency of `site`
- Manifest updated: sources, alt text, `placeholder: false`
- Harvested placeholders deleted
- `site/EXTRAPOLATIONS.md` updated

## Out of scope

Layout or placement changes. New illustrations. Lossy compression. Responsive
delivery, which is #12.

## Behavioral scenarios

Scenarios SCN-001 to SCN-006 are carried verbatim from the ticket.

## Non-functional requirements

- No lossy compression
- No page references an illustration by path
- `illustrations:build` is idempotent

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | Browser | Homepage renders the custom artwork |
| SCN-002 | Integration | `site/verify/placeholders.mjs` | N/A | Reports none remaining, exit 0 |
| SCN-003 | Integration | `site/scripts/illustrations.mjs` | N/A | Build fails on any differing pixel with alpha > 0 |
| SCN-004 | Integration | `site/scripts/illustrations.mjs` | N/A | Re-run produces byte-identical output |
| SCN-005 | Manual | — | Browser | Spots overlap the card's top edge |
| SCN-006 | Integration | `npm run build`, `copy:parity` | N/A | Both pass |

## Deliberate deviations

None.

## Open questions

- The hero's stray edge marks are preserved; the bounding box includes them.
- Comp fidelity now carries a documented exception, since `design/Homepage.pdf`
  contains the previous artwork.
