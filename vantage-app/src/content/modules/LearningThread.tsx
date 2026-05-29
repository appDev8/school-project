import type { ReactNode } from 'react';
import { NODES, EDGES } from '../data/manhal/graph';
import { NESA_STAGE4_MATHS_SOURCE } from '../data/manhal/nesaStage4Maths';
import { importNesaOutcomes } from '../../lib/nesaImport';
import {
  computeStatuses,
  requiredOutcomesFor,
  projectReadiness,
  bestScore,
} from '../../lib/manhalEngine';
import { challengeById } from '../data/manhal/projects';
import { artefactsFor, notesFor } from '../data/manhal/portfolio';
import { personaById, EVIDENCE } from '../data/manhal/personas';
import { STAGES, STREAMS } from '../data/vantage';
import type { MasteryStatus } from '../data/manhal/types';
import { Flag } from '../../components/Flag';

// ---------------------------------------------------------------------------
// THE LEARNING THREAD — one real outcome traced through every layer of the live
// system, so a reviewer can see how knowledge → mastery → project → portfolio →
// coaching → credential actually connect. Nothing here is mocked for the page:
// the node comes from the live NESA importer, the gating comes from the real
// engine, and the learner state is computed from xAPI-shaped evidence.
// ---------------------------------------------------------------------------

// The thread we follow: Rates That Persuade (MA4-RAT) → Water-Use Awareness
// Campaign → Athar, for Yusuf (Media stream, Year 7, Discovery stage).
const OUTCOME_ID = 'MA4-RAT';
const PROJECT_ID = 'amal-media-campaign';
const LEARNER_ID = 'yusuf';

// Prove provenance: the same outcome exists in the live importer's output.
const IMPORT = importNesaOutcomes(NESA_STAGE4_MATHS_SOURCE);

const node = NODES.find((n) => n.id === OUTCOME_ID)!;
// Provenance: the graph node's caseId IS the real outcome code, which the live
// importer uses as its node id. Finding it proves the curated node is backed by
// the verified syllabus source (the same assertion the import test enforces).
const IMPORTED = IMPORT.nodes.find((n) => n.id === node.caseId);
const project = challengeById(PROJECT_ID)!;
const learner = personaById(LEARNER_ID)!;
const stream = STREAMS.find((s) => s.id === learner.stream)!;
const stage = STAGES.find((s) => s.id === node.stage)!;

// Prerequisite + related edges for this outcome, resolved to titles.
const prereqIds = EDGES.filter((e) => e.to === OUTCOME_ID && e.type === 'prerequisite').map(
  (e) => e.from,
);
const titleOf = (id: string) => NODES.find((n) => n.id === id)?.title ?? id;

// Live gating for this learner.
const statuses = computeStatuses(NODES, EDGES, EVIDENCE[LEARNER_ID]);
const ratStatus = statuses.get(OUTCOME_ID)!;
const required = requiredOutcomesFor(PROJECT_ID, NODES);
const readiness = projectReadiness(PROJECT_ID, required, statuses);
const blockingPrereqs = prereqIds.filter((id) => statuses.get(id) !== 'mastered');

const artefact = artefactsFor(LEARNER_ID)[0];
const coachNote = notesFor(LEARNER_ID)[0];

const STATUS_TONE: Record<MasteryStatus, string> = {
  locked: 'bg-sand text-ink/50',
  available: 'bg-olive/15 text-olive',
  in_progress: 'bg-bronze/15 text-bronze',
  proficient: 'bg-itq/15 text-itq',
  mastered: 'bg-itq text-cream',
};

const STATUS_LABEL: Record<MasteryStatus, string> = {
  locked: 'Locked',
  available: 'Available',
  in_progress: 'In progress',
  proficient: 'Proficient',
  mastered: 'Mastered',
};

