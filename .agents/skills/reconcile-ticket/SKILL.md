---
name: reconcile-ticket
description: Reconcile a Mile42 ticket in review by comparing its behavioral contract, requirements, implementation, tests, QA evidence, and developer feedback; then accept it, return it to implementation, or create properly designed follow-up tickets. Use after verification, instead of a packet-only review stage.
---

# Reconcile ticket

Read:

- `../software-delivery/references/verification-policy.md`
- `../software-delivery/references/behavioral-contracts.md`
- `../software-delivery/assets/reconciliation.md`
- `../software-delivery/assets/follow-up-ticket.md`
- `../github-projects/SKILL.md`

1. Require the ticket to be in In review with an existing PR and verification
   report.
2. Read the ticket, requirements, diff, commits, tests, developer notes,
   verification evidence, and parent/delivery-unit context.
3. Produce an independent assessment before requesting developer feedback:
   - Which scenarios pass
   - Which findings are current-ticket defects
   - Which are requirement ambiguities
   - Which are adjacent discoveries
   - Highest-risk files and reviewer spot checks
4. Recommend exactly one outcome:
   - `ACCEPT`
   - `RETURN_TO_IMPLEMENTATION`
   - `ACCEPT_WITH_FOLLOW_UP`
   - `SPLIT_INTO_FOLLOW_UP_TICKETS`
   - `BLOCKED_BY_REQUIREMENT_DECISION`
5. For an ambiguous or follow-up decision, present the recommendation and obtain
   developer feedback before applying it, unless `deliver-tickets` is running
   with an explicitly configured automatic policy.
6. Never defer a failed required scenario. Return it to implementation on the
   same branch and PR.
7. Create follow-ups only after all current requirements pass. Give each
   follow-up source traceability, scope, Gherkin-like scenarios, completion
   criteria, type, size, estimate, and parent epic.
8. Post the reconciliation decision and risk-ranked review packet on the PR.
9. During an orchestrated run, persist and validate
   `reconciliation/<ticket>.json` against
   `.agents/schemas/reconciliation-result.schema.json`.
10. Keep accepted work in In review for human merge. A merge moves it to Done.

Never merge.
