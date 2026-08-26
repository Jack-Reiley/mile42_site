import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Button, Spot, Placeholder } from '../components/primitives.jsx'
import { CompareTable } from '../components/Lists.jsx'
import DeweyPillars from '../components/DeweyPillars.jsx'
import IntegrationSteps from '../components/IntegrationSteps.jsx'
import LibrarianDiagram from '../components/LibrarianDiagram.jsx'
import { REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'

/* Ported from the Dewey comp. Copy is verbatim; the structure is the site's
   own components. The comp draws this as a child of "What we do" with a
   breadcrumb — it is a top-level page instead, so it opens the way /why-mile42
   and /insights do, with an eyebrow and a hero H1 on its own identity band.

   `blue` is that identity band, the way `navy` is What We Do's and `gold` is
   How We Work's. Why Mile42 shares `brand` since #84 retired forest. */

const STEPS = [
  { label: 'Create', line: 'A tenant and namespace. Nothing lands by accident.' },
  { label: 'Upload', line: 'One call. Extraction, chunking, and embedding are automatic.' },
  { label: 'Index', line: 'Status is queryable, so agents know the moment content is searchable.' },
  { label: 'Search', line: 'By meaning, by exact term, by similarity, or as a question with a cited answer.' },
  { label: 'Retrieve', line: 'Full content for many files in one batch call, across namespaces.' },
]

const PILLARS = [
  {
    title: 'Organized by design',
    benefit: 'Knowledge lands in a place, not a pile. Tenants isolate customers or business units, namespaces separate domains, and directories and tags organize within them. The card catalog rolls it all up so agents and admins can see what’s known at a glance.',
    proof: [
      'Multi-tenant with per-tenant namespaces, created explicitly so nothing lands by accident',
      'Full filesystem semantics: directories, move and rename, metadata sidecars, tags, file links',
      'Card catalog rollups at the namespace, tenant, and platform level',
    ],
  },
  {
    title: 'Indexing is automatic',
    benefit: 'Upload is the whole pipeline. Put a file in and Dewey extracts the text, chunks it, and embeds it. No separate vector database to run, no sync jobs to babysit, no drift between what’s stored and what’s searchable.',
    proof: [
      'Single call to upload, with folder paths auto-created to any depth',
      'Async indexing with a status endpoint, so agents know exactly when content becomes searchable',
      'Replace a file in place and the index follows',
    ],
  },
  {
    title: 'Retrieval in every shape',
    benefit: 'Meaning and precision are different problems. Dewey gives agents both, plus answers. Semantic search finds concepts. Hybrid search adds an exact-term leg for part numbers and error codes. Ask returns a synthesized answer with cited sources.',
    proof: [
      'Semantic, hybrid, ask, and similarity endpoints, plus bounded grep and structured find',
      'Hybrid results report which leg found each hit, so relevance is explainable',
      'Batch retrieval pulls full content for many files in one call, across namespaces',
    ],
  },
  {
    title: 'Built for agents, approachable to humans',
    benefit: 'Point an agent at Dewey and it can learn the system on its own. The API serves a task-oriented agent guide with real captured examples. Humans get a wiki-style admin console over the same data, with search and cited answers built in.',
    proof: [
      'Self-serve agent guide served by the API itself, with worked scenarios from a live stack',
      'Error responses carry stable machine-readable codes so agents can branch, fix, and retry',
      'Admin console plus operations: stats, dedup, reindexing, and scheduled maintenance jobs',
    ],
  },
  {
    title: 'Agents never touch the system of record',
    benefit: 'Payroll, orders, HR, finance: these systems were never designed to be probed by autonomous software. Dewey is the buffer. Curated extracts land in Dewey, and agents work against the copy. The blast radius of a misbehaving agent is a read-only knowledge layer, not your ERP.',
    proof: [
      'No SOR credentials in agent context windows, prompts, or logs',
      'Least privilege by construction: scoped by tenant, namespace, and tags',
      'Retrieval load lands on Dewey, not on production transactional systems',
    ],
  },
  {
    title: 'One source of truth, every agent',
    benefit: 'Multi-agent systems drift when each agent carries its own context. Dewey centralizes knowledge and memory so every agent, and every human, reads from the same catalog. Update a document once and every consumer sees the change.',
    proof: [
      'One platform serving orchestrators, sub-agents, and humans from the same store',
      'Exactly one current version of every file, findable by all',
      'The card catalog is the shared map of what is known',
    ],
  },
  {
    title: 'Connected in both directions, deterministically',
    benefit: 'Data moves between Dewey and your systems of record through connectors built from plain, deterministic code. No LLM sits in the sync path, so there is no inference cost per run, no drift, and no surprises: the same input shapes the same way every time. Outbound updates can be gated by human review before they touch a source system.',
    proof: [
      'Inbound connectors with transformation and validation built in, so data arrives shaped and classified',
      'Configurable synchronization schedules per connector',
      'Outbound updates to SORs run as deterministic code, gated by human review and signoff',
    ],
  },
]



/* The contrast the intro band turns on, paired row by row and tightened out of
   the two prose paragraphs it replaces. Every line is drawn from that copy
   rather than claiming anything the paragraphs did not.

   Pairs rather than two independent lists: each problem has one answer directly
   across from it, and the arrow between them is the whole argument. Scattered
   becomes one layer, unbounded access becomes authorized access, competing
   answers become sourced ones. */
const CONTRAST = [
  [
    'Context scattered across systems, documents, teams, and users',
    'Approved knowledge in one shared, governed layer',
  ],
  [
    'Direct access to every source creates unacceptable risk',
    'Each person and agent gets exactly what they are authorized to know',
  ],
  [
    'A separate pipeline per agent creates competing versions of the truth',
    'The sources behind every answer',
  ],
]

/* The three outcomes the band lands on, one sentence each, as written.

   Treatment 3c from the handoff: a divided run, each statement preceded by a
   10px colour square. The handoff names blue, teal and orange for this, but its
   tokens.css predates #69: its `--teal-700` is the brand green that ticket
   retired site-wide, and its `--orange-500` sits a shade off `--color-orange`.
   These are the live tokens instead. Putting a retired brand colour back on the
   site to match a stale copy of it would be the wrong way round, and the guard
   in brand-band-tones.test.jsx would reject the literal anyway. Blue is the
   same value in both. */
const OUTCOMES = [
  { text: 'Your systems stay protected.', square: 'bg-accent' },
  { text: 'Your people remain accountable.', square: 'bg-brand' },
  { text: 'Your agents act from context the enterprise can inspect, govern, and trust.', square: 'bg-orange' },
]

const COMPARE = [
  ['Object storage', 'Stores bytes, answers nothing.', 'Storage plus automatic indexing plus retrieval, one API.'],
  ['Standalone vector DB', 'You still build ingestion, chunking, storage, and ops around it.', 'The pipeline is built in. Upload is the integration.'],
  ['RAG framework code', 'Glue code your team owns forever.', 'A running service with an admin plane, not a library to maintain.'],
  ['Wiki or drive', 'Organized for humans, opaque to agents.', 'Readable by both: agent guide for machines, admin UI for people.'],
  ['Direct SOR access', 'Credentials in agent context, unbounded load on production, one schema change breaks every agent.', 'A governed, read-optimized copy. Agents get answers, never the keys.'],
  ['Per-agent context', 'Each agent drifts toward its own private truth.', 'One centralized catalog every agent reads and trusts.'],
  ['LLM-driven pipelines', 'Inference cost on every sync, behavior that drifts with the model.', 'Deterministic code connectors: testable, versioned, same result every run.'],
]

/* The row a pair occupies in the side-by-side grid. Written out because
   Tailwind reads class names as literals; a computed `row-start-${i}` produces
   no utility at all. */
const PAIR_ROW = ['row-start-2', 'row-start-3', 'row-start-4']

/* The stacked form of one panel, for widths where the two cannot sit side by
   side. It keeps the real list markup; the side-by-side form cannot, because
   its rows have to be direct children of the shared grid. */
function ContrastPanel({ label, items, raised }) {
  return (
    <div
      className={`flex flex-col rounded-card p-7 ${
        raised ? 'border border-ink bg-page shadow-hard' : 'border border-ink/30'
      }`}
    >
      <Eyebrow as="span" tone={raised ? 'accent' : 'ink'} className="mb-4 block">
        {label}
      </Eyebrow>
      <ul>
        {items.map((text) => (
          <li
            key={text}
            className={`border-t border-ink/25 py-3 text-body text-pretty first:border-t-0 first:pt-0 ${
              raised ? 'font-semibold text-ink' : 'text-ink/70'
            }`}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MeetDewey() {
  return (
    <>
      {/* The off-white tone throughout, which is what this band was chosen to
          carry: it reaches 4.85:1 here where ink reaches 3.19.

          The eyebrow takes `hero` rather than the `ice` it had on the blue band
          this replaces. Ice measures 4.49 on this fill, a hundredth under AA
          before the grain film touches it, and sky 3.32. See EYEBROW_TONE. */}
      <Section band="orange-deep" grain className="overflow-hidden">
        {/* Two columns, the way the home hero is set: copy left, artwork right.
            The handshake moved up here from the context band below. */}
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
          {/* The eyebrow names the category rather than the product. #77 put
              the trademarked name here, back when the heading was "Meet Dewey™.
              The librarian for AI agents (and humans)." and the eyebrow was the
              only thing above it; the heading below now leads with the problem
              instead of the name, so the eyebrow has to say what this is. The
              name still carries its mark everywhere else on the page. */}
          <Eyebrow tone="hero" className="mb-4">The context layer for enterprise AI</Eyebrow>
          {/* Two sentences in one heading, the way "Data in. Answers out." is
              set further down the page. */}
          <H1 tone="hero" className="mb-6">
            Agents don&#8217;t need the keys. They need the context.
          </H1>
          <Lead tone="hero">
            Dewey gives authorized agents governed, up-to-date enterprise context, without giving
            autonomous software direct access to your systems of record.
          </Lead>
          </div>
          {/* Eager and high priority: this is the page's largest above-the-fold
              image, so it is what LCP measures. The artwork carries its own
              alpha, so it sits straight on the band with no plate behind it. */}
          <Spot
            name="handshake"
            priority
            sizes="(min-width: 1024px) 30rem, 90vw"
            className="h-auto w-full max-w-[30rem] justify-self-center lg:justify-self-end"
          />
        </Wrap>
      </Section>

      {/* The argument the hero asserts, laid out before the product does
          anything.

          Scannable rather than read. This band was four paragraphs of prose; a
          reader had to work through all of it to find a comparison the copy was
          already making in order. The contrast is the layout now: three lines
          against three, the second half raised off the band, so the shape of
          the argument is visible before a word of it is read. The prose is not
          summarized somewhere else on the page — these lines are that copy,
          tightened.

          The three outcomes below them were one heading-scale block, which read
          as a second headline arguing with the H2 above it. Split across three
          marked columns they keep the weight without taking the heading's job.

          No eyebrow over the heading. The band opens on the heading itself,
          which is the only block on this page that does; the label it carried
          named the same thing the heading says.

          `surface`, the warm off-white. Four other fills were tried on this
          band: `tint` and `panel-accent` read cold under the hero,
          `panel-orange` is the hero's own hue and the two ran together into one
          orange region that cost the hero its bottom edge, and `gold` put a
          yellow field directly beneath the sticky header's yellow CTA. What
          separates this band from the white one below it is no longer its fill
          but what sits on it: a raised white card, three marked columns, and a
          rule under each block. */}
      <Section band="surface">
        <Wrap>
          {/* The lede from design_handoff_meet_dewey_context_section: artwork
              left, copy right, centred on each other. Replaces the centred
              single column, which the handoff describes as reading like loose
              text with no surfaces.

              The artwork is the site's own `handshake` entry rather than the
              handoff's two SVG layers. They are the same drawing — the webp is
              that blob and that line art composed, in the same final
              orientation the handoff's `scaleX(-1)` produces — and the README
              asks for the codebase's own patterns. Going through `Spot` keeps
              the content hash, the responsive srcSet, and the intrinsic
              dimensions that stop the illustration shifting the band as it
              loads; two raw SVGs would have none of those. The handoff's
              caution about never flattening the layers is recorded on the
              ticket rather than silently overruled.

              432px and the 48px column gap are the handoff's. Its `auto 1fr`
              is `auto minmax(0,1fr)` here so the copy column can shrink rather
              than being forced to its longest word. */}
          <div className="mb-10 grid items-center gap-8 lg:mb-18 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
            {/* The chessboard artwork goes here. It is not in the repo yet —
                not in the illustration manifest, not in design/, and not in the
                context-section handoff, whose only asset is the handshake that
                has moved to the hero. Held as the site's own provisional block
                rather than left as an empty column, so the slot and its 432px
                width stay visible until the asset lands. */}
            <Placeholder
              tag="Illustration"
              className="w-full lg:w-[432px]"
            >
              Chessboard graphic, 432px wide. Awaiting the asset.
            </Placeholder>
            {/* 24px between heading and body, per the handoff. */}
            <div className="flex flex-col gap-6">
              {/* The handoff's 36/46 and 18/34. theme.css produces 42 and 32
                  and marks both inferred, so the handoff is the better source,
                  but the tokens are global and correcting them moves all
                  sixteen pages. Overridden here only, on Brett's call, and the
                  token question is raised separately. `lg:` on the heading
                  because below it `H2` steps down to heading-3, which the
                  handoff does not describe. */}
              <H2 className="lg:leading-[46px]">
                Your people know the business. Your agents scale the work. Dewey gives them shared
                context.
              </H2>
              <Lead className="max-w-none leading-[34px]">
                Your people understand the customers, policies, history, and nuance behind the
                work. Agents can extend their capacity with unprecedented speed and reach. But
                people and agents cannot work together effectively when they operate from
                different or incomplete versions of what the enterprise knows.
              </Lead>
            </div>
          </div>

          {/* Two panels with the arrows running between them.

              The two halves are deliberately unequal objects: the problem sits
              flat inside a hairline, the answer is the site's raised card on the
              page fill, so the eye lands on the second one. The arrows are what
              the panels alone could not say — which answer belongs to which
              problem. Scattered becomes one layer, unbounded access becomes
              authorized access, competing answers become sourced ones.

              Two forms, because the alignment only has a solution in one of
              them. As two panels each holding their own list, corresponding
              rows cannot line up: at this measure the left rows measure
              38/51/77px and the right 38/77/51px, mirrored, so an arrow placed
              against one side is off by up to 20px against the other. No amount
              of equal-share flex fixes that, because a row is as tall as its own
              copy.

              Side by side, the pairs therefore share ONE grid: each row is as
              tall as the taller of its two cells, and all three cells centre
              within it, so an arrow sits on its row whatever the copy does. The
              panels are two background elements spanning that grid rather than
              containers, which is the cost — the rows are cells, so they cannot
              also be a `ul`. Below `lg` the panels stack, nothing needs to
              align, and `ContrastPanel` renders the real list markup. Only one
              form is ever displayed, so nothing is announced twice. */}
          <div className="flex flex-col gap-4 lg:hidden">
            <ContrastPanel label="Without a context layer" items={CONTRAST.map(([p]) => p)} />
            <span
              aria-hidden="true"
              className="text-center text-[22px] leading-none text-orange-deep"
            >
              &#8595;
            </span>
            <ContrastPanel label="With Dewey" raised items={CONTRAST.map(([, a]) => a)} />
          </div>

          <div
            role="group"
            aria-label="Working without a context layer, and with Dewey"
            className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto_auto]"
          >
            {/* The panels themselves. First in the markup so every cell below
                paints over them. */}
            <div className="col-start-1 row-start-1 row-span-4 rounded-card border border-ink/30" />
            <div className="col-start-3 row-start-1 row-span-4 rounded-card border border-ink bg-page shadow-hard" />

            <div className="col-start-1 row-start-1 px-8 pt-8 pb-4">
              <Eyebrow as="span" tone="ink">Without a context layer</Eyebrow>
            </div>
            <div className="col-start-3 row-start-1 px-8 pt-8 pb-4">
              <Eyebrow as="span">With Dewey</Eyebrow>
            </div>

            {/* Ordered as pairs rather than column by column. Placement is
                explicit, so the grid does not care, and a screen reader reads
                each problem next to the answer that resolves it. */}
            {CONTRAST.map(([problem, answer], i) => {
              const last = i === CONTRAST.length - 1
              const cell = `flex items-center py-4 ${last ? 'pb-8' : ''}`
              const rule = i > 0 ? 'border-t border-ink/25' : ''
              return [
                <div key={`${problem}-p`} className={`col-start-1 ${PAIR_ROW[i]} ${cell} ${rule} px-8 text-body text-ink/70 text-pretty`}>
                  {problem}
                </div>,
                <div key={`${problem}-a`} aria-hidden="true" className={`col-start-2 ${PAIR_ROW[i]} ${cell} justify-center px-5 text-[20px] leading-none text-orange-deep`}>
                  &#8594;
                </div>,
                <div key={`${problem}-w`} className={`col-start-3 ${PAIR_ROW[i]} ${cell} ${rule} px-8 text-body font-semibold text-ink text-pretty`}>
                  {answer}
                </div>,
              ]
            })}
          </div>

          {/* Treatment 3c: one ink rule, then a divided run of three
              statements. Body font at semibold rather than heading type, so
              these stay statements and do not become a second heading level.

              The 1px columns in the template are the dividers themselves; they
              stretch to the row and carry the hairline. The handoff does not
              state a gutter for 3c, so 30px either side of each divider is
              EXTRAPOLATED from the 60px it sets between columns in 3a. */}
          <div className="mt-10 border-t border-ink pt-9 lg:mt-18">
            <div
              className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-y-7 lg:grid-cols-[1fr_1px_1fr_1px_1fr] lg:gap-x-[30px] lg:gap-y-0`}
            >
              {OUTCOMES.flatMap(({ text, square }, i) => {
                const statement = (
                  <p key={text} className="text-[18px] font-semibold leading-[28px] text-ink text-pretty">
                    <span aria-hidden="true" className={`mb-3 block h-2.5 w-2.5 ${square}`} />
                    {text}
                  </p>
                )
                return i === 0
                  ? [statement]
                  : [
                      <span
                        key={`${text}-rule`}
                        aria-hidden="true"
                        className="hidden bg-ink/20 lg:block"
                      />,
                      statement,
                    ]
              })}
            </div>
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Data in. Answers out.</H2>
          {/* Both paragraphs run the band rather than the site's 46rem measure,
              which is how the handoff sets them: the copy and the illustration
              under it share one left and right edge, and at the site measure the
              copy stopped two thirds of the way across a strip that runs the
              full width. */}
          <Body className="mb-3 max-w-none">
            Upload a file and Dewey takes it from there: storing, indexing, analyzing, and more.
            Agents then search by meaning, match exact terms when precision matters, or ask a
            question and get a cited answer. Storage, indexing, and retrieval in one API, built for
            agents from the first line.
          </Body>
          <Body className="mb-10 max-w-none">
            Every agent and every human works from the same live, rolled-up view of what your
            organization knows.
          </Body>

          <Eyebrow tone="ink" className="mb-3">The whole integration, in five steps</Eyebrow>
          <IntegrationSteps steps={STEPS} />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Why teams put Dewey™ between their data and their agents.</H2>
          <Lead className="mb-3">Seven reasons, one system.</Lead>
          <Body className="mb-10">
            Each pillar pairs the benefit you get with where it lives in the product. Pick one to
            see both.
          </Body>
          <DeweyPillars pillars={PILLARS} />
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Every library needs a librarian.</H2>
          <Body className="mb-3">
            Marketing and CRM, commerce, ERP and finance, analytics: systems of record were built
            for controlled transactions, not for autonomous software running open-ended queries.
            You don&#8217;t hand a patron the keys to the archive. The librarian retrieves
            what&#8217;s appropriate and keeps the stacks intact.
          </Body>
          <Body className="mb-8">
            That is Dewey&#8217;s job between agents and sensitive systems. Publish curated extracts
            into Dewey and agents work against the copy, never the source.
          </Body>

          <LibrarianDiagram />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Why not just&#8230;?</H2>
          <Body className="mb-8">Dewey is not another database to integrate. It&#8217;s the integration.</Body>
          <CompareTable
            columns={['Alternative', 'Where it falls short', 'Dewey’s answer']}
            rows={COMPARE}
          />
        </Wrap>
      </Section>

      {/* The same field the page opens on. Both lines were ink, which is what
          the gold band this replaces wanted; this one wants the off-white.

          No grain: only a page's opening band carries the film. So the
          off-white here measures the full 4.85:1 rather than the 4.54 the
          filmed hero holds. */}
      <Section band="orange-deep">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-4">Give your agents a library.</H2>
          <Lead tone="hero" className="mx-auto mb-8">
            The fastest way to judge a knowledge layer is to put your knowledge in it. Bring a
            corpus.
          </Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
