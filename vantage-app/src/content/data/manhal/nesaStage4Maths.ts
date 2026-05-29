// ---------------------------------------------------------------------------
// NESA SYLLABUS SOURCE — NSW Mathematics K–10 Syllabus (2022), Stage 4.
//
// This is the REAL import source the Manhal graph is seeded from. Every code
// below is a VERIFIED NESA Stage 4 Mathematics outcome (NSW Curriculum, 2022),
// confirmed against curriculum.nsw.edu.au and a verbatim outcomes compilation.
// Descriptors are short (≤15-word) paraphrases — NESA's full outcome text is
// copyright, so we never reproduce it verbatim; we map to the code instead.
//
// What is fact vs authored:
//   • code, focusArea, strand            → VERIFIED NESA facts.
//   • descriptor                          → our short paraphrase of the outcome.
//   • bloom                               → our pedagogical mapping.
//   • prerequisites                       → AUTHORED locally — NESA does not encode
//                                           a learning order; the prerequisite DAG
//                                           is Manhal's own design (the value-add).
//
// The importer (src/lib/nesaImport.ts) turns this source into OutcomeNodes +
// GraphEdges, CASE-shaped, so the graph survives syllabus changes: re-import to
// refresh. Buy/host the commodity content; the graph + gating is the in-house IP.
// ---------------------------------------------------------------------------

import type { Bloom, Stage } from './types';

export type NesaStrand =
  | 'Working mathematically'
  | 'Number and algebra'
  | 'Measurement and space'
  | 'Statistics and probability';

export interface NesaOutcome {
  /** Real NESA outcome code, e.g. "MA4-RAT-C-01". */
  code: string;
  /** Real focus-area name from the syllabus. */
  focusArea: string;
  strand: NesaStrand;
  /** ≤15-word paraphrase of the outcome — not NESA's verbatim text (copyright). */
  descriptor: string;
  /** Pedagogical Bloom mapping (authored, not from NESA). */
  bloom: Bloom;
  /** Prerequisite outcome codes — authored locally; NESA encodes no order. */
  prerequisites?: string[];
}

export interface NesaSyllabusSource {
  framework: string;
  stage: Stage;
  kla: string;
  authority: string;
  retrieved: string; // ISO date the source list was verified
  outcomes: NesaOutcome[];
}