function StatusPill({ status }: { status: MasteryStatus }) {
  return (
    <span
      className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${STATUS_TONE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

// One numbered layer in the thread.
function Layer({
  n,
  title,
  role,
  flag,
  children,
}: {
  n: number;
  title: string;
  role: string;
  flag: 'fact' | 'plan' | 'proposed' | 'nesa';
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-sand bg-white p-5 relative pl-8">
      <div className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-itq text-cream text-xs flex items-center justify-center">
        {n}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="serif text-xl text-itq">{title}</div>
          <div className="text-[11px] uppercase tracking-wide text-bronze">{role}</div>
        </div>
        <Flag kind={flag} />
      </div>
      <div className="mt-3 border-t border-sand pt-3">{children}</div>
    </div>
  );
}

export default function LearningThread() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">How it all connects</div>
        <h1 className="serif text-4xl text-itq">The learning thread, end to end</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          One real outcome, followed through every layer of the system — from the NESA syllabus to
          an Open Badge. The node below is drawn from the live importer, the gates from the real
          mastery engine, and the learner&rsquo;s state computed from xAPI-shaped evidence. This is
          how knowledge, projects, portfolio and coaching are actually wired together at Vantage.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="nesa">real outcome: {node.caseId}</Flag>
          <Flag kind="fact">live engine + importer</Flag>
          <Flag kind="plan">the learning design is my plan</Flag>
        </div>
      </header>

      {/* The one-line thread */}
      <section>
        <div className="rounded-xl border border-itq/20 bg-itq/[0.03] p-5">
          <div className="text-[11px] uppercase tracking-widest text-bronze mb-3">
            The thread we follow
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
            <span className="px-2.5 py-1 rounded-md bg-white border border-sand text-itq font-medium">
              {stage.stage} · {stage.years}
            </span>
            <span className="text-bronze">›</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-sand text-itq">
              {stream.icon} {stream.name.split(',')[0]} stream
            </span>
            <span className="text-bronze">›</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-sand text-itq">
              Outcome: {node.title}
            </span>
            <span className="text-bronze">›</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-sand text-itq">
              Project: {project.title}
            </span>
            <span className="text-bronze">›</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-sand text-itq">
              Learner: {learner.name} (Yr {learner.year})
            </span>
          </div>
          <p className="text-xs text-ink/50 mt-3">
            {stage.mode} · stream excellence: <span className="italic">{stream.ihsan}</span>
          </p>
        </div>
      </section>

      {/* The layered thread */}
      <section className="space-y-3">
        <Layer
          n={1}
          title="Syllabus → Manhal node"
          role="Competency Architect · imported, not hand-typed"
          flag="nesa"
        >
          <p className="text-sm text-ink/70">
            The outcome enters as data. The live importer reads the verified NESA source and emits a
            CASE-wrapped node — the same node the graph renders. No hand-typing, so the graph
            refreshes when NESA revises the syllabus.
          </p>
          <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-sand/40 border border-sand p-3">
              <div className="text-[10px] uppercase tracking-wide text-bronze">NESA outcome</div>
              <code className="text-xs text-itq font-medium">{node.caseId}</code>
              <div className="text-xs text-ink/50 mt-1">
                {IMPORTED ? 'present in live import ✓' : 'not found'}
              </div>
            </div>
            <div className="rounded-lg bg-sand/40 border border-sand p-3">
              <div className="text-[10px] uppercase tracking-wide text-bronze">CASE id</div>
              <code className="text-[11px] text-itq break-all">
                case:nsw-maths-2022:{node.caseId}
              </code>
            </div>
            <div className="rounded-lg bg-sand/40 border border-sand p-3">
              <div className="text-[10px] uppercase tracking-wide text-bronze">Gated behind</div>
              {prereqIds.length ? (
                prereqIds.map((id) => (
                  <div key={id} className="text-xs text-itq">
                    {titleOf(id)} <code className="text-ink/40">({id})</code>
                  </div>
                ))
              ) : (
                <div className="text-xs text-ink/50">a root outcome — no prerequisites</div>
              )}
            </div>
          </div>
        </Layer>

        <Layer
          n={2}
          title="Manhal piece — where the theory is taught"
          role="Competency Architect · the primary source of knowledge"
          flag="plan"
        >
          <p className="text-sm italic text-itq/90">&ldquo;{node.essentialQuestion}&rdquo;</p>
          <p className="text-sm text-ink/70 mt-2">{node.rationale}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-sand text-ink/70">
              {node.manhalCode}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sand text-ink/70">
              ~{node.estimatedHours} hours
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sand text-ink/70">
              {node.resources.length} resources
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sand text-ink/70">
              Bloom: {node.bloom}
            </span>
          </div>
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {node.learningSequence?.map((step) => (
              <div key={step.title} className="rounded-lg border border-sand bg-cream/50 p-3">
                <div className="text-[10px] uppercase tracking-widest text-bronze">
                  {step.phase}
                </div>
                <div className="text-sm font-medium text-itq mt-0.5">{step.title}</div>
                <p className="text-xs text-ink/60 mt-1">{step.detail}</p>
              </div>
            ))}
          </div>
        </Layer>

        <Layer
          n={3}
          title="Mastery gate — the in-house engine"
          role="Manhal · the rule that unlocks the next step"
          flag="fact"
        >
          <p className="text-sm text-ink/70">
            A node unlocks only when every prerequisite is mastered, and counts as mastered only
            above the threshold. The rubric&rsquo;s <span className="text-itq">proficient</span> band
            is the gate. Here is the same engine, run on {learner.name}&rsquo;s real evidence:
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-sand/40 border border-sand p-3">
            <div className="text-sm text-itq font-medium">{node.title}</div>
            <StatusPill status={ratStatus} />
            <div className="text-xs text-ink/60">
              gate at {Math.round(node.masteryCheck.threshold * 100)}% ·{' '}
              {learner.name}&rsquo;s best so far {Math.round(bestScore(EVIDENCE[LEARNER_ID], OUTCOME_ID) * 100)}%
            </div>
          </div>
          {blockingPrereqs.length > 0 && (
            <p className="text-xs text-ink/60 mt-2">
              Still locked because{' '}
              {blockingPrereqs.map((id, i) => (
                <span key={id}>
                  {i > 0 && ', '}
                  <span className="text-itq">{titleOf(id)}</span> is{' '}
                  {STATUS_LABEL[statuses.get(id)!].toLowerCase()}
                </span>
              ))}
              . The gate is doing its job — no skipping fractions to get to rates.
            </p>
          )}
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {node.rubric?.map((band) => (
              <div
                key={band.level}
                className={`rounded-lg border p-2.5 text-xs ${
                  band.level === 'proficient'
                    ? 'border-itq/40 bg-itq/[0.04]'
                    : 'border-sand bg-white'
                }`}
              >
                <span className="uppercase tracking-wide text-[10px] text-bronze">
                  {band.level}
                  {band.level === 'proficient' && ' · gate'}
                </span>
                <p className="text-ink/70 mt-0.5">{band.descriptor}</p>
              </div>
            ))}
          </div>
        </Layer>

        <Layer
          n={4}
          title="’Amal Challenge — knowledge becomes real work"
          role="Expedition Guide + Expert in Residence"
          flag="fact"
        >
          <p className="text-sm text-ink/70">
            The outcome doesn&rsquo;t end in a quiz — it <span className="text-itq">feeds a
            project</span>. The graph is the single source of truth: this challenge unlocks when its
            required outcomes reach proficiency.
          </p>
          <div className="mt-3 rounded-lg border border-sand bg-cream/50 p-4">
            <div className="flex items-baseline justify-between gap-2">
              <div className="serif text-lg text-itq">{project.title}</div>
              <span className="text-xs text-bronze">{project.weeks} weeks</span>
            </div>
            <p className="text-sm italic text-ink/70 mt-1">&ldquo;{project.driving}&rdquo;</p>
            <p className="text-sm text-ink/70 mt-2">{project.summary}</p>
            <div className="text-xs text-ink/50 mt-2">
              Partner: {project.partner} · Deliverable: {project.deliverable}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-sand/40 border border-sand p-3">
            <div className="text-sm text-itq font-medium">Unlock progress for {learner.name}</div>
            <div className="flex-1 min-w-[140px] h-5 rounded-md bg-white border border-sand overflow-hidden">
              <div
                className="h-full bg-itq/80 rounded-md"
                style={{ width: `${readiness.pct}%` }}
              />
            </div>
            <div className="text-xs text-ink/60 tabular-nums">
              {readiness.ready}/{readiness.required} outcomes ·{' '}
              {readiness.unlocked ? 'unlocked' : 'locked'}
            </div>
          </div>
          <div className="mt-2 text-xs text-ink/50">
            Required outcomes (from each node&rsquo;s <code>feedsProjects</code>):{' '}
            {required.map((id) => titleOf(id)).join(' · ')}
          </div>
        </Layer>

        <Layer
          n={5}
          title="Athar portfolio + xAPI — the evidence trail"
          role="Learner · captured to the LRS"
          flag="plan"
        >
          <p className="text-sm text-ink/70">
            Mastery artefacts flagged <code>toPortfolio</code> flow into the learner&rsquo;s Athar
            portfolio, and every action is captured as an xAPI statement to the LRS — so a parent or
            coach can trace knowledge → project → artefact → reflection.
          </p>
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-sand bg-white p-3">
              <div className="text-[10px] uppercase tracking-wide text-bronze">
                Mastery artefacts (this piece)
              </div>
              <ul className="mt-1.5 space-y-1.5">
                {node.masteryArtefacts?.map((a) => (
                  <li key={a.name} className="text-sm text-ink/75">
                    <span className="text-itq font-medium">{a.name}</span>
                    {a.toPortfolio && (
                      <span className="ml-1.5 text-[10px] uppercase tracking-wide text-olive">
                        → Athar
                      </span>
                    )}
                    <div className="text-[11px] text-ink/50">{a.capturedAs}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-sand bg-white p-3">
              <div className="text-[10px] uppercase tracking-wide text-bronze">
                {learner.name}&rsquo;s Athar so far
              </div>
              {artefact ? (
                <div className="mt-1.5">
                  <div className="text-sm text-itq font-medium">{artefact.title}</div>
                  <div className="text-[11px] text-ink/50">
                    {artefact.kind} · evidences {artefact.outcomes.join(', ')} · {artefact.date}
                  </div>
                  <p className="text-xs text-ink/60 mt-1 italic">
                    &ldquo;{artefact.reflection}&rdquo;
                  </p>
                </div>
              ) : (
                <p className="text-xs text-ink/50 mt-1.5">No artefacts captured yet.</p>
              )}
            </div>
          </div>
          {node.xapiExamples && node.xapiExamples.length > 0 && (
            <div className="mt-3 rounded-lg bg-ink/[0.03] border border-sand p-3">
              <div className="text-[10px] uppercase tracking-wide text-bronze mb-1.5">
                xAPI emitted to the LRS (illustrative — what mastery looks like)
              </div>
              <div className="space-y-1 font-mono text-[11px] text-ink/70">
                {node.xapiExamples.map((x, i) => (
                  <div key={i}>
                    <span className="text-itq">{x.actor.name}</span> {x.verb}{' '}
                    <span className="text-bronze">{x.object.type}:{x.object.id}</span>
                    {x.result?.score?.scaled != null && (
                      <span> (scaled {x.result.score.scaled})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Layer>

        <Layer
          n={6}
          title="Murabbi coaching — the human thread"
          role="Learning Coach · connection over exam-drilling"
          flag="proposed"
        >
          <p className="text-sm text-ink/70">
            None of this is left to a dashboard alone. A Learning Coach (Murabbi) holds the
            relationship and reads the same evidence — turning a locked gate into a next step, not a
            failure.
          </p>
          {coachNote && (
            <div className="mt-3 rounded-lg border-l-2 border-bronze bg-cream/50 p-3">
              <div className="flex items-baseline justify-between gap-2">
                <div className="text-sm text-itq font-medium">{coachNote.coach}</div>
                <span className="text-[10px] uppercase tracking-wide text-bronze">
                  {coachNote.focus} · {coachNote.date}
                </span>
              </div>
              <p className="text-sm text-ink/70 mt-1">{coachNote.note}</p>
            </div>
          )}
        </Layer>

        <Layer
          n={7}
          title="Standards & badge — credentials that travel"
          role="Manhal · portable by design"
          flag="plan"
        >
          <p className="text-sm text-ink/70">
            Because every piece carries real standards alignment, the evidence is portable: NESA
            outcomes as CASE in, xAPI through, an Open Badge 3.0 out at capstone.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {node.standards?.map((s) => (
              <span
                key={s.framework + s.code}
                className="text-[11px] px-2 py-1 rounded-md bg-sand/60 border border-sand text-ink/70"
                title={s.descriptor}
              >
                <span className="text-itq font-medium">{s.framework}</span>{' '}
                <code className="text-[10px]">{s.code}</code>
              </span>
            ))}
          </div>
          {node.badge && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-itq text-cream px-4 py-1.5 text-sm">
              <span>◆</span>
              <span>Open Badge 3.0 — {node.badge}</span>
            </div>
          )}
        </Layer>
      </section>

      {/* The connection, in one line */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">The whole connection</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The same loop runs for every outcome in the graph. Coaching holds it; the role dashboards
          make it legible to student, coach, parent and leadership.
        </p>
        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
            {[
              'NESA outcome (CASE)',
              'Manhal piece — taught',
              'Mastery gate',
              '’Amal Challenge',
              'Athar artefact + xAPI',
              'LRS',
              'Open Badge 3.0',
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-sand/60 text-itq">{step}</span>
                {i < arr.length - 1 && <span className="text-bronze">→</span>}
              </span>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-sand text-xs text-ink/60">
            <span className="text-bronze">Held throughout by</span> the Murabbi (Learning Coach) ·{' '}
            <span className="text-bronze">surfaced on</span> the student / coach / parent /
            leadership dashboards.
          </div>
        </div>
      </section>

      {/* Honesty panel */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Honest about what&rsquo;s real today</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          A founding plan earns trust by separating what is built from what is designed. This thread
          mixes three things, and says which is which.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-sand bg-white p-5">
            <Flag kind="fact">Built &amp; working</Flag>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              <li>· The mastery engine &amp; gating (unit-tested)</li>
              <li>· The live NESA importer ({IMPORT.summary.total} outcomes)</li>
              <li>· The graph, dashboards &amp; portfolio glue</li>
            </ul>
          </div>
          <div className="rounded-xl border border-sand bg-white p-5">
            <Flag kind="nesa">Verified facts</Flag>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              <li>· Real NESA Stage-4 outcome codes</li>
              <li>· UXL stages, 3 streams, 4 educator roles</li>
              <li>· Full Meal Program · Parramatta campus</li>
            </ul>
          </div>
          <div className="rounded-xl border border-sand bg-white p-5">
            <Flag kind="plan">My candidate design</Flag>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              <li>· The authored learning sequence &amp; rubric</li>
              <li>· Prerequisite ordering &amp; resource picks</li>
              <li>· The Murabbi/Athar overlay (flagged proposed)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
