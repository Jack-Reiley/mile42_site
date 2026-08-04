# Behavioral contracts

## Contents

1. Scenario rules
2. Designed ticket shape
3. Repository requirements
4. Verification map
5. Drift handling

## Scenario rules

Use stable IDs in the form `SCN-001`, `SCN-002`, and so on. Write observable
behavior in Gherkin-like language without requiring Cucumber:

```gherkin
### SCN-001 — Open checkout from the kiosk

Given the customer is viewing the showroom
And the kiosk is available
When the customer activates the kiosk
Then the camera transitions toward the kiosk monitor
And the checkout interface becomes available
```

Scenarios describe states, actions, and observable results. Do not encode
implementation details as behavior. Add explicit scenarios for important error,
accessibility, persistence, reduced-motion, security, or performance behavior.

## Designed ticket shape

Every designed story or bug includes:

- Problem and user value
- Scope
- Out of scope
- Assumptions
- Dependencies
- Behavioral scenarios
- Edge cases
- Non-functional requirements
- Test intent
- Definition of completion
- Unresolved decisions

Epics include the shared outcome, dependency graph, cross-cutting requirements,
and proposed child tickets. Each child ticket receives its own scenarios before
implementation.

## Repository requirements

During implementation, materialize the approved contract at:

```text
docs/requirements/<ticket-number>-<slug>.md
```

Copy
[the requirements template](../assets/requirements-document.md) and replace all
placeholders. The file must link to the ticket and PR, preserve scenario IDs,
and record deliberate deviations.

The ticket is the design-time source. The repository file is the versioned
contract carried by the implementation branch. Do not silently choose one when
they materially disagree.

## Verification map

Document coverage without making requirements executable:

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Integration + E2E | `path/to/test` | `path/to/spec` | — |

Rules:

- Automated tests must never parse the requirements file.
- Do not generate tests from the requirements document.
- List only test paths that exist.
- When E2E is not appropriate, state the chosen test level or manual rationale.
- The implementation owns the coverage map; verification checks it.

## Drift handling

If the ticket and repository requirements differ:

1. Identify the exact changed scenario, scope, or non-functional requirement.
2. Determine whether the ticket was legitimately refined after implementation
   began.
3. Update both artifacts with human approval when behavior changed.
4. Re-run affected implementation and verification.
5. Record the contract version and reason.

Do not verify against an unresolved contract.
