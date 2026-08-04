---
name: implement-ticket
description: Implement or remediate a designed Mile42 ticket on its planned branch, materialize versioned requirements, add tests, run developer validation, push, create or update the PR, and move the ticket to QA. Use for initial implementation and for addressing verification findings on the same PR.
---

# Implement ticket

Read:

- `../software-delivery/references/lifecycle.md`
- `../software-delivery/references/behavioral-contracts.md`
- `../software-delivery/references/branching-and-prs.md`
- `../github-projects/SKILL.md`
- `AGENTS.md`

1. Require a designed ticket in Ready, In progress, or In QA. Reject epics unless
   a delivery plan names a shared epic delivery unit.
2. Resolve the branch, base, delivery unit, and PR from an existing delivery plan
   when present. Otherwise follow the single-ticket convention.
3. Refuse to overwrite a dirty or unrelated working tree.
4. Claim the ticket and move it to In progress when beginning new work.
5. Read the complete ticket, design, scenarios, comments, attachments, related
   work, repository guidance, and latest verification report.
6. Create or update
   `docs/requirements/<ticket>-<slug>.md` using the shared requirements template.
   Preserve scenario IDs and stop for unresolved contract drift.
7. Implement test-first where practical. Add unit, integration, and E2E coverage
   appropriate to observable behavior; do not parse or generate tests from the
   requirements document.
8. Populate the verification map with real test paths and manual rationale.
9. Run the configured relevant gates. For Mile42, use `AGENTS.md` together with
   the `commands` block in `.agents/software-delivery.config.json` to select the
   applicable tests, typecheck, coverage, E2E, and build checks. Skip any
   command configured as an empty string; do not invent one.
10. Commit logical ticket-identifiable changes and push the branch.
11. Create the PR if absent; otherwise update the existing PR. Use the shared PR
   template, link all tickets and requirements, and include scenario coverage,
   delivery strategy, dependencies, merge order, and deviations.
12. Follow Mile42 guidance by opening the PR ready for review unless a documented
   blocker explicitly justifies a draft.
13. Move included tickets to In QA and post the PR plus developer-validation
   summary.

On remediation, keep the same branch and PR, address current-contract defects,
update tests and requirements only when the contract legitimately changed, and
return the ticket to In QA.

Never merge.
