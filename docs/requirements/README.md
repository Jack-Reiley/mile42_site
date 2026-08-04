# Requirements

Versioned behavioral contracts, one per delivered ticket, named
`<ticket>-<slug>.md`.

`implement-ticket` writes these from the approved `SCN-NNN` scenarios on the
ticket and maps each scenario to real automated or manual evidence.
`verify-ticket` reads both the ticket and the document, checks for drift, and
records `PASS`, `FAIL`, `BLOCKED`, or `NOT_TESTED` for every scenario.

These documents are project memory. Tests never parse them, generate from them,
or use them to drive execution.

See `.agents/README.md` for the full lifecycle.