// All 18 verified Stage 4 Mathematics outcomes (17 stage-specific + the
// cross-strand Working-mathematically outcome). Codes are real; the
// prerequisite layer is Manhal's authored design.
export const NESA_STAGE4_MATHS_SOURCE: NesaSyllabusSource = {
  framework: 'NSW Mathematics K–10 Syllabus (2022)',
  stage: 'Stage4',
  kla: 'Mathematics',
  authority: 'NESA · NSW Curriculum (curriculum.nsw.edu.au)',
  retrieved: '2026-05-29',
  outcomes: [
    // ---- Working mathematically (applies across every strand) ----
    {
      code: 'MAO-WM-01',
      focusArea: 'Working mathematically',
      strand: 'Working mathematically',
      descriptor: 'Develops fluency by exploring, connecting, applying and communicating mathematical reasoning.',
      bloom: 'apply',
    },

    // ---- Number and algebra ----
    {
      code: 'MA4-INT-C-01',
      focusArea: 'Computation with integers',
      strand: 'Number and algebra',
      descriptor: 'Compares, orders and calculates with positive and negative integers.',
      bloom: 'apply',
    },
    {
      code: 'MA4-FRC-C-01',
      focusArea: 'Fractions, decimals and percentages',
      strand: 'Number and algebra',
      descriptor: 'Represents and operates with fractions, decimals and percentages to solve problems.',
      bloom: 'apply',
      prerequisites: ['MA4-INT-C-01'],
    },
    {
      code: 'MA4-RAT-C-01',
      focusArea: 'Ratios and rates',
      strand: 'Number and algebra',
      descriptor: 'Solves ratio and rate problems and analyses distance–time graphs.',
      bloom: 'analyze',
      prerequisites: ['MA4-FRC-C-01'],
    },
    {
      code: 'MA4-ALG-C-01',
      focusArea: 'Algebraic techniques',
      strand: 'Number and algebra',
      descriptor: 'Generalises number properties to manipulate, expand and factorise algebraic expressions.',
      bloom: 'understand',
      prerequisites: ['MA4-INT-C-01'],
    },
    {
      code: 'MA4-IND-C-01',
      focusArea: 'Indices',
      strand: 'Number and algebra',
      descriptor: 'Operates with primes, roots and positive/zero indices; establishes the index laws.',
      bloom: 'apply',
      prerequisites: ['MA4-INT-C-01', 'MA4-ALG-C-01'],
    },
    {
      code: 'MA4-EQU-C-01',
      focusArea: 'Equations',
      strand: 'Number and algebra',
      descriptor: 'Solves linear equations of up to two steps and simple quadratics.',
      bloom: 'apply',
      prerequisites: ['MA4-ALG-C-01'],
    },
    {
      code: 'MA4-LIN-C-01',
      focusArea: 'Linear relationships',
      strand: 'Number and algebra',
      descriptor: 'Creates and graphs linear relationships to solve problems on the plane.',
      bloom: 'analyze',
      prerequisites: ['MA4-ALG-C-01', 'MA4-FRC-C-01'],
    },

    // ---- Measurement and space ----
    {
      code: 'MA4-LEN-C-01',
      focusArea: 'Length',
      strand: 'Measurement and space',
      descriptor: 'Applies perimeter of plane shapes and circumference of circles to problems.',
      bloom: 'apply',
      prerequisites: ['MA4-INT-C-01'],
    },
    {
      code: 'MA4-PYT-C-01',
      focusArea: "Right-angled triangles (Pythagoras)",
      strand: 'Measurement and space',
      descriptor: "Applies Pythagoras' theorem to solve problems in many contexts.",
      bloom: 'apply',
      prerequisites: ['MA4-IND-C-01', 'MA4-LEN-C-01'],
    },
    {
      code: 'MA4-ARE-C-01',
      focusArea: 'Area',
      strand: 'Measurement and space',
      descriptor: 'Applies area and composite area of triangles, quadrilaterals and circles.',
      bloom: 'apply',
      prerequisites: ['MA4-LEN-C-01', 'MA4-FRC-C-01'],
    },
    {
      code: 'MA4-VOL-C-01',
      focusArea: 'Volume',
      strand: 'Measurement and space',
      descriptor: 'Applies volume and capacity of right prisms and cylinders to problems.',
      bloom: 'apply',
      prerequisites: ['MA4-ARE-C-01'],
    },
    {
      code: 'MA4-ANG-C-01',
      focusArea: 'Angle relationships',
      strand: 'Measurement and space',
      descriptor: 'Applies angle relationships, including transversals on parallel lines, to problems.',
      bloom: 'understand',
      prerequisites: ['MA4-INT-C-01'],
    },
    {
      code: 'MA4-GEO-C-01',
      focusArea: 'Properties of geometrical figures',
      strand: 'Measurement and space',
      descriptor: 'Identifies and applies properties of triangles and quadrilaterals to solve problems.',
      bloom: 'understand',
      prerequisites: ['MA4-ANG-C-01'],
    },

    // ---- Statistics and probability ----
    {
      code: 'MA4-DAT-C-01',
      focusArea: 'Data classification and visualisation',
      strand: 'Statistics and probability',
      descriptor: 'Classifies and displays data using a variety of graphical representations.',
      bloom: 'understand',
      prerequisites: ['MA4-FRC-C-01'],
    },
    {
      code: 'MA4-DAT-C-02',
      focusArea: 'Data analysis',
      strand: 'Statistics and probability',
      descriptor: 'Analyses simple datasets using measures of centre, range and shape.',
      bloom: 'evaluate',
      prerequisites: ['MA4-DAT-C-01'],
    },
    {
      code: 'MA4-PRO-C-01',
      focusArea: 'Probability',
      strand: 'Statistics and probability',
      descriptor: 'Solves problems involving the probabilities of simple chance experiments.',
      bloom: 'analyze',
      prerequisites: ['MA4-FRC-C-01'],
    },
  ],
};

/** Strand display order for grouped rendering. */
export const NESA_STRAND_ORDER: NesaStrand[] = [
  'Working mathematically',
  'Number and algebra',
  'Measurement and space',
  'Statistics and probability',
];
