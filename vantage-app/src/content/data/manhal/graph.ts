import type { OutcomeNode, GraphEdge, Resource } from './types';
import type { FlagKind } from '../vantage';

// ---------------------------------------------------------------------------
// Stage-4 Mathematics slice — models the real Manhal structure (prerequisites,
// Bloom level, mastery threshold, project links) for one KLA. This is the
// CURATED, fully-connected demo subset that drives the interactive graph; the
// FULL Stage-4 syllabus (18 outcomes) is ingested live by the importer
// (src/lib/nesaImport.ts) from src/content/data/manhal/nesaStage4Maths.ts.
//
// Provenance of the `caseId` codes:
//   • Every node's caseId is now a VERIFIED real NESA Mathematics K–10 (2022)
//     Stage-4 outcome code (confirmed against curriculum.nsw.edu.au). A test
//     (nesaImport.test.ts) asserts each caseId exists in the import source, so
//     the demo graph cannot drift away from the real syllabus.
//   • MA4-FRC, MA4-DAN and MA4-RAT carry the full "piece" payload (unitName,
//     standards, learningSequence, masteryArtefacts, rubric, badge, xAPI); the
//     rest carry the structural minimum so the gating engine stays demonstrable.
//   • Node IDs (MA4-INT, MA4-FRC, …) are stable keys for edges/portfolio/
//     personas; the real outcome code lives in caseId.
// ---------------------------------------------------------------------------

const r = (
  title: string,
  type: Resource['type'],
  modality: string,
  extra?: { url?: string; provider?: string; minutes?: number; flag?: FlagKind },
): Resource => ({ title, type, modality, ...extra });

