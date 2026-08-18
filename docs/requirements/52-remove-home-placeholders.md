# #52 — Remove the home page's placeholder blocks and give Contact a real email

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/52
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/53
- Parent epic: none
- Delivery unit: `unit-52-remove-home-placeholders`
- Requirement version: 1

## Objective

A visitor to the home page sees a finished page. No dashed scaffolding, no
"Proof statement 1", no "LOGO 3". A visitor to the contact page finds a real
address they can write to instead of a note explaining that no address exists.

## Scope

- The "Deep experience where it counts" section is removed from `/` in full:
  heading, lead, multi-model note, three `Placeholder` cards, and the six logo
  slots.
- `LogoSlots` is deleted from `site/src/components/Lists.jsx`. Home was its only
  consumer.
- The contact page's placeholder block becomes `hello@mile42.ai`, linked with
  `mailto:`.
- The footer's "Email" link points at the same address instead of routing to
  `/contact`.
- `site/EXTRAPOLATIONS.md` no longer describes the site as having logo slots.

## Out of scope

- A phone number. One was considered at ticket creation and deliberately
  deferred: the available number was in the reserved fictional range, and a fake
  number rendered as a working `tel:` link is harder to catch before launch than
  a dashed box that announces itself. Its own ticket when the number is real.
- LinkedIn. No company page URL exists, so the contact block omits it rather
  than linking nowhere, and the footer's "LinkedIn" link still goes to
  `/contact`.
- The `Placeholder` primitive, still used by Insights and Privacy.
- The dashed blocks on `/insights` and `/legal/privacy`, which wait on content
  that does not exist.
- Real client proof, case studies, or partner logos. Removing the empty slots is
  not a decision that they never return.
- `Spine` in `Lists.jsx`, which has had no caller since #34 and stays that way by
  that ticket's own recorded decision.
- `copy_prototype/`.

## Behavioral scenarios

### SCN-001 — No placeholder scaffolding on the home page

Given a visitor opens the home page
Then no dashed placeholder block appears anywhere on the page
And no text reading "Proof statement" appears
And no text reading "LOGO" followed by a number appears

### SCN-002 — The experience and partners section is gone

Given a visitor reads the home page from top to bottom
Then there is no section headed "Deep experience where it counts"
And the page runs offerings, engagement principles, core practice, then the
closing call to action
And no two consecutive sections share a background colour

### SCN-003 — The logo slot component no longer exists

Given a developer searches the codebase for the logo slot component
Then LogoSlots is not defined or exported anywhere
And no file imports it
And no live document describes the site as having logo slots

### SCN-004 — Contact offers a reachable email

Given a visitor opens the contact page
When they read the "Other ways to reach us" heading
Then they see hello@mile42.ai directly beneath it
And activating it opens their mail client addressed to hello@mile42.ai
And no dashed placeholder block appears on the page

### SCN-005 — The footer email link leaves the app

Given a visitor is anywhere on the site
When they activate the footer's "Email" link
Then their mail client opens addressed to hello@mile42.ai
And the link does not navigate the page to an in-app route
And every other footer link still navigates within the app as before
And the footer's "LinkedIn" link still goes to the contact page

### SCN-006 — Out-of-scope placeholders are untouched

Given the insights and privacy pages still await real content
When a visitor opens either page
Then their existing placeholder blocks still render exactly as before
And the shared Placeholder component is unchanged

### SCN-007 — Both new links are keyboard reachable

Given a keyboard user tabs through the contact page and the footer
When focus reaches the email address or the footer's Email link
Then a visible focus indicator appears on it
And it is reachable and activatable by keyboard alone
And it is a real link, announced as a link by assistive technology

### SCN-008 — The site still builds with nothing left dangling

Given the removals are complete
When the site is built
Then the build succeeds
And no file imports a component that no longer exists
And no import is left declared but unused

## Non-functional requirements

- Both new links are real anchors carrying real `href` attributes. No click
  handler, no button, no JavaScript navigation.
- Neither opens in a new tab, so neither needs a `rel` attribute.
- No horizontal overflow at 375px on either changed page.
- No change to any shipped illustration, token, or stylesheet.
- The home page's band rhythm still alternates, with no two adjacent sections
  sharing a background.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Home page inspected at 1280px and 375px: zero elements matching `border-dashed`, and neither "Proof statement" nor "LOGO" present in the rendered text |
| SCN-002 | Manual | — | N/A | Rendered section order and computed background colours read off the page: green, cream, white, cream, green, with no "Deep experience" heading |
| SCN-003 | Manual | — | N/A | Repository search finds no definition, export, or import of `LogoSlots`, and the `EXTRAPOLATIONS.md` row naming logo slots is narrowed to `Spine` |
| SCN-004 | Manual | — | N/A | Contact page inspected: the element following "Other ways to reach us" is an `<a>` with `href="mailto:hello@mile42.ai"`, and zero `border-dashed` elements remain |
| SCN-005 | Unit + manual | `site/src/components/Footer.test.jsx` | N/A | Unit test renders the footer under the real `/working` basename and asserts the email href is unprefixed while every other link carries the basename; confirmed against the running dev server |
| SCN-006 | Manual | — | N/A | `/insights` still renders its four placeholder blocks; `git diff` shows neither page nor the `Placeholder` primitive was touched |
| SCN-007 | Manual | — | N/A | Footer link reached by a real Tab keypress: matches `:focus-visible` and computes `outline: 3px solid rgb(0,115,244)` at `3px` offset, which is `--color-accent` exactly. Contact link: `tabIndex` 0, in the tab order, and the same computed outline under `:focus-visible`. Both are plain anchors carrying an `href`, so both are matched by the global `:where(a, …):focus-visible` rule |
| SCN-008 | Automated | — | N/A | `npm run build` exits zero |

Six scenarios are verified manually because they assert the absence of markup or
the removal of a component. A test that asserts a deleted thing is still deleted
fails the moment someone deliberately reintroduces it, which is the wrong
signal. SCN-005 is the exception: it is the only behavior this ticket adds
rather than removes, so it is the only one carrying a test.

## Deliberate deviations

**The footer needed no new logic. The design said it did.**

The approved design specified an `external` flag on the footer's `COLUMNS`
entries and a `Tag`/`target` branch in the renderer, on the stated premise that
"`mailto:` is not a route, so `Link` cannot carry it."

That premise is false, and it was tested rather than assumed. React Router
detects an absolute URL scheme in `to`, renders the raw URL as the `href`, and
attaches no SPA click handler:

```js
let isSpaLink = !(parsed.isExternal || reloadDocument);
href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
onClick: isSpaLink ? handleClick : onClick,
```

Confirmed three ways: a probe render under a `/working` basename produced
`mailto:hello@mile42.ai` unprefixed; the running dev server renders the same
`href` on the real `BrowserRouter`; and the branch above shows the click is left
to the browser.

The footer is therefore a one-line change to a single `href`, and the renderer
is untouched. This is the smaller change, it keeps the existing pattern, and it
adds no abstraction. SCN-005 is unchanged and still passes.

The unit test reproduces the `/working` basename deliberately. Without it the
test passes whether or not the change is correct, since the basename is the only
thing that would corrupt the address.

## Open questions

- Whether the home page should regain an experience or partners beat. Out of
  scope here; it needs real client proof or real partner logos, neither of which
  exists.
- Whether the phone number returns, and when. Blocked on a real number.
