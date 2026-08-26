# #77 — A bad merge reverted Meet Dewey's hero copy

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/77
- Pull request: pending
- Parent epic: none
- Delivery unit: unit-dewey-copy
- Requirement version: 1

## Objective

Meet Dewey's hero says what #70 and #60 shipped, and the project-wide test gate
is green again.

## Scope

- The hero eyebrow, heading and lead of `site/src/pages/MeetDewey.jsx`.
- The explanatory comment above the heading that the merge dropped.
- An amendment to `docs/requirements/70-redraw-meet-dewey.md` recording the
  change to SCN-012's lead-line clause.
- Assertions covering the eyebrow and the retired line, added beside the
  existing ones.

## Out of scope

- The existing assertions in `site/src/pages/MeetDewey.test.jsx`, which are not
  modified, reordered or removed.
- The hero's band fill and text tones.
- Moving `/meet-dewey` under Engineering, adding a breadcrumb, or changing the
  header navigation.

## Behavioral scenarios

### SCN-001 — The configured test gate is green

Given a clean checkout of the default branch
When `npm run test:unit` runs
Then every test passes
And `npm run test:unit && npm run tokens:check` completes successfully

### SCN-002 — The assertion still protects the page's shape

Given Meet Dewey renders
Then it presents exactly one first-level heading and no breadcrumb
And the assertion names the heading the page actually shows

### SCN-003 — The page opens by naming the product and its audience

Given a reader arrives on Meet Dewey
When the hero band is displayed
Then the heading reads "Meet Dewey™. The librarian for AI agents (and humans)."

### SCN-004 — The brand eyebrow carries the trademark

Given the hero band is displayed
Then the eyebrow above the heading reads "Dewey™"
And it does not restate what the heading says

### SCN-005 — The page states its opening line once, not twice

Given the hero band is displayed
Then "Every agent needs a library." appears nowhere in the hero
And the lead opens on "Agents don't fail for lack of intelligence."

### SCN-006 — The hero's field and tones are untouched

Given the hero band is displayed
Then it renders on the same band fill and with the same text tones it carried
before this change
And no colour, tone, or grain decision from #75 is altered

### SCN-007 — #70's contract records the change to its lead line

Given `docs/requirements/70-redraw-meet-dewey.md`
Then its requirement version has been incremented
And SCN-012 no longer requires the lead line to open with
"Every agent needs a library."
And the reason and the approval are recorded in the document

### SCN-008 — Nothing reached green by weakening a test

Given the diff for this ticket
Then no existing assertion was deleted, skipped, or loosened
And the assertion that caught this regression is unchanged
And any test added is additional coverage rather than a replacement

## Non-functional requirements

- Accessibility: exactly one `h1`, no breadcrumb, eyebrow stays a `p`. The
  document outline is unchanged.
- Contrast: no tone changes, so `tokens:check` measures the same pairings.
- No performance or migration implications. Text nodes and one comment.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Gate | `npm run test:unit`, `npm run tokens:check` | N/A | — |
| SCN-002 | Unit | `site/src/pages/MeetDewey.test.jsx` (unmodified) | N/A | — |
| SCN-003 | Unit | `site/src/pages/MeetDewey.test.jsx` (unmodified) | N/A | — |
| SCN-004 | Unit | `site/src/pages/MeetDewey.test.jsx` (added) | N/A | — |
| SCN-005 | Unit | `site/src/pages/MeetDewey.test.jsx` (added) | N/A | — |
| SCN-006 | Manual | — | N/A | Browser pass on `/meet-dewey` |
| SCN-007 | Manual | — | N/A | `docs/requirements/70-redraw-meet-dewey.md` at version 2 |
| SCN-008 | Manual | — | N/A | Diff review; the caught assertion is byte-identical |

No E2E layer exists in this repository, so no scenario names one.

## Deliberate deviations

The ticket's contract was amended before implementation. Out of scope and
SCN-008 said `MeetDewey.test.jsx` was untouched and unchanged, while Test intent
said to add assertions to it. Resolved in favour of SCN-008's purpose, which is
that nothing reached green by weakening a test: the guarantee is about the
existing assertions, not about the file being byte-identical. Recorded on the
ticket with its reasoning.

## Open questions

- None. The `/meet-dewey` placement question was raised, considered and declined
  during design, and its reasoning is recorded on the ticket.
