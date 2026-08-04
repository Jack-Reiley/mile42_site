---
name: verify-ticket
description: Independently verify an existing Mile42 pull request against every stable ticket scenario and its repository requirements, audit real test coverage, gather user-visible evidence, and return implementation defects or advance to reconciliation. Use for QA after implementation creates the PR.
---

# Verify ticket

Read:

- `../software-delivery/references/behavioral-contracts.md`
- `../software-delivery/references/verification-policy.md`
- `../software-delivery/assets/verification-report.md`
- `../github-projects/SKILL.md`
- `AGENTS.md`

1. Require the ticket to be in In QA with an existing branch, PR, and repository
   requirements document. Verification must never create the PR.
2. Check the ticket scenarios and repository requirements for drift. Stop on
   unresolved differences.
3. Read the complete diff, developer validation, declared test paths, related
   requirements, and prior reports.
4. Build a ledger containing every required `SCN-NNN` before testing.
5. Verify each scenario through the narrowest reliable evidence:
   - Automated tests and static checks
   - Browser/UI behavior for user-visible flows
   - API and persistence evidence when the behavior crosses those layers
   - Visual/video evidence for Mile42 rendering or animation behavior
6. Audit that every declared test path exists. Requirements document coverage
   is a map, not a test driver.
7. Give every scenario exactly one result: `PASS`, `FAIL`, `BLOCKED`, or
   `NOT_TESTED`.
8. Classify findings using the shared verification policy.
9. Post a report using the shared template and retain evidence links.
   During an orchestrated run, also persist a schema-valid JSON result under the
   run's `verification/` directory.
10. Decide:
    - Required scenario or project quality gate fails: keep In QA and return to
      `implement-ticket` on the same branch and PR.
    - All required scenarios pass: move to In review and mark
      `reconciliation_required`.
    - Environment prevents material verification: block and report.

Do not create follow-up tickets. Reconciliation decides whether adjacent
discoveries become future work.
