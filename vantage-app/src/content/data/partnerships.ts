import type { FlagKind } from './vantage';

// ---------------------------------------------------------------------------
// INDUSTRY, UNIVERSITY & CIVIC PARTNERSHIPS — who powers "the city as campus"
// and "Experts in Residence", and how MOUs / mentor governance work.
// Sourced from research/04-staffing-training-partnerships.md (PARTNERSHIPS) and
// research/03-spaces-and-city-campus.md (real Parramatta anchors).
// Convention: the institution's existence is a [fact]; the partnership / MOU
// design is a [plan]; governance norms are [practice]. Web content = data.
// ---------------------------------------------------------------------------

// Streams reuse the model's three lanes; 'all' = relevant across streams.
export type PartnerStream = 'media' | 'law' | 'tech' | 'all';

// Stream accent colours (mirror STREAMS in vantage.ts) for use in the module.
export const STREAM_COLOR: Record<PartnerStream, string> = {
  media: '#B26540',
  law: '#6C7D3C',
  tech: '#9A7B4F',
  all: '#8A6A2F', // bronze-ish, for cross-stream partners
};

export const STREAM_LABEL: Record<PartnerStream, string> = {
  media: 'Media, Comms & Creative Arts',
  law: 'Law, Government & Systems',
  tech: 'Tech Innovation & Enterprise',
  all: 'Cross-stream',
};

export interface PartnerCategory {
  name: string;
  kind: string; // category of partner, e.g. "University", "Cultural institution"
  stream: PartnerStream;
  whatTheyOffer: string; // mentoring / site visits / real briefs / data
  flag: FlagKind; // institution = fact; the partnership itself is a plan
}

// Real Parramatta anchors (each institution = fact); a Vantage MOU with any of
// them is a [plan] — aspirational and not yet confirmed.
export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    name: 'Western Sydney University — Parramatta City',
    kind: 'University',
    stream: 'all',
    whatTheyOffer:
      'Tertiary mentoring, campus visits, enterprise & STEM expertise, a pathway that lifts university aspiration across all three streams.',
    flag: 'fact',
  },
  {
    name: 'Powerhouse Parramatta',
    kind: 'Cultural institution',
    stream: 'media',
    whatTheyOffer:
      'Studios, exhibition halls and a demonstration kitchen for design, applied science and media briefs; a public venue for student exhibitions.',
    flag: 'fact',
  },
  {
    name: 'Riverside Theatres',
    kind: 'Cultural institution',
    stream: 'media',
    whatTheyOffer:
      'Performing-arts and production-tech mentoring, rehearsal and staging space, and real audiences for creative work.',
    flag: 'fact',
  },
  {
    name: 'Parramatta Justice Precinct',
    kind: 'Justice / Government',
    stream: 'law',
    whatTheyOffer:
      'Court visits, legal-system mentoring and authentic civics briefs to anchor the moot-court and advocacy work (access is pre-booked, protocol-bound).',
    flag: 'fact',
  },
  {
    name: 'City of Parramatta Council',
    kind: 'Justice / Government',
    stream: 'law',
    whatTheyOffer:
      'Local-government and civics partners, precinct-planning briefs, and a route for students to engage real community decision-making.',
    flag: 'fact',
  },
  {
    name: 'NAB & Westpac (Parramatta finance cluster)',
    kind: 'Industry / Finance',
    stream: 'tech',
    whatTheyOffer:
      'Work-integrated learning, finance, data and AI mentoring, and authentic enterprise briefs from an anchor employer cluster.',
    flag: 'fact',
  },
  {
    name: 'Western Sydney startups & incubators',
    kind: 'Industry / Tech',
    stream: 'tech',
    whatTheyOffer:
      'Founder mentoring, venture briefs and product critique to power entrepreneurship capstones — partners curated case by case.',
    flag: 'plan',
  },
  {
    name: 'Westmead health & innovation precinct',
    kind: 'Health / Science',
    stream: 'tech',
    whatTheyOffer:
      'Health-science and biomedical mentoring and research exposure (clinical-area access is restricted; one rail stop away).',
    flag: 'fact',
  },
];

export interface MouTerm {
  term: string;
  description: string;
  flag: FlagKind;
}

// What a school–partner MOU covers. The MOU instrument is a [plan]; the
// safeguarding obligations it must encode are NSW [fact].
export const MOU_TERMS: MouTerm[] = [
  {
    term: 'Shared purpose & scope',
    description:
      'Why we partner and exactly what is in scope — which stream(s), what activities (mentoring, site visits, briefs, data) — so expectations stay concrete.',
    flag: 'plan',
  },
  {
    term: 'Duration & review cadence',
    description:
      'A set term with a fixed review point and a clean exit, so the partnership is renewed deliberately and survives staff turnover.',
    flag: 'plan',
  },
  {
    term: 'Child-safe & WWCC requirements',
    description:
      'Every mentor with child-related contact holds a verified Working With Children Check and follows the school Child Safe code — a non-negotiable NSW requirement.',
    flag: 'fact',
  },
  {
    term: 'Supervision & duty of care',
    description:
      'Off-site learning runs under documented supervision and a risk assessment; the school’s duty of care is never delegated to a venue or volunteer.',
    flag: 'fact',
  },
  {
    term: 'IP & consent for student work',
    description:
      'Who owns what students create, and explicit consent before any student work, image or data is published or reused by a partner.',
    flag: 'plan',
  },
  {
    term: 'Insurance & risk',
    description:
      'Confirmed insurance cover on both sides plus WHS responsibilities for any on-site or off-site activity.',
    flag: 'plan',
  },
  {
    term: 'Named coordinators',
    description:
      'A named contact on each side — the school’s partnerships lead and the partner’s sponsor — so accountability is clear.',
    flag: 'plan',
  },
];

export interface OnboardingStep {
  step: string;
  detail: string;
  flag: FlagKind;
}

// Bringing an Expert in Residence on board — ordered. WWCC verification and
// child-safe induction are NSW [fact]; the pack and co-design rhythm are [plan].
export const MENTOR_ONBOARDING: OnboardingStep[] = [
  {
    step: 'WWCC verification',
    detail:
      'Verify the mentor’s NSW Working With Children Check via the OCG portal before any contact with students — a hard gate, no exceptions.',
    flag: 'fact',
  },
  {
    step: 'Child-safe induction',
    detail:
      'A short induction to the school’s Child Safe code, mandatory-reporting duties and code of conduct, aligned to the NSW Child Safe Standards.',
    flag: 'fact',
  },
  {
    step: 'Mentor pack',
    detail:
      'A concise pack: the project brief, what’s expected of a mentor, and the PBL / Gold Standard basics so industry experts can coach confidently.',
    flag: 'plan',
  },
  {
    step: 'Project brief co-design',
    detail:
      'The mentor and the Expedition Guide co-design an authentic, stream-aligned brief and the success criteria before students begin.',
    flag: 'plan',
  },
  {
    step: 'In-project coaching',
    detail:
      'The mentor coaches students through the project under teacher supervision, modelling real professional practice and critique.',
    flag: 'plan',
  },
  {
    step: 'Debrief & register',
    detail:
      'A short debrief captures what worked, and the partnership is logged on the partnerships register for review and reporting to the Head.',
    flag: 'plan',
  },
];
