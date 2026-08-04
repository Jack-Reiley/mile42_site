# Mile42 software delivery

Mile42 keeps one canonical delivery workflow under `.agents/`. Both Codex and
Claude use the same skill definitions, references, templates, schemas, project
configuration, and workflow states.

## Lifecycle

```text
create-ticket
    ↓
design-ticket
    ↓
implement-ticket ── creates or updates the pull request
    ↓
verify-ticket ───── checks every stable acceptance scenario
    ↓
reconcile-ticket ── accepts, returns, or creates designed follow-ups
```

Use `deliver-tickets` to plan and run that lifecycle across several tickets or
an epic. It chooses shared, independent, or genuinely stacked delivery units
from the ticket relationships and affected code; argument order alone never
creates a dependency.

These are the only lifecycle action names. There are no legacy command aliases.

## Using the workflow

Codex discovers the repository skills in `.agents/skills/`. Invoke them by name,
for example:

```text
$design-ticket 142
$implement-ticket 142
$deliver-tickets 142 143 151
```

Claude uses the six thin slash-command adapters in `.claude/commands/`:

```text
/create-ticket
/design-ticket 142
/implement-ticket 142
/verify-ticket 142
/reconcile-ticket 142
/deliver-tickets 142 143 151
```

The Claude adapters contain no independent workflow logic. They load the
matching canonical skill so the two agents cannot silently drift.

## Canonical structure

```text
.agents/
├── README.md
├── software-delivery.config.json
├── software-delivery.workflow.json
├── schemas/
│   ├── delivery-plan.schema.json
│   ├── reconciliation-result.schema.json
│   ├── run-state.schema.json
│   └── verification-report.schema.json
└── skills/
    ├── software-delivery/
    ├── github-projects/
    ├── create-ticket/
    ├── design-ticket/
    ├── implement-ticket/
    ├── verify-ticket/
    ├── reconcile-ticket/
    └── deliver-tickets/
```

`software-delivery` owns the shared lifecycle references and artifact
templates. Stage skills remain concise and link to those shared resources.
`github-projects` owns deterministic Project V2 helpers.

## Behavioral contract and QA

`design-ticket` writes stable `SCN-NNN` Given/When/Then scenarios onto the
ticket. `implement-ticket` copies the approved contract into
`docs/requirements/<ticket>-<slug>.md` and maps each scenario to real automated
or manual evidence.

The requirements document is versioned project memory. Tests do not parse it,
generate from it, or use it to drive E2E execution. `verify-ticket` instead
reads both artifacts, checks for drift, and independently records one result for
every scenario: `PASS`, `FAIL`, `BLOCKED`, or `NOT_TESTED`.

## Pull requests and fail-forward behavior

Implementation owns branch creation, commits, push, and PR creation.
Verification requires that PR and never creates one. Failed current-ticket
requirements return to implementation on the same branch and PR.

Reconciliation may create follow-up tickets only after the original behavioral
contract passes. Each follow-up includes traceability, scope, stable scenarios,
completion criteria, type, size, estimate, and parent relationship. Automation
never merges; accepted work remains ready for human review.

## Configuration and runtime state

`.agents/software-delivery.config.json` contains Mile42’s project IDs, semantic
status mapping, validation commands, repository settings, and cycle limits.
Agents resolve status names through semantic keys so board capitalization is
not duplicated in prompts.

`.agents/software-delivery.workflow.json` defines allowed lifecycle
transitions and each action’s primary artifacts.

Multi-ticket run state lives under `.delivery/runs/` and is ignored by git.
The JSON schemas keep plans, verification reports, and resumable run state
machine-checkable.
