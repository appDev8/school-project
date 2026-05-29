import type { AmalChallenge } from './types';

// ---------------------------------------------------------------------------
// ’AMAL CHALLENGES — the real-world projects Manhal outcomes feed into.
// [PLAN] Illustrative Stage-4 (Discovery) micro-projects, one per stream, modelling
// the knowledge → project link. A project's *required outcomes* are derived from
// each node's `feedsProjects` (see requiredOutcomesFor in manhalEngine), so the
// graph and the projects stay a single source of truth.
// ---------------------------------------------------------------------------

export const AMAL_CHALLENGES: AmalChallenge[] = [
  {
    id: 'amal-tech-budget',
    title: 'The Community Budget App',
    stream: 'tech',
    stage: 'Stage4',
    driving: 'How can a family on a tight budget see where their money really goes?',
    summary:
      'Design and prototype a budgeting tool: model income and expenses, compute percentages and trends, and graph spending against a target line.',
    partner: 'Fintech mentor (Expert in Residence)',
    deliverable: 'Working prototype + 3-minute pitch to a panel',
    weeks: 6,
  },
  {
    id: 'amal-media-campaign',
    title: 'Water-Use Awareness Campaign',
    stream: 'media',
    stage: 'Stage4',
    driving: 'How do we move a community to change a daily habit?',
    summary:
      'Plan a public-awareness campaign using rates (litres/person/day) and scaled visuals sized to real surfaces around Parramatta.',
    partner: 'Riverside Theatres creative producer',
    deliverable: 'Campaign kit: poster set, social plan, 60-second spot',
    weeks: 5,
  },
  {
    id: 'amal-law-policy',
    title: 'Youth Data Policy Brief',
    stream: 'law',
    stage: 'Stage4',
    driving: 'Should under-16s be able to opt out of data collection?',
    summary:
      'Survey peers, classify and visualise the data, interpret centre and spread, and argue a position in a policy brief to Council.',
    partner: 'City of Parramatta policy officer',
    deliverable: 'Evidence-based policy brief + deputation',
    weeks: 5,
  },
];

export const challengeById = (id: string): AmalChallenge | undefined =>
  AMAL_CHALLENGES.find((c) => c.id === id);
