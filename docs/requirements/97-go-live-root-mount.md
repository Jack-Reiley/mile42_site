# #97 — Go live: serve the designed site at / and retire the coming-soon splash

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/97
- Pull request: <pending>
- Parent epic: none
- Delivery unit: single-ticket, on `feature/97-go-live-root-mount`
- Requirement version: 1

## Objective

The designed site answers at `/` rather than under a `/working` prefix, the
coming-soon splash that stood in front of it is gone, and the site no longer
asks search engines to skip it. This is the go-live change: a visitor who opens
the site reaches the homepage, and a crawler is allowed to index what it finds.

## Scope

- `site/src/main.jsx` mounts `<BrowserRouter>` at the root, with no pathname
  check and no splash branch.
- `site/src/pages/ComingSoon.jsx` is deleted.
- `site/public/_redirects` carries the Agentic AI 301 at its unprefixed path.
- `site/index.html` drops the `noindex, nofollow` meta and carries a title and
  description describing the site rather than the splash.
- `netlify.toml` drops the `X-Robots-Tag` header block.
- The link tests render at the root rather than under a basename.
- A guard sweeps the shipped source and configuration for the retired prefix.
- `docs/requirements/94-privacy-policy-copy.md` records that its SCN-010 is
  superseded here.
- `docs/legal/privacy-counsel-notes.md` names the page's root-relative route.

## Out of scope

- Page copy, navigation, layout, and design, which are unchanged.
- `copy_prototype/`, which is a fixed reference and is untouched.
- Redirects preserving old `/working/*` URLs.
- `robots.txt`, `sitemap.xml`, canonical tags, per-page meta descriptions, and
  analytics.
- Domain, DNS, and Netlify site settings.
- The `noindex` directive on `site/public/__forms.html`, which is a deploy-time
  declaration nobody should reach and is unrelated to the launch posture.

## Behavioral scenarios

### SCN-001 — The site answers at the root

Given a visitor opens the site at `/`
When the page loads
Then the Home page renders
And no coming-soon splash appears

### SCN-002 — Every designed route is reachable at its unprefixed path

Given the site is deployed
When a visitor opens any path in the designed route table
Then that path's page renders at that exact path
And no path requires a prefix

### SCN-003 — The coming-soon splash no longer exists

Given the site has gone live
When the source is inspected
Then no coming-soon page component exists
And no code path renders one

### SCN-004 — An old prefixed URL lands on the site rather than an error

Given a visitor follows a stale `/working` or `/working/...` link
When the request resolves
Then the application loads and the visitor arrives at the Home page
And no error page and no splash is shown

### SCN-005 — The moved Agentic AI page redirects at its root path

Given the Agentic AI page moved under Engineering
When a visitor requests `/agentic-ai`
Then the host answers with a permanent redirect to
`/what-we-do/engineering/agentic-ai`
And the in-app redirect for the same path agrees with it

### SCN-006 — Search engines are no longer asked to skip the site

Given the site is public
When a crawler fetches any page
Then neither the HTML shell nor the response headers carry a `noindex` or
`nofollow` directive

### SCN-007 — The shell describes the site rather than the splash

Given a crawler or a reader sees the document before the app paints
When the shell is read
Then its title and description describe Mile42's offering rather than a
coming-soon notice
And its title matches the Home page's title so the two cannot drift apart

### SCN-008 — The form declaration stays out of the index

Given the contact form's static declaration exists only to be parsed at deploy
time
When the site goes public
Then that file still asks not to be indexed
And no visitor-facing page links to it

### SCN-009 — No link, route, or redirect carries the retired prefix

Given the prefix has been retired
When the shipped source, the hosting configuration, and the redirect rules are
swept
Then no link, `href`, route, redirect target, or asset path contains `/working`
And the only surviving mentions are historical records of already-shipped work

### SCN-010 — Link coverage runs against the real mount

Given the application mounts at the root
When the link tests render
Then they render at the root rather than under a prefix
And the footer's external address is still distinguishable from its in-app
routes

### SCN-011 — A superseded contract clause is recorded rather than silently dropped

Given a scenario in an already-shipped contract required the prefix and the
directives this ticket removes
When that scenario is retired
Then the shipped contract records which ticket superseded it and why
And no test is left asserting behavior the site no longer has

## Non-functional requirements

- No visual, copy, layout, or navigation change on any page. Rendered output is
  identical apart from URLs.
- Accessibility is unchanged; nothing here touches heading structure, landmarks,
  or link and button semantics.
- The contact form keeps working. It posts to an absolute `/__forms.html` and is
  basename-independent, but it is a live path through a changed mount.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit + manual | `site/src/go-live.test.jsx` | N/A | Browser pass on the dev server |
| SCN-002 | Unit + manual | `site/src/go-live.test.jsx`, `site/src/pages/routes.test.jsx` | N/A | Browser pass on a nested route |
| SCN-003 | Unit | `site/src/go-live.test.jsx` | N/A | — |
| SCN-004 | Unit + manual | `site/src/go-live.test.jsx` | N/A | Browser pass on a stale `/working` URL |
| SCN-005 | Unit + manual | `site/src/go-live.test.jsx` | N/A | Browser pass on `/agentic-ai` |
| SCN-006 | Unit | `site/src/go-live.test.jsx` | N/A | — |
| SCN-007 | Unit | `site/src/go-live.test.jsx` | N/A | — |
| SCN-008 | Unit | `site/src/go-live.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/go-live.test.jsx` | N/A | — |
| SCN-010 | Unit | `site/src/components/Footer.test.jsx`, `site/src/pages/homepage-restructure.test.jsx`, `site/src/pages/dewey-entry-points.test.jsx`, `site/src/pages/hero-and-argument-band.test.jsx` | N/A | — |
| SCN-011 | Unit | `site/src/go-live.test.jsx` | N/A | — |

E2E is not appropriate here. The repository has no E2E harness, and the
behavior is routing and static configuration that unit assertions and a browser
pass cover directly.

## Deliberate deviations

- **The link tests lose the basename probe.** Four test files rendered under
  `MemoryRouter basename="/working"`, and the prefix was what separated a link
  React Router had resolved from a raw anchor that bypassed it: a resolved
  `Link` produced `/working/contact` while a stray `<a href="/contact">`
  produced `/contact`. At a root mount both produce `/contact`, so the guard in
  `Footer.test.jsx` weakens from "every link carries the mount prefix" to "every
  link starts with `/`". Keeping a synthetic basename was considered and
  rejected at design: it would assert a mount the application does not have.
  SCN-009's sweep and SCN-010 cover the transition; the residual gap is
  accepted and recorded here rather than left unstated.
- **`site/index.html` now carries copy that must track `App.jsx`.** The shell
  title duplicates the Home page's `PAGES` title so a crawler that does not run
  JavaScript sees a real title. Duplication is drift risk, which is exactly what
  #78 was, so SCN-007 pins the two together rather than trusting them to stay in
  step.
- **#94's SCN-010 is retired rather than fixed.** It asserted the `/working`
  mount and both `noindex` directives, which this ticket removes by design. The
  supersession is recorded in that contract's history under SCN-011.

## Open questions

- No `robots.txt`, `sitemap.xml`, canonical tags, or per-page meta descriptions.
  Removing the directives is sufficient to allow indexing; the rest is real SEO
  work and wants its own ticket. Carried forward from the ticket unresolved.
- Whether the domain, DNS, and Netlify site settings are launch-ready. Outside
  this repository and outside this ticket.
