import type { FlagKind } from './vantage';

// ---------------------------------------------------------------------------
// THE LEARNING JOURNEY — UXL stages (fact) + a [proposed] Discovery daily rhythm.
// Vantage publishes the model (Discovery/Mastery/Impact, micro-projects, Full
// Meal Program, city-as-campus) but not an hour-by-hour timetable; the rhythm
// below is my candidate design, grounded in the confirmed elements and flagged.
// ---------------------------------------------------------------------------

export interface JourneyBlock {
  time: string;
  title: string;
  kind: 'meal' | 'coaching' | 'knowledge' | 'project' | 'expedition' | 'prayer' | 'reflection';
  detail: string;
  role?: string; // which of the four educator roles leads
  flag: FlagKind;
}

// A representative Discovery-stage (Years 7–8) day. [proposed] structure.
export const DAY_RHYTHM: JourneyBlock[] = [
  {
    time: '8:00',
    title: 'Arrival & breakfast',
    kind: 'meal',
    detail: 'Full Meal Program — every learner starts the day fed and settled.',
    flag: 'fact',
  },
  {
    time: '8:30',
    title: 'Murabbi circle',
    kind: 'coaching',
    detail: 'Advisory check-in, goals for the day, and intention (niyyah). Small, consistent groups.',
    role: 'Learning Coaches',
    flag: 'proposed',
  },
  {
    time: '9:00',
    title: 'Manhal knowledge block',
    kind: 'knowledge',
    detail: 'Mastery-gated NESA outcomes. Learners move at their own pace; an outcome unlocks the next.',
    role: 'Competency Architects',
    flag: 'proposed',
  },
  {
    time: '10:30',
    title: 'Break & snack',
    kind: 'meal',
    detail: 'Snacks provided (Full Meal Program).',
    flag: 'fact',
  },
  {
    time: '10:45',
    title: '’Amal studio — micro-project',
    kind: 'project',
    detail: 'Hands-on work on the current stream micro-project, applying just-mastered outcomes.',
    role: 'Expedition Guides',
    flag: 'fact',
  },
  {
    time: '12:30',
    title: 'Lunch & Dhuhr',
    kind: 'prayer',
    detail: 'Hot lunch (Full Meal Program), then congregational prayer in the musalla.',
    flag: 'fact',
  },
  {
    time: '1:15',
    title: 'Expedition / Expert in Residence',
    kind: 'expedition',
    detail: 'City-as-campus fieldwork or a session with an industry mentor embedded in the project.',
    role: 'Experts in Residence',
    flag: 'fact',
  },
  {
    time: '2:45',
    title: 'Athar reflection',
    kind: 'reflection',
    detail: 'Capture evidence into the portfolio, reflect on iḥsān (doing it beautifully), and set tomorrow’s focus.',
    role: 'Learning Coaches',
    flag: 'proposed',
  },
];

export const KIND_TONE: Record<JourneyBlock['kind'], string> = {
  meal: 'bg-amber-50 border-amber-200 text-amber-800',
  coaching: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  knowledge: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  project: 'bg-orange-50 border-orange-200 text-orange-800',
  expedition: 'bg-sky-50 border-sky-200 text-sky-800',
  prayer: 'bg-teal-50 border-teal-200 text-teal-800',
  reflection: 'bg-violet-50 border-violet-200 text-violet-800',
};

// The connective tissue the platform makes visible: knowledge → project →
// portfolio, held by coaching. Arabic names are the [proposed] overlay.
export interface SpineElement {
  key: string;
  arabic: string;
  english: string;
  gloss: string;
  flag: FlagKind;
}

export const LEARNING_SPINE: SpineElement[] = [
  {
    key: 'manhal',
    arabic: 'Manhal',
    english: 'Knowledge graph',
    gloss: 'The spring of knowledge — every NESA outcome, mastery-gated in the right order.',
    flag: 'proposed',
  },
  {
    key: 'amal',
    arabic: '’Amal Challenge',
    english: 'Project',
    gloss: 'Real-world, industry-led work that applies mastered knowledge (“the city as campus”).',
    flag: 'fact',
  },
  {
    key: 'athar',
    arabic: 'Athar',
    english: 'Portfolio',
    gloss: 'The trace a learner leaves — artefacts, reflections and an Open Badge at capstone.',
    flag: 'proposed',
  },
  {
    key: 'murabbi',
    arabic: 'Murabbi',
    english: 'Coaching',
    gloss: 'The Learning Coach who nurtures the whole learner — connection over exam-drilling.',
    flag: 'proposed',
  },
];
