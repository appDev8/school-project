import type { ReactNode } from 'react';
import { Flag } from '../../components/Flag';
import { NODES } from '../data/manhal/graph';
import { challengeById } from '../data/manhal/projects';
import { ARTEFACTS, COACH_NOTES } from '../data/manhal/portfolio';
import type { OutcomeNode } from '../data/manhal/types';

// Manhal — anatomy & workflow.
// The narrative companion to the live graph: it explains how a subject is
// decomposed into gated "pieces", opens one real piece "from the inside", and
// traces the knowledge → project → portfolio → coaching loop end-to-end. All
// content is pulled from the same typed data the graph runs on, so this page and
// the engine can never drift.

const PHASE_ORDER = ['Explore', 'Build', 'Apply', 'Demonstrate'] as const;

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <div className="text-xs uppercase tracking-widest text-bronze">{eyebrow}</div>
        <h2 className="serif text-2xl text-itq mt-1">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-sand bg-white p-5 ${className}`}>{children}</div>;
}

export default function ManhalAnatomy() {
  const dan = NODES.find((n) => n.id === 'MA4-DAN');
  // Worked piece for the deep-dive (fully authored exemplar).
  const piece: OutcomeNode | undefined = dan;

  // The real end-to-end thread already encoded in the data (Layla, law stream).
  const project = challengeById('amal-law-policy');
  const threadArtefacts = ARTEFACTS.filter((a) => a.studentId === 'layla');
  const threadNotes = COACH_NOTES.filter((n) => n.studentId === 'layla');
  const sampleXapi = piece?.xapiExamples?.[0];

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">Manhal · anatomy & workflow</div>
        <h1 className="serif text-4xl text-itq">How Manhal works</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          Manhal is the school’s map of <em>theoretical</em> knowledge: one node per syllabus
          outcome, decomposed into named, gated “pieces”. Each piece is a self-contained learning
          experience that maps to NESA, carries its own resources, and ends in artefacts that prove
          mastery — which is what then unlocks the real-world projects.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">UXL — vantagebyunity.school</Flag>
          <Flag kind="nesa">outcomes ≈ CASE</Flag>
          <Flag kind="fact">evidence ≈ xAPI → LRS</Flag>
          <Flag kind="proposed">Manhal — The Ihsan Way</Flag>
        </div>
      </header>

      {/* Is this UXL? — answer the question directly */}
      <Section eyebrow="First, the honest answer" title="Is this UXL — or something different?">
        <Card>
          <p className="text-ink/80">
            <strong className="text-itq">UXL (Unity Experiential Learning) is Vantage’s own
            advertised model</strong> — project-based learning, design thinking and Islamic
            pedagogy mapped onto NESA, run in three stages: Discovery (Yr 7–8) → Mastery (Yr 9–10) →
            Impact (Yr 11–12). That is the model the school will apply.
          </p>
          <p className="text-ink/80 mt-3">
            Manhal does <em>not</em> replace UXL. It is the knowledge engine that{' '}
            <strong className="text-itq">operationalises</strong> it: PBL needs a dependable supply
            of theoretical knowledge underneath the projects, and Manhal is that supply — the graph
            that says what a learner must know, in what order, and how we’ll know they know it. The
            candidate overlay (“The Ihsan Way”) adds the adab/iḥsān framing and is flagged{' '}
            <Flag kind="proposed">proposed</Flag>, not presented as school policy.
          </p>
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
            {[
              ['Discovery · Yr 7–8', 'Micro-projects. Manhal pieces are short, scaffolded, single-outcome.'],
              ['Mastery · Yr 9–10', 'Educator-led depth. Pieces chain into longer prerequisite paths.'],
              ['Impact · Yr 11–12', 'Learner-led capstones. Mastered paths mint Open Badges.'],
            ].map(([h, b]) => (
              <div key={h} className="rounded-lg border border-sand bg-cream/60 p-3">
                <div className="text-[11px] uppercase tracking-wide text-bronze">{h}</div>
                <div className="text-ink/70 mt-1">{b}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Flag kind="fact">UXL stages — Vantage</Flag>
            <Flag kind="proposed">Manhal as the engine</Flag>
          </div>
        </Card>
      </Section>

      {/* From subject to piece — decomposition logic */}
      <Section eyebrow="The structure" title="From a subject to a single gated piece">
        <p className="text-ink/70 max-w-3xl">
          Every subject is decomposed the same way, so the graph is uniform and importable. A Key
          Learning Area splits into focus areas; each focus area’s NESA outcomes each become exactly
          one Manhal piece. Pieces are wired to each other by prerequisite edges, and the engine
          won’t let a learner start a piece until everything it depends on is mastered.
        </p>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            ['KLA', 'Mathematics', 'The subject. One graph per KLA, merged into the whole.'],
            ['Focus area', 'Number · Statistics', 'NESA’s grouping inside the syllabus.'],
            ['NESA outcome', 'MA4-FRC-C-01', 'The verbatim outcome. Becomes one node, wrapped as CASE.'],
            ['Manhal piece', '“Money Sense” · MNL-NUM-04', 'The learner-facing unit: question, resources, gate, artefacts.'],
          ].map(([level, eg, note], i) => (
            <div key={level} className="relative rounded-xl border border-sand bg-white p-4">
              <div className="text-[11px] uppercase tracking-wide text-bronze">{level}</div>
              <div className="serif text-itq mt-1">{eg}</div>
              <div className="text-xs text-ink/60 mt-1.5">{note}</div>
              {i < 3 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-bronze/50">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
        <Card className="bg-cream/50">
          <div className="text-[11px] uppercase tracking-wide text-bronze mb-2">
            The five design rules every piece obeys
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-ink/75 list-disc list-inside">
            <li>One node = one NESA outcome (no compound pieces).</li>
            <li>Prerequisites are explicit edges, not prose.</li>
            <li>A piece is gated: locked until its prerequisites are mastered.</li>
            <li>Mastery is evidenced, not assumed — gate at ~80%.</li>
            <li>Every piece names the project(s) it feeds.</li>
            <li>Every claim is flagged for provenance (fact / plan / verify…).</li>
          </ul>
        </Card>
      </Section>

      {/* Anatomy of a piece — full worked example from the inside */}
      {piece && (
        <Section eyebrow="A piece, from the inside" title={piece.unitName ?? piece.title}>
          <p className="text-ink/70 max-w-3xl">
            This is a real, fully-authored piece as the platform stores it — the same object the
            live graph renders. It is the data spine for the Youth Data Policy Brief.
          </p>

          <Card className="space-y-5">
            {/* Identity */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-bronze">
                {piece.id}
                {piece.manhalCode && <span className="text-ink/30"> · {piece.manhalCode}</span>}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-sand text-ink/60">
                {piece.caseId}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-sand text-ink/60">
                {piece.stage} · Bloom: {piece.bloom}
              </span>
              {piece.estimatedHours != null && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-sand text-ink/60">
                  ≈ {piece.estimatedHours} h
                </span>
              )}
            </div>
            {piece.essentialQuestion && (
              <div className="rounded-lg border-l-2 border-bronze bg-cream px-3 py-2 text-ink/80 italic">
                “{piece.essentialQuestion}”
              </div>
            )}
            {piece.rationale && <p className="text-sm text-ink/70">{piece.rationale}</p>}

            {/* Standards */}
            {piece.standards && (
              <div>
                <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
                  Mapped to standards — NESA + national frameworks
                </div>
                <ul className="space-y-1.5">
                  {piece.standards.map((s) => (
                    <li key={`${s.framework}-${s.code}`} className="text-sm">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Flag kind={s.flag}>{s.code}</Flag>
                        <span className="text-[11px] text-ink/45">{s.framework}</span>
                      </div>
                      <div className="text-ink/70 mt-0.5">{s.descriptor}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learning sequence */}
            {piece.learningSequence && (
              <div>
                <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-2">
                  Interactive learning sequence
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[...piece.learningSequence]
                    .sort((a, b) => PHASE_ORDER.indexOf(a.phase) - PHASE_ORDER.indexOf(b.phase))
                    .map((step) => (
                      <div key={`${step.phase}-${step.title}`} className="rounded-lg border border-sand bg-cream/50 p-3">
                        <div className="text-[10px] uppercase tracking-wide text-itq font-medium">
                          {step.phase}
                          {step.minutes != null && (
                            <span className="text-ink/40 font-normal"> · {step.minutes}m</span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-ink/85 mt-1">{step.title}</div>
                        <div className="text-xs text-ink/65 mt-0.5">{step.detail}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Resources */}
            <div>
              <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
                Resources (buy/host commodity content; build the glue)
              </div>
              <ul className="space-y-1">
                {piece.resources.map((res) => (
                  <li key={res.title} className="text-sm flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-cream border border-sand text-ink/60">
                      {res.type}
                    </span>
                    <span className="text-ink/80">{res.title}</span>
                    {res.provider && <span className="text-[11px] text-ink/45">· {res.provider}</span>}
                    {res.minutes != null && (
                      <span className="text-[11px] text-ink/40">· {res.minutes} min</span>
                    )}
                    {res.flag && <Flag kind={res.flag} />}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mastery artefacts + rubric + badge */}
            <div className="grid lg:grid-cols-2 gap-4">
              {piece.masteryArtefacts && (
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
                    Artefacts that prove mastery
                  </div>
                  <ul className="space-y-2">
                    {piece.masteryArtefacts.map((a) => (
                      <li key={a.name} className="rounded-lg border border-sand bg-cream/60 p-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-itq">{a.name}</span>
                          <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-white border border-sand text-ink/55">
                            {a.kind}
                          </span>
                          {a.toPortfolio && (
                            <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-bronze/10 text-bronze">
                              → Athar
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-ink/70 mt-1">{a.prompt}</div>
                        <div className="text-[11px] text-ink/45 mt-1">
                          evidences {a.evidences.join(', ')} · {a.capturedAs}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {piece.rubric && (
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
                    Proficiency rubric · gate at “proficient”
                  </div>
                  <ul className="space-y-1">
                    {piece.rubric.map((band) => {
                      const isGate = band.level === 'proficient';
                      return (
                        <li
                          key={band.level}
                          className={`text-sm flex gap-2 rounded px-2 py-1 ${isGate ? 'bg-olive/10' : ''}`}
                        >
                          <span
                            className={`shrink-0 mt-0.5 text-[10px] uppercase tracking-wide ${
                              isGate ? 'font-semibold text-olive' : 'text-ink/45'
                            }`}
                          >
                            {band.level}
                          </span>
                          <span className="text-ink/70">{band.descriptor}</span>
                        </li>
                      );
                    })}
                  </ul>
                  {piece.badge && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-bronze/10 text-bronze text-xs font-medium">
                      ◆ Open Badge: {piece.badge}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </Section>
      )}

      {/* Workflow — knowledge → project → portfolio → coaching */}
      <Section eyebrow="The loop" title="How a mastered piece connects to everything else">
        <p className="text-ink/70 max-w-3xl">
          Mastery isn’t the finish line — it’s the key. The moment a learner clears the pieces a
          project needs, the project unlocks; the work they produce becomes portfolio evidence; and
          the coach sees the whole trail. Below is one real thread the platform already holds — Layla,
          law stream.
        </p>
        <div className="grid md:grid-cols-4 gap-3">
          {/* 1 — Knowledge */}
          <Card className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-wide text-bronze">1 · Knowledge — Manhal</div>
            <div className="serif text-itq">{dan?.unitName ?? 'Data analysis'}</div>
            <div className="text-xs text-ink/60">{dan?.caseId}</div>
            <p className="text-sm text-ink/70">
              Mastered at 91% → emits a <span className="text-itq">mastered</span> xAPI statement to
              the LRS.
            </p>
            <Flag kind="nesa">MA4-DAT-C-02</Flag>
          </Card>
          {/* 2 — Project */}
          <Card className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-wide text-bronze">2 · Project — ’Amal</div>
            <div className="serif text-itq">{project?.title}</div>
            <div className="text-xs text-ink/60">Partner: {project?.partner}</div>
            <p className="text-sm text-ink/70">{project?.driving}</p>
            <p className="text-xs text-ink/55">
              Unlocks when every required outcome is proficient+ ({project?.weeks} weeks).
            </p>
            <Flag kind="plan">PBL — Discovery stage</Flag>
          </Card>
          {/* 3 — Portfolio */}
          <Card className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-wide text-bronze">3 · Portfolio — Athar</div>
            <ul className="text-sm text-ink/75 space-y-1">
              {threadArtefacts.map((a) => (
                <li key={a.id}>
                  <span className="text-itq">{a.title}</span>
                  <span className="text-[11px] text-ink/45"> · {a.outcomes.join(', ')}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink/55">Each artefact links back to the outcomes it evidences.</p>
            <Flag kind="fact">artefacts ≈ Open Badges trail</Flag>
          </Card>
          {/* 4 — Coaching */}
          <Card className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-wide text-bronze">4 · Coaching — Murabbi</div>
            {threadNotes.map((n) => (
              <div key={n.id}>
                <div className="text-[11px] text-ink/45">{n.coach} · {n.focus}</div>
                <p className="text-sm text-ink/70">{n.note}</p>
              </div>
            ))}
            <Flag kind="proposed">Murabbi overlay</Flag>
          </Card>
        </div>
      </Section>

      {/* Standards & evidence backbone */}
      <Section eyebrow="Built on standards" title="The evidence backbone — and what we build vs buy">
        <div className="grid md:grid-cols-3 gap-3">
          {[
            ['CASE (1EdTech)', 'fact', 'NESA outcomes are wrapped as CASE items so the graph is standards-portable and importable.'],
            ['xAPI → LRS', 'fact', 'Every attempt, completion and mastery is an xAPI statement sent to a Learning Record Store — the system of record.'],
            ['Open Badges 3.0', 'fact', 'Capstone achievements (Impact stage) mint verifiable Open Badges a learner keeps for life.'],
          ].map(([h, flag, body]) => (
            <Card key={h} className="space-y-1.5">
              <div className="serif text-itq">{h}</div>
              <Flag kind={flag as 'fact'}>standard</Flag>
              <p className="text-sm text-ink/70">{body}</p>
            </Card>
          ))}
        </div>

        {sampleXapi && (
          <Card className="bg-ink text-cream/90">
            <div className="text-[11px] uppercase tracking-wide text-cream/50 mb-2">
              Sample xAPI statement this piece emits to the LRS
            </div>
            <pre className="text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(sampleXapi, null, 2)}
            </pre>
          </Card>
        )}

        <Card className="bg-cream/50">
          <div className="text-[11px] uppercase tracking-wide text-bronze mb-2">Build vs buy</div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-itq">Build in-house (the IP)</div>
              <ul className="list-disc list-inside text-ink/70 mt-1 space-y-0.5">
                <li>The Manhal graph + prerequisite gating engine</li>
                <li>Project-readiness logic (knowledge → ’Amal)</li>
                <li>Athar portfolio glue + role dashboards</li>
              </ul>
              <div className="mt-1"><Flag kind="plan">candidate build</Flag></div>
            </div>
            <div>
              <div className="font-medium text-itq">Buy / host (commodity)</div>
              <ul className="list-disc list-inside text-ink/70 mt-1 space-y-0.5">
                <li>LMS competency layer (Moodle / Canvas)</li>
                <li>Content (CK-12, Desmos, CODAP, ABS data)</li>
                <li>LRS (Learning Locker / Veracity)</li>
              </ul>
              <div className="mt-1"><Flag kind="practice">established tools</Flag></div>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
