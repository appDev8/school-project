// ---------------------------------------------------------------------------
// NESA OUTCOME IMPORTER — turns a verified NESA syllabus source into Manhal's
// graph shapes (OutcomeNode[] + GraphEdge[]), CASE-wrapped for portability.
//
// This is the real "wire up the syllabus" step: a pure, deterministic function
// so it is trivially testable and re-runnable. Re-import when NESA revises the
// syllabus and the graph refreshes without hand-editing nodes. The prerequisite
// edges come from the source's authored prerequisite layer (NESA encodes none).
// ---------------------------------------------------------------------------

import type { OutcomeNode, GraphEdge } from '../content/data/manhal/types';
import type { NesaSyllabusSource } from '../content/data/manhal/nesaStage4Maths';

export interface ImportSummary {
  framework: string;
  total: number;
  edges: number;
  byStrand: Record<string, number>;
}

export interface ImportResult {
  nodes: OutcomeNode[];
  edges: GraphEdge[];
  summary: ImportSummary;
}

/**
 * Deterministic CASE-style identifier for an outcome code. A real deployment
 * would mint/lookup a 1EdTech CASE GUID; this stable URN stands in for it so
 * the mapping is portable and reproducible.
 */
export function caseIdFor(code: string): string {
  return `case:nsw-maths-2022:${code}`;
}

/**
 * Import a NESA syllabus source into Manhal nodes + prerequisite edges.
 * The outcome code doubles as the node id (portable + collision-free), and
 * every node carries its real NESA standard plus a CASE wrapper.
 */
export function importNesaOutcomes(source: NesaSyllabusSource): ImportResult {
  const known = new Set(source.outcomes.map((o) => o.code));

  const nodes: OutcomeNode[] = source.outcomes.map((o) => ({
    id: o.code, // the real outcome code is the stable node id
    caseId: caseIdFor(o.code),
    title: o.focusArea,
    description: o.descriptor,
    stage: source.stage,
    kla: source.kla,
    bloom: o.bloom,
    resources: [], // content is authored/bought per piece after import
    masteryCheck: { type: 'quiz', threshold: 0.8 }, // default gate; tuned per piece
    feedsProjects: [],
    standards: [
      {
        framework: 'NESA',
        code: o.code,
        descriptor: o.descriptor,
        flag: 'nesa',
      },
      {
        framework: 'CASE',
        code: caseIdFor(o.code),
        descriptor: `1EdTech CASE item wrapping ${o.code} for standards-portable exchange.`,
        flag: 'plan',
      },
    ],
  }));

  // Prerequisite edges, defensively dropping any reference to an unknown code.
  const edges: GraphEdge[] = source.outcomes.flatMap((o) =>
    (o.prerequisites ?? [])
      .filter((p) => known.has(p))
      .map((p) => ({ from: p, to: o.code, type: 'prerequisite' as const })),
  );

  const byStrand: Record<string, number> = {};
  for (const o of source.outcomes) {
    byStrand[o.strand] = (byStrand[o.strand] ?? 0) + 1;
  }

  return {
    nodes,
    edges,
    summary: {
      framework: source.framework,
      total: nodes.length,
      edges: edges.length,
      byStrand,
    },
  };
}
