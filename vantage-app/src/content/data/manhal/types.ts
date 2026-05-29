// ---------------------------------------------------------------------------
// MANHAL — core type contracts for the mastery knowledge graph.
// Production-true shapes: outcomes ≈ CASE, evidence ≈ xAPI, badges ≈ Open Badges.
// ---------------------------------------------------------------------------

import type { FlagKind } from '../vantage';

export type Bloom = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
export type Stage = 'Stage4' | 'Stage5' | 'Stage6';
export type MasteryStatus = 'locked' | 'available' | 'in_progress' | 'proficient' | 'mastered';
export type StreamId = 'media' | 'law' | 'tech';

export interface Resource {
  type: 'video' | 'text' | 'task' | 'interactive' | 'reading' | 'dataset' | 'worked-example';
  title: string;
  url?: string;
  modality: string;
  /** Commodity content we buy/host rather than build (CK-12, Desmos, ABS, Khan…). */
  provider?: string;
  /** Indicative time-on-task in minutes. */
  minutes?: number;
  /** Provenance of the resource itself (plan = candidate-designed, fact = sourced). */
  flag?: FlagKind;
}

// ---- Rich "piece" anatomy ---------------------------------------------------
// A Manhal piece is more than a node: it carries a learning-design payload so it
// can stand alone as the primary source of theoretical knowledge for an outcome.

/** One accreditation/standards alignment. `framework` names a real standard and
 *  `flag` preserves fact-discipline: `nesa` = a verified NESA outcome, `fact` = a
 *  real external framework, `verify` = code indicative pending a formal import. */
export interface StandardRef {
  framework: 'NESA' | 'ACARA' | 'NNLP' | 'GeneralCapability' | 'CASE' | 'OpenBadges';
  code: string; // e.g. "MA4-FRC-C-01", "AC9M7N…", "InF", "Numeracy"
  descriptor: string; // what the standard requires (paraphrased — no long quotes)
  flag: FlagKind;
}

/** A Manhal piece runs its own mini learning cycle, mirroring UXL's rhythm, so a
 *  "piece" is a guided experience, not just a checkbox before a quiz. */
export type LearningPhase = 'Explore' | 'Build' | 'Apply' | 'Demonstrate';

export interface LearningStep {
  phase: LearningPhase;
  title: string;
  detail: string;
  minutes?: number;
  resourceTitles?: string[]; // ties a step back to specific Resource.title entries
}

/** An artefact the learner must produce to evidence mastery of THIS piece.
 *  `evidences` lists the standard codes it proves; `capturedAs` is the xAPI shape;
 *  `toPortfolio` means it also surfaces in the learner's Athar portfolio. */
export interface MasteryArtefact {
  name: string;
  kind: 'quiz' | 'task' | 'reflection' | 'media' | 'code' | 'dataset' | 'presentation';
  prompt: string;
  evidences: string[]; // standard codes (e.g. MA4-DAT-C-02) this artefact proves
  capturedAs: string; // xAPI shorthand, e.g. "completed → outcome (scaled 0–1)"
  toPortfolio: boolean;
}

/** One band of the proficiency rubric. The mastery gate sits at `proficient`. */
export interface RubricLevel {
  level: 'emerging' | 'developing' | 'proficient' | 'extending';
  descriptor: string;
}

/** One node per NESA syllabus outcome. `caseId` mirrors a CASE GUID for portability. */
export interface OutcomeNode {
  id: string; // NESA-style outcome code
  caseId: string; // CASE framework GUID (standards-portable)
  title: string;
  description: string;
  stage: Stage;
  kla: string; // Key Learning Area, e.g. "Mathematics"
  stream?: StreamId;
  bloom: Bloom;
  resources: Resource[];
  masteryCheck: { type: string; threshold: number }; // e.g. threshold 0.8
  feedsProjects: string[]; // ’Amal Challenge ids this outcome enables

  // ---- Rich payload (optional; present on fully-authored exemplar pieces) ----
  // Every node carries the structural minimum above. Exemplars additionally carry
  // the full learning-design payload below — proper name, standards, sequence,
  // artefacts, rubric, badge — so a reviewer can open one piece and see exactly
  // how Manhal serves as the primary source of theoretical knowledge.
  /** Human-facing unit name, e.g. "Money Sense — Fractions, Decimals & Percentages". */
  unitName?: string;
  /** Manhal's own stable piece code (distinct from the NESA caseId), e.g. "MNL-NUM-04". */
  manhalCode?: string;
  /** The hook a learner meets first. */
  essentialQuestion?: string;
  /** Why this piece matters and where it leads. */
  rationale?: string;
  /** Indicative hours to proficiency. */
  estimatedHours?: number;
  /** Plain-language prior knowledge (complements the prerequisite edges). */
  priorKnowledge?: string[];
  /** Accreditation alignment — verified NESA outcome + other real frameworks. */
  standards?: StandardRef[];
  /** The in-piece learning cycle (Explore → Build → Apply → Demonstrate). */
  learningSequence?: LearningStep[];
  /** Artefacts the learner produces to prove mastery; these flow into Athar. */
  masteryArtefacts?: MasteryArtefact[];
  /** Proficiency rubric; the mastery gate sits at the `proficient` band. */
  rubric?: RubricLevel[];
  /** Open Badge 3.0 minted when the piece (or its capstone) is mastered. */
  badge?: string;
  /** Illustrative xAPI statements this piece emits to the LRS. */
  xapiExamples?: XapiStatement[];
}

export interface GraphEdge {
  from: string;
  to: string;
  type: 'prerequisite' | 'related';
}

// ---- Evidence (xAPI-shaped) -------------------------------------------------
export type XapiVerb = 'attempted' | 'completed' | 'mastered' | 'submitted' | 'observed';

export interface XapiStatement {
  actor: { id: string; name: string };
  verb: XapiVerb;
  object: { id: string; type: 'outcome' | 'project' | 'artefact' };
  result?: { score?: { scaled: number }; success?: boolean };
  context?: { coachId?: string; projectId?: string };
  timestamp: string;
}

// ---- ’Amal Challenges (projects) -------------------------------------------
/** A real-world, industry-led project. Unlocks when its required outcomes are
 *  proficient+. Required outcomes are derived from each node's `feedsProjects`. */
export interface AmalChallenge {
  id: string;
  title: string;
  stream: StreamId;
  stage: Stage;
  driving: string; // the driving question
  summary: string;
  partner: string; // Expert in Residence / industry partner
  deliverable: string; // the Athar artefact produced
  weeks: number;
}

// ---- Athar (portfolio) ------------------------------------------------------
/** An evidence artefact in the learner's portfolio (Athar). Open Badge at capstone. */
export interface PortfolioArtefact {
  id: string;
  studentId: string;
  projectId: string;
  title: string;
  kind: 'document' | 'media' | 'code' | 'presentation' | 'prototype' | 'fieldwork';
  outcomes: string[]; // outcome ids this artefact evidences
  reflection: string; // learner reflection (adab / iḥsān)
  date: string;
  badge?: string; // Open Badge 3.0 awarded at capstone
}

// ---- Murabbi (coaching) -----------------------------------------------------
export interface CoachNote {
  id: string;
  studentId: string;
  coach: string; // Learning Coach / Murabbi
  date: string;
  focus: 'wellbeing' | 'mastery' | 'project' | 'goal';
  note: string;
}

// ---- Personas (synthetic; no real PII) -------------------------------------
export interface Persona {
  id: string;
  name: string;
  year: 7 | 8;
  stream: StreamId;
  blurb: string;
}
