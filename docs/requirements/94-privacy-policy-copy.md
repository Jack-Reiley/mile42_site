# #94 — Replace the privacy policy stub with real copy, deferring legal review

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/94
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/96
- Parent epic: none
- Delivery unit: single-ticket, on `feature/mile42-icons-3` by approved deviation
- Requirement version: 2

## Objective

A reader who follows the footer's privacy link reaches a real privacy policy
that describes what this site actually does with their information, rather than
a placeholder admitting no policy has been written. The claims it makes are
pinned to the source, so they cannot silently become false.

## Scope

- The policy copy on `site/src/pages/Privacy.jsx`, covering who Mile42 is, what
  it collects, how, why, who it shares with, retention, storage location,
  cookies, rights split by jurisdiction, security, children, and change notice.
- The last-updated date, placed below the header band and toned for the band it
  sits on.
- `docs/legal/privacy-counsel-notes.md`, recording the verified facts the policy
  was written against and the open items counsel must decide.
- Guard coverage pinning the policy's factual claims to the source.

## Out of scope

- Legal review and sign-off, and the 12 open items in the counsel notes. #95.
- Removing the `/working` mount or the `noindex, nofollow` directives. Making
  the site public is a separate decision.
- The `copy_prototype/` privacy stub, which is a fixed reference.

## Behavioral scenarios

### SCN-001 — The page carries real policy copy rather than a placeholder

Given a reader opens the privacy page
When the page renders
Then it presents policy sections covering who Mile42 is and how to reach it,
what it collects, how it collects it, why it processes it, who it shares with,
how long it keeps it, where it is stored, cookies and tracking signals, the
reader's rights, security, children, and how the policy changes
And no placeholder component appears anywhere on the page
And the page does not state that no privacy policy has been written

### SCN-002 — The page carries a real heading hierarchy

Given a reader opens the privacy page
When the page renders
Then the page carries exactly one `h1`, reading "Privacy policy."
And each policy section is introduced by an `h2`
And the two jurisdiction subsections under rights are `h3` elements nested
under the rights `h2`
And no heading level is skipped

### SCN-003 — The last-updated date sits below the header

Given a reader opens the privacy page
When the page renders
Then the brand header band carries the eyebrow, the heading, and the lead only
And the last-updated date appears below that band, at the top of the content
column
And it reads "Last updated August 2026"

### SCN-004 — The date takes a tone legible on the band it sits on

Given the last-updated date sits on the page band rather than a brand band
When the page renders
Then the date takes the ink tone
And no line on any brand band on this page takes the ink tone

### SCN-005 — The no-tracking claim matches the site

Given the policy states that the site runs no analytics, no advertising or
social media trackers, no third-party scripts, and no CAPTCHA vendor
When the site source is inspected
Then no analytics tag, advertising or social tracker, third-party script, or
CAPTCHA vendor is present in the application source or the HTML shell

### SCN-006 — The contact-form description matches the form

Given the policy states that submissions post to Netlify and that a hidden field
no person can fill identifies spam
When the contact form is inspected
Then the form Netlify parses declares itself as a Netlify form
And it names a honeypot field
And that field is present on the rendered form and is not reachable by a person

### SCN-007 — The footer privacy link resolves to the page

Given a reader is on any page of the site
When they activate the Privacy link in the footer
Then the privacy page opens at the site's `legal/privacy` route

### SCN-008 — A reader can act on the policy

Given a reader wants to ask a question or exercise a right
When they read the policy
Then a `mailto` link to the published privacy address is available in the body
And the closing band offers the same address as its call to action

### SCN-009 — The counsel notes record what was verified and what is open

Given the policy shipped without legal review
When `docs/legal/privacy-counsel-notes.md` is read
Then it names the page and the route it serves at
And it records the verified facts the policy was written against
And it lists the open items counsel must decide
And it states that the copy has not been reviewed by a lawyer

### SCN-010 — Shipping this page does not make it public

Given the designed site is not public
When the privacy page is deployed
Then the site-wide `noindex, nofollow` directives remain in both the HTML shell
and the hosting configuration
And the page remains reachable only under the `/working` mount
And the public splash continues to serve every other path

## Non-functional requirements

- Accessibility is functional, not polish: one `h1`, no skipped heading levels,
  and the email routes are real links rather than scripted handlers.
- Every line on the brand header meets WCAG AA on that fill, reached through the
  tone prop rather than a hand-written colour utility.
- The content column holds a single readable column and does not scroll
  horizontally at 375px.
- No new runtime dependencies, no client-side state, no network calls, and no
  third-party requests.

## Verification map

This repository has no E2E harness, so every scenario is covered at unit level
or by manual evidence. That is the chosen level, not a gap left open.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/Privacy.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/Privacy.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/Privacy.test.jsx` | N/A | browser pass, desktop and 375px |
| SCN-004 | Unit | `site/src/pages/Privacy.test.jsx`, `site/src/pages/brand-band-tones.test.jsx` | N/A | — |
| SCN-005 | Unit | `site/src/pages/Privacy.test.jsx` | N/A | — |
| SCN-006 | Unit | `site/src/pages/Privacy.test.jsx`, `site/src/pages/Contact.test.jsx` | N/A | — |
| SCN-007 | Unit | `site/src/components/Footer.test.jsx` | N/A | — |
| SCN-008 | Unit | `site/src/pages/Privacy.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/pages/Privacy.test.jsx` | N/A | — |
| SCN-010 | Unit | `site/src/pages/Privacy.test.jsx` | N/A | — |

## Contract history

- Version 1: as approved at design.
- Version 2: restores the SCN-002 clause "nested under the rights `h2`", which
  version 1 dropped when transcribing the ticket. Raised as F-001 in
  verification run 1. The ticket is the design-time source and always carried
  the clause, so this is a correction of the repository contract rather than a
  change of behavior. SCN-005's coverage was widened in the same cycle for
  F-002; the scenario text was already correct and is unchanged.

## Deliberate deviations

- **Branch.** `branching-and-prs.md` calls for `feature/94-<slug>` based on the
  default branch. This work sits on `feature/mile42-icons-3` alongside unrelated
  commits, by explicit instruction. Approved at design.
- **Sequence.** Implementation of the copy preceded the design and this
  contract. The copy landed in `801d197`; the design was approved afterwards and
  this document records the behavior it pinned. Tests and this contract were
  written after that copy, so the contract describes observable behavior rather
  than having driven it.

## Open questions

- The 12 items counsel must decide remain open and are tracked on #95. They are
  deliberately not blocking this contract.
