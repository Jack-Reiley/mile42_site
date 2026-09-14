import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Quote, Button, ButtonRow, TextLink, Spot, FeaturePanel } from '../components/primitives.jsx'
import { TermList, GroupColumns, RuledGroup } from '../components/Lists.jsx'
import StageJourney from '../components/StageJourney.jsx'
import { REVEAL, REVEAL_GROUP } from '../components/reveal.js'

/* Each entry point names the What we do page that covers it, so the definition
   is the link rather than a label repeated beside one. */
const ENTRY = [
  ['Understand or Design', <TextLink to="/what-we-do/advisory">Advisory</TextLink>],
  ['Design or Build', <TextLink to="/what-we-do/engineering">Engineering</TextLink>],
  [
    'Build, with parts already solved',
    <TextLink to="/what-we-do/engineering">Engineering, with its accelerators</TextLink>,
  ],
  ['Prove it first, then decide', <TextLink to="/what-we-do/phase-zero">Phase Zero</TextLink>],
]

/* The three shapes an engagement takes. The engagement model explained the
   pricing posture and never said what the work looks like from the client's
   side, which is the gap the review named. Two sentences each.

   The embedded shape is described in plain words. The review allows the
   "forward deployed engineer" label only if buyers are already using it, and
   nothing on record says they are. */
const SHAPES = [
  {
    title: 'A fixed-scope pilot',
    body: 'Phase Zero: one named process, about a month, and a fixed fee agreed before we start. You keep the baseline, the working pilot, and the roadmap whether or not you continue.',
    href: '/what-we-do/phase-zero',
    linkLabel: 'What Phase Zero includes',
  },
  {
    title: 'An embedded team',
    body: 'A small senior team, with its agents, working inside your organization beside your own people on a live backlog. The scope moves as the work does, and the price follows the outcomes rather than the hours.',
  },
  {
    title: 'An outcome-priced build',
    body: 'A defined system delivered end to end, for a price tied to what it has to do in production. The risk of the estimate is ours, and the baseline a Phase Zero produces is what that price is argued from.',
  },
]

/* The merged bands are reached by fragment from the paths they replaced, and
   the header is sticky, so each anchor clears it rather than landing under it.
   The header condenses by 16px once the page has scrolled, which pulls the
   band up by the same amount after the scroll lands, so the margin allows for
   the condensed bar plus that shift rather than the bar alone. */
const ANCHOR = 'scroll-mt-28'

/* EXTRAPOLATED — no comp for this page.

   One long page since the information architecture review. The client journey
   and the engagement model used to be routes of their own under this one, each
   with a hero band and a breadcrumb; they read here as bands, with an anchor
   where their old paths land. The delivery model keeps its page and gets a
   summary band that leads to it. */