export const NODES: OutcomeNode[] = [
  {
    id: 'MA4-INT',
    caseId: 'MA4-INT-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Integers & the four operations',
    description: 'Order, compare and operate with positive and negative integers.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'apply',
    resources: [r('Number line walkthrough', 'video', 'visual'), r('Operations practice set', 'task', 'practice')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: [],
  },
  {
    id: 'MA4-FRC',
    caseId: 'MA4-FRC-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Fractions, decimals & percentages',
    description: 'Convert between and compute with fractions, decimals and percentages.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'apply',
    resources: [
      r('What is a percentage, really?', 'video', 'visual', { provider: 'CK-12', minutes: 9, flag: 'fact' }),
      r('FDP conversion — worked examples', 'worked-example', 'read', { provider: 'CK-12', minutes: 15, flag: 'fact' }),
      r('Percentage & discount explorer', 'interactive', 'interactive', { provider: 'Desmos', minutes: 20, flag: 'plan' }),
      r('Budget percentages practice set', 'task', 'practice', { minutes: 25, flag: 'plan' }),
    ],
    masteryCheck: { type: 'adaptive quiz', threshold: 0.8 },
    feedsProjects: ['amal-tech-budget'],
    // ---- Full piece payload ----
    unitName: 'Money Sense — Fractions, Decimals & Percentages',
    manhalCode: 'MNL-NUM-04',
    essentialQuestion:
      'How do I compare prices, discounts and shares fairly when they are written in different forms?',
    rationale:
      'FDP fluency is the numeric spine of every budgeting, pricing and proportion decision a learner makes in the Community Budget App — and in adult financial life. It also gates ratios, linear relationships and probability downstream in the graph.',
    estimatedHours: 8,
    priorKnowledge: [
      'Place value and the four operations with whole numbers',
      'Equivalent fractions and simplifying (Stage 3)',
    ],
    standards: [
      { framework: 'NESA', code: 'MA4-FRC-C-01', descriptor: 'Represents and operates with fractions, decimals and percentages to solve problems.', flag: 'nesa' },
      { framework: 'NESA', code: 'MAO-WM-01', descriptor: 'Working mathematically — applies, reasons and communicates while solving problems.', flag: 'nesa' },
      { framework: 'ACARA', code: 'AC9M7N — Number (Year 7)', descriptor: 'Australian Curriculum v9 Number strand — fractions, decimals and percentages.', flag: 'verify' },
      { framework: 'NNLP', code: 'InF · QuN', descriptor: 'National Numeracy Learning Progression — Interpreting fractions; Quantifying numbers.', flag: 'fact' },
      { framework: 'GeneralCapability', code: 'Numeracy', descriptor: 'ACARA General Capability — proportional reasoning in context.', flag: 'fact' },
      { framework: 'CASE', code: 'case:ma4-frc-0002', descriptor: 'Wrapped as a 1EdTech CASE item for standards-portable exchange.', flag: 'plan' },
    ],
    learningSequence: [
      { phase: 'Explore', title: 'Where percentages hide', detail: 'Hunt FDP in receipts, sale signs and phone plans; name what each form is good for.', minutes: 30, resourceTitles: ['What is a percentage, really?'] },
      { phase: 'Build', title: 'Convert with confidence', detail: 'Move fluently between fraction, decimal and percentage and justify each step.', minutes: 60, resourceTitles: ['FDP conversion — worked examples'] },
      { phase: 'Apply', title: 'Discounts & GST', detail: 'Compute discounts, mark-ups and 10% GST on real catalogue items in the explorer.', minutes: 60, resourceTitles: ['Percentage & discount explorer', 'Budget percentages practice set'] },
      { phase: 'Demonstrate', title: 'Best-value brief', detail: 'Decide which of two phone plans is better value and defend it numerically.', minutes: 30 },
    ],
    masteryArtefacts: [
      { name: 'FDP adaptive quiz', kind: 'quiz', prompt: 'Convert and compute across all three forms; gate at 80%.', evidences: ['MA4-FRC-C-01'], capturedAs: 'completed → outcome (scaled 0–1)', toPortfolio: false },
      { name: 'Best-value decision note', kind: 'task', prompt: 'Compare two real plans/products and justify the better value in writing.', evidences: ['MA4-FRC-C-01', 'MAO-WM-01'], capturedAs: 'submitted → artefact', toPortfolio: true },
    ],
    rubric: [
      { level: 'emerging', descriptor: 'Converts between two forms with prompts; arithmetic slips on percentages.' },
      { level: 'developing', descriptor: 'Converts across all three forms; computes simple discounts accurately.' },
      { level: 'proficient', descriptor: 'Computes multi-step discount/GST problems and justifies the reasoning (gate).' },
      { level: 'extending', descriptor: 'Handles successive and reverse-percentage problems; critiques others’ reasoning.' },
    ],
    badge: 'Numeracy Foundations — Proportional Reasoning',
    xapiExamples: [
      { actor: { id: 'stu-amal', name: 'Amal' }, verb: 'completed', object: { id: 'MA4-FRC', type: 'outcome' }, result: { score: { scaled: 0.86 }, success: true }, context: { projectId: 'amal-tech-budget' }, timestamp: '2026-02-18T03:20:00Z' },
      { actor: { id: 'stu-amal', name: 'Amal' }, verb: 'submitted', object: { id: 'art-frc-bestvalue', type: 'artefact' }, context: { coachId: 'coach-khan', projectId: 'amal-tech-budget' }, timestamp: '2026-02-19T01:05:00Z' },
    ],
  },
  {
    id: 'MA4-RAT',
    caseId: 'MA4-RAT-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Ratios & rates',
    description: 'Use ratios and rates to solve proportional reasoning problems.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'analyze',
    resources: [
      r('Rates in the real world', 'video', 'visual', { provider: 'Khan Academy', minutes: 10, flag: 'fact' }),
      r('Unit rates — worked examples', 'worked-example', 'read', { provider: 'CK-12', minutes: 14, flag: 'fact' }),
      r('Scale & proportion in infographics', 'interactive', 'interactive', { provider: 'Desmos', minutes: 20, flag: 'plan' }),
      r('Sydney residential water use (synthetic extract)', 'dataset', 'data', { provider: 'Sydney Water / BOM (synthetic)', minutes: 15, flag: 'plan' }),
      r('Water-use campaign maths brief', 'task', 'practice', { minutes: 30, flag: 'plan' }),
    ],
    masteryCheck: { type: 'adaptive quiz + task', threshold: 0.8 },
    feedsProjects: ['amal-media-campaign'],
    // ---- Full piece payload ----
    unitName: 'Rates That Persuade — Ratios, Rates & Scaled Visuals',
    manhalCode: 'MNL-NUM-07',
    essentialQuestion:
      'How can a rate, shown honestly, change what a community does every day?',
    rationale:
      'A persuasive Water-Use Awareness Campaign rests on a correct rate (litres/person/day) and a truthfully scaled visual. Get the proportion wrong — or the scaling dishonest — and the message both misleads and fails. This piece is where number becomes story for the Media stream.',
    estimatedHours: 7,
    priorKnowledge: [
      'Fluency with fractions, decimals and percentages (MA4-FRC)',
      'Multiplication and division with decimals',
    ],
    standards: [
      { framework: 'NESA', code: 'MA4-RAT-C-01', descriptor: 'Solves ratio and rate problems and analyses distance–time graphs.', flag: 'nesa' },
      { framework: 'NESA', code: 'MAO-WM-01', descriptor: 'Working mathematically — reasons, justifies and communicates proportional thinking.', flag: 'nesa' },
      { framework: 'ACARA', code: 'AC9M7N · AC9M8M — Number/Measurement', descriptor: 'Australian Curriculum v9 — ratios, rates and proportion in context.', flag: 'verify' },
      { framework: 'NNLP', code: 'PrT · MuS', descriptor: 'National Numeracy Learning Progression — Proportional thinking; Multiplicative strategies.', flag: 'fact' },
      { framework: 'GeneralCapability', code: 'Numeracy', descriptor: 'ACARA General Capability — interpreting and representing rates in real contexts.', flag: 'fact' },
      { framework: 'CASE', code: 'case:nsw-maths-2022:MA4-RAT-C-01', descriptor: 'Wrapped as a 1EdTech CASE item for standards-portable exchange.', flag: 'plan' },
    ],
    learningSequence: [
      { phase: 'Explore', title: 'What a rate really says', detail: 'Compare water use as litres/person/day across households; decide which framing actually persuades.', minutes: 30, resourceTitles: ['Rates in the real world'] },
      { phase: 'Build', title: 'Unit rates & scaling', detail: 'Compute unit rates and scale quantities up and down while holding the ratio constant.', minutes: 60, resourceTitles: ['Unit rates — worked examples', 'Scale & proportion in infographics'] },
      { phase: 'Apply', title: 'Design an honest infographic', detail: 'Turn a real water-use rate into a correctly scaled visual — bars and icons proportional to the numbers.', minutes: 75, resourceTitles: ['Sydney residential water use (synthetic extract)', 'Scale & proportion in infographics'] },
      { phase: 'Demonstrate', title: 'The pledge that adds up', detail: 'Model the litres saved if the community cut use by a stated rate, and defend the claim numerically.', minutes: 30, resourceTitles: ['Water-use campaign maths brief'] },
    ],
    masteryArtefacts: [
      { name: 'Rates & scaling quiz', kind: 'quiz', prompt: 'Compute unit rates and scale quantities proportionally; gate at 80%.', evidences: ['MA4-RAT-C-01'], capturedAs: 'completed → outcome (scaled 0–1)', toPortfolio: false },
      { name: 'Honest water-use infographic', kind: 'media', prompt: 'Produce a correctly scaled infographic from a real water-use rate; state the rate and its source.', evidences: ['MA4-RAT-C-01', 'MAO-WM-01'], capturedAs: 'submitted → artefact', toPortfolio: true },
    ],
    rubric: [
      { level: 'emerging', descriptor: 'Computes a unit rate with support; scaling distorts the quantities.' },
      { level: 'developing', descriptor: 'Computes unit rates and scales correctly in straightforward cases.' },
      { level: 'proficient', descriptor: 'Builds a truthfully scaled visual from a real rate and justifies it (gate).' },
      { level: 'extending', descriptor: 'Critiques a misleading scaled graphic and redesigns it to be both honest and persuasive.' },
    ],
    badge: 'Proportional Reasoning — Rates That Persuade',
    xapiExamples: [
      { actor: { id: 'stu-yusuf', name: 'Yusuf' }, verb: 'completed', object: { id: 'MA4-RAT', type: 'outcome' }, result: { score: { scaled: 0.84 }, success: true }, context: { coachId: 'coach-khan', projectId: 'amal-media-campaign' }, timestamp: '2026-04-22T03:40:00Z' },
      { actor: { id: 'stu-yusuf', name: 'Yusuf' }, verb: 'submitted', object: { id: 'art-rat-infographic', type: 'artefact' }, context: { projectId: 'amal-media-campaign' }, timestamp: '2026-04-23T05:10:00Z' },
    ],
  },
  {
    id: 'MA4-ALG',
    caseId: 'MA4-ALG-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Algebraic techniques',
    description: 'Generalise number patterns; simplify and substitute into expressions.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'understand',
    resources: [r('Intro to variables', 'video', 'visual'), r('Simplifying expressions', 'task', 'practice')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: [],
  },
  {
    id: 'MA4-EQU',
    caseId: 'MA4-EQU-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Linear equations',
    description: 'Solve linear equations and model simple situations.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'apply',
    resources: [r('Solving step-by-step', 'interactive', 'interactive')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: ['amal-tech-budget'],
  },
  {
    id: 'MA4-LIN',
    caseId: 'MA4-LIN-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Linear relationships',
    description: 'Plot and interpret linear relationships on the Cartesian plane.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'analyze',
    resources: [r('Graphing lines', 'interactive', 'interactive')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: ['amal-tech-budget'],
  },
  {
    id: 'MA4-LEN',
    caseId: 'MA4-LEN-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Length & perimeter',
    description: 'Calculate length and perimeter of plane shapes.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'apply',
    resources: [r('Perimeter basics', 'text', 'read')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: [],
  },
  {
    id: 'MA4-ARE',
    caseId: 'MA4-ARE-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Area',
    description: 'Calculate areas of triangles, quadrilaterals and composite shapes.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'apply',
    resources: [r('Area formulas', 'text', 'read'), r('Composite shapes task', 'task', 'practice')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: ['amal-media-campaign'],
  },
  {
    id: 'MA4-VOL',
    caseId: 'MA4-VOL-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Volume',
    description: 'Calculate volumes of prisms and cylinders.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'apply',
    resources: [r('Volume of prisms', 'video', 'visual')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: [],
  },
  {
    id: 'MA4-DAT',
    caseId: 'MA4-DAT-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Data classification & visualisation',
    description: 'Classify data and represent it with appropriate displays.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'understand',
    unitName: 'Picturing Data — Classification & Visualisation',
    resources: [
      r('Choosing the right graph', 'text', 'read', { provider: 'CK-12', minutes: 12, flag: 'fact' }),
      r('Chart-type matcher', 'interactive', 'interactive', { provider: 'CODAP', minutes: 20, flag: 'plan' }),
    ],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: ['amal-law-policy'],
    standards: [
      { framework: 'NESA', code: 'MA4-DAT-C-01', descriptor: 'Classifies and displays data using a variety of graphical representations.', flag: 'nesa' },
      { framework: 'NNLP', code: 'IRD', descriptor: 'National Numeracy Learning Progression — Interpreting and representing data.', flag: 'fact' },
    ],
  },
  {
    id: 'MA4-DAN',
    caseId: 'MA4-DAT-C-02', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Data analysis',
    description: 'Calculate and interpret measures of centre and spread.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'evaluate',
    resources: [
      r('Mean, median, mode — when each one lies', 'video', 'visual', { provider: 'CK-12', minutes: 11, flag: 'fact' }),
      r('Spread & outliers — worked examples', 'worked-example', 'read', { provider: 'CK-12', minutes: 16, flag: 'fact' }),
      r('Parramatta youth open dataset', 'dataset', 'data', { provider: 'data.nsw / ABS (synthetic extract)', minutes: 20, flag: 'plan' }),
      r('Statistics explorer', 'interactive', 'interactive', { provider: 'CODAP', minutes: 30, flag: 'plan' }),
    ],
    masteryCheck: { type: 'analysis task + quiz', threshold: 0.8 },
    feedsProjects: ['amal-law-policy', 'amal-tech-budget'],
    // ---- Full piece payload ----
    unitName: 'Reading the Numbers — Data Analysis',
    manhalCode: 'MNL-STA-02',
    essentialQuestion:
      'When one number is used to describe a whole group, who does it represent — and who does it hide?',
    rationale:
      'Measures of centre and spread are the analytical engine of the Youth Data Policy Brief: a credible recommendation must rest on an honest reading of the data, including what the average conceals.',
    estimatedHours: 7,
    priorKnowledge: [
      'Classifying data and choosing displays (MA4-DAT)',
      'Fractions and decimals for computing means (MA4-FRC)',
    ],
    standards: [
      { framework: 'NESA', code: 'MA4-DAT-C-02', descriptor: 'Analyses simple datasets using measures of centre, range and shape of the data.', flag: 'nesa' },
      { framework: 'NESA', code: 'MA4-DAT-C-01', descriptor: 'Classifies and displays data using a variety of graphical representations.', flag: 'nesa' },
      { framework: 'NESA', code: 'MAO-WM-01', descriptor: 'Working mathematically — reasons and communicates statistical conclusions.', flag: 'nesa' },
      { framework: 'ACARA', code: 'AC9M7ST · AC9M8ST — Statistics', descriptor: 'Australian Curriculum v9 Statistics strand — summary statistics and interpretation.', flag: 'verify' },
      { framework: 'NNLP', code: 'IRD', descriptor: 'National Numeracy Learning Progression — Interpreting and representing data.', flag: 'fact' },
      { framework: 'GeneralCapability', code: 'Critical & Creative Thinking', descriptor: 'ACARA General Capability — drawing and evaluating evidence-based conclusions.', flag: 'fact' },
    ],
    learningSequence: [
      { phase: 'Explore', title: 'The misleading average', detail: 'Meet datasets where mean and median disagree; predict which represents the group.', minutes: 30, resourceTitles: ['Mean, median, mode — when each one lies'] },
      { phase: 'Build', title: 'Compute centre & spread', detail: 'Calculate mean, median, mode and range; describe shape and outliers.', minutes: 60, resourceTitles: ['Spread & outliers — worked examples', 'Statistics explorer'] },
      { phase: 'Apply', title: 'Interrogate a real dataset', detail: 'Analyse the Parramatta youth dataset; choose the fairest summary and display.', minutes: 75, resourceTitles: ['Parramatta youth open dataset', 'Statistics explorer'] },
      { phase: 'Demonstrate', title: 'One honest claim', detail: 'Write one defensible data claim for the policy brief, naming its limitation.', minutes: 30 },
    ],
    masteryArtefacts: [
      { name: 'Centre & spread quiz', kind: 'quiz', prompt: 'Compute and interpret measures across mixed datasets; gate at 80%.', evidences: ['MA4-DAT-C-02'], capturedAs: 'completed → outcome (scaled 0–1)', toPortfolio: false },
      { name: 'Dataset analysis memo', kind: 'dataset', prompt: 'Summarise a real dataset with the fairest statistic + chart, and state one limitation.', evidences: ['MA4-DAT-C-02', 'MA4-DAT-C-01', 'MAO-WM-01'], capturedAs: 'submitted → artefact', toPortfolio: true },
    ],
    rubric: [
      { level: 'emerging', descriptor: 'Computes mean/median with support; treats every average as representative.' },
      { level: 'developing', descriptor: 'Computes centre and range; identifies obvious outliers.' },
      { level: 'proficient', descriptor: 'Selects the fairest measure for the context and justifies it, noting spread/shape (gate).' },
      { level: 'extending', descriptor: 'Critiques how a statistic could mislead a policy audience and proposes a fairer presentation.' },
    ],
    badge: 'Data Literacy — Honest Summary',
    xapiExamples: [
      { actor: { id: 'stu-layla', name: 'Layla' }, verb: 'mastered', object: { id: 'MA4-DAN', type: 'outcome' }, result: { score: { scaled: 0.91 }, success: true }, context: { coachId: 'coach-osman', projectId: 'amal-law-policy' }, timestamp: '2026-03-02T02:10:00Z' },
      { actor: { id: 'stu-layla', name: 'Layla' }, verb: 'submitted', object: { id: 'art-dan-memo', type: 'artefact' }, context: { projectId: 'amal-law-policy' }, timestamp: '2026-03-03T04:25:00Z' },
    ],
  },
  {
    id: 'MA4-PRO',
    caseId: 'MA4-PRO-C-01', // verified real NESA Mathematics K–10 (2022) outcome
    title: 'Probability',
    description: 'Assign and reason with probabilities of simple events.',
    stage: 'Stage4',
    kla: 'Mathematics',
    bloom: 'analyze',
    resources: [r('Probability of events', 'interactive', 'interactive')],
    masteryCheck: { type: 'quiz', threshold: 0.8 },
    feedsProjects: [],
  },
];

export const EDGES: GraphEdge[] = [
  // prerequisites
  { from: 'MA4-INT', to: 'MA4-FRC', type: 'prerequisite' },
  { from: 'MA4-FRC', to: 'MA4-RAT', type: 'prerequisite' },
  { from: 'MA4-INT', to: 'MA4-ALG', type: 'prerequisite' },
  { from: 'MA4-ALG', to: 'MA4-EQU', type: 'prerequisite' },
  { from: 'MA4-ALG', to: 'MA4-LIN', type: 'prerequisite' },
  { from: 'MA4-FRC', to: 'MA4-LIN', type: 'prerequisite' },
  { from: 'MA4-INT', to: 'MA4-LEN', type: 'prerequisite' },
  { from: 'MA4-LEN', to: 'MA4-ARE', type: 'prerequisite' },
  { from: 'MA4-FRC', to: 'MA4-ARE', type: 'prerequisite' },
  { from: 'MA4-ARE', to: 'MA4-VOL', type: 'prerequisite' },
  { from: 'MA4-FRC', to: 'MA4-DAT', type: 'prerequisite' },
  { from: 'MA4-DAT', to: 'MA4-DAN', type: 'prerequisite' },
  { from: 'MA4-FRC', to: 'MA4-PRO', type: 'prerequisite' },
  // semantic relationships
  { from: 'MA4-LIN', to: 'MA4-DAN', type: 'related' },
  { from: 'MA4-RAT', to: 'MA4-PRO', type: 'related' },
];
