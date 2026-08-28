# Privacy policy: notes for counsel

Date prepared: August 27, 2026
Page: `site/src/pages/Privacy.jsx`, served at `/legal/privacy`

## Status

The privacy page now contains full policy copy. It was drafted from what the
site actually does, not from a template, but it has not been reviewed by a
lawyer. The site is currently `noindex, nofollow` and not public.

## What the site actually does

These are the verified facts the policy was written against. If any of them
change, the policy is wrong.

- The contact form collects: name, work email, organization, "What needs to
  work?" (required free text), and "Anything else we should know?" (optional
  free text). It also carries a hidden honeypot field that only bots fill in.
- Submissions post to Netlify Forms and nowhere else. Netlify stores the
  submission and notifies Mile42 by email.
- There is no analytics, no third-party script, no advertising or social
  tracker, and no CAPTCHA vendor anywhere on the site.
  Source: `docs/requirements/81-netlify-contact-form.md`, non-functional
  requirements.
- The site is hosted on Netlify. Netlify creates ordinary web server records
  (IP address, user agent, page, timestamp).
- The published contact address is hello@mile42.ai.
- The site is a client-rendered SPA. With JavaScript off there is no page, and
  the mailto link is the only route.

## Structure the page follows

1. Who we are, and how to reach us
2. What we collect
3. How we collect it
4. Why we process it, including UK/EU lawful basis
5. Who we share it with, naming processors
6. How long we keep it
7. Where it is stored, including international transfer
8. Cookies and tracking signals
9. Your rights, split into UK/EEA and US state rights
10. Security
11. Children
12. Changes to this policy
13. Contact

## Open items counsel needs to decide or supply

1. **Legal entity and address.** The page names only "Mile42" and an email
   address. Most privacy laws expect the controller's legal name and a postal
   address. Supply the registered entity name, state of formation, and mailing
   address.
2. **Email and productivity provider.** The processor list names Netlify and
   then says "our email and productivity provider" without naming it. Decide
   whether to name it (Google Workspace, Microsoft 365, or other).
3. **Server log retention.** The page says technical records are kept "only for
   the limited period our hosting provider retains them." Confirm Netlify's
   actual retention period and decide whether to state a number.
4. **International transfer safeguard.** The page states reliance on the
   standard contractual clauses in providers' data processing terms. Confirm
   that Mile42 has executed Netlify's DPA and that the SCCs apply, or change
   the wording.
5. **UK/EU exposure.** Confirm whether GDPR and UK GDPR actually apply. If they
   do, decide whether an Article 27 representative in the UK or EU is required.
   If they do not, the UK/EEA rights section can be cut.
6. **US state law thresholds.** The page grants access, correction, deletion,
   and opt-out rights to all US visitors rather than only to residents of
   states where thresholds are met. This is deliberate and simpler, but confirm
   it is acceptable.
7. **Appeal process.** Several US state laws require a defined appeal route for
   a denied request. The page says a decision can be appealed by replying to
   it. Confirm that is sufficient, or specify a process.
8. **Cookie statement.** The page says Netlify may set a strictly necessary
   cookie. Verify what cookies, if any, the deployed site actually sets before
   this goes public.
9. **Scope boundary.** The page says the policy does not cover personal data
   processed on behalf of a client under a signed engagement. Confirm that the
   engagement contracts and DPAs actually cover that, so there is no gap.
10. **Children's age threshold.** The page uses "under 16." Confirm the right
    threshold for the jurisdictions in play (COPPA uses 13, GDPR allows member
    states to set 13 to 16).
11. **Effective date and change notice.** The page shows a "Last updated" date
    only. Decide whether an effective date and a change-notification commitment
    are also needed.
12. **Do Not Track / Global Privacy Control.** The page says the signal is
    honored by default because nothing here tracks. Confirm that phrasing is
    acceptable, since some state laws require an explicit statement.

## Standing rule

A policy that does not accurately describe what the site does is worse than
having none. If the site adds analytics, a CRM, a chat widget, an embedded
scheduler, or an email marketing tool, this page must change in the same
release.
