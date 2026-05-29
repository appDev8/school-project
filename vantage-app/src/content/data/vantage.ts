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
  address: '27–31 Argyle Street, Parramatta NSW 2150',
  opens: 'January 2027 — Stage 4 (Years 7 & 8)',
  credentials: 'HSC + ATAR retained',
  meals: 'Full Meal Program — breakfast, lunch & snacks',
  ratio: '1:15',
  ratioNational: '1:25',
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
  overlayFlag?: FlagKind; // 'fact' when the school uses the term; 'proposed' when it's my overlay
  desc: string;
}

// The four real educator roles (spine). "Murabbi" is the school's own confirmed
// term for the Learning Coach; "Mu‘allim" is the candidate's [proposed] overlay.
export const EDUCATOR_ROLES: EducatorRole[] = [
  {
    name: 'Learning Coaches',
    spine: true,
    overlay: 'Murabbi',
    overlayFlag: 'fact',
    desc: 'Advisory, coaching and pastoral care — connection over exam-drilling. Vantage calls this mentor the Murabbi: one person holding a learner’s academic progress, character and wellbeing together, not a coordinator managing hundreds.',
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
    overlayFlag: 'proposed',
    desc: 'Design and gate mastery of NESA outcomes through Manhal.',
  },
  {
    name: 'Experts in Residence',
    spine: true,
    desc: 'Industry mentors and practitioners embedded in projects.',
  },
];

// --- The graduate vision — the north star (Vantage's own published purpose) ---
// Every design decision serves this: the kind of person Vantage exists to form.
export interface GraduateQuality {
  name: string;
  detail: string;
}

export const GRADUATE_VISION = {
  archetype: 'Smart Muslim Creative',
  definition:
    'a deep generalist who combines academic mastery, spiritual depth, creative problem-solving and moral conviction',
  mission:
    'to systematically develop specialised Muslim leaders — with relentless curiosity, an influential network and mastery of competent skills — who lead teams and organisations that solve for the betterment of humanity',
  qualities: [
    {
      name: 'Academically Excellent',
      detail: 'Master core disciplines, then apply that knowledge in authentic contexts.',
    },
    {
      name: 'Spiritually Anchored',
      detail: 'Guided by Qur’anic principles, prophetic character and a sense of higher purpose.',
    },
    {
      name: 'Future-Ready',
      detail: 'Equipped for industry, entrepreneurship and social innovation.',
    },
    {
      name: 'Ethically Driven',
      detail: 'Using creativity and intellect in service to humanity.',
    },
  ] as GraduateQuality[],
} as const;

// --- Theory of change — the four building blocks (Vantage fact) ---------------
// How the model actually delivers the graduate vision: not subjects, but blocks.
export interface BuildingBlock {
  name: string;
  detail: string;
  icon: string;
}

export const BUILDING_BLOCKS: BuildingBlock[] = [
  {
    name: 'Programming',
    icon: '◷',
    detail:
      'The NESA-accredited curriculum delivered through the UXL sequence of projects and experiences — knowledge earned in the service of real work.',
  },
  {
    name: 'Coaching',
    icon: '◎',
    detail:
      'Educators as Learning Coaches: advisory, feedback and pastoral care — connection and growth over rote drilling.',
  },
  {
    name: 'Experiences + Immersions',
    icon: '◈',
    detail:
      'The city as campus — studios, labs, galleries and civic institutions, with industry mentors and creative professionals.',
  },
  {
    name: 'Attainment & Pathways',
    icon: '◆',
    detail:
      'Mastery and credentials that travel: HSC + ATAR retained, opening real doors into industry, entrepreneurship and university.',
  },
];

export const ENROLMENT_STEPS: { step: string; detail: string }[] = [
  { step: 'Online application', detail: 'Express interest and apply through the school site.' },
  { step: 'Talent Profile assessment', detail: 'A free strengths-and-interests assessment — not an exam.' },
  { step: 'Interview', detail: 'Family and learner meet the team to explore fit.' },
  { step: 'Outcome', detail: 'Offer and onboarding into the founding cohort.' },
];

