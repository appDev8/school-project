import type { OutcomeNode, GraphEdge } from '../content/data/manhal/types';

// Deterministic layered layout for the knowledge graph (no dagre dependency).
// A node's column = the longest prerequisite chain reaching it; nodes in the
// same column are stacked and the whole column is vertically centred.

export interface Positioned {
  id: string;
  x: number;
  y: number;
  level: number;
}

export function layeredLayout(
  nodes: OutcomeNode[],
  edges: GraphEdge[],
  opts: { colGap?: number; rowGap?: number } = {},
): Map<string, Positioned> {
  const colGap = opts.colGap ?? 250;
  const rowGap = opts.rowGap ?? 104;

  const prereqs = new Map<string, string[]>();
  for (const n of nodes) prereqs.set(n.id, []);
  for (const e of edges) {
    if (e.type === 'prerequisite') prereqs.get(e.to)?.push(e.from);
  }

  const level = new Map<string, number>();
  const visiting = new Set<string>();
  const depth = (id: string): number => {
    const cached = level.get(id);
    if (cached != null) return cached;
    if (visiting.has(id)) return 0; // cycle guard (graph should be acyclic)
    visiting.add(id);
    const ps = prereqs.get(id) ?? [];
    const v = ps.length ? 1 + Math.max(...ps.map(depth)) : 0;
    visiting.delete(id);
    level.set(id, v);
    return v;
  };
  for (const n of nodes) depth(n.id);

  const byLevel = new Map<number, string[]>();
  for (const n of nodes) {
    const l = level.get(n.id) ?? 0;
    (byLevel.get(l) ?? byLevel.set(l, []).get(l)!).push(n.id);
  }

  const maxRows = Math.max(1, ...[...byLevel.values()].map((a) => a.length));
  const pos = new Map<string, Positioned>();
  for (const [l, ids] of byLevel) {
    const offset = (maxRows - ids.length) / 2;
    ids.forEach((id, i) => {
      pos.set(id, { id, x: l * colGap, y: (i + offset) * rowGap, level: l });
    });
  }
  return pos;
}
