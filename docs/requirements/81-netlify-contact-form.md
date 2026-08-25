# #81 — Deliver contact form submissions through Netlify Forms

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/81
- Pull request: PR_URL_PLACEHOLDER
- Parent epic: none
- Delivery unit: independent
- Requirement version: 1

## Objective

A visitor who completes the contact form causes a real submission to reach
Mile42 through Netlify Forms, and the page tells the truth about whether it
worked.

## Scope

- `site/public/__forms.html`: a new static declaration of the contact form, the
  only thing Netlify's deploy-time parser can find on a client-rendered site.
- `site/src/pages/Contact.jsx`: a real url-encoded POST, the `form-name` field
  Netlify matches on, a honeypot, sending and failure states, focus into the
  success panel, and the removal of the prototype disclaimer.
- `site/src/pages/Contact.test.jsx`: new. The page had no tests.

## Out of scope

- The field set, the labels, and the field styling, which stays as
  `site/EXTRAPOLATIONS.md` records it.
- The "What to expect" column and the `mailto:` fallback.
- Any CAPTCHA. Declined by direction on the ticket; the honeypot and Netlify's
  built-in Akismet screening are the whole spam posture.
- Launching the site or removing the `noindex` header.
- `copy_prototype/`, which is a fixed reference with its own contact page.

## Behavioral scenarios

### SCN-001 — The deploy declares the form Netlify must register

Given the site has been built
Then the published output contains a static HTML document declaring a form named
"Contact"
And that declaration names every field the visitor's form sends, the spam trap
included
And no field exists in one place and not the other

### SCN-002 — A completed form reaches Mile42

Given a visitor on the deployed contact page has filled in every required field
When they submit
Then the submission appears in the site's Netlify form inbox under the name
"Contact"
And every field's value arrives intact
And Mile42 is notified without anyone opening a dashboard

### SCN-003 — Success is claimed only once the submission is accepted

Given a visitor submits the form
When Netlify accepts the submission
Then the success panel replaces the form
And nothing on the page claims the message was not really sent

### SCN-004 — A failed submission is recoverable

Given a visitor submits the form
When the submission is rejected or the request fails
Then the success panel is not shown
And an error names another way to reach Mile42
And every value the visitor typed is still in the fields
And submitting again is possible without retyping anything

### SCN-005 — A submission in flight cannot be sent twice

Given a visitor has submitted and the request has not resolved
Then the submit control reports that it is working and cannot be activated again
And only one submission is sent

### SCN-006 — An incomplete form still cannot be submitted

Given a visitor leaves a required field empty
When they submit
Then the browser reports the missing field
And nothing is sent

### SCN-007 — The spam trap is invisible to people and to assistive technology

Given a visitor moving through the form by keyboard or screen reader
Then the spam trap is never reached by tabbing and is never announced
And a submission that leaves it empty is accepted normally

### SCN-008 — The success panel is announced, not just scrolled to

Given the success panel replaces the form
Then focus moves into the panel so a screen reader announces it
And a visitor who prefers reduced motion is not scrolled with animation

### SCN-009 — The rest of the contact page is untouched

Given the contact page
Then the "What to expect" column, its numbered list, and the `hello@mile42.ai`
link are unchanged
And the form's fields, labels, and styling are unchanged
And "Send another" still returns an empty form

## Non-functional requirements

- The error is announced when it appears rather than merely drawn: it carries
  `role="alert"`, which is an assertive live region.
- The spam trap is out of both the tab order and the accessibility tree.
- Focus lands in the success panel, which the form it replaces cannot do for it,
  because that form is hidden.
- The success scroll does not animate when the visitor prefers reduced motion.
- Field values go to Netlify and nowhere else. No analytics, no third-party
  script, no CAPTCHA vendor.
- No secrets and no environment variables. Nothing here is client-configurable.
- One request per submit. No new dependency.
- Progressive enhancement is not claimed. The site is a client-rendered SPA, so
  with JavaScript off there is no page at all; the `mailto:` link is the non-JS
  route and it stays.

## Why the submission is posted to `/__forms.html`

Netlify's form debugging guide records that a submission aimed at a path covered
by a redirect rule is consumed by that rule, and names a 404 on submit as the
symptom. `site/public/_redirects` ends in `/*  /index.html  200`.

The redirects documentation gives the exit, using that exact rule as its worked
example: a rewrite without a `!` force flag cannot shadow a path that really
exists. `/working/contact` has no file behind it and would be rewritten;
`/__forms.html` is a real file in the publish root and is not.

Posting to the declaration's own path therefore removes the interaction with the
fallback rather than depending on how it resolves.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/Contact.test.jsx` | N/A | `site/dist/__forms.html` after `npm run build`; it is the only `.html` in the publish root containing a `<form>` |
| SCN-002 | Manual only | Partial: `site/src/pages/Contact.test.jsx` asserts the request's target, method, encoding, and every field it carries | N/A | Requires a deployed URL. Netlify form handling does not exist under `vite dev` or `vite preview`, so the inbox entry and the notification cannot be produced locally |
| SCN-003 | Unit | `site/src/pages/Contact.test.jsx` | N/A | Submitted on localhost against the dev server, which answers 200: success panel replaced the form, disclaimer absent |
| SCN-004 | Unit | `site/src/pages/Contact.test.jsx` | N/A | Submitted on localhost with the endpoint answering 404: error shown, success withheld, all four values still in the fields |
| SCN-005 | Unit | `site/src/pages/Contact.test.jsx` | N/A | — |
| SCN-006 | Unit | `site/src/pages/Contact.test.jsx` | N/A | jsdom implements `reportValidity`, so this is automated rather than manual as the design expected |
| SCN-007 | Unit | `site/src/pages/Contact.test.jsx` | N/A | `offsetParent` null in a real browser, confirming it is not rendered |
| SCN-008 | Unit | `site/src/pages/Contact.test.jsx` | N/A | Focus confirmed on the panel in a real browser after a successful submit |
| SCN-009 | Unit | `site/src/pages/Contact.test.jsx` | N/A | Desktop and 375px passes: no horizontal scroll, error contained within the card |

There is no E2E harness in this repository, so no scenario names one. SCN-002 is
the only scenario with no automated route at all, and that is by construction
rather than by omission: the behavior under test belongs to Netlify's
infrastructure and appears only on a deploy.

## Deliberate deviations

- **The spam trap is hidden with the `hidden` attribute rather than the
  `aria-hidden` plus `tabindex="-1"` pairing the design named.** `hidden` takes
  the field out of the tab order and the accessibility tree in one move, while
  `FormData` still submits it. It reaches the same behavior with less markup and
  avoids putting `aria-hidden` on a focusable control, which is itself an
  accessibility defect. SCN-007 is unchanged and is what the tests assert.
- **SCN-006 is automated.** The design expected it to be manual on the grounds
  that real browser constraint validation was the thing under test. jsdom
  implements `reportValidity`, so the test is real. The manual check stays
  available but is no longer the only evidence.

## Open questions

- **`hello@mile42.ai` is not yet wired to the form in the Netlify UI.** Agreed on
  the ticket to happen once submissions are being registered. SCN-002 is not
  complete until it does.
- **Whether deploy previews are enabled for this repository.** If they are not,
  SCN-002 cannot be verified until after this merges to `main`.
- **The hint under "What needs to work?" sits inside the `<label>`**, so it is
  folded into that field's accessible name rather than being a separate
  description. Pre-existing, unrelated to this change, and out of scope; noted
  because the tests had to match the real accessible name.
