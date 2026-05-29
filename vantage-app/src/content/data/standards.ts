import type { FlagKind } from './vantage';

// ---------------------------------------------------------------------------
// EVIDENCE & STANDARDS — why Manhal is built the way it is. Sourced from
// research/02-comparators-and-manhal.md. Web content treated as data.
// ---------------------------------------------------------------------------

export interface Standard {
  acronym: string;
  name: string;
  role: string;
  body: string;
  flag: FlagKind;
}

export const STANDARDS: Standard[] = [
  {
    acronym: 'xAPI',
    name: 'Experience API + LRS',
    role: 'Evidence backbone',
    body: 'Activities emit Actor–Verb–Object statements (e.g. “student mastered outcome”) to a Learning Record Store — capturing in-app AND real-world project evidence. Ideal for PBL.',
    flag: 'fact',
  },
  {
    acronym: 'CASE',
    name: 'Competencies & Academic Standards Exchange',
    role: 'Outcome framework',
    body: 'Wrap NESA outcomes as a CASE framework with stable GUIDs — so the graph stays portable and versionable as syllabuses change.',
    flag: 'fact',
  },
  {
    acronym: 'OB 3.0',
    name: 'Open Badges 3.0',
    role: 'Portable credential',
    body: 'Issue a verifiable, portable badge when a learner completes a capstone — evidence that travels with them beyond the school.',
    flag: 'fact',
  },
  {
    acronym: 'Caliper',
    name: 'Caliper Analytics',
    role: 'Event profiles',
    body: 'Standardised learning-event profiles — a complement (or alternative) to xAPI for analytics.',
    flag: 'fact',
  },
];

export interface MasteryPlatform {
  name: string;
  model: string;
}

// How real platforms model mastery — the prior art Manhal learns from.
export const MASTERY_PLATFORMS: MasteryPlatform[] = [
  {
    name: 'Khan Academy',
    model: 'Per-skill levels Attempted → Familiar → Proficient → Mastered (0/50/80/100). Fixed outcome, variable time.',
  },
  {
    name: 'ALEKS',
    model: 'Knowledge Space Theory: models a “knowledge state” and what a learner is ready to learn next.',
  },
  {
    name: 'Knewton / Realizeit',
    model: 'Bind content to a semantic knowledge graph and adapt in real time.',
  },
  {
    name: 'Canvas / Moodle competency',
    model: 'Record per-outcome mastery — but do NOT natively model a prerequisite graph. That gap is Manhal’s in-house IP.',
  },
];

export interface BuildBuy {
  decision: 'Build (in-house IP)' | 'Buy / host' | 'Don’t build';
  items: string[];
  tone: string;
}

export const BUILD_VS_BUY: BuildBuy[] = [
  {
    decision: 'Build (in-house IP)',
    tone: 'border-itq bg-itq/5',
    items: [
      'The prerequisite graph + mastery-gating logic',
      'Portfolio (Athar) glue linking outcomes → artefacts',
      'Coaching dashboards across the four roles',
    ],
  },
  {
    decision: 'Buy / host',
    tone: 'border-bronze bg-bronze/5',
    items: [
      'LMS competency layer — Moodle (open-source) or Canvas',
      'Resource layer — CK-12 free standards-aligned content',
      'LRS for xAPI evidence — Learning Locker / Veracity',
    ],
  },
  {
    decision: 'Don’t build',
    tone: 'border-terra bg-terra/5',
    items: [
      'A custom adaptive engine (ALEKS / Knewton-class is out of reach)',
      'Bespoke video/content authoring at scale',
      'A proprietary credential standard (use Open Badges)',
    ],
  },
];

export interface Comparator {
  name: string;
  place: string;
  category: 'School' | 'NSW / Australia' | 'University';
  what: string;
  lesson: string;
}

export const COMPARATORS: Comparator[] = [
  {
    name: 'High Tech High',
    place: 'USA',
    category: 'School',
    what: 'Full PBL; public exhibitions of authentic products; integrated, team-taught projects; embedded college-access teams.',
    lesson: 'Pair public exhibitions with a dedicated HSC/university-access team so PBL never trades off tertiary entry.',
  },
  {
    name: 'Big Picture Learning',
    place: 'USA + Australia',
    category: 'School',
    what: '“One student at a time”: advisories, real-world internships (~2 days/week), a competency credential.',
    lesson: 'Advisory + community internships — a natural fit for an Islamic school’s community ties.',
  },
  {
    name: 'NuVu Studio',
    place: 'USA',
    category: 'School',
    what: 'Architecture-studio model: no courses/grades/bells; ~2-week intensives; ~12 students with 2 coaches; portfolio assessment.',
    lesson: 'Use the studio intensive + coaching pair as a periodic mode within the timetable.',
  },
  {
    name: 'Finland — phenomenon-based learning',
    place: 'Finland',
    category: 'School',
    what: 'National core curriculum mandates at least one multidisciplinary module each year.',
    lesson: 'Guarantee a cross-disciplinary unit every term, with explicit scaffolds for scoping.',
  },
  {
    name: 'Lindfield Learning Village',
    place: 'NSW (DoE)',
    category: 'NSW / Australia',
    what: '“Stage not age”: learners progress by demonstrated stage; transdisciplinary; K–12 hubs.',
    lesson: 'The strongest NSW proof that stage-based progression is operable within NESA — exactly Manhal’s gating.',
  },
  {
    name: 'Templestowe College',
    place: 'VIC',
    category: 'NSW / Australia',
    what: 'Student-led; 5-year individual learning plans; no year levels; “yes is the default.”',
    lesson: 'Individual learning plans + graduated agency — earn autonomy by demonstrating foundations.',
  },
  {
    name: 'Australian Science & Maths School',
    place: 'SA (Flinders campus)',
    category: 'NSW / Australia',
    what: 'Years 10–12 on a university campus; three interdisciplinary “Central Studies” mapped to SACE.',
    lesson: 'University partnership + senior interdisciplinary units mapped explicitly to the HSC.',
  },
  {
    name: 'Al-Hidayah · AIA Strathfield · Arkana',
    place: 'NSW (Islamic / independent)',
    category: 'NSW / Australia',
    what: 'Inquiry/PBL already live; Arkana runs Personal Interest Project exhibitions.',
    lesson: 'An exhibition / personal-project capstone is already culturally normalised in NSW Islamic schooling.',
  },
  {
    name: 'Minerva · Olin · Maastricht',
    place: 'Universities',
    category: 'University',
    what: 'Minerva: fully active learning. Olin: project-based engineering + e-portfolios. Maastricht: problem-based “seven-jump” tutorials since 1976.',
    lesson: 'Adopt the seven-jump as a teachable, repeatable PBL protocol; Minerva-style active-learning norms.',
  },
];
