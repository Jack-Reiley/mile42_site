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

## Open questions

- Sub-`lg` placement remains invented; the comp is desktop-only.
- No physical narrow-viewport pass was possible; see the verification report.
