import { NODES, EDGES } from '../../content/data/manhal/graph';
import type { MasteryStatus, XapiStatement } from '../../content/data/manhal/types';
import { bestScore } from '../../lib/manhalEngine';
import { STATUS_META } from '../../lib/status';
import { challengeById } from '../../content/data/manhal/projects';
import { Flag } from '../Flag';

interface Props {
  nodeId: string | null;
  statuses: Map<string, MasteryStatus>;
  evidence: XapiStatement[];
  onSelect: (id: string | null) => void;
}

function Chip({
  id,
  status,
  onSelect,
}: {
  id: string;
  status: MasteryStatus;
  onSelect: (id: string) => void;
}) {
  const meta = STATUS_META[status];
  return (
    <button
      onClick={() => onSelect(id)}
      className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-md border border-sand bg-cream hover:bg-sand transition"
      title={meta.label}
    >
      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
      {id}
    </button>
  );
}

export function NodeDetail({ nodeId, statuses, evidence, onSelect }: Props) {
  const node = NODES.find((n) => n.id === nodeId);

  if (!node) {
    return (
      <div className="rounded-xl border border-dashed border-bronze/40 bg-white/60 p-6 text-sm text-ink/60 h-full flex items-center justify-center text-center">
        Select any outcome in the graph to see its prerequisites, resources, mastery check, and the
        ’Amal Challenge it unlocks.
      </div>
    );
  }

  const status = statuses.get(node.id) ?? 'locked';
  const meta = STATUS_META[status];
  const score = bestScore(evidence, node.id);
  const threshold = node.masteryCheck.threshold;

  const prereqs = EDGES.filter((e) => e.type === 'prerequisite' && e.to === node.id).map(
    (e) => e.from,
  );
  const unlocks = EDGES.filter((e) => e.type === 'prerequisite' && e.from === node.id).map(
    (e) => e.to,
  );
  const related = EDGES.filter(
    (e) => e.type === 'related' && (e.from === node.id || e.to === node.id),
  ).map((e) => (e.from === node.id ? e.to : e.from));

  return (
    <div className="rounded-xl border border-sand bg-white p-5 space-y-4 h-full overflow-y-auto">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] uppercase tracking-widest text-bronze">
            {node.id}
            {node.manhalCode && <span className="text-ink/30"> · {node.manhalCode}</span>}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${meta.text}`}
          >
            <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>
        <h3 className="serif text-xl text-itq leading-snug mt-1">{node.unitName ?? node.title}</h3>
        {node.unitName && <div className="text-xs text-ink/50 mt-0.5">{node.title}</div>}
        <p className="text-sm text-ink/70 mt-1.5">{node.description}</p>
        {node.essentialQuestion && (
          <div className="mt-2 rounded-lg border-l-2 border-bronze bg-cream px-3 py-2 text-sm italic text-ink/80">
            “{node.essentialQuestion}”
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-2 text-[10px] uppercase tracking-wide text-ink/50">
          <span className="px-2 py-0.5 rounded-full bg-sand">{node.stage}</span>
          <span className="px-2 py-0.5 rounded-full bg-sand">{node.kla}</span>
          <span className="px-2 py-0.5 rounded-full bg-sand">Bloom: {node.bloom}</span>
          {node.estimatedHours != null && (
            <span className="px-2 py-0.5 rounded-full bg-sand">≈ {node.estimatedHours} h</span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-sand normal-case tracking-normal">
            {node.caseId}
          </span>
        </div>
      </div>

      {/* Rationale + prior knowledge */}
      {(node.rationale || (node.priorKnowledge && node.priorKnowledge.length > 0)) && (
        <div className="space-y-2">
          {node.rationale && <p className="text-sm text-ink/70">{node.rationale}</p>}
          {node.priorKnowledge && node.priorKnowledge.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1">
                Assumes you can already
              </div>
              <ul className="list-disc list-inside text-sm text-ink/70 space-y-0.5">
                {node.priorKnowledge.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Standards mapping — NESA + other accreditation frameworks */}
      {node.standards && node.standards.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
            Mapped to standards
          </div>
          <ul className="space-y-1.5">
            {node.standards.map((s) => (
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

      {/* Mastery meter */}
      <div>
        <div className="flex items-center justify-between text-xs text-ink/60 mb-1">
          <span>Mastery check ({node.masteryCheck.type})</span>
          <span>
            {score > 0 ? `best ${Math.round(score * 100)}%` : 'not attempted'} · gate{' '}
            {Math.round(threshold * 100)}%
          </span>
        </div>
        <div className="relative h-2.5 rounded-full bg-sand overflow-hidden">
          <div
            className={`h-full ${score >= threshold ? 'bg-olive' : 'bg-terra'}`}
            style={{ width: `${Math.round(score * 100)}%` }}
          />
          <div
            className="absolute top-0 h-full border-l-2 border-itq/70"
            style={{ left: `${Math.round(threshold * 100)}%` }}
            title={`Mastery threshold ${Math.round(threshold * 100)}%`}
          />
        </div>
      </div>

      {/* Learning sequence — the in-piece cycle */}
      {node.learningSequence && node.learningSequence.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
            Learning sequence
          </div>
          <ol className="space-y-2">
            {node.learningSequence.map((step) => (
              <li key={`${step.phase}-${step.title}`} className="flex gap-2.5">
                <span className="mt-0.5 shrink-0 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-itq/10 text-itq font-medium">
                  {step.phase}
                </span>
                <div>
                  <div className="text-sm font-medium text-ink/85">
                    {step.title}
                    {step.minutes != null && (
                      <span className="text-xs font-normal text-ink/40"> · {step.minutes} min</span>
                    )}
                  </div>
                  <div className="text-sm text-ink/65">{step.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Resources */}
      <div>
        <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
          Multi-modal resources
        </div>
        <ul className="space-y-1">
          {node.resources.map((res) => (
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

      {/* Mastery artefacts — what the learner produces to prove it */}
      {node.masteryArtefacts && node.masteryArtefacts.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
            Prove mastery — artefacts
          </div>
          <ul className="space-y-2">
            {node.masteryArtefacts.map((a) => (
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

      {/* Proficiency rubric */}
      {node.rubric && node.rubric.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
            Proficiency rubric{' '}
            <span className="normal-case tracking-normal text-ink/35">· gate at “proficient”</span>
          </div>
          <ul className="space-y-1">
            {node.rubric.map((band) => {
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
        </div>
      )}

      {/* Open Badge */}
      {node.badge && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[11px] uppercase tracking-wide text-ink/50">Open Badge</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-bronze/10 text-bronze text-xs font-medium">
            ◆ {node.badge}
          </span>
        </div>
      )}

      {/* Relationships */}
      <div className="grid grid-cols-1 gap-3">
        <Relation label="Prerequisites (must be mastered)" ids={prereqs} statuses={statuses} onSelect={onSelect} empty="None — this is an entry point." />
        <Relation label="Unlocks" ids={unlocks} statuses={statuses} onSelect={onSelect} empty="Nothing downstream yet." />
        {related.length > 0 && (
          <Relation label="Related (semantic)" ids={related} statuses={statuses} onSelect={onSelect} empty="" />
        )}
      </div>

      {/* Feeds projects */}
      {node.feedsProjects.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
            Feeds ’Amal Challenge
          </div>
          <ul className="space-y-1">
            {node.feedsProjects.map((pid) => {
              const c = challengeById(pid);
              return (
                <li key={pid} className="text-sm text-itq">
                  {c ? c.title : pid}
                  {c && <span className="text-ink/40 text-xs"> · {c.stream}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function Relation({
  label,
  ids,
  statuses,
  onSelect,
  empty,
}: {
  label: string;
  ids: string[];
  statuses: Map<string, MasteryStatus>;
  onSelect: (id: string) => void;
  empty: string;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">{label}</div>
      {ids.length === 0 ? (
        <div className="text-xs text-ink/40">{empty}</div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {ids.map((id) => (
            <Chip key={id} id={id} status={statuses.get(id) ?? 'locked'} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
