import type { FlagKind } from './vantage';

// ---------------------------------------------------------------------------
// ROADMAP — the operational arc from appointment to first HSC cohort.
// Hard anchors are facts (Head of School commences Jul 2026 design & launch
// phase; school opens Jan 2027 with Years 7 & 8; grows toward Year 12).
// Phasing detail, growth numbers and budget shares are a candidate PLAN and
// clearly flagged. Sourced from research/01-vantage-facts.md (+ 03/04).
// ---------------------------------------------------------------------------

export interface Phase {
  id: string;
  phase: string;
  window: string;
  intent: string;
  items: string[];
  flag: FlagKind;
}

export const ROADMAP_PHASES: Phase[] = [
  {
    id: 'foundations',
    phase: 'Foundations',
    window: 'Jul – Dec 2026',
    intent: 'Stand the school up: registrable, staffed, sited and full.',
    items: [
      'Open the NESA registration dossier (Section 47 evidence) on day one',
      'Recruit the founding team in sequence — coaches and architects first',
      'Secure the Parramatta site; brief an EFSG-benchmarked staged fit-out',
      'Build the Manhal MVP — Stage 4 outcomes as CASE, gating + portfolio glue',
      'Sign first MOUs with Parramatta anchors; build the mentor pipeline',
      'Run the enrolment campaign through the Talent Profile pipeline',
    ],
    flag: 'plan',
  },
  {
    id: 'readiness',
    phase: 'Launch readiness',
    window: 'Jan 2027',
    intent: 'Clear every gate before a single student walks in.',
    items: [
      'Confirm WWCC, child-safe induction and WHS for every adult on site',
      'Two-week founding-team induction into the four roles and Manhal',
      'Onboard the founding cohort; families meet their Murabbi',
      'Smoke-test systems: timetable, meal program, LRS evidence capture',
    ],
    flag: 'plan',
  },
  {
    id: 'year1',
    phase: 'Year 1 — Discovery',
    window: '2027',
    intent: 'Run Years 7 & 8 well, and learn fast.',
    items: [
      'Deliver Discovery micro-projects across the three streams',
      'Weekly coaching cycles (Impact Cycle) — improvement as the norm',
      'First ’Amal Challenges shipped; Athar portfolios begin to fill',
      'Iterate Manhal from real evidence; tune mastery thresholds',
    ],
    flag: 'plan',
  },
  {
    id: 'scale',
    phase: 'Scale — Mastery',
    window: '2028 – 2029',
    intent: 'Add Years 9–10 and deepen mastery-gated learning.',
    items: [
      'Mastery stage live: educator-led projects + mentorship',
      'Activate the next studio cluster as the roll grows',
      'Expand the partnership roster; embed Experts in Residence',
      'Manhal graph widens to Stage 5 outcomes; gating deepens',
    ],
    flag: 'plan',
  },
  {
    id: 'maturity',
    phase: 'Maturity — Impact & first HSC',
    window: '2030 – 2031',
    intent: 'Carry the model into the senior years without trading off the HSC.',
    items: [
      'Impact stage: learner-led capstones as ’Amal Challenges',
      'First HSC + ATAR cohort graduates (2031)',
      'Open Badges 3.0 issued at capstone — credentials that travel',
      'Approach the ~600-student endstate the building is sized for',
    ],
    flag: 'plan',
  },
];

export interface GrowthYear {
  year: string;
  years: string;
  stage: string;
  cohort: number;
  note: string;
}

// Indicative enrolment ramp toward the ~600 endstate (Spaces brief). PLAN.
export const GROWTH_MODEL: GrowthYear[] = [
  { year: '2027', years: 'Years 7–8', stage: 'Discovery', cohort: 120, note: 'Founding cohort' },
  { year: '2028', years: 'Years 7–9', stage: 'Discovery → Mastery', cohort: 210, note: 'Add Year 9' },
  { year: '2029', years: 'Years 7–10', stage: 'Mastery', cohort: 300, note: 'Second studio cluster' },
  { year: '2030', years: 'Years 7–11', stage: 'Mastery → Impact', cohort: 400, note: 'Senior years begin' },
  { year: '2031', years: 'Years 7–12', stage: 'Impact', cohort: 480, note: 'First HSC cohort' },
];

