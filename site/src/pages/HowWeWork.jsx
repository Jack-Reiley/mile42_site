import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card } from '../components/primitives.jsx'

const TOPICS = [
  { kicker: 'What happens, and in what order?', title: 'Client journey', body: 'Four stages, and the stronger position each one leaves you in. Understand, design, build, evolve.', get: 'A view of where you would enter and what changes at each stage', href: '/how-we-work/client-journey', linkLabel: 'See the client journey' },
  { kicker: 'How does the work get done?', title: 'Delivery model', body: 'An AI-assisted operating system with agents across every major role, and humans accountable for judgment and outcomes.', get: 'The specifics of who does what, including what stays human', href: '/how-we-work/delivery-model', linkLabel: 'See the delivery model' },
  { kicker: 'How do we engage commercially?', title: 'Engagement model', body: 'How we think about pricing, and why we would rather sell an outcome than a timesheet.', get: 'Our posture, before the conversation about specifics', href: '/how-we-work/engagement-model', linkLabel: 'See the engagement model' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function HowWeWork() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">How we work</Eyebrow>
          <H1 tone="hero" className="mb-6">Execution is the product, so how we work is the product.</H1>
          <Lead>Most firms describe what they sell. Fewer are willing to show how the work actually runs, because that is where the difference between firms is real.</Lead>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">Three things worth understanding before you engage us.</H2>
          <div className="grid gap-4 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <Card as="article" key={t.title}>
                <Eyebrow>{t.kicker}</Eyebrow>
                <H3>{t.title}</H3>
                <Body className="max-w-none">{t.body}</Body>
                <div className="mt-auto pt-4">
                  <Eyebrow tone="ink" className="mb-1">You get:</Eyebrow>
                  <p className="text-body text-ink">{t.get}</p>
                </div>
                <div className="pt-4"><TextLink to={t.href}>{t.linkLabel}</TextLink></div>
              </Card>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Any firm can claim it executes well.</H2>
          <Body className="mb-4">The claim is free. What is not free is describing the operating model in enough detail that a client can check it, and then being held to that description on a real engagement.</Body>
          <Body className="mb-8">So these pages are more specific than they need to be for marketing. That is deliberate. If our delivery model does not survive being written down, it is not a delivery model, it is a story.</Body>
          <Quote>Read them, then test them against something real.</Quote>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">The fastest way to judge this is to use it.</H2>
          <Lead className="mx-auto mb-8">Bring us a problem that has to work. How we operate will be obvious within the first conversation.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
