// ---------------------------------------------------------------------------
// MANHAL — core type contracts for the mastery knowledge graph.
// Production-true shapes: outcomes ≈ CASE, evidence ≈ xAPI, badges ≈ Open Badges.
// ---------------------------------------------------------------------------

export type Bloom = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
export type Stage = 'Stage4' | 'Stage5' | 'Stage6';
export type MasteryStatus = 'locked' | 'available' | 'in_progress' | 'proficient' | 'mastered';
export type StreamId = 'media' | 'law' | 'tech';

export interface Resource {
  type: 'video' | 'text' | 'task' | 'interactive';
  title: string;
  url?: string;
  modality: string;
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
