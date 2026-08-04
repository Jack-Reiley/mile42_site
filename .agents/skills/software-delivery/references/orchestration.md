# Multi-ticket orchestration

## Contents

1. Plan first
2. Delivery-unit model
3. Run state
4. Recovery and retries
5. Stop conditions

## Plan first

Before changing branches, inspect every ticket, parent epic, dependency,
affected area, and existing branch/PR. Produce a delivery plan validated against
`.agents/schemas/delivery-plan.schema.json`.

Do not infer dependency solely from argument order.

## Delivery-unit model

Each unit records:

- Stable unit ID
- Tickets
- Strategy: `shared-branch`, `independent`, or `stacked`
- Branch and base
- Dependencies
- Merge order
- Rationale

Run units in dependency order. Independent units may be processed separately,
but never allow two workers to edit the same working tree concurrently.

## Run state

Store runtime state under the configured `.delivery/runs/<run-id>/` directory:

```text
delivery-plan.json
state.json
verification/
reconciliation/
```

Validate `state.json` against `.agents/schemas/run-state.schema.json`. Runtime
state is scheduler memory; GitHub issues, PRs, and the board remain shared
external truth.

## Recovery and retries

- Reconcile state with live branches, PRs, ticket comments, and board status
  before spawning work.
- Adopt an existing stage artifact instead of duplicating it.
- Treat new commits, reports, PR state, or board transitions as progress.
- Cap implementation/verification cycles using configuration.
- Preserve a human-readable note when a unit blocks.
- Never auto-stash, reset, or discard a dirty working tree.

## Stop conditions

Stop and report when:

- A required product decision is ambiguous.
- A destructive or permission-expanding action needs new authorization.
- A dependency or environment is unavailable.
- Required verification fails after the configured cycle cap.
- Run state conflicts with external truth and cannot be reconciled safely.

Continue through routine implementation, verification, and reconciliation when
the user explicitly invoked `deliver-tickets`.
