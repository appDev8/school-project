// ---------------------------------------------------------------------------
// MANHAL ENGINE — the in-house IP: mastery gating over a NESA knowledge graph.
// Pure, deterministic functions (unit-tested). Dashboards + the graph render off
// these. A node unlocks only when all its prerequisites are mastered.
// ---------------------------------------------------------------------------

import type {
  OutcomeNode,
  GraphEdge,
  XapiStatement,
  MasteryStatus,
} from '../content/data/manhal/types';

export function bestScore(evidence: XapiStatement[], outcomeId: string): number {
  let best = 0;
  for (const s of evidence) {
    if (
      s.object.type === 'outcome' &&
      s.object.id === outcomeId &&
      s.result?.score?.scaled != null
    ) {
      best = Math.max(best, s.result.score.scaled);
    }
  }
  return best;
}

export function isMastered(evidence: XapiStatement[], outcomeId: string): boolean {
  return evidence.some(
    (s) => s.object.type === 'outcome' && s.object.id === outcomeId && s.verb === 'mastered',
  );
}

export function hasAttempt(evidence: XapiStatement[], outcomeId: string): boolean {
  return evidence.some((s) => s.object.type === 'outcome' && s.object.id === outcomeId);
}

/** Compute the mastery status of every node given the learner's evidence. */
export function computeStatuses(
  nodes: OutcomeNode[],
  edges: GraphEdge[],
  evidence: XapiStatement[],
): Map<string, MasteryStatus> {
  const prereqs = new Map<string, string[]>();
  for (const n of nodes) prereqs.set(n.id, []);
  for (const e of edges) {
    if (e.type === 'prerequisite') prereqs.get(e.to)?.push(e.from);
  }

  const status = new Map<string, MasteryStatus>();

  // 1) Intrinsic statuses from evidence.
  for (const n of nodes) {
    if (isMastered(evidence, n.id)) status.set(n.id, 'mastered');
    else if (bestScore(evidence, n.id) >= n.masteryCheck.threshold) status.set(n.id, 'proficient');
    else if (hasAttempt(evidence, n.id)) status.set(n.id, 'in_progress');
  }

  // 2) Availability for the rest: unlocked iff all prerequisites are mastered.
  for (const n of nodes) {
    if (status.has(n.id)) continue;
    const ps = prereqs.get(n.id) ?? [];
    const unlocked = ps.length === 0 || ps.every((p) => status.get(p) === 'mastered');
    status.set(n.id, unlocked ? 'available' : 'locked');
  }

  return status;
}

export interface Coverage {
  mastered: number;
  proficient: number;
  total: number;
  pct: number;
}

export function coverage(nodes: OutcomeNode[], statuses: Map<string, MasteryStatus>): Coverage {
  let mastered = 0;
  let proficient = 0;
  for (const n of nodes) {
    const s = statuses.get(n.id);
    if (s === 'mastered') mastered++;
    else if (s === 'proficient') proficient++;
  }
  const total = nodes.length;
  const pct = total ? Math.round(((mastered + proficient) / total) * 100) : 0;
  return { mastered, proficient, total, pct };
}

/** Available nodes ranked by how much downstream learning they unlock. */
export function nextBest(
  nodes: OutcomeNode[],
  edges: GraphEdge[],
  statuses: Map<string, MasteryStatus>,
  limit = 3,
): OutcomeNode[] {
  const downstream = new Map<string, number>();
  for (const e of edges) {
    if (e.type === 'prerequisite') downstream.set(e.from, (downstream.get(e.from) ?? 0) + 1);
  }
  return nodes
    .filter((n) => statuses.get(n.id) === 'available')
    .sort((a, b) => (downstream.get(b.id) ?? 0) - (downstream.get(a.id) ?? 0))
    .slice(0, limit);
}

export interface ProjectReadiness {
  projectId: string;
  required: number;
  ready: number;
  pct: number;
  unlocked: boolean;
}

/** The outcomes a project requires = every node whose `feedsProjects` lists it.
 *  Keeps the knowledge graph the single source of truth for project gating. */
export function requiredOutcomesFor(projectId: string, nodes: OutcomeNode[]): string[] {
  return nodes.filter((n) => n.feedsProjects.includes(projectId)).map((n) => n.id);
}

/** A ’Amal Challenge unlocks when all its required outcomes reach proficiency. */
export function projectReadiness(
  projectId: string,
  requiredOutcomes: string[],
  statuses: Map<string, MasteryStatus>,
): ProjectReadiness {
  const ok = (s?: MasteryStatus) => s === 'proficient' || s === 'mastered';
  const ready = requiredOutcomes.filter((id) => ok(statuses.get(id))).length;
  const required = requiredOutcomes.length;
  return {
    projectId,
    required,
    ready,
    pct: required ? Math.round((ready / required) * 100) : 0,
    unlocked: required > 0 && ready === required,
  };
}
