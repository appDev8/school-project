import type { PortfolioArtefact, CoachNote } from './types';

// ---------------------------------------------------------------------------
// ATHAR (portfolio) + MURABBI (coaching) — the evidence trail. Artefacts link
// back to the outcomes they evidence and the ’Amal Challenge they came from, so
// a parent or coach can trace knowledge → project → artefact → reflection.
// Open Badge 3.0 is awarded at capstone (Impact stage); none yet at Discovery.
// ---------------------------------------------------------------------------

export const ARTEFACTS: PortfolioArtefact[] = [
  {
    id: 'art-amal-1',
    studentId: 'amal',
    projectId: 'amal-tech-budget',
    title: 'Budget App — wireframe & spending model',
    kind: 'prototype',
    outcomes: ['MA4-FRC', 'MA4-EQU'],
    reflection:
      'I modelled income minus expenses as an equation and showed the leftover as a percentage. Next I want the graph to update live.',
    date: '2026-05-22',
  },
  {
    id: 'art-amal-2',
    studentId: 'amal',
    projectId: 'amal-tech-budget',
    title: 'Spending-vs-target line graph',
    kind: 'media',
    outcomes: ['MA4-LIN'],
    reflection:
      'Plotting spending against a target line made overspending obvious. I checked my axes with my Competency Architect.',
    date: '2026-05-26',
  },
  {
    id: 'art-layla-1',
    studentId: 'layla',
    projectId: 'amal-law-policy',
    title: 'Peer survey — cleaned dataset',
    kind: 'fieldwork',
    outcomes: ['MA4-DAT'],
    reflection:
      'I classified responses as categorical or numerical before choosing displays. Honest data first — that is amāna.',
    date: '2026-05-18',
  },
  {
    id: 'art-layla-2',
    studentId: 'layla',
    projectId: 'amal-law-policy',
    title: 'Policy brief — “Youth & data” (draft)',
    kind: 'document',
    outcomes: ['MA4-DAN'],
    reflection:
      'I used median and range to argue most students underestimate what they share. The City officer pushed me on my sample size.',
    date: '2026-05-27',
  },
  {
    id: 'art-yusuf-1',
    studentId: 'yusuf',
    projectId: 'amal-media-campaign',
    title: 'Number-line story poster',
    kind: 'media',
    outcomes: ['MA4-INT'],
    reflection:
      'I told the story of a diver going below sea level to show negative numbers. My coach liked the visual.',
    date: '2026-05-24',
  },
];

export const COACH_NOTES: CoachNote[] = [
  {
    id: 'cn-amal-1',
    studentId: 'amal',
    coach: 'Ms Khan (Learning Coach · Murabbi)',
    date: '2026-05-27',
    focus: 'mastery',
    note: 'One outcome from unlocking the Budget App: Data analysis (MA4-DAN). Booked a re-check Thursday.',
  },
  {
    id: 'cn-amal-2',
    studentId: 'amal',
    coach: 'Ms Khan (Learning Coach · Murabbi)',
    date: '2026-05-20',
    focus: 'goal',
    note: 'Goal set: pitch the prototype to the fintech mentor by week 6. Confident on the maths, nervous on presenting.',
  },
  {
    id: 'cn-layla-1',
    studentId: 'layla',
    coach: 'Mr Osman (Learning Coach · Murabbi)',
    date: '2026-05-28',
    focus: 'project',
    note: 'Policy brief unlocked and underway. Strong on analysis; coaching her on sample-size caveats before the deputation.',
  },
  {
    id: 'cn-yusuf-1',
    studentId: 'yusuf',
    coach: 'Ms Khan (Learning Coach · Murabbi)',
    date: '2026-05-25',
    focus: 'wellbeing',
    note: 'Settling in well. Loves the studio. Gentle nudge to finish the fractions check — confidence, not ability, is the blocker.',
  },
];

export const artefactsFor = (studentId: string): PortfolioArtefact[] =>
  ARTEFACTS.filter((a) => a.studentId === studentId);

export const notesFor = (studentId: string): CoachNote[] =>
  COACH_NOTES.filter((n) => n.studentId === studentId);
