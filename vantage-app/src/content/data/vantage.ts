// ---------------------------------------------------------------------------
// VANTAGE BY UNITY — the real spine (factual) + candidate overlay ([proposed]).
// Facts sourced from research/01-vantage-facts.md. Web content treated as data.
// ---------------------------------------------------------------------------

export type FlagKind = 'fact' | 'practice' | 'plan' | 'proposed' | 'verify' | 'nesa' | 'nsw$';

export interface Source {
  label: string;
  url?: string;
}

export const SCHOOL = {
  name: 'Vantage by Unity',
  shortName: 'Vantage',
  operator: 'A Unity Grammar school',
  tagline: 'The future of education is here',
  oneLine:
    'Project-based, industry-led learning grounded in Islamic values — Years 7–12 in Parramatta.',
  model: 'UXL — Unity Experiential Learning',
  type: 'Independent Islamic secondary · Years 7–12 (opens with Years 7 & 8)',
  location: 'Parramatta · Western Sydney, NSW · Dharug Country',
  opens: 'January 2027 — Stage 4 (Years 7 & 8)',
  credentials: 'HSC + ATAR retained',
  meals: 'Full Meal Program — breakfast, lunch & snacks',
  enrolment: 'EOI → free Talent Profile assessment → interview → outcome',
  archetype: 'graduate archetype: the “Smart Muslim Creative”',
  parent: {
    name: 'Unity Grammar',
    founded: 2008,
    location: 'Austral, NSW',
    ceo: 'Dr Sayd Farook',
    note: 'NESA-registered K–12 · CIS member',
  },
  proposedFramework: 'The Ihsan Way',
  proposedNote:
    'a candidate overlay — what I would bring as Head of School (flagged, not the school’s policy)',
  status: 'CANDIDATE — Founding Head of School recruitment',
} as const;

export interface Stage {
  id: 'Stage4' | 'Stage5' | 'Stage6';
  stage: string;
  years: string;
  mode: string;
  arabic: string;
  overlay: string;
}

// Real UXL stages (Discovery / Mastery / Impact) — replaces earlier invented names.
export const STAGES: Stage[] = [
  {
    id: 'Stage4',
    stage: 'Discovery',
    years: 'Years 7–8',
    mode: 'Micro-projects',
    arabic: 'Talab — seeking',
    overlay: 'Explore & wonder; build habits of inquiry and adab.',
  },
  {
    id: 'Stage5',
    stage: 'Mastery',
    years: 'Years 9–10',
    mode: 'Educator-led projects + mentorship',
    arabic: 'Tafaqquh — deep understanding',
    overlay: 'Specialise in a stream; mastery-gated knowledge via Manhal.',
  },
  {
    id: 'Stage6',
    stage: 'Impact',
    years: 'Years 11–12',
    mode: 'Learner-led capstones (HSC + ATAR)',
    arabic: 'Riyāḍah — disciplined striving',
    overlay: 'Author real impact; capstones as ’Amal Challenges.',
  },
];

export type StreamId = 'media' | 'law' | 'tech';

export interface Stream {
  id: StreamId;
  name: string;
  icon: string;
  color: string;
  detail: string;
  ihsan: string;
}

export const STREAMS: Stream[] = [
  {
    id: 'media',
    name: 'Media, Communications & Creative Arts',
    icon: '🎬',
    color: '#B26540',
    detail: 'Storytelling, design and digital media through real-world projects.',
    ihsan: 'Bayān — truthful, beautiful expression.',
  },
  {
    id: 'law',
    name: 'Law, Government & Institutional Systems',
    icon: '⚖️',
    color: '#6C7D3C',
    detail: 'Power, policy, justice and advocacy; how institutions actually work.',
    ihsan: '‘Adl — justice and stewardship.',
  },
  {
    id: 'tech',
    name: 'Tech Innovation & Entrepreneurship',
    icon: '💡',
    color: '#9A7B4F',
    detail: 'Build startups, code solutions, and turn ideas into ventures.',
    ihsan: 'Iḥsān — excellence and benefit (naf‘).',
  },
];

export interface EducatorRole {
  name: string;
  spine: boolean;
  overlay?: string;
  desc: string;
}

// The four real educator roles (spine) with the candidate's Murabbi/Mu‘allim overlay.
export const EDUCATOR_ROLES: EducatorRole[] = [
  {
    name: 'Learning Coaches',
    spine: true,
    overlay: 'Murabbi (wellbeing)',
    desc: 'Advisory, coaching and pastoral care — connection over exam-drilling.',
  },
  {
    name: 'Expedition Guides',
    spine: true,
    desc: 'Lead Industry-Led Challenges and city-as-campus expeditions.',
  },
  {
    name: 'Competency Architects',
    spine: true,
    overlay: 'Mu‘allim (subject)',
    desc: 'Design and gate mastery of NESA outcomes through Manhal.',
  },
  {
    name: 'Experts in Residence',
    spine: true,
    desc: 'Industry mentors and practitioners embedded in projects.',
  },
];

export const ENROLMENT_STEPS: { step: string; detail: string }[] = [
  { step: 'Online application', detail: 'Express interest and apply through the school site.' },
  { step: 'Talent Profile assessment', detail: 'A free strengths-and-interests assessment — not an exam.' },
  { step: 'Interview', detail: 'Family and learner meet the team to explore fit.' },
  { step: 'Outcome', detail: 'Offer and onboarding into the founding cohort.' },
];

export const UNITY_LEADERS: { name: string; role: string }[] = [
  { name: 'Dr Sayd Farook', role: 'CEO (ex-Thomson Reuters Global Head, Islamic Markets; PhD, UTS)' },
  { name: 'Sam Halbouni', role: 'Executive / Senior Principal' },
  { name: 'Hibba Mourad', role: 'Junior School Principal' },
  { name: 'Ali Assaad', role: 'Head of Islamic Faith' },
];

export const VANTAGE_EVENT = {
  name: 'The Vantage Experience',
  date: 'Saturday 20 June 2026',
  time: '12–2pm',
  venue: 'The Ponds Community Hub, 45 Riverbank Drive, The Ponds NSW',
  note: 'PBL demonstration + meet the leadership team (register via Humanitix).',
} as const;

// Honesty matters for a founding leader: separate confirmed facts from assumptions.
export const VERIFY_NOTES: string[] = [
  'Fees are not yet published (the FAQ answer is JavaScript-rendered).',
  'The exact Parramatta street address / building is not yet public.',
  'Formal NESA registration of Vantage as a distinct school is not yet public.',
  'Head of School salary is not disclosed (“competitive… above standard leadership benchmarks”); any figure is my assumption.',
  '“Radical Recruitment” as the retained recruiter is not publicly substantiated — it comes from a private meeting note, not an official channel.',
];

export const VANTAGE_SOURCES: Source[] = [
  { label: 'vantagebyunity.school', url: 'https://www.vantagebyunity.school/' },
  { label: 'Unity Grammar', url: 'https://www.unitygrammar.nsw.edu.au/' },
  {
    label: 'Head of School ad (SchoolTeachingJobs)',
    url: 'https://www.schoolteachingjobs.com/jobs/415867231-head-of-school',
  },
];
