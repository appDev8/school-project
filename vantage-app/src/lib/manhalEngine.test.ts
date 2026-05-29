import { describe, it, expect } from 'vitest';
import { computeStatuses, coverage, nextBest, projectReadiness } from './manhalEngine';
import { NODES, EDGES } from '../content/data/manhal/graph';
import type { XapiStatement, XapiVerb } from '../content/data/manhal/types';

const ev = (id: string, verb: XapiVerb, scaled?: number): XapiStatement => ({
  actor: { id: 's1', name: 'Test Learner' },
  verb,
  object: { id, type: 'outcome' },
  result: scaled != null ? { score: { scaled }, success: scaled >= 0.8 } : undefined,
  timestamp: '2026-01-01T00:00:00Z',
});

const rootIds = NODES.filter(
  (n) => !EDGES.some((e) => e.type === 'prerequisite' && e.to === n.id),
).map((n) => n.id);

const firstGated = NODES.find((n) =>
  EDGES.some((e) => e.type === 'prerequisite' && e.to === n.id),
)!;
const firstGatedPrereqs = EDGES.filter(
  (e) => e.type === 'prerequisite' && e.to === firstGated.id,
).map((e) => e.from);

describe('manhalEngine', () => {
  it('root nodes are available with no evidence', () => {
    const s = computeStatuses(NODES, EDGES, []);
    for (const id of rootIds) expect(s.get(id)).toBe('available');
  });

  it('locks a node whose prerequisites are not mastered', () => {
    const s = computeStatuses(NODES, EDGES, []);
    expect(s.get(firstGated.id)).toBe('locked');
  });

  it('unlocks a node once all prerequisites are mastered', () => {
    const evidence = firstGatedPrereqs.map((id) => ev(id, 'mastered'));
    const s = computeStatuses(NODES, EDGES, evidence);
    expect(s.get(firstGated.id)).toBe('available');
  });

  it('marks proficient when score meets threshold without a mastered verb', () => {
    const s = computeStatuses(NODES, EDGES, [ev(rootIds[0], 'completed', 0.85)]);
    expect(s.get(rootIds[0])).toBe('proficient');
  });

  it('marks in_progress on a low-scoring attempt', () => {
    const s = computeStatuses(NODES, EDGES, [ev(rootIds[0], 'attempted', 0.4)]);
    expect(s.get(rootIds[0])).toBe('in_progress');
  });

  it('coverage never decreases as mastery is added', () => {
    const empty = coverage(NODES, computeStatuses(NODES, EDGES, []));
    const some = coverage(NODES, computeStatuses(NODES, EDGES, [ev(rootIds[0], 'mastered')]));
    expect(some.pct).toBeGreaterThanOrEqual(empty.pct);
    expect(some.mastered).toBe(1);
  });

  it('nextBest only returns available nodes', () => {
    const s = computeStatuses(NODES, EDGES, []);
    const nb = nextBest(NODES, EDGES, s, 3);
    for (const n of nb) expect(s.get(n.id)).toBe('available');
  });

  it('projectReadiness unlocks only when all required outcomes are proficient+', () => {
    const required = ['MA4-FRC', 'MA4-EQU', 'MA4-LIN', 'MA4-DAN'];
    const none = projectReadiness('amal-tech-budget', required, computeStatuses(NODES, EDGES, []));
    expect(none.unlocked).toBe(false);
    const all = projectReadiness(
      'amal-tech-budget',
      required,
      computeStatuses(NODES, EDGES, required.map((id) => ev(id, 'mastered'))),
    );
    expect(all.unlocked).toBe(true);
    expect(all.pct).toBe(100);
  });
});
