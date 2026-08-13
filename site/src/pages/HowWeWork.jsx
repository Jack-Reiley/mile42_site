import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Quote, Button, TextLink, Spot } from '../components/primitives.jsx'

const TOPICS = [
  {
    num: '01',
    kicker: 'What happens, and in what order?',
    title: 'Client journey',
    body: 'Four stages, and the stronger position each one leaves you in. Understand, design, build, evolve. You get a view of where you would enter and what changes at each stage.',
    href: '/how-we-work/client-journey',
    linkLabel: 'See the client journey',
    panel: 'bg-[color-mix(in_srgb,var(--color-accent)_16%,var(--color-surface))]',
    mark: 'bg-accent',
  },
  {
    num: '02',
    kicker: 'How does the work get done?',
    title: 'Delivery model',
    body: 'An AI-assisted operating system with agents across every major role, and humans accountable for judgment and outcomes. You get the specifics of who does what, including what stays human.',
    href: '/how-we-work/delivery-model',
    linkLabel: 'See the delivery model',
    panel: 'bg-[color-mix(in_srgb,var(--color-forest)_18%,var(--color-surface))]',
    mark: 'bg-forest',
  },
  {
    num: '03',
    kicker: 'How do we engage commercially?',
    title: 'Engagement model',
    body: 'How we think about pricing, and why we would rather sell an outcome than a timesheet. You get our posture, before the conversation about specifics.',
    href: '/how-we-work/engagement-model',
    linkLabel: 'See the engagement model',
    panel: 'bg-[color-mix(in_srgb,var(--color-orange)_16%,var(--color-surface))]',
    mark: 'bg-orange',
  },
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

      {/* Full-bleed alternating panels rather than a three-up card grid. The
          grid read as the homepage's "three ways" band, which is the one thing
          this section must not do. */}
      <Section band="page" inset="flush" pad="tight">
        {/* Padded to the panels' own inset rather than wrapped to the site
            measure, so the heading starts on the same line as the panel copy. */}
        <div className="px-6 pb-10 md:px-12 lg:px-16">
          <H2>Three things worth understanding before you engage us.</H2>
        </div>
        {TOPICS.map((t, i) => (
          <article key={t.title} className="grid lg:grid-cols-2">
            {/* The colour side alternates left and right down the three rows.
                `order` moves it visually without reordering the DOM, so the
                heading still precedes its own body for keyboard and screen
                reader users. */}
            <div
              className={`${t.panel} flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 lg:py-20 ${
                i % 2 ? 'lg:order-2' : ''
              }`}
            >
              <p className="mb-5 flex items-center gap-4">
                <span aria-hidden="true" className={`h-1 w-12 rounded-[2px] ${t.mark}`} />
                <span className="font-heading text-heading-2 text-ink">{t.num}</span>
              </p>
              <Eyebrow tone="ink" className="mb-3">{t.kicker}</Eyebrow>
              <H2 as="h3">{t.title}</H2>
            </div>
            <div className="flex flex-col justify-center bg-page px-6 py-12 md:px-12 lg:px-16 lg:py-20">
              <Body className="mb-7">{t.body}</Body>
              <p><TextLink to={t.href}>{t.linkLabel}</TextLink></p>
            </div>
          </article>
        ))}
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
