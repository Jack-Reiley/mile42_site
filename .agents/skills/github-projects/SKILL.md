---
name: github-projects
description: Read and update Mile42 GitHub Issues and Projects V2 state for the software-delivery workflow, including ticket snapshots, board transitions, Size, Estimate, type labels, parent epics, and project membership. Use whenever a delivery stage reads or changes ticket or board state.
---

# GitHub Projects

Use the deterministic helpers in `scripts/project-board.sh` rather than
recreating GraphQL queries in every stage:

```bash
source .agents/skills/github-projects/scripts/project-board.sh
```

Available operations:

- `ticket_snapshot <issue>`: one-call status, fields, labels, and parent
- `get_status <issue>`
- `get_type <issue>`
- `has_label <issue> <label>`
- `require_status <issue> <semantic-status>`
- `move_ticket <issue> <semantic-status>`
- `add_issue_to_project <issue-url>`
- `set_size <issue> <XS|S|M|L|XL>`
- `set_estimate <issue> <1|2|3|5|8|13|21>`
- `set_parent_issue <child> <parent>`
- `claim_ticket <issue>`

Semantic statuses are:

```text
backlog
ready
implementing
verifying
reviewing
complete
```

Resolve their actual board names and option IDs from
`.agents/software-delivery.config.json`. Never hardcode capitalization.

Fetch a ticket snapshot once and reuse it when a stage needs several fields.
Treat the board as shared status and verify every write by reading the resulting
state. Do not move a ticket when a precondition fails.

Use `gh issue` and `gh pr` for issue/PR bodies, comments, and relationships not
covered by the helpers. Require explicit approval before ticket creation or
ambiguous follow-up creation unless an approved `deliver-tickets` run already
authorizes it.
