# Delivery lifecycle

## Contents

1. Principles
2. Stages
3. Board mapping
4. Gates and resumability

## Principles

- Give every stage one clear responsibility and one primary artifact.
- Treat the GitHub board as shared status, not as the complete state machine.
- Treat ticket scenarios and repository requirements as the behavioral
  contract.
- Create the PR during implementation so verification and reconciliation have a
  stable collaboration surface.
- Never use follow-up tickets to hide a failed requirement.
- Keep all stages idempotent and resumable.

## Stages

| Action | Responsibility | Primary artifact |
| --- | --- | --- |
| `create-ticket` | Capture problem, value, type, initial scope, estimate, and parent | GitHub issue |
| `design-ticket` | Define observable behavior, boundaries, risks, dependencies, and test intent | Designed issue with stable scenarios |
| `implement-ticket` | Materialize requirements, code, test, commit, push, and create the PR | Requirements document and PR |
| `verify-ticket` | Independently assess every scenario against the PR | Verification report |
| `reconcile-ticket` | Compare intent, implementation, verification, and developer feedback | Binding decision or designed follow-ups |
| `deliver-tickets` | Plan delivery units and orchestrate the same stage contracts | Delivery plan, run state, and merge order |

## Board mapping

| Workflow state | Board status |
| --- | --- |
| `captured` | Backlog |
| `designed` | Ready |
| `implementing` | In progress |
| `pr_open`, `verifying`, `implementation_required` | In QA |
| `reconciliation_required`, `accepted`, `follow_ups_created` | In review |
| `complete` | Done |
| `blocked` | Preserve the current column and apply the `blocked` label |

Use comments, PR checks, and run state to distinguish workflow states that share
a board column.

## Gates and resumability

- `create-ticket` and `design-ticket` require approval before GitHub writes.
- `implement-ticket`, `verify-ticket`, and `reconcile-ticket` are individually
  invoked human gates.
- `deliver-tickets` is an explicit end-to-end invocation and may cross those
  routine gates without asking again.
- Stop continuous delivery for ambiguous product requirements, destructive or
  permission-expanding actions, external blockers, or a reconciliation choice
  not covered by configuration.
- Re-running a stage must discover and reuse its existing issue, branch, PR,
  report, or run state instead of creating duplicates.
- A merged PR is the authority for `complete`; automation must not merge.
