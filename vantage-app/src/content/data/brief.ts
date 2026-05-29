// ---------------------------------------------------------------------------
// ANSWERING THE BRIEF — the candidate's explicit, holistic response to the
// Head of School advertisement. The job ad invites "a creative or reflective
// artefact that offers insight into how [the candidate] approaches learning,
// leadership and purpose." This whole platform IS that artefact; the data below
// maps the ad's own language (responsibilities, candidate criteria, qualities)
// onto the concrete things built here, with links to the evidence module.
// Quotes are short paraphrases of the public advertisement.
// ---------------------------------------------------------------------------

/** A pointer to where in this platform a claim is demonstrated. */
export interface EvidenceLink {
  label: string;
  slug: string; // registry slug, linked as #/<slug>
}

/** One Core Responsibility from the ad, answered with built evidence. */
export interface ResponsibilityAnswer {
  responsibility: string; // paraphrased from the ad
  response: string; // how this artefact answers it
  evidence: EvidenceLink[];
}

export const RESPONSIBILITIES: ResponsibilityAnswer[] = [
  {
    responsibility: 'Lead the foundational design of the academic, operational and cultural framework.',
    response:
      'Rather than describe the framework, I prototyped its spine — the curriculum graph, the staffing and operating model, and the culture overlay — as working, connected modules.',
    evidence: [
      { label: 'Roadmap & operations', slug: 'roadmap' },
      { label: 'People & staffing', slug: 'people' },
      { label: 'Spaces & city campus', slug: 'spaces' },
    ],
  },
  {
    responsibility: 'Implement the integrated NESA curriculum through the UXL model.',
    response:
      'Manhal imports real NESA Stage-4 outcomes and gates mastery in the right order; the end-to-end thread shows a single outcome run through UXL into a real project and an Open Badge.',
    evidence: [
      { label: 'Manhal — knowledge graph', slug: 'manhal' },
      { label: 'The learning thread', slug: 'learning-thread' },
      { label: 'Evidence & standards', slug: 'evidence' },
    ],
  },
  {
    responsibility: 'Recruit, coach, mentor and inspire a founding team of innovative educators.',
    response:
      'A sequenced hiring ramp, role profiles for the four educator roles, and an onboarding programme that deliberately builds a coaching culture rather than a staffroom.',
    evidence: [
      { label: 'People & staffing', slug: 'people' },
      { label: 'Onboarding & training', slug: 'onboarding' },
      { label: 'Recruitment ramp', slug: 'roadmap' },
    ],
  },
  {
    responsibility: 'Forge strategic partnerships with universities, industry and civic institutions.',
    response:
      'A partnerships model with vetted Experts-in-Residence and the city-as-campus, wired directly into the projects so a partner is a learning surface, not a logo.',
    evidence: [
      { label: 'Industry partnerships', slug: 'partnerships' },
      { label: 'Spaces & city campus', slug: 'spaces' },
    ],
  },
  {
    responsibility: 'Shape a values-driven culture reflecting ihsan, creativity and spiritual depth.',
    response:
      'The Ihsan Way overlay — clearly flagged as my proposal, not school policy — threads niyyah, adab and iḥsān through the daily rhythm, the coaching lens and the portfolio.',
    evidence: [
      { label: 'UXL learning model', slug: 'learning-model' },
      { label: 'Murabbi (coach) lens', slug: 'dashboards' },
    ],
  },
  {
    responsibility: 'Represent Vantage publicly as a thought leader in educational transformation.',
    response:
      'This deployable artefact is itself the argument: a working prototype of the school’s spine, packaged so it can be shared, extended and stress-tested in the open.',
    evidence: [
      { label: 'Overview', slug: 'overview' },
      { label: 'How Manhal works', slug: 'manhal-anatomy' },
    ],
  },
];

/** A capability the ad names, mapped to where it is evidenced here. */
export interface CapabilityProof {
  capability: string;
  proof: string;
}

// "Qualifications and Capabilities" + "Personal Attributes", evidenced honestly.
export const CAPABILITY_PROOFS: CapabilityProof[] = [
  {
    capability: 'Expertise in emerging pedagogies (project-based, inquiry, experiential).',
    proof:
      'The whole model is PBL + design thinking + Islamic pedagogy, made operable: knowledge is earned in the service of real ’Amal Challenges.',
  },
  {
    capability: 'Ability to embed Islamic principles and ethics into educational design.',
    proof:
      'Iḥsān is the organising principle, not decoration — it shapes the rubric language, the coaching stance and what counts as a good artefact.',
  },
  {
    capability: 'Proven record of leading institutional innovation and reform.',
    proof:
      'Manhal is genuinely novel IP: a mastery graph on open standards (CASE / xAPI / Open Badges), built in-house with a tested gating engine.',
  },
  {
    capability: 'Systems-thinking mindset — translating vision into operational reality.',
    proof:
      'Vision is wired to operations: a registration-first roadmap, a costed budget shape, a hiring ramp, and role dashboards reading one evidence base four ways.',
  },
  {
    capability: 'Strategic foresight with operational clarity; resilience in ambiguity.',
    proof:
      'Risks are named with mitigations, facts are separated from plans with a flag system, and unknowns are stated rather than hidden.',
  },
];

/** The dimensions the brief weighs a candidate on — answered as a whole. */
export interface Dimension {
  name: string;
  claim: string;
  pointer: EvidenceLink;
}

export const DIMENSIONS: Dimension[] = [
  {
    name: 'Visionary',
    claim:
      'A coherent picture of the graduate — the Smart Muslim Creative — and a model that actually forms them, held to honestly across every view.',
    pointer: { label: 'See the graduate vision', slug: 'overview' },
  },
  {
    name: 'Innovation',
    claim:
      'Manhal: an in-house mastery knowledge graph on open standards — distinctive IP, not a re-skinned LMS, with a clear build-vs-buy discipline.',
    pointer: { label: 'See Manhal & standards', slug: 'evidence' },
  },
  {
    name: 'Systems thinking',
    claim:
      'Vision translated to operational reality — a tested engine, a live syllabus importer, and the same evidence surfaced to four different roles.',
    pointer: { label: 'See the learning thread', slug: 'learning-thread' },
  },
  {
    name: 'Management & founding',
    claim:
      'A staged path from appointment to first HSC: NESA registration first, a hiring ramp, the shape of the budget, and risks carried openly.',
    pointer: { label: 'See the roadmap', slug: 'roadmap' },
  },
  {
    name: 'Faith & ihsan',
    claim:
      'Iḥsān — excellence in service to learners and humanity — as the principle that organises pedagogy, coaching and the portfolio, not a veneer on top.',
    pointer: { label: 'See the model', slug: 'learning-model' },
  },
];

// The school's public child-safety commitment (paraphrased from the ad), kept
// front-and-centre because a founding leader leads on it first.
export const CHILD_SAFETY =
  'Vantage and Unity Grammar hold a zero-tolerance stance on child abuse and are committed to acting in children’s best interests and keeping them safe from harm. As founding leader I would stand up the child-safe framework — WWCC, induction and WHS — before a single student walks in.';
