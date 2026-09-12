import {
  Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body,
  Button, ButtonRow, TextLink, Card, Spot,
} from '../components/primitives.jsx'
import { NumList, RuledGroup, TermList } from '../components/Lists.jsx'
import CatalogDrawer from '../components/CatalogDrawer.jsx'
import { REVEAL, REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'
import { HOME_HERO } from './home-hero-copy.js'

/* Who the page is for. One statement, straight under the hero, so a reader
   knows within a screen whether this firm is talking to them. */
const BUYER =
  'Mile42 is who you call when an AI initiative has stalled between prototype and production, ' +
  'and the next attempt has to work. We work with mid-market and enterprise leaders in IT, ' +
  'marketing, customer experience, and operations.'

/* The three things a buyer says on the first call, in the order they come up.
   Each heading is the objection in the buyer's own words; each body is lifted
   from the page the link lands on, so the homepage promises nothing the site
   does not already argue. */
const DIFFERENTIATORS = [
  {
    title: 'Our AI pilot never made it to production.',
    body: 'A prototype only has to work once. A system has to work every time, on real data, for people who did not ask for it. Closing that gap is our core practice.',
    href: '/what-we-do/engineering',
    linkLabel: 'How we close the gap',
  },
  {
    title: 'Security will not let agents touch our systems of record.',
    body: 'Enterprise AI gets stopped by risk, legal, and security more often than by engineering. The controls are part of the build: what an agent can reach, what it may do, and what audit trail exists when someone asks why.',
    href: '/meet-vickee',
    linkLabel: 'How Vickee answers security',
  },
  {
    title: 'We will tell you when the answer is not an agent.',
    body: 'Some problems are better solved by fixing a process, deleting a step, integrating two systems properly, or writing conventional software that behaves predictably every time. A no you can trust early is cheaper than a yes that fails seven months in.',
    href: '/what-we-do/engineering/agentic-ai',
    linkLabel: 'When an agent is the wrong tool',
  },
]

const OFFERINGS = [
  {
    kicker: 'When you need to see it working',
    title: 'You need a pilot',
    body: 'Phase Zero is a working pilot on one process you name, built beside production and measured against your own baseline. About a month. Fixed fee, agreed before we start, typically between $10k and $30k depending on the process.',
    href: '/what-we-do/phase-zero',
    linkLabel: 'Explore Phase Zero',
    spot: 'magnifier-gear',
    // The magnifier came off the Phase Zero panel this card replaces, and takes
    // the placement the lightbulb had on the first card: breaking the card's
    // TOP edge, anchored 35px inside the column's right edge.
    spotClass: 'lg:-top-[54px] lg:w-[86px] xl:right-[35px] xl:top-[-38px] xl:w-[101px]',
    spotSizes: '(min-width: 1280px) 101px, (min-width: 1024px) 86px, 112px',
  },
  {
    kicker: 'Before a major investment',
    title: 'You need clarity',
    body: 'AI strategy, integration and ingestion strategy, discovery, modernization planning, platform selection, and architecture review. We help you decide before you commit, and you leave able to defend the decision without us in the room.',
    href: '/what-we-do/advisory',
    linkLabel: 'Explore advisory',
    spot: 'lightbulb',
    // Breaks the card's TOP edge. Anchored 35px inside its column's right edge,
    // which is where the comp puts it, and which holds as the column narrows.
    spotClass: 'lg:-top-[54px] lg:w-[86px] xl:right-[35px] xl:top-[-38px] xl:w-[101px]',
    spotSizes: '(min-width: 1280px) 101px, (min-width: 1024px) 86px, 112px',
  },
  {
    kicker: 'When something must be built',
    title: 'You need to execute',
    body: 'Agentic AI implementation, AI applications and integration, custom software, workflow automation, data platforms, and modernization. Built to run in production, and to leave your team able to change it without us.',
    href: '/what-we-do/engineering',
    linkLabel: 'Explore engineering',
    spot: 'laptop',
    // Breaks its COLUMN DIVIDER, 27px into col3, while staying inside the card.
    // Anchored to the right and the bottom, so both relationships hold as the
    // card narrows and as copy length changes. Fixed left offsets drifted the
    // spot out of its column between lg and the card's 1240px max width.
    // Bottom-anchored: stable as copy length changes, where a top offset would
    // drift. The comp puts it 169px above the card's bottom. 184px sat better
    // against the taller card that carried a "You leave with" row; with that row
    // gone the card is shorter, and 105px is what centres the spot in the gap
    // between the body and the button. z-10 lifts it over the divider, which is
    // the next column's left border and paints later.
    spotClass: 'lg:-top-[35px] lg:w-24 xl:-right-[25px] xl:top-auto xl:bottom-[105px] xl:w-32 xl:z-10',
    spotSizes: '(min-width: 1280px) 128px, (min-width: 1024px) 96px, 112px',
  },
]

/* The platform layer, by category. The same list the Agentic AI page carries
   in its architecture drill-down, surfaced here because nobody finds it there.
   Platforms the firm builds on, not partners: no partner agreement exists, and
   the label must not imply one. Names only, no logos, until each vendor's
   trademark terms have been checked. */
const PLATFORMS = [
  ['Models', 'Anthropic Claude · OpenAI Codex · xAI Grok'],
  ['Data and AI foundation', 'Databricks · Snowflake'],
  ['Enterprise workflow', 'Salesforce Agentforce · ServiceNow'],
  ['Content and experience', 'Contentstack · Contentful · Uniform · Bloomreach'],
  ['Commerce', 'commercetools · Shopify · SAP Hybris'],
]

const PRINCIPLES = [
  'You know what the work costs before you commit.',
  'The risk of an estimate sits with the people who made it.',
  'We stay until the work is right.',
]

/* Vickee's supporting points on the homepage.

   Two, not four. The sealed systems of record and the one shared source both
   moved into the catalog drawer diagram, which shows them rather than claiming
   them; repeating them underneath would be the same sentence twice. What is
   left is the pair the picture cannot make: the approval argument and the cost
   argument. */
const VICKEE = [
  {
    title: 'Security review has something it can approve.',
    body: 'What agents are allowed to reach is an explicit decision your team makes and can audit, scoped by business unit and domain.',
  },
  {
    title: 'Every project after the first starts ahead.',
    body: 'The ingestion, indexing, and retrieval work that consumes the opening weeks of every AI initiative is already done.',
  },
]

export default function Home() {
  return (
    <>
      {/* Follows design/Homepage.pdf, except for the band colour. The comp
          draws this green; it is blue here because the green was replaced.

          `blue` is the accent taken up to field strength, and its grain recipe
          was already solved for exactly this pairing: the film runs at 0.35
          rather than the spread target's 0.55 because off-white on this band is
          4.92:1 against a 4.5 floor and the texture eats into that. See the
          BAND_GRAIN note in primitives.jsx.

          Every line in this column takes the off-white tone. Ink reaches 3.14:1
          here, under AA, so the lead moves with the heading rather than staying
          the default.

          No kicker. "Execution, Rebuilt." stays the document title and the
          share card's first line, but the hero opens on the reader's problem
          rather than on a slogan about the firm. */}
      <Section band="blue" grain className="overflow-hidden">
        {/* Halved again for the developer drawing. #109 collapsed this to one
            column while the band had no artwork; the split is the one it had
            before that. `Lead` keeps its 46rem measure, which is the site-wide
            reading width and not this band's to change. */}
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* A relay: the column holds still and its heading, lead and buttons
              each enter from the left in turn. As one block it read as a slab
              sliding; in sequence it reads as a page composing itself. */}
          <div className={`${REVEAL_GROUP.left} ${REVEAL.still}`}>
            <H1 tone="hero" className="mb-6">{HOME_HERO.heading}</H1>
            <Lead tone="hero" className="mb-8">{HOME_HERO.lead}</Lead>
            <ButtonRow>
              <Button to="/contact">Start a conversation</Button>
              <Button to="/how-we-work/delivery-model" variant="secondary">
                See how we deliver
              </Button>
            </ButtonRow>
          </div>
          {/* Enters without fading. #12 made this eager and high fetch priority
              to fix LCP, and an element at opacity 0 is not yet contentful, so
              fading the largest above-the-fold image in would give that back.
              Moving it costs nothing. */}
          {/* Inert since #109 retired the ink sketches. Left exactly as placed,
              because a follow-up restores artwork to this slot and reads this
              call as its spec. See `retired` in the illustrations manifest. */}
          <Spot
            name="hero-desk"
            priority
            sizes="(min-width: 1024px) 34rem, 90vw"
            className={`h-auto w-full max-w-[34rem] justify-self-center lg:justify-self-end ${REVEAL.right} m42-in-solid`}
          />
          {/* The developer drawing takes the slot hero-desk held, at the same
              placement and with the same solid entrance. It is an SVG, so
              `sizes` has nothing to choose between and is left off. */}
          <Spot
            name="developer-desk"
            priority
            className={`h-auto w-full max-w-[34rem] justify-self-center lg:justify-self-end ${REVEAL.right} m42-in-solid`}
          />
        </Wrap>
      </Section>

      {/* Who it is for. One statement on its own band, with no heading of its
          own: it qualifies the hero rather than opening a new argument, and a
          heading would make a sentence into a section.

          On surface rather than page, so the run from the hero down alternates
          (surface, page, surface) instead of the hero handing off to a single
          undivided field. */}
      <Section band="surface" pad="tight">
        <Wrap>
          <Lead className="mx-auto max-w-[56rem] text-center">{BUYER}</Lead>
        </Wrap>
      </Section>

      {/* EXTRAPOLATED. The three objections and the product that answers the
          second of them are one band: what a buyer says on the first call,
          then the thing this firm built because it kept hearing it. Splitting
          them made the reader meet Vickee with no idea why this firm would have
          one.

          On the page band rather than surface, because the offerings card
          below is white and the comp draws it on surface; two cream bands in a
          row would also read as one. */}
      <Section>
        <Wrap>
          <H2 className="mb-10">Three things we hear on the first call.</H2>
          {/* Ruled columns rather than cards. Three bordered cards above a
              bordered panel read as four objects of equal weight, and the panel
              has to be the one that carries. */}
          <div className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} mb-12 grid gap-x-8 gap-y-7 md:grid-cols-3`}>
            {DIFFERENTIATORS.map((d) => (
              <RuledGroup key={d.title} as="h3" title={d.title} ruleClass="border-t-brand-deep">
                <Body className="max-w-none text-ink/72">{d.body}</Body>
                <p className="mt-4">
                  <TextLink to={d.href}>{d.linkLabel}</TextLink>
                </p>
              </RuledGroup>
            ))}
          </div>

          {/* Vickee, inside the band rather than beside it. `tint`, so the
              product reads as an object sitting on the argument that produced
              it. It sat on cream when this band did; the band is white now and
              the panel separates from it either way. */}
          <Card fill="tint" className="p-6 md:p-card">
            <Eyebrow tone="ink">A Mile42 product</Eyebrow>
            {/* Benefit first, product second: the heading is what the buyer
                gets to decide and show, and the body is the first place the
                name appears. 66rem was measured for the previous heading, which
                set on one line at 1039px; this one is longer and balances onto
                two lines at the site width, which is the intended behaviour
                rather than a fallback. */}
            <H3 as="h3" className="max-w-[66rem]">
              Decide what your agents are allowed to know. Then show security the audit trail.
            </H3>
            {/* 56rem rather than `Body`'s default 46rem. Measured, the widest
                line goes from 79 characters to 94 — wider, and still inside what
                a reader can track back. The heading above sits at 66rem, but
                matching it would set these at 114 characters a line, which is
                past where the eye reliably finds the next line. A heading and a
                paragraph do not want the same measure. */}
            <Body className="max-w-[56rem]">
              Vickee holds a governed, read-only copy of what your agents may know, indexes it
              automatically, and answers with sources attached. Agents never hold credentials to
              your systems of record.
            </Body>
            <CatalogDrawer className="mt-4" />
            {/* h4, not h3: these sit under the panel's own h3, where the
                objections above sit under the band's h2. */}
            <div className="mt-4 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {VICKEE.map((d) => (
                <RuledGroup key={d.title} as="h4" title={d.title} ruleClass="border-t-accent">
                  <Body className="max-w-none text-ink/72">{d.body}</Body>
                </RuledGroup>
              ))}
            </div>
            <div className="mt-4">
              <Button to="/meet-vickee">Meet Vickee</Button>
            </div>
          </Card>
        </Wrap>
      </Section>

      {/* Follows design/Homepage.pdf: one card, vertical dividers, spots breaking
          the edge. Phase Zero takes the first column, because it is the way in
          for a reader who is not ready to pick one of the other two; the panel
          it used to have lower on the page is gone, since the card now carries
          what the panel said. */}
      <Section band="surface">
        <Wrap>
          <H2 className="mb-4 text-center">Three ways organizations work with us.</H2>
          <Lead className="mx-auto mb-16 text-center">
            Pick the one that matches where you are today. Everything else follows from that.
          </Lead>

          <div className="relative rounded-card border border-ink bg-page shadow-hard">
            {/* Four explicit rows, with each column a subgrid, so every row —
                eyebrow, heading, body, button — lines up across all three cards
                no matter how each one wraps. Without this, a body that wraps one
                line further in one column lifts its button above the others. */}
            {/* A group, so the three offerings arrive one after another rather
                than the whole frame appearing at once. Transform on a grid item
                does not disturb the subgrid row alignment from #15. */}
            <div
              className={`${REVEAL_GROUP.up} ${REVEAL_ROW} grid lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto]`}
            >
              {OFFERINGS.map((o, i) => (
                <article
                  key={o.title}
                  className={`relative flex flex-col gap-3 p-card lg:row-span-4 lg:grid lg:grid-rows-subgrid ${
                    i > 0 ? 'border-t border-ink lg:border-t-0 lg:border-l' : ''
                  }`}
                >
                  {/* The lightbulb and laptop calls are inert since #109, and
                      the only calls whose placement is an overhang rather than
                      a slot: each offset was set per card against the edge it
                      breaks, so they are kept as the record of where the
                      artwork sat. The magnifier draws. The button row no longer
                      holds a gap for a mid-card overhang; see the note on it
                      below. */}
                  <Spot
                    name={o.spot}
                    sizes={o.spotSizes}
                    className={`absolute -top-12 right-4 h-auto w-28 ${o.spotClass}`}
                  />
                  <Eyebrow>{o.kicker}</Eyebrow>
                  <H3>{o.title}</H3>
                  <Body className="max-w-none">{o.body}</Body>
                  {/* #15 opened the gap between the body copy and this row for the
                      "You leave with" block, and when that went the laptop spot
                      inherited it. #109 retired the spot, so `xl:pt-32` was holding
                      256px of nothing on all three cards. Removed: the cards close
                      up the way the heroes and the argument panel do. Restoring an
                      overhang here means restoring the gap for it. */}
                  {/* mt-auto bottoms this block in the stacked flex layout. From lg
                      up the subgrid already places the row, and leaving mt-auto on
                      would bottom-align it inside its own row — which is what
                      pushed the shorter columns' buttons below the taller one's. */}
                  <div className="mt-auto pt-6 lg:mt-0">
                    <Button to={o.href} variant="secondary">{o.linkLabel}</Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Wrap>
      </Section>

      {/* The platform layer, as a strip. `wide` rather than `ruled`: the names
          are the point of the strip, and `ruled` mutes its definitions. */}
      <Section>
        <Wrap>
          <H2 className="mb-8">Platforms we build on.</H2>
          <TermList items={PLATFORMS} variant="wide" />
        </Wrap>
      </Section>

      {/* The supply-side argument, near the bottom rather than under the hero.
          It used to open the page as its own band, with the engagement
          principles a second band further down; a buyer landing here wants the
          stalled project answered first and the consulting model second, so
          the two are one block above the close.

          A bordered panel rather than copy laid straight on the band, because
          the panel is the site's own raised-object shape and the argument at
          the reading measure left the right two-fifths of the column empty. */}
      <Section band="surface">
        <Wrap>
          {/* Sized to its content. #109 narrowed this to 52rem, the copy's 46rem
              measure plus the card's two 40px paddings, once the artwork was
              gone. With the gear-and-brain back in its 13rem track and the 3rem
              gap beside it, the content is 67rem wide, and the card follows. */}
          <Card fill="page" className="mx-auto max-w-[67rem] p-8 md:p-card">
            {/* The artwork takes the LEFT column, against the site's usual
                copy-left arrangement. Placed by grid column rather than by
                source order, so the copy still comes first in the document and
                the stacked layout below `lg` still opens on the heading rather
                than on a picture.

                The artwork column starts at the card's own 40px padding and is
                not centred in the card. Centring the pair to even out the slack
                either side pushed the spot inward until it floated in the
                card's corner instead of anchoring it.

                The two halves still converge the way FeaturePanel's do, with
                the directions swapped to match the sides they now sit on. */}
            {/* #109 collapsed this to one column while the panel had no artwork.
                The 13rem track and the copy's pin to the second column come back
                together for the gear-and-brain, exactly as they were. */}
            <div className="grid items-center gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
              <div className={`lg:col-start-2 lg:row-start-1 ${REVEAL_GROUP.right} ${REVEAL.still}`}>
                <H2 className="mb-4">Consulting should create momentum, not overhead.</H2>
                {/* The opening paragraph takes the lead size. It is the charge
                    the rest of the block answers, and at body size the panel
                    opened on paragraphs of identical weight with no way in. */}
                <Lead className="mb-[14px]">
                  Traditional firms make more money when a project needs more people, more
                  meetings, and more time. That is a conflict of interest built into the billing.
                </Lead>
                <Body>
                  Mile42 was built the other way round. AI runs through the work so a small senior
                  team can move quickly without losing context, and the price is tied to the
                  outcome rather than to the hours. If an estimate is wrong, that is our problem to
                  carry.
                </Body>
                <Body className="mt-[14px]">
                  A senior, US-based team. The people you meet are the people who do the work.
                </Body>
                {/* The three principles, carried over from the band they used to
                    close. They are how any engagement is scoped, priced, and
                    staffed, which is the claim the paragraphs above make. */}
                <NumList items={PRINCIPLES} as="ol" className="mt-8" />
              </div>
              {/* 13rem, between the 18 this started at and the 9 that followed.
                  It is a supporting mark beside an argument rather than the
                  subject of the panel, so it should not carry the weight the
                  hero illustration does; at 9 it read as an icon that had lost
                  its way into a large card.

                  Stacked under the copy below `lg` and capped smaller there,
                  for the reason the How We Work hero caps its gears: at the
                  desktop size it would fill a phone's width. */}
              {/* Inert since #109. See the hero note above. */}
              <Spot
                name="brain-gear"
                sizes="(min-width: 1024px) 13rem, 8rem"
                className={`h-auto w-full max-w-[8rem] justify-self-center lg:col-start-1 lg:row-start-1 lg:max-w-[13rem] lg:justify-self-start ${REVEAL.left}`}
              />
              {/* The gear-and-brain takes the slot brain-gear held, at the same
                  placement. An SVG, so `sizes` is left off. */}
              <Spot
                name="gear-brain"
                className={`h-auto w-full max-w-[8rem] justify-self-center lg:col-start-1 lg:row-start-1 lg:max-w-[13rem] lg:justify-self-start ${REVEAL.left}`}
              />
            </div>
          </Card>
        </Wrap>
      </Section>

      {/* EXTRAPOLATED. Blue, so the page opens and closes on the same field
          rather than handing off to the band colour the hero used to be.

          No grain: only a page's opening band carries the film. Which means
          this band is the flat colour, where the hero's is textured, and the
          off-white on it measures the full 4.92:1 with nothing eating into it.

          Both lines take the off-white tone for the reason the hero's do. Ink
          is 3.14:1 here, under AA, and it was the default on the green.

          Its own words. Six other pages close on "Tell us what needs to work"
          and "We will tell you honestly", and the homepage should not be the
          seventh. */}
      <Section band="blue">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-4">Name the process. See it working in a month.</H2>
          <Lead tone="hero" className="mx-auto mb-8">
            Phase Zero starts with one workflow you choose and ends with something running beside
            production, measured against your own baseline. If the next attempt has to work, this
            is where it starts.
          </Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
