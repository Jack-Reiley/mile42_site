# #58 — Meet Dewey page and top-level nav item

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/58
- Source comp: `~/Downloads/dewey-page.html`, supplied by Kevin
- Requirement version: 1

## Objective

Port the Dewey product page into the site's own components and put it behind a
top-level "Meet Dewey" nav item at `/meet-dewey`.

## What was reused rather than written

| Section | Component |
| --- | --- |
| Page header | `Section`, `Wrap`, `Eyebrow`, `H1` |
| Intro | `Eyebrow`, `H2`, `Lead`, `Body` |
| Integration strip | `StepStrip` (new, in `Lists.jsx`) |
| Seven pillars | `DeweyPillars` over `SelectorPanel` (extracted) |
| Librarian diagram | `LibrarianFlow` (new) + `PlainList variant="ruled"` |
| Governance and truth axes | `GroupColumns` + `RuledGroup` |
| Connector cards | `Card fill="mint"` + `PlainList variant="ruled"` |
| Comparison | `CompareTable` (new, in `Lists.jsx`) |
| Call to action | `Section band="gold"`, `H2`, `Lead`, `Button` |

`SelectorPanel` is the notable one. The comp's own source says its tab component
was "adapted from the seven-roles pattern", which is `WhereAgentsWork` — same
shell, same `aria-pressed` semantics, same live pane. So the shell was extracted
and both compose it. `WhereAgentsWork` dropped from 100 lines to 56 and behaves
identically.

## Verification

| Claim | Evidence |
| --- | --- |
| The page renders in full | 8 sections, verified in browser and asserted in `MeetDewey.test.jsx` |
| The selector works | Clicking pillar 05 swapped title, benefit and all proof lines |
| The extraction changed nothing | Delivery model still defaults to Design at index 3, pane still `aria-live`, footnote intact, visually identical |
| Reachable | Top-level nav item and footer entry; route registered in `PAGES` |
| The diagram reads as one thing | `role="img"` with a written-out label, not twelve loose list items |
| The comparison is a real table | `<table>` with three column headers and seven row headers |

44 tests across 5 files, `tokens:check` 39 pinned and 41/41, site and copy
prototype builds.

## Deliberate deviations from the comp

- **No breadcrumb, and a hero header.** The comp draws Dewey as a child of What
  we do. It is a top-level page instead, so it opens the way `/why-mile42` and
  `/insights` do. The eyebrow and the "Agents don't fail for lack of
  intelligence" line moved from the intro up into the header. No copy was
  dropped or invented.
- **Both connector cards carry the hard shadow.** The comp shadows only the
  outbound one. `Card` is shadowed by definition on this site, and the mint fill
  already carries the distinction.
- **Axis rules are 3px, not the comp's 2px.** `RuledGroup` is the site's
  existing treatment and six other pages already use it.
- **`.btn:hover` is ignored.** The comp presses the button *down* on hover;
  #56 lifts it. The site's `Button` wins either way.

## Findings

- **`Card` could not be recoloured from a call site.** Passing `bg-mint` through
  `className` lost to the built-in `bg-page`: two background utilities have the
  same specificity, so the cascade falls to their order in the generated
  stylesheet, not the order written in the class attribute. Now a `fill` prop,
  matching `Section band` and `Eyebrow tone`.
- **`SelectorPanel` crashed on a default index past the end of its list.**
  Latent in `WhereAgentsWork`, which always had exactly seven roles; a real
  defect once the shell became shared. Found by its own test, now clamped.
- **An undefined identifier blanked the page and the build passed.** `StepStrip`
  was written against a constant that exists on the #57 branch and not here.
  Same class as the bug `routes.test.jsx` was written for on that branch;
  `MeetDewey.test.jsx` closes it here.

## Sequencing

Branched from `main`, independent of #57. Both touch `Lists.jsx`, `Header.jsx`
and `primitives.jsx` in different places. Whichever merges second should:

- give `StepStrip` the `REVEAL_GROUP.relay` treatment the other list shapes have
- confirm the new page picks up the reveal, which it will automatically, since
  `Wrap` carries it

## Not verified

Narrow viewports. The tooling reports a successful resize while `innerWidth`
stays put. The diagram and the step strip both restack at 900px and the table
scrolls inside its own container below 720px; none of that was seen.
