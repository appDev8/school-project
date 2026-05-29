import { useMemo } from 'react';
import { NODES, EDGES } from '../data/manhal/graph';
import {
  computeStatuses,
  coverage,
  nextBest,
  projectReadiness,
  requiredOutcomesFor,
} from '../../lib/manhalEngine';
import { EVIDENCE, PERSONAS, personaById } from '../data/manhal/personas';
import { AMAL_CHALLENGES } from '../data/manhal/projects';
import { KnowledgeGraph } from '../../components/manhal/KnowledgeGraph';
import { NodeDetail } from '../../components/manhal/NodeDetail';
import { Flag } from '../../components/Flag';
import { STATUS_META, STATUS_ORDER } from '../../lib/status';
import { useManhal } from '../../store/useManhal';

export default function Manhal() {
  const { personaId, setPersona, nodeId, selectNode } = useManhal();
  const persona = personaById(personaId);

  const { statuses, cov, nb, readiness, evidence } = useMemo(() => {
    const evidence = EVIDENCE[personaId] ?? [];
    const statuses = computeStatuses(NODES, EDGES, evidence);
    return {
      evidence,
      statuses,
      cov: coverage(NODES, statuses),
      nb: nextBest(NODES, EDGES, statuses, 4),
      readiness: AMAL_CHALLENGES.map((c) => ({
        c,
        r: projectReadiness(c.id, requiredOutcomesFor(c.id, NODES), statuses),
      })),
    };
  }, [personaId]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">The backbone</div>
        <h1 className="serif text-4xl text-itq">Manhal — the mastery knowledge graph</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          Every NESA outcome is a node. An outcome unlocks only when its prerequisites are mastered,
          so knowledge builds in the right order — then visibly feeds the project a learner is
          working toward.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Flag kind="plan">illustrative Stage-4 Mathematics slice</Flag>
          <Flag kind="nesa">outcomes ≈ CASE</Flag>
          <Flag kind="fact">evidence ≈ xAPI → LRS</Flag>
          <Flag kind="proposed">Manhal — The Ihsan Way</Flag>
        </div>
      </header>

      {/* Persona switcher */}
      <section className="rounded-xl border border-sand bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wide text-ink/50 mr-1">
            View as learner
          </span>
          {PERSONAS.map((p) => {
            const active = p.id === personaId;
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                  active
                    ? 'bg-itq text-cream border-itq'
                    : 'bg-cream text-ink border-sand hover:border-bronze'
                }`}
              >
                {p.name}
                <span className={`ml-1 text-xs ${active ? 'opacity-80' : 'text-ink/40'}`}>
                  · Yr {p.year}
                </span>
              </button>
            );
          })}
        </div>
        {persona && <p className="text-sm text-ink/60 mt-2">{persona.blurb}</p>}
      </section>

      {/* Coverage strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Mastered" value={cov.mastered} tone="text-itq" />
        <Stat label="Proficient" value={cov.proficient} tone="text-olive" />
        <Stat label="Outcomes" value={cov.total} tone="text-ink" />
        <div className="rounded-lg border border-sand bg-white p-4">
          <div className="text-[11px] uppercase tracking-wide text-ink/50">Coverage</div>
          <div className="text-2xl font-semibold mt-1 text-bronze">{cov.pct}%</div>
          <div className="h-1.5 rounded-full bg-sand mt-2 overflow-hidden">
            <div className="h-full bg-bronze" style={{ width: `${cov.pct}%` }} />
          </div>
        </div>
      </section>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs text-ink/60">
        {STATUS_ORDER.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${STATUS_META[s].dot}`} />
            {STATUS_META[s].label}
          </span>
        ))}
      </div>

      {/* Graph + detail */}
      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <KnowledgeGraph statuses={statuses} selectedId={nodeId} onSelect={selectNode} />
        </div>
        <div className="lg:col-span-1 min-h-[540px]">
          <NodeDetail
            nodeId={nodeId}
            statuses={statuses}
            evidence={evidence}
            onSelect={selectNode}
          />
        </div>
      </section>

      {/* Next best */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Recommended next</h2>
        <p className="text-sm text-ink/60 mb-3">
          Available outcomes ranked by how much downstream learning each one unlocks.
        </p>
        <div className="flex flex-wrap gap-2">
          {nb.length === 0 && <span className="text-sm text-ink/50">Nothing available right now.</span>}
          {nb.map((n) => (
            <button
              key={n.id}
              onClick={() => selectNode(n.id)}
              className="text-left px-3 py-2 rounded-lg border border-bronze bg-white hover:bg-cream transition"
            >
              <div className="text-[10px] uppercase tracking-wide text-bronze">{n.id}</div>
              <div className="text-sm text-itq">{n.title}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Project readiness */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">’Amal Challenge readiness</h2>
        <p className="text-sm text-ink/60 mb-3">
          A project unlocks when every outcome that feeds it reaches proficiency — knowledge → project,
          made explicit.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {readiness.map(({ c, r }) => (
            <div key={c.id} className="rounded-xl border border-sand bg-white p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="serif text-lg text-itq leading-snug">{c.title}</div>
                  <div className="text-[10px] uppercase tracking-wide text-ink/40">{c.stream}</div>
                </div>
                <span
                  className={`shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                    r.unlocked
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-sand text-ink/50 border-sand'
                  }`}
                >
                  {r.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
              <p className="text-xs text-ink/60">{c.driving}</p>
              <div className="flex items-center justify-between text-xs text-ink/60">
                <span>
                  {r.ready}/{r.required} outcomes ready
                </span>
                <span>{r.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-sand overflow-hidden">
                <div
                  className={`h-full ${r.unlocked ? 'bg-olive' : 'bg-terra'}`}
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {requiredOutcomesFor(c.id, NODES).map((id) => (
                  <button
                    key={id}
                    onClick={() => selectNode(id)}
                    className="inline-flex items-center gap-1.5 text-[11px] px-1.5 py-0.5 rounded border border-sand bg-cream hover:bg-sand transition"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_META[statuses.get(id) ?? 'locked'].dot}`} />
                    {id}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-lg border border-sand bg-white p-4">
      <div className="text-[11px] uppercase tracking-wide text-ink/50">{label}</div>
      <div className={`text-2xl font-semibold mt-1 ${tone}`}>{value}</div>
    </div>
  );
}
