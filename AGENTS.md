# Mile42 Agent Notes

## Core Workflow

All non-trivial work must happen on a feature branch.

1. Start from the latest main branch when possible.
2. Create a feature branch before editing code or docs.
   - Use the `codex/` prefix for Codex-created branches.
   - Use a short, descriptive name, for example `codex/contact-form-a11y`.
3. Keep changes focused on the requested task.
4. Run the relevant checks before finishing.
5. Commit the completed work.
6. Push the branch.
7. Open a pull request for Kevin to review.
   - Open PRs as ready for review by default.
   - Do not open draft PRs unless Kevin explicitly asks for a draft or there
     is a documented blocker that prevents review.
   - If a PR was accidentally opened as a draft, mark it ready before handing
     the work back.
8. Do not merge the pull request yourself. Kevin will review and merge if it
   looks good, then work can continue from the updated main branch.

If the working tree is already dirty when you start, inspect the changes before
editing. Do not revert or overwrite user work. If the dirty changes are related,
continue on a feature branch with them. If they are unrelated, leave them alone
and call out the situation in your final note.

## Software Delivery Workflow

The canonical ticket-delivery workflow lives under `.agents/`. Use these skills:

- `create-ticket` captures and sizes a ticket.
- `design-ticket` adds stable `SCN-NNN` Given/When/Then acceptance scenarios.
- `implement-ticket` creates the requirements document, implementation, tests,
  branch, commits, and pull request.
- `verify-ticket` performs independent QA against every scenario on the existing
  pull request.
- `reconcile-ticket` accepts the work, returns failed requirements to the same
  branch/PR, or creates properly designed follow-up tickets.
- `deliver-tickets` plans and orchestrates several tickets using shared,
  independent, or genuinely stacked delivery units.

Use `.agents/software-delivery.config.json` for project settings and
`.agents/software-delivery.workflow.json` for lifecycle states. Repository
requirements live in `docs/requirements/`; they document the behavior and map
existing E2E coverage but must never drive or generate test execution.

Implementation owns PR creation. Verification never creates a PR. A failed
current-ticket scenario cannot be deferred; only adjacent work discovered after
the original contract passes may become a follow-up. Never infer a branch or PR
dependency solely from ticket argument order, and never merge automatically.

## Project Direction

Mile42 is an AI consulting agency. This repository holds its website.

Current state:
- `copy_prototype/` is a Vite + React recreation of the mid-fidelity copy
  prototype. It is a copy and structure reference, not the designed site. Its
  own `README.md` documents how it was verified against the original.
- `design/` holds the source design PDFs (`Style Guide.pdf`, `Homepage.pdf`)
  that the real site will be built from.

The designed site does not exist yet. When it lands it becomes a sibling
directory, and the root `package.json` scripts are named so that `dev`, `build`,
and `preview` stay free for it while `copy:*` continues to reach the prototype.

The copy prototype is a fixed reference. Do not restyle it, modernize its
markup, or "improve" its copy. If it must change, the change belongs to a
ticket that says so explicitly.

## Implementation Guidance

Prefer the patterns already in the touched directory over new abstractions.
Keep changes scoped and make the smallest change the current ticket proves is
needed.

Match the surrounding code's comment density, naming, and idiom. Code should be
self-documenting enough that comments are rarely needed; add comments only when
they clarify non-obvious intent, constraints, or browser/platform quirks.

Code should follow clean code and SOLID principles. Prefer small, named
functions and cohesive modules with explicit responsibilities.

This is a marketing site, so accessibility and semantic markup are functional
requirements rather than polish: real heading hierarchy, real landmarks, real
link and button semantics, and keyboard-reachable interactive elements.

## Testing and Code Quality

There is no test suite in this repository yet. Do not claim one ran.

When behavior-bearing code is added, add tests alongside it and register the
command in the `commands` block of `.agents/software-delivery.config.json` so
the delivery workflow starts enforcing it. Treat that config block as the single
source of truth for which gates exist; a command configured as an empty string
means the gate does not exist yet, not that it may be skipped silently.

Until then, the build is the gate. A change that does not build is not done.

## Verification

Choose checks based on the work:
- `npm run copy:build` for any change under `copy_prototype/`. This is currently
  the only automated gate.
- `npm run copy` and a real browser pass for anything user-visible.

Node is pinned in `.nvmrc`; run `nvm use` before the checks so results match CI.

State plainly what you ran and what it reported. If a check was skipped, say so
and say why. Never describe an unverified change as verified.

## Visual Validation

Visual work must follow an explicit compare/fix loop:

1. Capture the target and the reference before changing code.
2. Inspect them and write down every visible mismatch, even small ones.
3. Turn the mismatches into a short to-do list before editing.
4. Fix the listed items in a focused pass.
5. Re-capture the same views after the fix.
6. Compare the new captures against the to-do list before calling it fixed.

Do not summarize a visual pass as "close" or "better" without naming the
remaining inaccuracies. If there are multiple visible issues, keep the to-do
list alive and work through it item by item.

For work built from `design/`, the PDF is the reference. For work on
`copy_prototype/`, the reference is the original prototype's rendered output,
and structural claims should be checked mechanically rather than by eye where
that is possible — the prototype was ported by diffing text nodes,
element/class/href sequence, and inline styles against the original.

Check the responsive behavior, not just the desktop view. The prototype's
stylesheet breaks at 52rem and 64rem.
