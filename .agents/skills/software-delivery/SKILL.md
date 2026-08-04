---
name: software-delivery
description: Guide Mile42 work through ticket creation, behavioral design, implementation, verification, reconciliation, and multi-ticket delivery. Use when deciding which delivery stage applies, explaining the workflow, resuming an in-flight ticket, or coordinating the stage-specific Mile42 delivery skills.
---

# Software delivery

Use `.agents/software-delivery.config.json` for project configuration and
`.agents/software-delivery.workflow.json` for allowed states.

Route work to the narrowest applicable skill:

- Create or capture work: `create-ticket`
- Define behavior and technical design: `design-ticket`
- Implement, validate, push, and open the PR: `implement-ticket`
- Independently verify a PR: `verify-ticket`
- Accept, return, or create follow-up work: `reconcile-ticket`
- Deliver several tickets or an epic: `deliver-tickets`

Read [references/lifecycle.md](references/lifecycle.md) when determining state,
gates, artifacts, or board transitions.

Read [references/behavioral-contracts.md](references/behavioral-contracts.md)
when creating scenarios or repository requirements.

Read [references/branching-and-prs.md](references/branching-and-prs.md) when
planning branches, PR grouping, or merge order.

Read [references/verification-policy.md](references/verification-policy.md)
when deciding whether a finding blocks the current ticket or becomes follow-up
work.

Read [references/orchestration.md](references/orchestration.md) for multi-ticket
state, recovery, retries, and stopping rules.

Preserve manual gates between stage-specific skills. Invoking `deliver-tickets`
is the explicit authorization to orchestrate the same stages continuously until
a genuine product decision, external blocker, or configured stop condition is
reached.