// --- Campus & location (Vantage's own published facts) ----------------------
// Address, walking distance and transport are confirmed by the school's own
// channels. They are facts; the way the school adds supervision discipline on
// top (the safety answer) is the candidate plan and flagged as such.
export const CAMPUS = {
  address: '27–31 Argyle Street, Parramatta NSW 2150',
  area: 'Parramatta CBD · Western Sydney, NSW · Dharug Country',
  toStation: '600 m — a 7–8 minute walk from Parramatta Station',
  hub: 'Parramatta is Sydney’s second CBD and one of the best-connected transport hubs in Greater Sydney.',
  rail: 'Multiple train lines converge at Parramatta Station.',
  bus: 'Over 50 bus routes serve the area.',
} as const;

export interface SafetyPoint {
  point: string;
  flag: FlagKind;
}

// The school's FAQ asks the question; the answer below pairs the confirmed
// transport facts with the child-safe operating discipline I would run.
export const CAMPUS_SAFETY: { question: string; points: SafetyPoint[] } = {
  question: 'Will my child be safe getting to your campus?',
  points: [
    {
      point:
        'The campus sits 600 m — a 7–8 minute walk — from Parramatta Station, on well-trafficked CBD streets with signalised crossings.',
      flag: 'fact',
    },
    {
      point:
        'Parramatta’s converging train lines and 50+ bus routes mean most families have a direct, supervised public-transport option.',
      flag: 'fact',
    },
    {
      point:
        'Staff supervise a defined arrival and departure window at the entrance; the school day starts with breakfast, so early arrivals are accounted for.',
      flag: 'plan',
    },
    {
      point:
        'Every adult on site holds a current Working With Children Check and child-safe induction, under the NSW Child Safe Standards.',
      flag: 'plan',
    },
    {
      point:
        'A standardised travel-route briefing and a parent communication channel keep families informed of arrival, absence and any disruption.',
      flag: 'plan',
    },
  ],
};

// --- Fees (Vantage's own published pricing for the founding cohort) ----------
export interface FeeModel {
  label: string;
  amount: string;
  perYear: number;
  detail: string;
  flag: FlagKind;
}

export const FEES: FeeModel[] = [
  {
    label: 'Founding Families',
    amount: '$12,500',
    perYear: 12500,
    detail: 'Tuition per year for families who join us to commence in 2027.',
    flag: 'fact',
  },
  {
    label: 'Founding scholarship',
    amount: '$8,500',
    perYear: 8500,
    detail:
      'Up to 40 scholarship places for 2027 learners reduce the fee for these families to $8,500 per year.',
    flag: 'fact',
  },
];

export const FEES_NOTE =
  'Two pricing models for the founding (2027) cohort. Scholarship places are limited to 40 and reduce tuition by $4,000 a year.';

// How Vantage positions its fees (its own FAQ): competitive within greater
// Parramatta, with value carried by the staffing model rather than facilities.
export const FEES_POSITIONING = {
  summary:
    'Fees sit competitively within the greater Parramatta landscape — comparable to other academically oriented high schools, with the difference in what they buy.',
  value: [
    'A dedicated Murabbi: a personal coach holding academic progress, character and wellbeing as one responsibility — not a pastoral coordinator with a list of hundreds.',
    'A 1:15 educator-to-learner ratio, against a national average closer to 1:25.',
    'A personalised pathway: each learner gets a distinct profile and a coach invested in their growth from Year 7 to the HSC.',
  ],
} as const;

// --- Curriculum & accreditation (Vantage's own FAQ) -------------------------
// The reassurance that "no traditional subjects" does NOT mean "no syllabus":
// projects are backward-mapped to NESA outcomes and graded on the same A–E scale.
export const CURRICULUM_DELIVERY = {
  headline: 'No subjects on the timetable — but the full NSW syllabus is delivered, mapped and graded.',
  points: [
    'Every project is backward-mapped to NSW curriculum outcomes across English, Mathematics, Science, HSIE and Technology.',
    'The syllabus is fully delivered, and the same A–E grading scale is used as in any NSW school.',
    'Learners complete the HSC and receive an ATAR — the destination is unchanged; the journey is different.',
    'Personalised learning plans and a dedicated Murabbi mean no learner quietly underperforms without support.',
  ],
} as const;

