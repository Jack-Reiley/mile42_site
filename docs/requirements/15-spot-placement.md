# #15 — Position the card spot illustrations as the comp does

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/15
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/16
- Parent epic: none
- Delivery unit: `unit-1-spot-placement`
- Requirement version: 1

## Objective

Each spot sits where the comp puts it, breaking the boundary the comp breaks,
and the lightbulb is no longer oversized.

## Scope

- Per-illustration `spotClass` and `spotSizes` on `OFFERINGS`
- Lightbulb reduced to 101 x 121
- Comp placement applied from `lg` upward; existing in-column placement retained below
- Stacking order so the laptop paints over the column divider
- `site/EXTRAPOLATIONS.md` corrected

## Out of scope

Resizing the laptop and handshake. The hero. Artwork, manifest, generated data.

## Behavioral scenarios

SCN-001 to SCN-007 are carried from the ticket, with SCN-002 as replaced by
design amendment 1.

## Non-functional requirements

- No horizontal overflow at any width
- No copy change
- No change to artwork or generated illustration data

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | Browser | lightbulb crosses the card top by 37px |
| SCN-002 | Manual | — | Browser | laptop crosses its column divider by 25px, stays inside the card |
| SCN-003 | Manual | — | Browser | handshake crosses the card's right edge by 24px |
| SCN-004 | Manual | — | Browser | lightbulb measures 101 x 121 |
| SCN-005 | Manual | — | Browser | laptop and handshake both 128 wide |
| SCN-006 | Manual | — | Browser + CSS | `scrollWidth === clientWidth`; comp placement gated inside `@media(min-width:64rem)` |
| SCN-007 | Manual | — | — | `spotClass` per entry in `OFFERINGS` |

## Deliberate deviations

- **The handshake sits 56px below the card's top, not the comp's 98px.** Our
  card is 456px tall against the comp's 555, so the literal offset placed the
  illustration over the body copy and obscured a word. 56px restores the comp's
  actual relationship: level with the heading, clear of the body. Found by a
  browser pass, not by inspection of the numbers, which were on target.
- **The laptop sits 184px above the card's bottom, not the comp's 169px.**
  Adjusted on review: it reads better against our 528px card than the comp's
  literal offset, which was measured against a 555px one. Placement, divider
  crossing, and body clearance are all unaffected.
- **The handshake overhangs the card by 24px rather than the comp's 45px.** That
  follows from keeping it at 128px wide instead of the comp's 149px, which was
  an agreed size decision.

### Second deviation, found after reconciliation

**The gap between body copy and the "You leave with" label was widened from 24px
to 96px.** This is a layout change beyond the ticket's stated scope, made
because it is the root cause rather than a workaround.

The laptop was clipping the "n" in "production". The comp leaves ~107px of
whitespace between the body and that label — 120px baseline to baseline against
a 26px line-height — and the laptop sits in exactly that gap. Our `pt-6` left
column 2 only **36px**, because its body is the longest and `mt-auto` gives it
the least slack, so the illustration had nowhere to go but on top of the text.

Nudging the laptop would have treated the symptom. Widening the gap matches the
comp and fixes the cause. Column 2 now measures 108px against the comp's 107,
and the card is 528px tall against the comp's 555 — previously 456.

All three spots clear their body copy as a result.

### Third and fourth deviations, found on review

**Rows now align across the three cards.** The "You leave with" labels sat at
384 / 358 / 384 because column 2's value wraps to two lines, and `mt-auto`
bottoms each block within its own column. Each column is now a subgrid spanning
five explicit rows, so eyebrow, heading, body, label, value, and button all line
up regardless of wrapping. Verified: every row identical across all three.

`mt-auto` also had to become `lg:mt-0`. Left in place it fought the subgrid,
bottom-aligning each block inside its own row and reproducing the very
misalignment the subgrid was added to fix.

**The tall gap is now `lg:` only.** `pt-24` was applied at every breakpoint,
but the spots only sit beside the copy from `lg` up; below that they are inside
the column and the whitespace was dead. Mobile returns to the original
`mt-auto pt-6`.

Card height is now 560px against the comp's 555.

### Fifth deviation: comp placement is gated at `xl`, not `lg`

**Horizontal offsets are anchored to the right edge, not the left.** Fixed left
offsets were measured against a 413px column. Below 1240px the card shrinks and
the columns narrow, but those offsets did not, so the spots marched rightward —
the laptop crossed into the third column's "You leave with" block and the
handshake left the card entirely. Right-anchoring holds every relationship
constant: verified at card widths 1240, 1120, 1000 and 928, the lightbulb stays
35px inside its column, the laptop 25px past its divider, the handshake 23px
past the card.

**Comp placement now applies from `xl` (1280px), not `lg`.** The comp is a
1440px design and its proportions only hold once the card reaches its 1240px
maximum, which needs roughly a 1336px viewport. Between `lg` and `xl` the
columns are 300–400px, the copy wraps further right, and comp-scale spots
collided with the eyebrow and heading.

Between `lg` and `xl` the spots are 96px wide and lifted clear of the card's top
edge, so they cannot reach the eyebrow row at any column width in that range.

## Open questions

- Sub-`lg` placement remains invented; the comp is desktop-only.
- No physical narrow-viewport pass was possible; see the verification report.
