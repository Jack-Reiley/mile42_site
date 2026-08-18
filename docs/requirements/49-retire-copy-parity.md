# #49 — Retire the copy parity gate

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/49
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/50
- Parent epic: none
- Delivery unit: `unit-49-retire-copy-parity`
- Requirement version: 1

## Objective

The copy parity check is gone, and the delivery workflow's `test` gate can pass
for the first time.

## Scope

- Delete `site/verify/copy-parity.mjs`.
- Remove the `copy:parity` script from the root `package.json`.
- `commands.test` becomes `npm run test:unit && npm run tokens:check`.
- Rewrite the two live rationales that cite the deleted file: the row in
  `site/EXTRAPOLATIONS.md` and the module comment in
  `site/src/components/HardParts.jsx`.

## Out of scope

- `copy_prototype/`, which remains the copy reference and keeps `copy`,
  `copy:setup`, `copy:build`, and `copy:preview`.
- `site/verify/placeholders.mjs` and `illustrations:placeholders`.
- Every requirements document under `docs/requirements/` other than this one.
  They record what was verified at the time and rewriting them would falsify
  that record.
- Any replacement copy check.
- Preserving the DOM-free render property with a node-environment test. See
  deviation 2.

## Behavioral scenarios

SCN-001 through SCN-006 are carried from the ticket unchanged.

### SCN-001 — The parity check no longer exists

Given a developer has the repository checked out
When they look for the copy parity check
Then site/verify/copy-parity.mjs does not exist
And no script, config, or source file refers to it as something that can be run

### SCN-002 — The command is gone from the repository's scripts

Given a developer lists the root package scripts
Then there is no copy:parity script
And running npm run copy:parity reports an unknown script rather than a failing check

### SCN-003 — The test gate passes for the first time

Given the delivery workflow reads its configured test command
Then that command is npm run test:unit && npm run tokens:check
When it is run on a clean checkout
Then it exits zero

### SCN-004 — No live rationale points at the deleted file

Given a developer reads why the hard parts drill-down renders both responsive forms
When they read the note in the component and the row in EXTRAPOLATIONS
Then neither cites the parity script as a reason
And both still give the reason that holds, that role is markup and cannot change with a media query
And the reader is told the DOM-free render property is no longer enforced and why that is acceptable

### SCN-005 — The copy prototype and its own gate are untouched

Given the copy prototype remains the copy reference
Then copy_prototype/ is unchanged
And npm run copy, copy:setup, copy:build, and copy:preview all still exist
And npm run copy:build still passes
And the illustrations:placeholders check is unchanged

### SCN-006 — The site is unaffected

Given the change touches no site source
When the site is built
Then npm run build passes
And no route's rendered output changes

## Non-functional requirements

- No change to any shipped asset. The only `site/src` edit is a comment.
- The historical record is preserved: no other file under `docs/requirements/`
  is modified.
- No new dependency.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Automated | — | N/A | File absent; repository grep finds no runnable reference |
| SCN-002 | Automated | — | N/A | `npm run copy:parity` reports an unknown script |
| SCN-003 | Automated | — | N/A | The configured command run end to end, exit code captured |
| SCN-004 | Manual | — | N/A | Both rewritten passages read against the deleted file |
| SCN-005 | Automated | — | N/A | Four `copy:*` scripts resolve, `npm run copy:build` passes, `git diff` clean under `copy_prototype/` |
| SCN-006 | Automated | — | N/A | `npm run build` passes, `git diff --stat` shows one comment-only `site/src` change |

No automated test is added. These scenarios assert the state of the toolchain
itself, which a test would only restate, and a test asserting a file is absent
fails the moment someone deliberately reintroduces it, which is the wrong
signal. `site/src/components/HardParts.test.jsx` continues to run unchanged.

## Deliberate deviations

1. **Two rationales rewritten, not one.** The ticket named only
   `site/EXTRAPOLATIONS.md`. The same reasoning also sits at
   `site/src/components/HardParts.jsx:18`. Both go stale together, so both were
   rewritten under the ticket's stated intent.
2. **The DOM-free render property is retired with the gate.**
   `copy-parity.mjs` rendered every route under plain node via
   `vite.ssrLoadModule`, making it the only enforcement that no component
   touches a browser API during render. The unit suite does not replace it:
   `site/vitest.config.js` sets `environment: 'jsdom'`, so `window` exists while
   those cases run. The property is let go rather than preserved, because
   nothing needs it: the site is a client-only SPA, `vite.config.js` configures
   no SSR, there is no prerender step, and `netlify.toml` builds and serves
   `site/dist` statically. `HardParts` is unaffected; its sufficient reason is
   that `role` is markup.

## Open questions

1. Whether the DOM-free property should be reinstated by a node-environment
   test. Recommended not. The right time to revisit is whenever SSR or
   prerendering is introduced.
2. Whether a replacement copy check is wanted at all. If so, its reference
   should not be a mid-fidelity prototype the designed site no longer tracks.
