import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card, Spot } from '../components/primitives.jsx'

const TOPICS = [
  { kicker: 'What happens, and in what order?', title: 'Client journey', body: 'Four stages, and the stronger position each one leaves you in. Understand, design, build, evolve. You get a view of where you would enter and what changes at each stage.', href: '/how-we-work/client-journey', linkLabel: 'See the client journey' },
  { kicker: 'How does the work get done?', title: 'Delivery model', body: 'An AI-assisted operating system with agents across every major role, and humans accountable for judgment and outcomes. You get the specifics of who does what, including what stays human.', href: '/how-we-work/delivery-model', linkLabel: 'See the delivery model' },
  { kicker: 'How do we engage commercially?', title: 'Engagement model', body: 'How we think about pricing, and why we would rather sell an outcome than a timesheet. You get our posture, before the conversation about specifics.', href: '/how-we-work/engagement-model', linkLabel: 'See the engagement model' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function HowWeWork() {
  return (
    <>
      {/* Gold rather than the site's usual brand green, so the section reads as
          its own place rather than as the homepage. It is a light band, so the
          heading is ink — see the `gold` note in primitives.jsx. */}
      <Section band="gold">
        {/* The text keeps the wider column. The gears are a mid-size spot, not a
            hero scene, so an even split would oversize them. */}
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <div>
            <Eyebrow tone="ink" className="mb-4">How we work</Eyebrow>
            <H1 className="mb-6">Execution is the product, so how we work is the product.</H1>
            <Lead>Most firms describe what they sell. Fewer are willing to show how the work actually runs, because that is where the difference between firms is real.</Lead>
          </div>
          {/* Stacked under the copy below `lg`, so it is capped far smaller
              there — at the desktop cap it would fill a phone's width. */}
          <Spot
            name="gears"
            priority
            sizes="(min-width: 1024px) 22rem, 14rem"
            className="h-auto w-full max-w-[14rem] justify-self-center lg:max-w-[22rem] lg:justify-self-end"
          />
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
                {/* `mt-auto` sat on the "You get" block before it was folded into
                    the body. It has to stay on whatever is last, or the links
                    stop aligning across cards of unequal length. */}
                <div className="mt-auto pt-4"><TextLink to={t.href}>{t.linkLabel}</TextLink></div>
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
