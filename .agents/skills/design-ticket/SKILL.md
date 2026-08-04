---
name: design-ticket
description: Design a Mile42 Backlog ticket into a Ready behavioral and technical contract with stable Gherkin-like scenarios, dependencies, risks, test intent, and definition of completion. Use after ticket creation or refinement and before implementation.
---

# Design ticket

Read:

- `../software-delivery/references/lifecycle.md`
- `../software-delivery/references/behavioral-contracts.md`
- `../software-delivery/references/branching-and-prs.md`
- `../github-projects/SKILL.md`

1. Require the ticket to be in Backlog.
2. Read its body, comments, parent epic, related tickets, and attachments.
3. If it carries `needs-refinement`, first tighten the problem, value, smallest
   useful scope, exclusions, and estimate. Keep that refinement in the same
   proposed ticket update and clear the label only after approval.
4. Inspect the actual affected code, tests, architecture guidance, and current
   branch/PR state before designing.
5. Ask one focused round of questions only when a material product or
   architecture decision cannot be inferred.
6. For a story or bug, append a design containing:
   - Approach
   - Data model/API/UI changes where relevant
   - Dependencies and delivery grouping hints
   - Risks and mitigations
   - Stable `SCN-NNN` Given/When/Then scenarios
   - Edge cases and non-functional requirements
   - Unit/integration/E2E/manual test intent
   - Rollout and definition of completion
7. Do not write tests as mechanically executable instructions. Describe the
   behavior and intended evidence; implementation chooses test structure.
8. For an epic, produce:
   - Shared outcome and cross-cutting scenarios
   - Child-ticket decomposition
   - Dependency graph
   - Recommended shared, independent, or stacked delivery units
   - Rollout and cross-cutting risks
9. Show the full design and wait for explicit approval.
10. Update the ticket without removing preserved context, clear
   `needs-refinement` when present, move it to Ready, and
   comment with the scenario count and unresolved decisions.

Do not create a branch, repository requirements file, or PR. Those are
implementation artifacts.
