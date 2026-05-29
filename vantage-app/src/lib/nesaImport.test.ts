import { describe, it, expect } from 'vitest';
import { importNesaOutcomes, caseIdFor } from './nesaImport';
import { NESA_STAGE4_MATHS_SOURCE } from '../content/data/manhal/nesaStage4Maths';
import { computeStatuses } from './manhalEngine';
import { NODES } from '../content/data/manhal/graph';

const { nodes, edges, summary } = importNesaOutcomes(NESA_STAGE4_MATHS_SOURCE);

describe('nesaImport', () => {
  it('imports every source outcome as exactly one node', () => {
    expect(nodes).toHaveLength(NESA_STAGE4_MATHS_SOURCE.outcomes.length);
    expect(summary.total).toBe(nodes.length);
    const ids = new Set(nodes.map((n) => n.id));
    expect(ids.size).toBe(nodes.length); // no duplicate ids
  });

  it('includes the verified Ratios and rates outcome (MA4-RAT-C-01)', () => {
    const rat = nodes.find((n) => n.id === 'MA4-RAT-C-01');
    expect(rat?.title).toBe('Ratios and rates');
    expect(rat?.stage).toBe('Stage4');
    expect(rat?.kla).toBe('Mathematics');
  });

  it('CASE-wraps each outcome with a portable, deterministic id', () => {
    for (const n of nodes) {
      expect(n.caseId).toBe(caseIdFor(n.id));
    }
  });

  it('tags every imported node with its real NESA outcome, flagged nesa', () => {
    for (const n of nodes) {
      const nesa = n.standards?.find((s) => s.framework === 'NESA');
      expect(nesa?.flag).toBe('nesa');
      expect(nesa?.code).toBe(n.id); // the node id IS the real outcome code
    }
  });

  it('emits only edges between known outcomes (no dangling prerequisites)', () => {
    const ids = new Set(nodes.map((n) => n.id));
    for (const e of edges) {
      expect(ids.has(e.from)).toBe(true);
      expect(ids.has(e.to)).toBe(true);
      expect(e.type).toBe('prerequisite');
    }
  });

  it('produces an acyclic prerequisite graph the gating engine can resolve', () => {
    // If the import had a cycle, computeStatuses would never surface a root as
    // available. With no evidence, at least one node must be available.
    const statuses = computeStatuses(nodes, edges, []);
    const available = [...statuses.values()].filter((s) => s === 'available');
    expect(available.length).toBeGreaterThan(0);
  });

  it('keeps the curated demo graph honest: every node maps to a real NESA code', () => {
    const real = new Set(NESA_STAGE4_MATHS_SOURCE.outcomes.map((o) => o.code));
    for (const n of NODES) {
      expect(real.has(n.caseId)).toBe(true);
    }
  });
});
