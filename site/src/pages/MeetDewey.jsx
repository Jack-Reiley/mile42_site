import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Button, Card } from '../components/primitives.jsx'
import { PlainList, StepStrip, CompareTable, GroupColumns, RuledGroup } from '../components/Lists.jsx'
import { REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'
import DeweyPillars from '../components/DeweyPillars.jsx'
import LibrarianFlow from '../components/LibrarianFlow.jsx'

/* Ported from the Dewey comp. Copy is verbatim; the structure is the site's
   own components. The comp draws this as a child of "What we do" with a
   breadcrumb — it is a top-level page instead, so it opens the way /why-mile42
   and /insights do, with an eyebrow and a hero H1 on its own identity band.

   `blue` is that identity band, the way `navy` is What We Do's, `gold` is How
   We Work's and `forest` is Why Mile42's. */

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

const AXES = [
  ['Security', 'No source-system credentials in agent context windows, prompts, or logs. The SOR attack surface never grows with agent count.'],
  ['Least privilege', 'Agents see only what was deliberately published into their tenant and namespace, scoped and tagged.'],
  ['Scalability', 'Retrieval load hits Dewey, not production. Your ERP never fields a thousand exploratory queries at 2 a.m.'],
  ['Stability', 'SOR schemas change on their own release cycles. Dewey decouples agents from those changes, so an upstream migration doesn’t break every agent overnight.'],
  ['Auditability', 'What agents can reach is an explicit, reviewable publication decision, not a side effect of a service account’s permissions.'],
  ['Freshness, on your terms', 'Connector schedules are configurable, so the copy updates on your publication cadence. Replace a file in place and the index follows: always exactly one current version.'],
]

const TRUTH = [
  ['Update once', 'Change a document and every consumer sees it. No per-agent copies, no reconciliation, no version archaeology.'],
  ['Shared map', 'The card catalog shows every agent what is known, not just what it happened to ingest.'],
  ['Humans included', 'The wiki-style admin console reads the same shelf, with browse, search, and cited answers built in.'],
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

export default function MeetDewey() {
  return (
    <>
      <Section band="blue">
        <Wrap>
          {/* Ice, not sky. On the blue band sky measures 3.37 and only ice clears
              AA, which is the pairing the BAND comment in primitives.jsx reasons
              about and the one WhatWeDo already uses. */}
          <Eyebrow tone="ice" className="mb-4">Dewey · The librarian for AI agents</Eyebrow>
          <H1 tone="hero" className="mb-6">Every agent needs a library.</H1>
          <Lead tone="hero">
            Agents don&#8217;t fail for lack of intelligence. They fail for lack of context.
          </Lead>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Data in. Answers out.</H2>
          <Body className="mb-3">
            Dewey is the knowledge layer that fixes it. Upload a file and Dewey takes it from there:
            storing, indexing, analyzing, and more. Agents then search by meaning, match exact terms
            when precision matters, or ask a question and get a cited answer. Storage, indexing, and
            retrieval in one API, built for agents from the first line.
          </Body>
          <Body className="mb-10">
            The name is the promise. The Dewey Decimal System made any library navigable by anyone.
            Dewey does the same for your organization&#8217;s knowledge, and it keeps a literal card
            catalog: a live, rolled-up view of everything known, for every agent and every human.
          </Body>

          <Eyebrow tone="ink" className="mb-3">The whole integration, in five steps</Eyebrow>
          <StepStrip items={STEPS} />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Why teams put Dewey between their data and their agents.</H2>
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
            Payroll, orders, HR, finance: systems of record were built for controlled transactions,
            not for autonomous software running open-ended queries. You don&#8217;t hand a patron
            the keys to the archive. The librarian retrieves what&#8217;s appropriate and keeps the
            stacks intact.
          </Body>
          <Body className="mb-8">
            That is Dewey&#8217;s job between agents and sensitive systems. Publish curated extracts
            into Dewey and agents work against the copy, never the source.
          </Body>

          <LibrarianFlow
            sources={['Payroll', 'Orders', 'HR and finance', 'ERP']}
            dewey={[
              'Governed, read-optimized copy',
              'Scoped by tenant and namespace',
              'Indexed and answerable',
            ]}
            agents={['Get answers, never keys', 'No SOR credentials in context', 'Load lands on Dewey']}
          />

          <GroupColumns className="mt-10">
            {AXES.map(([title, body]) => (
              <RuledGroup key={title} title={title} ruleClass="border-navy">
                <Body className="max-w-none">{body}</Body>
              </RuledGroup>
            ))}
          </GroupColumns>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Connectors are code, not prompts.</H2>
          <Body className="mb-3">
            Data flows between Dewey and your systems of record through deterministic connectors:
            plain code with transformation and validation built in, running on schedules you
            configure. No LLM in the sync path means no inference cost per run and no behavior that
            drifts with a model.
          </Body>
          <Lead className="mb-8">Agents propose. Humans approve. Code executes.</Lead>

          <div
            className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-4 min-[900px]:grid-cols-2 min-[900px]:gap-6`}
          >
            <Card>
              <Eyebrow tone="ink">Inbound · SOR to Dewey</Eyebrow>
              <Body className="max-w-none">
                The acquisitions desk. Connectors pull from source systems on your schedule and
                shape data on the way in, so everything arrives cataloged and shelved.
              </Body>
              <PlainList
                variant="ruled"
                items={[
                  'Deterministic code logic, testable and versioned',
                  'Transformation and validation shape and organize data into the library',
                  'Configurable synchronization schedules',
                ]}
              />
            </Card>
            {/* Mint and shadowed, unlike its pair: the outbound path is the one
                that writes, so it is the one that carries weight. */}
            <Card fill="mint">
              <Eyebrow tone="ink">Outbound · Dewey to SOR</Eyebrow>
              <Body className="max-w-none">
                Circulation with a signature. When agent work should flow back to a source system,
                updates travel as deterministic code, and nothing ships without the
                librarian&#8217;s stamp.
              </Body>
              <PlainList
                variant="ruled"
                items={[
                  'Agents propose changes in Dewey, never in the SOR',
                  'Gated by human review and signoff',
                  'Approved updates execute as plain, repeatable code',
                ]}
              />
            </Card>
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">One source of truth, every agent.</H2>
          <Body>
            Multi-agent systems drift when each agent carries its own context: every private copy is
            a fork of reality. Dewey centralizes knowledge and memory so orchestrators, sub-agents,
            and humans all read from the same catalog.
          </Body>
          <GroupColumns className="mt-9">
            {TRUTH.map(([title, body]) => (
              <RuledGroup key={title} title={title} ruleClass="border-brand">
                <Body className="max-w-none">{body}</Body>
              </RuledGroup>
            ))}
          </GroupColumns>
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

      <Section band="gold">
        <Wrap className="text-center">
          <H2 className="mb-4">Give your agents a library.</H2>
          <Lead className="mx-auto mb-8">
            The fastest way to judge a knowledge layer is to put your knowledge in it. Bring a
            corpus.
          </Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
