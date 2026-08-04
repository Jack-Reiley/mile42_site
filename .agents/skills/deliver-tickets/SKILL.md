---
name: deliver-tickets
description: Plan and orchestrate several Mile42 tickets or an epic through implementation, verification, remediation, and reconciliation using shared, independent, or stacked PR strategies. Use for end-to-end multi-ticket delivery, dependency-aware branch planning, run recovery, and explicit merge-order reporting.
---

# Deliver tickets

Read:

- `../software-delivery/references/lifecycle.md`
- `../software-delivery/references/branching-and-prs.md`
- `../software-delivery/references/orchestration.md`
- `../software-delivery/references/verification-policy.md`
- `../github-projects/SKILL.md`

Invoking this skill explicitly authorizes routine end-to-end orchestration of
the same `implement-ticket`, `verify-ticket`, and `reconcile-ticket` contracts.

1. Read all requested tickets, parent epics, designs, dependencies, affected
   code, existing branches/PRs, and board states.
2. Produce a delivery plan before changing the repository. Group tickets into
   delivery units:
   - `shared-branch`: cohesive epic capability validated together
   - `independent`: disconnected work based on the default branch
   - `stacked`: real code/API/migration dependency
3. Record rationale, branch, base, dependencies, and merge order for every unit.
   Validate the plan against `.agents/schemas/delivery-plan.schema.json`.
4. Show the plan before the first branch/PR write. Once approved, store it under
   `.delivery/runs/<run-id>/delivery-plan.json`.
5. Initialize schema-valid run state and process units in dependency order.
6. Invoke the canonical stage skills; do not restate or weaken their contracts.
7. Reconcile state with GitHub and git before every resume. Reuse existing
   artifacts and never duplicate a branch, PR, report, or follow-up.
8. Retry routine stage failures within the configured cycle cap. Required
   scenario failures return to implementation on the same PR.
9. Stop for genuine ambiguity, external blockers, destructive/permission
   expansion, or exhausted cycle limits.
10. Finish with:
    - Per-ticket scenario and reconciliation outcome
    - Branch and PR map
    - Dependencies and exact merge order
    - Follow-up tickets
    - Remaining blockers or human decisions

Never infer dependency from input order and never merge.
