---
name: create-ticket
description: Create a Mile42 GitHub ticket in Backlog with a clear problem, value, type, scope, estimate, parent relationship, and approval gate. Use when capturing a story, bug, epic, rough backlog idea, or production issue before technical design begins.
---

# Create ticket

Read `.agents/software-delivery.config.json` and
`../software-delivery/references/lifecycle.md`.

Read `../github-projects/SKILL.md` before any issue or board operation.

1. Inspect the request, relevant repository context, existing open and closed
   issues, and any supplied attachments.
2. Infer exactly one type:
   - `bug`: defect against existing behavior
   - `story`: one shippable capability
   - `epic`: multi-ticket outcome
3. Ask only for material information that cannot be inferred:
   - User-visible outcome and user
   - Smallest useful scope
   - Non-functional requirements
   - Data or migration implications
   - Explicit exclusions
4. Mark an intentionally rough ticket `needs-refinement`; do not interrogate the
   user merely to remove uncertainty they asked to defer.
5. For stories and bugs, propose Size (`XS`–`XL`) and Fibonacci estimate
   (`1,2,3,5,8,13,21`) with a short rationale.
6. For stories, inspect open epics and propose the best parent or explain why
   none fits.
7. Draft the complete issue before any GitHub write. Include:
   - Summary
   - Context and value
   - Initial acceptance intent
   - Scope and out of scope
   - Assumptions/open questions
   - Attachments
8. Show title, type, size, estimate, parent, refinement state, and body. Wait for
   explicit approval.
9. Create the issue, apply labels and project fields, set the parent relationship
   where applicable, and verify it is in Backlog.
10. Report the URL and next action:
    - `needs-refinement`: `design-ticket` will begin with a focused refinement
      pass
    - otherwise: `design-ticket` will begin with technical and behavioral design

Do not create a branch, requirements document, or PR.
