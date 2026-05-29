import type { Persona, XapiStatement, XapiVerb } from './types';

// ---------------------------------------------------------------------------
// SYNTHETIC LEARNERS — no real PII. Evidence is xAPI-shaped and would, in
// production, be emitted by tools (Moodle/Canvas, quizzes, project sign-off) to
// an LRS. Here it is hand-authored to drive the live dashboards and the graph.
// Three profiles span the Discovery stage: a beginner, a mid learner with an
// UNLOCKED project, and an advanced learner one outcome away from unlocking.
// ---------------------------------------------------------------------------

export const PERSONAS: Persona[] = [
  {
    id: 'amal',
    name: 'Amal Haddad',
    year: 8,
    stream: 'tech',
    blurb: 'Builder. One mastery check away from unlocking the Community Budget App.',
  },
  {
    id: 'layla',
    name: 'Layla Nasser',
    year: 8,
    stream: 'law',
    blurb: 'Data-driven. Her Youth Data Policy Brief is unlocked and underway.',
  },
  {
    id: 'yusuf',
    name: 'Yusuf Rahman',
    year: 7,
    stream: 'media',
    blurb: 'New to Discovery — finding his feet with number and story.',
  },
];

function ev(
  actorId: string,
  actorName: string,
  outcomeId: string,
  verb: XapiVerb,
  scaled?: number,
  daysAgo = 0,
): XapiStatement {
  const ts = new Date(2026, 4, 29 - daysAgo).toISOString();
  return {
    actor: { id: actorId, name: actorName },
    verb,
    object: { id: outcomeId, type: 'outcome' },
    result: scaled != null ? { score: { scaled }, success: scaled >= 0.8 } : undefined,
    timestamp: ts,
  };
}

// Evidence per persona, keyed by id. computeStatuses(NODES, EDGES, EVIDENCE[id]).
export const EVIDENCE: Record<string, XapiStatement[]> = {
  // Advanced — 5 mastered, 2 proficient, 2 in progress. amal-tech-budget at 3/4.
  amal: [
    ev('amal', 'Amal Haddad', 'MA4-INT', 'mastered', 0.95, 64),
    ev('amal', 'Amal Haddad', 'MA4-FRC', 'mastered', 0.92, 50),
    ev('amal', 'Amal Haddad', 'MA4-ALG', 'mastered', 0.9, 40),
    ev('amal', 'Amal Haddad', 'MA4-EQU', 'mastered', 0.88, 28),
    ev('amal', 'Amal Haddad', 'MA4-LEN', 'completed', 0.82, 33),
    ev('amal', 'Amal Haddad', 'MA4-LIN', 'completed', 0.86, 16),
    ev('amal', 'Amal Haddad', 'MA4-DAT', 'mastered', 0.91, 12),
    ev('amal', 'Amal Haddad', 'MA4-ARE', 'attempted', 0.5, 9),
    ev('amal', 'Amal Haddad', 'MA4-DAN', 'attempted', 0.62, 3),
  ],
  // Mid — amal-law-policy (DAT + DAN) fully unlocked.
  layla: [
    ev('layla', 'Layla Nasser', 'MA4-INT', 'mastered', 0.93, 58),
    ev('layla', 'Layla Nasser', 'MA4-FRC', 'mastered', 0.89, 44),
    ev('layla', 'Layla Nasser', 'MA4-DAT', 'mastered', 0.9, 20),
    ev('layla', 'Layla Nasser', 'MA4-DAN', 'completed', 0.84, 6),
    ev('layla', 'Layla Nasser', 'MA4-RAT', 'attempted', 0.6, 10),
  ],
  // Beginner — just starting; INT mastered, FRC in progress.
  yusuf: [
    ev('yusuf', 'Yusuf Rahman', 'MA4-INT', 'mastered', 0.85, 18),
    ev('yusuf', 'Yusuf Rahman', 'MA4-FRC', 'attempted', 0.45, 4),
  ],
};

export const personaById = (id: string): Persona | undefined =>
  PERSONAS.find((p) => p.id === id);
