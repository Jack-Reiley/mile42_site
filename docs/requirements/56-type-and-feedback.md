# #56 — Typography tracking, pointer feedback, and a hero parallax moment

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/56
- Depends on: #54 (stacked on `feature/54-reveal-motion`)
- Requirement version: 1

## Objective

The reveal work established that the site moves well. This is about the parts
that are not motion at all: how type is set, whether interactive elements answer
the pointer, and one detail worth noticing.

## Scope

- Tracking tokens for the display type steps, marked INFERRED
- `text-balance` on headings, `text-pretty` on body copy, in the components
- Hover states for buttons, completing the press-down already there
- A sticky header that condenses past a scroll threshold
- Branded `::selection`

## Out of scope

- Fluid heading sizes. Would change `--text-heading-1` from a measured 57px to a
  `clamp()`, breaking the token contract fixture, and its benefit is at
  intermediate widths this environment cannot verify.
- Hover on non-interactive cards.
- Favicon, OG cards, real 404, font preload — real gaps, deliberately deferred.
- The Privacy and Insights placeholder notices, which stay by decision.

## Verification map

| Claim | Evidence |
| --- | --- |
| Tracking applies to the display steps only | `letterSpacing` resolves to -1.254px at 57px; heading-3 left at normal |
| The hero now matches the comp | `Homepage.pdf` sets the h1 in three lines at y=161/224/287; the site rendered four with an orphaned "work." and now renders the comp's three |
| No other heading's wrap changed | All 14 routes probed with tracking toggled; one heading shifted, the hero h1, in the intended direction |
| Buttons answer the pointer | Hover measured at shadow 4px to 6px and a 2px lift; `:active` press-down unchanged |
| The header stays available | `position: sticky`, `z-40`, condensing 20px to 12px past a 24px threshold |
| Nothing new animates unprompted | Every addition here is either static or driven by the reader's own pointer |

## Extended to cover Meet Dewey

#59 merged while this was in review, adding `/meet-dewey`. The page inherits
most of this for free — `Wrap` carries the group, so its content reveals; the
tracking applies to its headings; its call to action gets the button hover — but
the three shapes that page introduced needed the same treatment the older list
shapes already had:

- `StepStrip` and the `ruled` variant of `PlainList` became relays, so their
  items arrive one at a time instead of the container moving as a slab
- `LibrarianFlow` became a relay, so the diagram assembles in the direction the
  data travels rather than appearing whole. Its parts are already hidden from
  assistive tech behind the `img` role, so this is purely visual
- The connector pair became a relay, so the two cards arrive in sequence

`CompareTable` deliberately did not. A table is one object and its rows are one
dataset; staggering them would read as the table building itself, which is a
different and worse claim than the table simply being there. It reveals as a
unit, like any other single element.

Verified on the page: 67 animated elements across 10 relays, no heading wrap
changed by the tracking, no horizontal overflow at any scroll position on a
5817px page, nothing stranded, and under reduced motion nothing hidden, nothing
moved, and the pillar selector still switches.

## Defect found in review: the stagger double-counted on stacks

Kevin reported the first content section of `/what-we-do/advisory` arriving
"cut off", finishing nearer the middle of the screen than the bottom, while
everything below it behaved.

Measured on that section, each child of the stack completed higher than the one
above it:

| Child | index | Completed |
| --- | --- | --- |
| H2 | 0 | 64% down the screen |
| Lead | 1 | 57% |
| Eyebrow | 2 | 51% |
| H3 | 3 | 44% — above the middle |

The scroll-path stagger was offsetting every child by its index. That is right
for siblings sitting side by side, which cross the viewport edge together and
would otherwise arrive as one block. It is wrong for a stack, which is already
staggered: an element 200px further down enters 200px later, and adding an index
offset on top double-counts, walking each successive child up the screen.

The fix separates the two cases. `--reveal-step` is `0px` by default, so a stack
relies on position alone, and `.m42-in-group-row` switches it on for groups
whose children are genuinely side by side. A row also stops counting after the
third child, because a grid wraps: once it has, the fourth item is not beside
the third, it is below the first, and being below already delays it.

Result: a stack now completes uniformly at 64% down, a row of three still
staggers 64 / 57 / 51 exactly as it did, and across all fifteen routes nothing
completes higher than 51%.

The time-played paths — a page's first band, and the observer fallback — keep
the stagger for every group, stack or row. There, nothing else separates the
children, so an index offset is the only thing that can.

## Withdrawn during review

- **The hero pointer parallax was built, then removed, and removing it fixed a
  rendering bug.** Kevin reported uneven shades of green across the brand bands
  — both the hero and the page-foot call to action — which varied with window
  size and which the CSS could not explain: `bg-brand` is a flat `#00b785` with
  no gradient and no texture. Removing the parallax resolved it, confirmed on
  his display.

  The cause was the one `translate3d` in the codebase. A 3D transform forces the
  element onto the GPU raster path, and that decision is not local to the
  element: it can change how the page as a whole is rasterized. On a wide-gamut
  display the GPU path colour-manages a flat fill differently enough to see, and
  saturated green was the only colour on the site where the difference showed.
  That is why a hero effect produced banding in a band a full page below it.

  The control is strong. Dozens of elements animate `translateX`, `translateY`
  and `scale` at once — all 2D — and none of them produce it. One `translate3d`
  did.

  Not reproducible in this environment at any zoom: the capture pipeline
  flattens everything into a single pass and returns the green as
  `rgb(82,180,139)` where the CSS says `rgb(0,183,133)`, which erases exactly
  this class of artifact. Kevin's eyes on a real display were the only
  instrument that could see it.

  If the drift is ever wanted back, the constraint is a 2D `translate()` and a
  re-test on a wide-gamut display. The mechanism is in the git history.

## Deliberate deviations

- **The card-three heading breaks differently from the comp.** `Homepage.pdf`
  sets "You need proven / solutions"; balanced it becomes "You need / proven
  solutions". Same line count, more even lines, and it keeps the longer line
  further from the handshake illustration that #15 placed beside it. The line
  *count* matching is what the spot placement depends on, and that is preserved.

- **Heading Three carries no tracking.** It did, at -0.011em, until that turned
  out to collapse the card-three heading from two lines to one and run it into
  the handshake. Measured: the tightening is worth about 7px at 26px, which is
  enough to move a wrap and not enough to be worth seeing.

## Findings worth carrying forward

- **`duration-btn` produced no utility.** Tailwind has no `--duration-*` theme
  namespace, so the class silently did nothing and the transition fell back to
  the default. `tokens:check` reported the token as fine, because it probes with
  a different utility form. The gate has a blind spot: it proves a token *can*
  produce a utility, not that the obvious class name works. Written up rather
  than fixed here.