export const GROWTH_ENDSTATE = 600; // building sized for this (Spaces brief)

export interface Workstream {
  name: string;
  owner: string;
  focus: string;
  flag: FlagKind;
}

export const WORKSTREAMS: Workstream[] = [
  {
    name: 'Registration & compliance',
    owner: 'Head of School + Business Manager',
    focus: 'NESA registration evidence, child-safe framework, WHS — the licence to operate.',
    flag: 'nesa',
  },
  {
    name: 'People',
    owner: 'Head of School',
    focus: 'Recruit and onboard the four educator roles in sequence; build the coaching culture.',
    flag: 'plan',
  },
  {
    name: 'Facilities',
    owner: 'Business Manager + architect',
    focus: 'Secure the site; EFSG-benchmarked, staged fit-out sized for the ~600 endstate.',
    flag: 'plan',
  },
  {
    name: 'Curriculum & Manhal',
    owner: 'Competency Architects + Head',
    focus: 'CASE-mapped outcome graph, mastery gating, and the first ’Amal Challenges.',
    flag: 'plan',
  },
  {
    name: 'Partnerships',
    owner: 'Head + Expedition Guides',
    focus: 'MOUs with Parramatta anchors; a vetted Expert-in-Residence pipeline.',
    flag: 'plan',
  },
  {
    name: 'Enrolment & community',
    owner: 'Registrar / Marketing',
    focus: 'Talent Profile pipeline, the Vantage Experience, and family onboarding.',
    flag: 'plan',
  },
];

export interface BudgetLine {
  area: string;
  share: number; // indicative % of recurrent operating cost
  detail: string;
  flag: FlagKind;
}

// Indicative shape of recurrent operating cost — proportions, not a budget.
// Schools are staff-heavy; the Full Meal Program is a real Vantage line item.
export const BUDGET_SHAPE: BudgetLine[] = [
  { area: 'Staffing & coaching', share: 70, detail: 'Salaries across the four roles, leadership and operations.', flag: 'verify' },
  { area: 'Facilities', share: 12, detail: 'Lease, amortised fit-out, utilities and maintenance.', flag: 'verify' },
  { area: 'Full Meal Program', share: 6, detail: 'Breakfast, lunch and snacks — a Vantage wellbeing commitment.', flag: 'plan' },
  { area: 'Learning & city-campus', share: 5, detail: 'Resources, excursions and partnership delivery.', flag: 'plan' },
  { area: 'Technology & Manhal', share: 4, detail: 'Hosted LMS/LRS, devices, and the in-house Manhal IP.', flag: 'plan' },
  { area: 'Admin, compliance & contingency', share: 3, detail: 'Registration, insurance, audit and a prudent reserve.', flag: 'plan' },
];

export interface RoadmapRisk {
  risk: string;
  mitigation: string;
  flag: FlagKind;
}

export const RISKS: RoadmapRisk[] = [
  {
    risk: 'Year 1 enrolment lands below target',
    mitigation: 'A lean founding team and staged fixed costs; a strong Talent Profile pipeline and Vantage Experience conversion.',
    flag: 'plan',
  },
  {
    risk: 'PBL is seen to trade off the HSC / ATAR',
    mitigation: 'Manhal maps every NESA outcome so nothing falls through; a dedicated HSC/university-access function (the High Tech High lesson).',
    flag: 'plan',
  },
  {
    risk: 'Site or fit-out runs late',
    mitigation: 'Stage the build; secure one launch-ready floor for Stage 1; use modular, reconfigurable furniture.',
    flag: 'plan',
  },
  {
    risk: 'Founding team key-person dependency',
    mitigation: 'Documented Manhal playbooks; MOUs that survive turnover; a coaching culture that builds bench strength.',
    flag: 'plan',
  },
  {
    risk: 'Manhal platform over-scopes',
    mitigation: 'Build only the graph + gating + portfolio IP in-house; buy or host the commodity layers (Moodle/Canvas, LRS).',
    flag: 'plan',
  },
  {
    risk: 'NESA registration timing slips',
    mitigation: 'Open the registration dossier first; benchmark spaces to EFSG; run evidence-led from day one.',
    flag: 'nesa',
  },
];
