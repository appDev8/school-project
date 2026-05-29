import { NODES, EDGES } from '../../content/data/manhal/graph';
import type { MasteryStatus, XapiStatement } from '../../content/data/manhal/types';
import { bestScore } from '../../lib/manhalEngine';
import { STATUS_META } from '../../lib/status';
import { challengeById } from '../../content/data/manhal/projects';

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
          <span className="text-[11px] uppercase tracking-widest text-bronze">{node.id}</span>
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${meta.text}`}
          >
            <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>
        <h3 className="serif text-xl text-itq leading-snug mt-1">{node.title}</h3>
        <p className="text-sm text-ink/70 mt-1">{node.description}</p>
        <div className="flex flex-wrap gap-2 mt-2 text-[10px] uppercase tracking-wide text-ink/50">
          <span className="px-2 py-0.5 rounded-full bg-sand">{node.stage}</span>
          <span className="px-2 py-0.5 rounded-full bg-sand">{node.kla}</span>
          <span className="px-2 py-0.5 rounded-full bg-sand">Bloom: {node.bloom}</span>
        </div>
      </div>

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

      {/* Resources */}
      <div>
        <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
          Multi-modal resources
        </div>
        <ul className="space-y-1">
          {node.resources.map((r) => (
            <li key={r.title} className="text-sm flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-cream border border-sand text-ink/60">
                {r.type}
              </span>
              <span className="text-ink/80">{r.title}</span>
              <span className="text-[11px] text-ink/40">· {r.modality}</span>
            </li>
          ))}
        </ul>
      </div>

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
