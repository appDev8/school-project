import type { FlagKind } from './vantage';

// ---------------------------------------------------------------------------
// ONBOARDING & EDUCATOR TRAINING — how we onboard, train and coach the four
// educator roles to actually run the model (and to use the Manhal platform).
//
// Provenance: documented frameworks are [practice] — PBLWorks Gold Standard PBL
// and Jim Knight's Impact Cycle (research/04-staffing-training-partnerships.md,
// §4). The phased program design is my candidate [plan]; the Islamic coaching
// overlay ("the Ihsan Way", Murabbi) is a [proposed] candidate addition.
// Design & launch phase runs from mid-2026; school opens January 2027.
// ---------------------------------------------------------------------------

// --- 1. The onboarding journey -------------------------------------------------

export interface OnboardingPhase {
  phase: string;
  when: string;
  intent: string;
  focus: string[];
  flag: FlagKind;
}

export const ONBOARDING_PHASES: OnboardingPhase[] = [
  {
    phase: 'Pre-start',
    when: 'On appointment · mid–late 2026',
    intent: 'Clear compliance, meet the model, and start before day one.',
    focus: [
      'WWCC verified via the OCG portal before commencement; NESA accreditation confirmed',
      'Child Safe code and mandatory-reporting briefing',
      'Read the model: UXL stages, the four educator roles, and where you fit',
      'Pre-reading: Gold Standard PBL essentials + a first look at Manhal',
    ],
    flag: 'plan',
  },
  {
    phase: 'Induction',
    when: '2–4 week intensive · before opening',
    intent: 'Build shared foundations so the founding team starts as one practice.',
    focus: [
      'PBLWorks PBL 101 — designing and teaching a Gold Standard project',
      'Child-safe practice, tarbiyah and values integration into projects',
      'The four roles in action: Learning Coaches, Expedition Guides, Competency Architects, Experts in Residence',
      'Manhal basics: the NESA-outcome knowledge graph, mastery gating and Athar portfolios',
    ],
    flag: 'plan',
  },
  {
    phase: 'First term',
    when: 'Term 1, 2027 · coached delivery',
    intent: 'Run the model for real with a coach alongside, not a checklist over you.',
    focus: [
      'Co-deliver the first ’Amal Challenge with side-by-side coaching',
      'Live Manhal use: gate outcomes, log xAPI evidence, read the role dashboard',
      'Fortnightly project-tuning protocols with the team',
      'Murabbi advisory rhythm established with a consistent learner group',
    ],
    flag: 'proposed',
  },
  {
    phase: 'Ongoing',
    when: 'Every term thereafter · cadence',
    intent: 'Keep growing through cycles, not appraisal — improvement is normal.',
    focus: [
      'Jim Knight Impact Cycle: Identify → Learn → Improve, non-evaluative',
      'Weekly coaching/critique; termly fidelity-rubric self-review',
      'NESA-mandated PD to maintain Proficient accreditation',
      'Ihsan Way reflection — coaching the educator as a whole person, not just a practitioner',
    ],
    flag: 'proposed',
  },
];

// --- 2. How we train (the methods) --------------------------------------------

export interface TrainingPillar {
  name: string;
  basis: string;
  gives: string;
  flag: FlagKind;
}

export const TRAINING_PILLARS: TrainingPillar[] = [
  {
    name: 'Gold Standard PBL',
    basis: 'PBLWorks (Buck Institute) — PBL 101 + sustained coaching [practice]',
    gives:
      'A shared design language and the Project Based Teaching Practices — how to build authentic projects and teach inside them, not as a one-off workshop but as ongoing PD.',
    flag: 'practice',
  },
  {
    name: 'The Impact Cycle',
    basis: "Jim Knight's instructional coaching — Identify → Learn → Improve [practice]",
    gives:
      'A repeatable, non-evaluative coaching loop. Each educator partners with a coach to set a clear goal, learn a teaching move, and improve until the goal is met — separate from line-management.',
    flag: 'practice',
  },
  {
    name: 'The fidelity rubric',
    basis: 'Built from PBLWorks teaching practices + mastery-gating & advisory criteria [plan]',
    gives:
      'An observable picture of "doing the model well" — what good PBL, Manhal gating and Murabbi advisory look like in the room. Used for self-review and coaching, never for appraisal.',
    flag: 'plan',
  },
];

// --- 3. Learning to run Manhal -------------------------------------------------
// Role-tagged platform training: each module pairs a capability with the
// educator role that most owns it (mapped to EDUCATOR_ROLES in vantage.ts).

export interface ManhalTrainingModule {
  title: string;
  who: string; // which educator role primarily owns this capability
  outcome: string;
  flag: FlagKind;
}

export const MANHAL_TRAINING: ManhalTrainingModule[] = [
  {
    title: 'Authoring & gating outcomes',
    who: 'Competency Architects',
    outcome:
      'Add NESA Stage 4 outcomes to the knowledge graph, set prerequisites, and gate mastery so the next node only unlocks once a learner has demonstrated the last.',
    flag: 'plan',
  },
  {
    title: 'Reading the role dashboards',
    who: 'All four roles',
    outcome:
      'Interpret each role-specific view — mastery progress, project status, evidence and wellbeing signals — so the team acts on the same picture of every learner.',
    flag: 'plan',
  },
  {
    title: 'Designing an ’Amal Challenge from the graph',
    who: 'Expedition Guides',
    outcome:
      'Pull a cluster of mastered outcomes and a real industry brief into a project, so knowledge is genuinely applied rather than bolted on.',
    flag: 'plan',
  },
  {
    title: 'Running a coaching cycle from the data',
    who: 'Learning Coaches (Murabbi)',
    outcome:
      'Turn xAPI evidence and Athar portfolio traces into an advisory conversation — naming the next step for the whole learner, in the spirit of ihsan.',
    flag: 'proposed',
  },
];
