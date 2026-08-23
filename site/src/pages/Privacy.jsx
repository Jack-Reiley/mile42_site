import { Section, Wrap, Eyebrow, H1, H2, Body, Placeholder } from '../components/primitives.jsx'
import { NumList } from '../components/Lists.jsx'

const SECTIONS = [
  'Who we are, and how to contact us about privacy',
  'What information we collect',
  'How we collect it, including the contact form and any analytics',
  'Why we process it, and the lawful basis where that applies',
  'Who we share it with, naming processors',
  'How long we keep it',
  'Where it is stored and transferred',
  'Your rights, and how to exercise them',
  'Cookies, or a link to a separate cookie notice',
  'How changes to the policy are communicated',
  'Last updated date',
]

/* EXTRAPOLATED — no comp for this page. */
export default function Privacy() {
  return (
    <>
      <Section band="brand" grain>
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">Legal</Eyebrow>
          <H1 tone="hero" className="mb-6">Privacy policy.</H1>
          <Placeholder tag="Placeholder · not legal copy" className="max-w-2xl">
            This page is a stub so the footer link resolves in the prototype. No privacy policy has been written. Counsel must draft it, and nothing here has been reviewed by a lawyer.
          </Placeholder>
        </Wrap>
      </Section>

      <Section>
        <Wrap className="max-w-3xl">
          <H2 className="mb-6">Structure counsel will most likely need.</H2>
          <Body className="mb-8">Listed so the page can be laid out before the copy exists. Section names and content are counsel&#39;s call.</Body>
          <NumList items={SECTIONS} />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap className="max-w-3xl">
          <H2 className="mb-6">Before counsel can draft it.</H2>
          <Body>The facts counsel needs are written up in the project&#39;s copy documents: what the contact form collects, where submissions go, retention, jurisdiction, and the privacy contact point. A policy that does not accurately describe what the site does is worse than having none.</Body>
        </Wrap>
      </Section>
    </>
  )
}
