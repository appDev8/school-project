import type { FlagKind } from './vantage';

// ---------------------------------------------------------------------------
// PEOPLE & STAFFING — founding-year FTE model, recruitment sequencing, salary
// bands and NSW compliance. Sourced from
// research/04-staffing-training-partnerships.md.
//
// Provenance discipline: award/salary figures and legal requirements are
// DOCUMENTED (flagged 'fact' / 'nsw$'); the org structure I assemble and the
// recruitment ordering are my design ('plan'); the leadership pay range is
// market context, not an award rate ('verify').
//
// The teaching headcount in the research ("Mentor & Coach" team of ~9–10) is
// mapped here to Vantage's four real educator roles — Learning Coaches,
// Expedition Guides, Competency Architects, Experts in Residence — to stay
// consistent with the school model. That split across the four roles is [plan].
// ---------------------------------------------------------------------------

export type StaffCategory = 'Leadership' | 'Teaching/Coaching' | 'Wellbeing' | 'Operations';

export interface FteRole {
  title: string;
  count: number; // FTE
  category: StaffCategory;
  purpose: string;
  flag: FlagKind;
}

// Founding-year team (~120 students, Years 7 & 8). Totals to ~20.5 FTE,
// inside the research's "≈ 20–21 FTE" envelope. The teaching block (~9 FTE) is
// distributed across the four educator roles as a design choice [plan]; the
// overall envelope is documented in the research [fact].
export const FTE_MODEL: FteRole[] = [
  {
    title: 'Head of School',
    count: 1,
    category: 'Leadership',
    purpose:
      'Educational leadership, registration accountability and culture; a "responsible person" under the Education Act 1990.',
    flag: 'fact',
  },
  {
    title: 'Learning-design & curriculum lead',
    count: 1,
    category: 'Leadership',
    purpose:
      'Maps NESA Stage 4 outcomes and hours to projects, builds the fidelity rubric and QAs the HSC pathway.',
    flag: 'fact',
  },
  {
    title: 'EdTech & knowledge-systems lead (Manhal)',
    count: 1,
    category: 'Leadership',
    purpose:
      'Builds and runs the mastery knowledge graph, LMS/LRS and dashboards; owns data governance and privacy.',
    flag: 'fact',
  },
  {
    title: 'Competency Architects',
    count: 3,
    category: 'Teaching/Coaching',
    purpose:
      'NESA-accredited subject educators who design and gate mastery of Stage 4 outcomes through Manhal.',
    flag: 'plan',
  },
  {
    title: 'Expedition Guides',
    count: 2.5,
    category: 'Teaching/Coaching',
    purpose:
      'Lead Industry-Led Challenges and city-as-campus expeditions; deliver KLAs through project work.',
    flag: 'plan',
  },
  {
    title: 'Learning Coaches',
    count: 1.5,
    category: 'Teaching/Coaching',
    purpose:
      'Advisory, coaching and the daily teaching load; the relational core of each cohort.',
    flag: 'plan',
  },
  {
    title: 'Islamic studies & Quran staff',
    count: 1.5,
    category: 'Teaching/Coaching',
    purpose: 'Quran, Islamic studies and tarbiyah integrated across the program.',
    flag: 'fact',
  },
  {
    title: 'Learning-support (LaST) & inclusion',
    count: 1,
    category: 'Teaching/Coaching',
    purpose: 'Adjustments, NCCD, UDL and special-education needs across both year groups.',
    flag: 'fact',
  },
  {
    title: 'Experts in Residence & partnerships lead',
    count: 1,
    category: 'Teaching/Coaching',
    purpose:
      'Industry mentors embedded in projects, plus MOUs, mentor vetting and stream matching (blended at launch).',
    flag: 'plan',
  },
  {
    title: 'Wellbeing & advisory coach',
    count: 1.5,
    category: 'Wellbeing',
    purpose:
      'Pastoral advisory, attendance, behaviour and family contact (partly held by teaching staff).',
    flag: 'fact',
  },
  {
    title: 'Operations, admin & business manager',
    count: 2,
    category: 'Operations',
    purpose: 'Compliance, finance, HR, enrolments, WHS and front office.',
    flag: 'fact',
  },
  {
    title: 'Meal-program staff',
    count: 1.5,
    category: 'Operations',
    purpose: 'Cook and assistant running the Full Meal Program — breakfast, lunch and snacks.',
    flag: 'fact',
  },
];

export interface RecruitPriority {
  role: string;
  when: string;
  rationale: string;
  skills: string[];
  flag: FlagKind;
}

