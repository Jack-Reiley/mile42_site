# Branching and pull requests

## Contents

1. Single-ticket delivery
2. Shared branch and PR
3. Independent PRs
4. Stacked PRs
5. PR content and merge order

## Single-ticket delivery

Use the configured default branch unless the delivery plan names another base.
Follow the repository's required agent prefix before the configured kind-based
prefix. In Mile42, Codex-created branches use `codex/<ticket>-<slug>` as required
by `AGENTS.md`; otherwise use `feature/<ticket>-<slug>` for stories,
`bugfix/<ticket>-<slug>` for bugs, and `hotfix/<ticket>-<slug>` for hotfixes.

Implementation owns branch creation, commits, push, and PR creation. Verification
must require the existing PR and must never create it.

For Mile42, open PRs ready for review unless repository guidance explicitly
permits a draft.

## Shared branch and PR

Use one feature branch and one PR when tickets:

- Belong to one cohesive epic or user-visible capability
- Modify overlapping code
- Must be validated together
- Would create incomplete intermediate states if split

Use an epic-level branch such as `feature/epic-140-kiosk-checkout`, applying any
repository-required agent prefix instead. Keep commits identifiable by ticket,
create one requirements document per ticket, and list every included ticket in
the PR.

All tickets in the delivery unit move together after the unit satisfies every
required scenario. Verification results remain attributable to individual
tickets.

## Independent PRs

Use separate branches from the default branch when tickets are disconnected,
can ship independently, affect unrelated systems, or need risk/reviewer
isolation.

Argument order is priority, not proof of dependency. Do not stack independent
tickets.

## Stacked PRs

Use stacked PRs only for a real code, API, or migration dependency. The child
branch and child PR must use the same parent branch as their base.

Every stacked PR declares:

- Delivery group
- Position in merge order
- `Depends on`
- `Must merge before`
- Base branch
- Related tickets and PRs

## PR content and merge order

Copy [the PR template](../assets/pull-request.md). Include:

- Tickets and parent epic
- Requirements documents
- Scenario checklist
- Developer validation
- Deliberate deviations
- Delivery strategy
- Related PRs and merge order

Automation must never merge. A human reviews and merges accepted work.