export default function HowWeWork() {
  return (
    <>
      {/* Gold rather than the site's usual brand green, so the section reads as
          its own place rather than as the homepage. It is a light band, so the
          heading is ink — see the `gold` note in primitives.jsx. */}
      <Section band="gold" grain>
        {/* The text keeps the wider column. The gears are a mid-size spot, not a
            hero scene, so an even split would oversize them. */}
        {/* #109 collapsed this to one column while the band had no artwork. The
            robot-and-gear scene brings the split back exactly as it was. */}
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          {/* A relay: the column holds still and its eyebrow, heading, lead and
              buttons each enter from the left in turn. As one block it read as
              a slab sliding; in sequence it reads as a page composing itself. */}
          <div className={`${REVEAL_GROUP.left} ${REVEAL.still}`}>
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
          {/* Inert since #109 retired the ink sketches. Left exactly as placed,
              because a follow-up restores artwork to this slot and reads this
              call as its spec. See `retired` in the illustrations manifest. */}
          <Spot
            name="gears"
            priority
            sizes="(min-width: 1024px) 22rem, 14rem"
            className={`h-auto w-full max-w-[14rem] justify-self-center lg:max-w-[22rem] lg:justify-self-end ${REVEAL.right} m42-in-solid`}
          />
          {/* The robot-and-gear scene takes the slot the gears held, at the same
              placement and with the same solid entrance. */}
          <Spot
            name="robot-team"
            priority
            sizes="(min-width: 1024px) 22rem, 14rem"
            className={`h-auto w-full max-w-[14rem] justify-self-center lg:max-w-[22rem] lg:justify-self-end ${REVEAL.right} m42-in-solid`}
          />
        </Wrap>
      </Section>

      {/* The argument the rest of the page evidences. It used to share a tiled
          block with three topic cards linking out to the pages below; those
          pages are bands of this one now, so the argument stands on its own and
          the bands follow in the order the cards had. */}
      <Section band="surface" pad="band">
        <Wrap>
          {/* Top of the type scale on an h2. This block is the section's
              argument, and at heading-2 it read as a caption. */}
          <H1 as="h2" className="mb-7">Any firm can claim it executes well.</H1>
          <Lead className="mb-4">The claim is free. What is not free is describing the operating model in enough detail that a client can check it, and then being held to that description on a real engagement.</Lead>
          <Body className="mb-7">So this page is more specific than marketing needs it to be, on purpose. A delivery model that cannot survive being written down is a story.</Body>
          {/* The comp's rule above the pull quote, setting it apart from the
              paragraphs it concludes. */}
          <hr className="mb-7 border-0 border-t border-ink" />
          <Quote>Read it, then test it against something real.</Quote>
        </Wrap>
      </Section>

      <Section id="client-journey" pad="band" className={ANCHOR}>
        <Wrap>
          <Eyebrow className="mb-4">Client journey</Eyebrow>
          <H2 className="mb-3">Four stages. Four stronger positions to be in.</H2>
          <Lead className="mb-4">Understand, design, build, evolve. Each stage describes what we do together, and each outcome is the state it leaves you in. You should be better off at the end of every one, whether or not you continue to the next.</Lead>
          <Body className="mb-14">Four stages on one line. Select a stage to read what it produces, and what you are left holding when it ends.</Body>
          <StageJourney Spot={Spot} />
          <Quote className="mt-14">The work is complete only when you are stronger for the next decision, build, or initiative.</Quote>
        </Wrap>
      </Section>

      <Section band="surface" pad="band">
        <Wrap>
          <H2 className="mb-6">The journey is the same. Where you enter is not.</H2>
          <Body className="mb-8">Not everyone starts at stage one. An organization that already has clarity needs execution, and one that has been building for a year may need an honest read on whether the path still holds.</Body>
          <TermList items={ENTRY} className="mb-4" />
          {/* Phase Zero is the fourth entry point and the only one that does not
              map to a single stage, so it needs a sentence the list cannot
              carry. Without it a reader is holding two models of how we engage. */}
          <Body className="mb-8">Phase Zero is the exception to the shape. It compresses understand, design, and build into one small engagement on a single process, so the proof arrives before you commit to a stage at all. What it leaves you with is a baseline, a working solution, and a roadmap, which is the strongest position to enter any of the four stages from.</Body>
          <Quote>Tell us where you actually are, and we start there.</Quote>
        </Wrap>
      </Section>

      {/* A summary, not the model. The delivery model keeps its own page
          because the role-by-role detail is the part a client can check, and
          three sentences here are what send them to it. */}
      <Section id="delivery-model" band="tint" pad="band" className={ANCHOR}>
        <Wrap>
          <Eyebrow className="mb-4">Delivery model</Eyebrow>
          <H2 className="mb-6">How the work gets done.</H2>
          <Body className="mb-4">AI agents run across every major role in an engagement, from discovery through deployment, with a named senior engineer accountable for judgment and outcomes. Test coverage, documentation, and the reasoning behind each decision are captured as the work happens rather than when the schedule allows. That is what lets a small team commit to a price and carry the risk of its own estimate.</Body>
          <ButtonRow className="mt-8">
            <Button to="/how-we-work/delivery-model">See the delivery model</Button>
          </ButtonRow>
        </Wrap>
      </Section>

      <Section id="engagement-model" pad="band" className={ANCHOR}>
        <Wrap>
          <Eyebrow className="mb-4">Engagement model</Eyebrow>
          <H2 className="mb-3">We price for value.</H2>
          <Lead className="mb-4">Clients want a partner with skin in the game. The goal is not to sell more hours. Selling hours means our incentive improves when the work takes longer, and we would rather not build a business on that.</Lead>
          <Body className="mb-4">Large time and materials programs are getting harder to justify, and reasonably so. They place the risk of overrun entirely on the buyer, and they reward the seller for the thing the buyer least wants.</Body>
          <Body className="mb-8">At the same time, buyers expect AI to create real efficiency. If a firm claims AI has transformed its delivery and still bills the same hourly way it did five years ago, one of those two things is not true.</Body>
          <Quote>We would rather be paid for the result than for the time it took.</Quote>
        </Wrap>
      </Section>

      {/* The shapes sit between the posture and the argument for it: a reader
          who has just been told we price for value wants to know what they
          would actually be buying before hearing why the delivery model makes
          that pricing possible. Ruled columns rather than cards, the way Phase
          Zero sets its own three statements; the rule is the engagement
          model's orange. */}
      <Section band="surface" pad="band">
        <Wrap>
          <H2 className="mb-3">Three shapes the work takes.</H2>
          <Lead className="mb-9 max-w-none text-ink/70">Which one fits depends on how much is already known. Most engagements start with the first.</Lead>
          <GroupColumns>
            {SHAPES.map((s) => (
              <RuledGroup key={s.title} title={s.title} as="h3" ruleClass="border-orange">
                <Body className="max-w-none">{s.body}</Body>
                {s.href && (
                  <p className="mt-4">
                    <TextLink to={s.href} tone="accent">{s.linkLabel}</TextLink>
                  </p>
                )}
              </RuledGroup>
            ))}
          </GroupColumns>
        </Wrap>
      </Section>

      {/* The Phase Zero panel closes this band rather than taking one of its
          own. As its own band it was a short white strip between two long
          bands, which chopped the page where it should have been building to
          the offer. The panel shares the band's fill and is carried by its
          border and shadow, which is how the homepage's Vickee card sits on
          its white band. */}
      <Section pad="band">
        <Wrap>
          <H2 className="mb-6">The delivery model is what makes the commercial model possible.</H2>
          <Body className="mb-4">When delivery speed is set by headcount, the only honest thing to sell is time, and the risk of everything taking longer sits with you. Our delivery runs AI agents across every major role in an engagement, which compresses the work enough that we can carry the risk of an estimate instead of passing it to you.</Body>
          <Body className="mb-4">Reuse compounds the same effect. Each engagement produces methods and patterns that lower the cost of the next one, so a meaningful share of the work is not being invented on your budget.</Body>
          {/* The hinge. The two paragraphs above are reasons the delivery model
              makes the commercial model possible, and this is the third, which
              is why it opens on "also". Without it the band stops at reuse and
              the panel below introduces Phase Zero cold, on a page that had
              been building to it. */}
          <Body className="mb-8">It is also why the first engagement is the small one. Phase Zero produces the baseline a value price has to be argued from, and until that number exists the risk of an estimate is ours to carry rather than yours.</Body>
          <ButtonRow>
            <TextLink to="/how-we-work/delivery-model">See the delivery model</TextLink>
            <TextLink to="/what-we-do/engineering">See engineering</TextLink>
          </ButtonRow>
          {/* Verbatim the What we do panel, so the offer reads the same wherever
              it is made. */}
          <FeaturePanel
            className="mt-12"
            spot="magnifier-gear"
            title="Start with a pilot."
            note="Name a process. See it working. Map what comes next."
          >
            <Body className="max-w-none">
              Phase Zero is a working pilot on one process you name, built beside production and
              measured against your own baseline. You get something running, and a roadmap for what
              comes after it. About a month, fixed fee, typically $10k to $30k.
            </Body>
            <p className="mt-4">
              <TextLink to="/what-we-do/phase-zero" tone="accent">See how Phase Zero works</TextLink>
            </p>
          </FeaturePanel>
        </Wrap>
      </Section>

      {/* Gold again, bookending the hero. The yellow CTA button only clears the
          fill at 1.36:1, so its ink border and hard shadow are what separate it
          here — see the `gold` note in primitives.jsx. */}
      <Section band="gold">
        <Wrap className="text-center">
          <H2 className="mb-4">Read it, then test it.</H2>
          <Lead className="mx-auto mb-8">Everything on this page can be checked in a first conversation. Start from the stage you are actually in.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