// Founding-team sequencing — who to hire first and why. This ordering is my
// design judgement [plan]; the research documents the model, not the timeline.
export const RECRUIT_PRIORITIES: RecruitPriority[] = [
  {
    role: 'Head of School',
    when: '~12–18 months out',
    rationale:
      'A "responsible person" must carry registration, set culture and lead every later hire. Everything else depends on this appointment.',
    skills: [
      'NSW registration & governance',
      'Instructional leadership',
      'Founding / start-up experience',
      'Values-led culture-building',
    ],
    flag: 'plan',
  },
  {
    role: 'Learning-design & curriculum lead',
    when: '~9–12 months out',
    rationale:
      'The NESA Stage 4 outcome map and fidelity rubric must exist before educators are hired — so the team builds against a real spine, not a blank page.',
    skills: [
      'NESA Stage 4 outcome mapping',
      'Gold Standard PBL design',
      'Mastery / competency frameworks',
      'Assessment & moderation',
    ],
    flag: 'plan',
  },
  {
    role: 'EdTech & knowledge-systems lead (Manhal)',
    when: '~9–12 months out',
    rationale:
      'Manhal — the mastery graph and evidence backbone — is distinctive IP that needs lead time to build and to govern data privacy before students arrive.',
    skills: [
      'Learning-data architecture (xAPI / CASE)',
      'LMS / LRS operations',
      'Data governance & privacy',
      'Dashboards for coaching',
    ],
    flag: 'plan',
  },
  {
    role: 'Founding educators (the four roles)',
    when: '~3–6 months out',
    rationale:
      'Hire the teaching team in time for a 2–4 week pre-launch induction and PBL certification — recruiting for coaching disposition over subject content alone.',
    skills: [
      'NESA accreditation (Graduate / Proficient)',
      'PBL & advisory practice',
      'Coachability & collaboration',
      'Cross-disciplinary teaching',
    ],
    flag: 'plan',
  },
  {
    role: 'Operations & business manager',
    when: '~3–6 months out',
    rationale:
      'Compliance, finance, HR and enrolment systems must be live before opening; a small school cannot run these off the Head of School alone.',
    skills: [
      'School finance & HR',
      'WHS & compliance',
      'Enrolment operations',
      'Vendor & facilities management',
    ],
    flag: 'plan',
  },
  {
    role: 'Wellbeing, Islamic studies & support staff',
    when: 'Before launch',
    rationale:
      'Pastoral care, Quran/Islamic studies and learning support complete the founding team so the first cohort is held well from day one.',
    skills: [
      'Pastoral / advisory care',
      'Quran & Islamic studies (tarbiyah)',
      'Learning support (NCCD / UDL)',
      'Family engagement',
    ],
    flag: 'plan',
  },
];

export interface SalaryBand {
  band: string;
  amount: number; // raw annual base, AUD — format in the component
  note: string;
  flag: FlagKind;
}

// Independent Schools (Teachers) Multi-Enterprise Agreement 2025 — scales
// effective from the first full pay period on/after 1 Feb 2025 [fact]. The
// leadership row is NSW principal MARKET context, individually contracted —
// not an award rate [verify].
export const SALARY_BANDS: SalaryBand[] = [
  { band: 'Graduate 1.1', amount: 90100, note: 'Entry — newly accredited at Graduate.', flag: 'fact' },
  { band: 'Graduate 1.2', amount: 96898, note: 'Second Graduate step.', flag: 'fact' },
  { band: 'Proficient 2.1', amount: 101036, note: 'First Proficient step.', flag: 'fact' },
  { band: 'Proficient 2.2', amount: 105173, note: 'Proficient progression.', flag: 'fact' },
  { band: 'Proficient 2.3', amount: 112499, note: 'Proficient progression.', flag: 'fact' },
  { band: 'Proficient 2.4', amount: 120962, note: 'Proficient progression.', flag: 'fact' },
  { band: 'Proficient 2.5 (top)', amount: 127281, note: 'Top of the Proficient scale.', flag: 'fact' },
  {
    band: 'Head of School (market avg)',
    amount: 201903,
    note: 'NSW principal market base, avg of a ~$178,811–$250,000 range (Sydney, 2026); individually contracted, often above award. A start-up Yr 7–8 Head likely sits lower-to-mid initially.',
    flag: 'verify',
  },
];

export interface ComplianceItem {
  name: string;
  requirement: string;
  flag: FlagKind;
}

// NSW legal must-haves for staffing a non-government school [fact].
export const COMPLIANCE: ComplianceItem[] = [
  {
    name: 'NESA teacher accreditation',
    requirement:
      'Every teacher holds active accreditation at Graduate or Proficient against the Australian Professional Standards; NESA is the sole decision-maker.',
    flag: 'nesa',
  },
  {
    name: 'Working With Children Check (WWCC)',
    requirement:
      'A valid NSW WWCC clearance via the Office of the Children’s Guardian is mandatory for paid child-related work — lasts 5 years, continuously monitored, verified on the OCG portal before commencement (~$107).',
    flag: 'fact',
  },
  {
    name: 'Child Safe Standards / Child Safe Scheme',
    requirement:
      'Comply with the Children’s Guardian Act 2019 and implement the 10 Child Safe Standards, overseen by the OCG with enforcement powers.',
    flag: 'fact',
  },
  {
    name: 'Registration & accreditation (Education Act 1990)',
    requirement:
      'The school must be NESA-registered to operate and separately accredited to present students for RoSA/HSC; responsible persons complete NESA-approved governance training.',
    flag: 'fact',
  },
];
