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
- A restrained pointer parallax on the home hero illustration

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
| The hero drifts | Pointer at the band's corner gives 9.4px, -8.1px, capped at the 10px token |
| Nothing new animates unprompted | Every addition here is either static or driven by the reader's own pointer |

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
