import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Quote, Button, TextLink, Spot, PANEL_FILL, PANEL_FILL_HOVER } from '../components/primitives.jsx'
import { REVEAL } from '../components/reveal.js'

const TOPICS = [
  {
    num: '01',
    kicker: 'What happens, and in what order?',
    title: 'Client journey',
    body: 'Four stages, and the stronger position each one leaves you in. Understand, design, build, evolve. You get a view of where you would enter and what changes at each stage.',
    href: '/how-we-work/client-journey',
    linkLabel: 'See the client journey',
    panel: PANEL_FILL.accent,
    panelHover: PANEL_FILL_HOVER.accent,
    mark: 'bg-accent',
  },
  {
    num: '02',
    kicker: 'How does the work get done?',
    title: 'Delivery model',
    body: 'An AI-assisted operating system with agents across every major role, and humans accountable for judgment and outcomes. You get the specifics of who does what, including what stays human.',
    href: '/how-we-work/delivery-model',
    linkLabel: 'See the delivery model',
    panel: PANEL_FILL.forest,
    panelHover: PANEL_FILL_HOVER.forest,
    mark: 'bg-forest',
  },
  {
    num: '03',
    kicker: 'How do we engage commercially?',
    title: 'Engagement model',
    body: 'How we think about pricing, and why we would rather sell an outcome than a timesheet. You get our posture, before the conversation about specifics.',
    href: '/how-we-work/engagement-model',
    linkLabel: 'See the engagement model',
    panel: PANEL_FILL.orange,
    panelHover: PANEL_FILL_HOVER.orange,
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
          <div className={REVEAL.left}>
            <Eyebrow tone="ink" className="mb-4">How we work</Eyebrow>
            {/* Balanced so the break falls at the comma. Left to itself the
                line orphans "not a" and strands "sales pitch." on its own. */}
            <H1 className="mb-6 text-balance">Execution is a system, not a sales pitch.</H1>
            <Lead>Most firms describe what they sell. Fewer are willing to show how the work actually runs, because that is where the difference between firms is real.</Lead>
          </div>
          {/* Stacked under the copy below `lg`, so it is capped far smaller
              there — at the desktop cap it would fill a phone's width.

              Enters without fading, for the same reason as the home hero: it is
              eager and above the fold, and opacity 0 is not contentful. */}
          <Spot
            name="gears"
            priority
            sizes="(min-width: 1024px) 22rem, 14rem"
            className={`h-auto w-full max-w-[14rem] justify-self-center lg:max-w-[22rem] lg:justify-self-end ${REVEAL.right} m42-in-solid`}
          />
        </Wrap>
      </Section>

      {/* Four tiled blocks: the argument at full height on the left, the three
          topics that evidence it stacked on the right. The argument used to sit
          in its own band below the topics, where it read as an aside rather
          than as the thing the topics are answering. */}
      <Section band="page" inset="flush" pad="none">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-col justify-center bg-surface px-6 py-14 md:px-12 lg:px-16 lg:py-20">
            {/* Top of the type scale on an h2. This block is the section's
                argument and shares its height with three stacked topics, so at
                heading-2 it read as a caption floating in an empty panel. */}
            <H1 as="h2" className="mb-7">Any firm can claim it executes well.</H1>
            <Lead className="mb-4">The claim is free. What is not free is describing the operating model in enough detail that a client can check it, and then being held to that description on a real engagement.</Lead>
            <Body className="mb-7">So these pages are more specific than they need to be for marketing. That is deliberate. If our delivery model does not survive being written down, it is not a delivery model, it is a story.</Body>
            {/* The comp's rule above the pull quote, setting it apart from the
                paragraphs it concludes. */}
            <hr className="mb-7 border-0 border-t border-ink" />
            <Quote>Read them, then test them against something real.</Quote>
          </div>

          <div className="grid">
            {TOPICS.map((t) => (
              /* The whole panel is the click target. The link below stays the
                 only real link, stretched over the panel by its `after`
                 pseudo-element, so keyboard and screen reader users still get
                 one labelled link rather than a clickable div. */
              <article
                key={t.title}
                className={`${t.panel} ${t.panelHover} group relative flex cursor-pointer flex-col justify-center px-6 py-10 transition-colors motion-reduce:transition-none md:px-12 lg:px-14`}
              >
                <p className="mb-3 flex items-center gap-4">
                  <span aria-hidden="true" className={`h-1 w-10 rounded-[2px] ${t.mark}`} />
                  <span className="font-heading text-heading-3 text-ink">{t.num}</span>
                </p>
                <Eyebrow tone="ink" className="mb-2">{t.kicker}</Eyebrow>
                <H2 as="h3" className="mb-3">{t.title}</H2>
                <Body className="mb-4">{t.body}</Body>
                <p><TextLink to={t.href} className="after:absolute after:inset-0">{t.linkLabel}</TextLink></p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Gold again, bookending the hero. The yellow CTA button only clears the
          fill at 1.36:1, so its ink border and hard shadow are what separate it
          here — see the `gold` note in primitives.jsx. */}
      <Section band="gold">
        <Wrap className="text-center">
          <H2 className="mb-4">The fastest way to judge this is to use it.</H2>
          <Lead className="mx-auto mb-8">Bring us a problem that has to work. How we operate will be obvious within the first conversation.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