// One day a week of self-directed passion projects (Vantage FAQ — wellbeing/learning).
export const SELF_DIRECTED =
  'One day each week, learners step away from structured projects to pursue a self-directed passion project — a genuine area of curiosity or interest.';

// --- "What's the risk?" — the assurance answer (Vantage's own FAQ) ----------
// A founding leader meets the risk question head-on: Vantage is an expansion of
// an established institution, and the pedagogy is evidence-backed.
export interface AssurancePoint {
  point: string;
  flag: FlagKind;
}

export const WHY_NOT_A_RISK: { question: string; answer: string; points: AssurancePoint[] } = {
  question: 'A brand-new school — what’s the risk?',
  answer:
    'Vantage is a deliberate expansion of an established institution, not an independent start-up — and project-based learning is evidence-backed.',
  points: [
    {
      point:
        'Built on nearly 20 years of institutional experience through Unity Grammar — established governance, systems and regulatory compliance.',
      flag: 'fact',
    },
    {
      point:
        'Project-based learning is evidence-backed: research links it to gains in academic achievement, engagement and motivation.',
      flag: 'fact',
    },
    {
      point:
        'PBL schools already operating in NSW report strong results — Vantage cites cohorts with nearly 30% of students achieving ATARs above 90.',
      flag: 'fact',
    },
    {
      point:
        'A 1:15 educator-to-learner ratio (against a ~1:25 national average) keeps high academic outcomes non-negotiable.',
      flag: 'fact',
    },
  ],
};

// --- Islamic ethos (Vantage's own FAQ: "Islam is the architecture") ---------
// The school is explicit that Islam is the lens the curriculum is built through,
// not a parallel subject. These are confirmed practices; the candidate's Ihsan
// Way overlay (niyyah/adab/iḥsān threaded through Manhal) builds on this base.
export const VANTAGE_SKILLS = {
  note: 'Across every project, learners are assessed on character competencies — not only academic outcomes.',
  competencies: [
    {
      name: 'Ethical Reasoning',
      detail: 'Weighing how learners think, design and decide against Islamic ethics and the public good.',
    },
    {
      name: 'Prophetic Character',
      detail: 'Adab and conduct modelled on prophetic example — taught, modelled and assessed, not assumed.',
    },
  ],
} as const;

export interface DeenPractice {
  name: string;
  arabic?: string;
  cadence: string;
  detail: string;
}

export const ISLAMIC_RHYTHM: DeenPractice[] = [
  {
    name: 'Qur’an Halaqa',
    cadence: 'Every morning',
    detail: 'The day opens with the Qur’an — dedicated, structured time for tilāwah, revision and adhkār.',
  },
  {
    name: 'Daily Prayer',
    arabic: 'Ṣalāh',
    cadence: 'Daily',
    detail: 'Dhuhr is formally scheduled into the timetable and prayed together in congregation.',
  },
  {
    name: 'Aqeedah Framework',
    cadence: 'Across the week',
    detail:
      'Islamic Studies is delivered through a coherent ʿaqīdah framework — a theological foundation learners can articulate, defend and live by.',
  },
  {
    name: 'Tarbiyah & Adab',
    cadence: 'Continuous',
    detail:
      'Character is cultivated and measured through Unity Grammar’s established frameworks; adab is taught, modelled and assessed, and growth shows up in the portfolio alongside academics.',
  },
  {
    name: 'Micro Ijāzāt',
    cadence: 'Once each term',
    detail:
      'A 3–5 day intensive where learners step out of the project cycle to study selected classical texts with qualified scholars, age- and stage-appropriate.',
  },
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
// Address and fees are now confirmed from Vantage's own channels and have moved
// out of this list into CAMPUS and FEES above.
export const VERIFY_NOTES: string[] = [
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
