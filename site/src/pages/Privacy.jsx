import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Button } from '../components/primitives.jsx'
import { PlainList, TermList } from '../components/Lists.jsx'

const LAST_UPDATED = 'August 2026'
const PRIVACY_EMAIL = 'hello@mile42.ai'

const WHAT_WE_COLLECT = [
  [
    'What you send us',
    'Your name, work email address, organization, and whatever you write in the message fields of the contact form. If you email us directly instead, we receive whatever your message contains, including anything you attach.',
  ],
  [
    'Technical records',
    'Ordinary web server information created when a page is requested: IP address, browser and device type, the page requested, and the time of the request. Our hosting provider creates and holds these records.',
  ],
  [
    'Nothing else',
    'This site runs no analytics, no advertising or social media trackers, no third-party scripts, and no CAPTCHA vendor. We do not buy personal information, and we do not build profiles of visitors.',
  ],
]

const PROCESSORS = [
  'Netlify, Inc., which hosts this website and which receives, stores, and forwards contact form submissions.',
  'Our email and productivity provider, which hosts the mailbox where your message arrives and where our reply is written.',
]

const UK_EEA_RIGHTS = [
  'Access a copy of the personal data we hold about you.',
  'Have it corrected if it is wrong, or erased when we no longer need it.',
  'Restrict or object to our processing of it.',
  'Receive it in a portable, machine-readable form.',
  'Complain to your supervisory authority, which in the United Kingdom is the Information Commissioner’s Office.',
]

const US_STATE_RIGHTS = [
  'Know what personal information we have collected and get a copy of it.',
  'Have it corrected or deleted.',
  'Opt out of its sale, of sharing for targeted advertising, and of profiling. We do none of the three, so there is nothing here to opt out of.',
  'Use an authorized agent to make a request, and appeal a decision we make on one by replying to it.',
]

export default function Privacy() {
  return (
    <>
      <Section band="brand" grain pad="header">
        <Wrap>
          <Eyebrow tone="hero" className="mb-4">Legal</Eyebrow>
          <H1 tone="hero" className="mb-6">Privacy policy.</H1>
          <Lead tone="hero">
            What Mile42 collects when you use this site, why we collect it, who else touches it, and what you can
            ask us to do with it.
          </Lead>
        </Wrap>
      </Section>

      <Section>
        <Wrap className="flex max-w-3xl flex-col gap-12">
          <Eyebrow tone="ink">Last updated {LAST_UPDATED}</Eyebrow>

          <div>
            <H2 className="mb-4">Who we are, and how to reach us.</H2>
            <Body className="mb-4">
              Mile42 is an AI consulting firm. This policy covers this website and the messages you send us through
              it. It does not cover personal data we process on behalf of a client under a signed engagement, which
              is governed by the contract for that engagement.
            </Body>
            <Body>
              For any question about this policy, or to make a request about your information, email{' '}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-accent-deep underline">{PRIVACY_EMAIL}</a>.
            </Body>
          </div>

          <div>
            <H2 className="mb-6">What we collect.</H2>
            <TermList items={WHAT_WE_COLLECT} variant="wide" />
          </div>

          <div>
            <H2 className="mb-4">How we collect it.</H2>
            <Body className="mb-4">
              Two ways. The contact form posts your entry directly to our hosting provider, which stores the
              submission and notifies us by email. The technical records above are created automatically by that
              same provider each time it serves a page.
            </Body>
            <Body>
              The form also carries a hidden field that no person can see or fill in. Only automated spam completes
              it, which is how a submission is identified as spam rather than as a message from you.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">Why we process it.</H2>
            <Body className="mb-4">
              We use what you send to read your message, reply to it, and have whatever conversation follows. If
              that conversation becomes an engagement, your contact details become part of the client record. We use
              the technical records to keep the site available and secure and to deal with abuse.
            </Body>
            <Body>
              Where United Kingdom or European Union data protection law applies, our lawful bases are taking steps
              at your request before entering a contract, and our legitimate interest in responding to inquiries and
              in keeping this site secure. We do not use your information for automated decision-making or
              profiling, and we do not use it to market to you unless you ask us to.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">Who we share it with.</H2>
            <Body className="mb-6">
              We do not sell your personal information and we do not share it for cross-context behavioral
              advertising. We share it only with the service providers that make this site and our mailbox work, and
              only so they can perform that service for us:
            </Body>
            <PlainList items={PROCESSORS} variant="ruled" className="mb-6" />
            <Body>
              We may also disclose information where the law requires it, or where it is necessary to establish or
              defend a legal claim.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">How long we keep it.</H2>
            <Body>
              We keep what you send for as long as it is needed to respond to you and to maintain the relationship
              that follows, and then we delete it. If an inquiry goes nowhere, the submission and the email thread
              are deleted once it is clear there is nothing further to discuss. Technical server records are kept
              only for the limited period our hosting provider retains them.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">Where it is stored.</H2>
            <Body>
              Mile42 operates in the United States, and our providers store this information on servers in the
              United States. If you contact us from the United Kingdom or the European Economic Area, your
              information is transferred to the United States. We rely on the standard contractual clauses in our
              providers’ data processing terms as the safeguard for that transfer.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">Cookies and tracking signals.</H2>
            <Body>
              This site sets no analytics, advertising, or tracking cookies, which is why there is no cookie banner.
              Our hosting provider may set a strictly necessary cookie to deliver the site correctly. Because we do
              no cross-site tracking at all, a Do Not Track or Global Privacy Control signal has nothing here to
              switch off, and it is honored by default.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">Your rights.</H2>
            <Body className="mb-8">
              Wherever you are, you can ask us what we hold about you, ask us to correct it, or ask us to delete it.
              Email{' '}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-accent-deep underline">{PRIVACY_EMAIL}</a> and we
              will respond. We do not charge for this, and we will not treat you differently for asking. We may need
              to confirm who you are before we act on a request.
            </Body>

            <H3 className="mb-4">If you are in the United Kingdom or the EEA</H3>
            <PlainList items={UK_EEA_RIGHTS} variant="ruled" className="mb-8" />

            <H3 className="mb-4">If you are in a US state with a privacy law</H3>
            <PlainList items={US_STATE_RIGHTS} variant="ruled" />
          </div>

          <div>
            <H2 className="mb-4">Security.</H2>
            <Body>
              We use the access controls our providers offer and keep the number of people who can read submissions
              small. No website or email system is perfectly secure, so please do not send confidential or sensitive
              information through the contact form. If you need to share something sensitive, ask us first and we
              will arrange a secure route for it.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">Children.</H2>
            <Body>
              This site is aimed at businesses and is not directed at children. We do not knowingly collect personal
              information from anyone under 16. If you believe a child has sent us information, email us and we will
              delete it.
            </Body>
          </div>

          <div>
            <H2 className="mb-4">Changes to this policy.</H2>
            <Body>
              If this policy changes, the revised version is posted on this page with a new date at the top. Where a
              change materially affects what we do with information already collected, we will say so here rather
              than making the change quietly.
            </Body>
          </div>
        </Wrap>
      </Section>

      <Section band="gold" pad="cta">
        <Wrap className="text-center">
          <H2 className="mb-4">Questions about this policy.</H2>
          <Lead className="mx-auto mb-8">
            Email us and a person will read it. Tell us what you would like us to do with your information and we
            will confirm what we did.
          </Lead>
          <Button href={`mailto:${PRIVACY_EMAIL}`}>Email {PRIVACY_EMAIL}</Button>
        </Wrap>
      </Section>
    </>
  )
}
