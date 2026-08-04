# Verification and fail-forward policy

## Contents

1. Verification statuses
2. Required evidence
3. Finding classes
4. Pass criteria
5. Reconciliation outcomes
6. Follow-up boundary

## Verification statuses

Give every required scenario exactly one result:

```text
PASS
FAIL
BLOCKED
NOT_TESTED
```

## Required evidence

Verification evaluates observable behavior, not merely test exit codes. Record:

- Scenario result and evidence
- Commands and test paths used
- Relevant UI screenshots or video
- API and persistence evidence when the scenario requires it
- Regression checks
- Accessibility, security, and performance observations when applicable
- Environment limitations

Use UI/API/persistence parity only for behaviors that cross those layers. Do not
invent database checks for work without persistence.

## Finding classes

- `IMPLEMENTATION_DEFECT`: the contract is clear and the PR fails it.
- `REQUIREMENT_AMBIGUITY`: more than one behavior is plausible.
- `ADJACENT_DISCOVERY`: the current contract passes and new work was found.
- `ENVIRONMENT_BLOCKER`: verification cannot be completed reliably.
- `NON_FUNCTIONAL_FAILURE`: a required or project-wide quality gate failed.

## Pass criteria

An unqualified pass requires:

- Every required scenario is `PASS`.
- No required behavior is silently skipped.
- Listed automated test paths exist.
- Observable behavior agrees with the contract.
- Material environment limitations are resolved.

Green automated tests do not overrule visibly incorrect behavior.

## Reconciliation outcomes

Use exactly one:

```text
ACCEPT
RETURN_TO_IMPLEMENTATION
ACCEPT_WITH_FOLLOW_UP
SPLIT_INTO_FOLLOW_UP_TICKETS
BLOCKED_BY_REQUIREMENT_DECISION
```

Reconciliation begins with an independent assessment, then incorporates
developer feedback before applying an ambiguous or follow-up outcome.

## Follow-up boundary

Never defer a failed required scenario. Return it to implementation on the same
branch and PR.

Create follow-ups only when:

- The current contract passes.
- The finding is new, adjacent, or explicitly out of scope.
- Fixing it now would expand scope.
- The follow-up can be written with testable scenarios.

Every follow-up links the source ticket, PR, verification finding, and parent
epic where applicable. It receives type, size, estimate, scope, and Gherkin-like
scenarios before entering implementation.
