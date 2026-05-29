import { NODES, EDGES } from '../content/data/manhal/graph';
import { PERSONAS, EVIDENCE } from '../content/data/manhal/personas';
import { AMAL_CHALLENGES } from '../content/data/manhal/projects';
import {
  computeStatuses,
  coverage,
  nextBest,
  projectReadiness,
  requiredOutcomesFor,
  type Coverage,
} from './manhalEngine';
import type { MasteryStatus, OutcomeNode, Persona } from '../content/data/manhal/types';
import { STATUS_ORDER } from './status';

export interface ProjectProgress {
  id: string;
  title: string;
  stream: string;
  pct: number;
  ready: number;
  required: number;
  unlocked: boolean;
}

export interface StudentSummary {
  persona: Persona;
  statuses: Map<string, MasteryStatus>;
  coverage: Coverage;
  next: OutcomeNode[];
  projects: ProjectProgress[];
}

/** Everything one learner's dashboards need, computed from their xAPI evidence. */
export function studentSummary(personaId: string): StudentSummary {
  const persona = PERSONAS.find((p) => p.id === personaId)!;
  const evidence = EVIDENCE[personaId] ?? [];
  const statuses = computeStatuses(NODES, EDGES, evidence);
  const projects: ProjectProgress[] = AMAL_CHALLENGES.map((c) => {
    const r = projectReadiness(c.id, requiredOutcomesFor(c.id, NODES), statuses);
    return {
      id: c.id,
      title: c.title,
      stream: c.stream,
      pct: r.pct,
      ready: r.ready,
      required: r.required,
      unlocked: r.unlocked,
    };
  });
  return {
    persona,
    statuses,
    coverage: coverage(NODES, statuses),
    next: nextBest(NODES, EDGES, statuses, 3),
    projects,
  };
}

export interface CohortSummary {
  students: StudentSummary[];
  avgCoverage: number;
  totalMastered: number;
  totalProficient: number;
  unlockedProjects: number;
  statusDist: { status: MasteryStatus; count: number }[];
}

/** Leadership-level rollup across every synthetic learner. */
export function cohortSummary(): CohortSummary {
  const students = PERSONAS.map((p) => studentSummary(p.id));
  const n = students.length || 1;

  const dist = new Map<MasteryStatus, number>();
  for (const s of students) {
    for (const st of s.statuses.values()) dist.set(st, (dist.get(st) ?? 0) + 1);
  }

  return {
    students,
    avgCoverage: Math.round(students.reduce((a, s) => a + s.coverage.pct, 0) / n),
    totalMastered: students.reduce((a, s) => a + s.coverage.mastered, 0),
    totalProficient: students.reduce((a, s) => a + s.coverage.proficient, 0),
    unlockedProjects: students.reduce((a, s) => a + s.projects.filter((p) => p.unlocked).length, 0),
    statusDist: STATUS_ORDER.map((status) => ({ status, count: dist.get(status) ?? 0 })),
  };
}
