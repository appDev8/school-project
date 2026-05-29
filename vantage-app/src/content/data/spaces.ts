import type { FlagKind } from './vantage';

// ---------------------------------------------------------------------------
// SPACES & CITY-AS-CAMPUS — Deliverables F (learning-space design) + G
// (Parramatta city-as-campus). Sourced from
// research/03-spaces-and-city-campus.md. Web content treated as data.
//
// Area figures are INDICATIVE from published design sources and must be
// confirmed against the live NSW EFSG Room Data Sheets and a Class 9b BCA /
// fire-egress assessment before any architect brief. They are flagged
// accordingly so a reviewer can tell a standard from a design choice.
// ---------------------------------------------------------------------------

export type StreamTag = 'media' | 'law' | 'tech' | 'all';

// --- The learning-space programme -----------------------------------------

export interface SpaceType {
  name: string;
  // Area guidance — either a per-student rate or an absolute footprint.
  area: string;
  // What governs the figure: a per-student metric vs an absolute room size.
  basis: 'per student' | 'absolute' | 'per FTE' | 'per seat' | 'per worshipper';
  note: string;
  flag: FlagKind;
}

export const SPACE_TYPES: SpaceType[] = [
  {
    name: 'Learning studios (GLS)',
    area: '~2.0–2.5 m²/student',
    basis: 'per student',
    note: 'Home of the cohort: ~50–65 m² for ~26 learners, opening onto a shared commons. Glazing and movable walls keep sightlines for supervision.',
    flag: 'practice',
  },
  {
    name: 'Learning commons',
    area: '~80–120 m²',
    basis: 'absolute',
    note: 'Shared breakout heart for 100–120 students with 4–6 teachers — sink, power, storage, soft and standing seating. The social glue between studios.',
    flag: 'practice',
  },
  {
    name: 'Makerspace / fabrication',
    area: '~5.6 m²/student',
    basis: 'per student',
    note: '~140–150 m² for 25. Zoned "clean" (electronics, design) vs "dirty/wet" (cutting, 3D print) with dust and fume extraction. Anchors the Tech stream.',
    flag: 'practice',
  },
  {
    name: 'Media / creative-arts studio',
    area: '~80–110 m²',
    basis: 'absolute',
    note: 'Acoustic isolation, blackout, and a green-screen / recording alcove. Serves the Media, Communications & Creative Arts stream.',
    flag: 'practice',
  },
  {
    name: 'Science / innovation lab',
    area: '~85–95 m²',
    basis: 'absolute',
    note: 'EFSG science hub pattern: theory GLS + lab (benches, sinks, fume cupboard, safety shower) + prep + chemical store, with direct lab-to-prep access required.',
    flag: 'nesa',
  },
  {
    name: 'Moot court / law space',
    area: '~70–90 m²',
    basis: 'absolute',
    note: 'Flat-floor and reconfigurable — bench, bar and jury — pairing with the Parramatta justice precinct. Anchors the Law, Government & Institutional Systems stream.',
    flag: 'plan',
  },
  {
    name: 'Exhibition / presentation hall',
    area: '~250–400 m²',
    basis: 'absolute',
    note: 'Double-height space for whole-cohort PBL exhibitions; doubles as assembly. Sited near the public entry for after-hours community use.',
    flag: 'practice',
  },
  {
    name: 'Advisory / home-base rooms',
    area: '~30–45 m²',
    basis: 'absolute',
    note: 'Calm base for ~15-student advisories — the pastoral anchor of each day.',
    flag: 'practice',
  },
  {
    name: 'Musalla (prayer space) + wudu',
    area: '~0.8–1.0 m²/worshipper',
    basis: 'per worshipper',
    note: 'Jumu’ah peak governs sizing (~480–600 m² at 600 students, or split by gender / overflow into the hall). Wudu ~1 station per 40–60 users, drainage separated from the prayer floor, gendered access, qibla orientation, shoe storage.',
    flag: 'proposed',
  },
  {
    name: 'Commercial kitchen',
    area: '~0.5–0.7 m²/seat',
    basis: 'per seat',
    note: 'For the whole-school Full Meal Program — min ~20 m²; ~120–150 m² for sittings of ~200. Built to NSW food-premises fit-out, grouped with wet services.',
    flag: 'fact',
  },
  {
    name: 'Dining hall',
    area: '~1.0–1.4 m²/seat',
    basis: 'per seat',
    note: 'Communal dining for the Full Meal Program — ~280–360 m² for sittings of ~200, aisles ≥2 m. A shared table is core to the school’s wellbeing offer.',
    flag: 'fact',
  },
  {
    name: 'Wellbeing / counselling',
    area: '~12–16 m²',
    basis: 'absolute',
    note: 'Acoustically private with a discreet second egress, sited near the pastoral hub. Buffered from noisy zones.',
    flag: 'practice',
  },
  {
    name: 'Staff collaboration',
    area: '~8–10 m²/FTE',
    basis: 'per FTE',
    note: 'Open planning plus focus rooms — workroom and meeting included — with sightlines to the commons. Staff wellbeing is part of the brief, not an afterthought.',
    flag: 'practice',
  },
];

// --- The NSW / Australian standards basis ----------------------------------

export interface DesignStandard {
  acronym: string;
  name: string;
  governs: string;
  flag: FlagKind;
}

export const DESIGN_STANDARDS: DesignStandard[] = [
  {
    acronym: 'EFSG',
    name: 'Educational Facilities Standards & Guidelines (NSW DoE)',
    governs:
      'The NSW benchmark for school built works — room sizes, Room Data Sheets and required adjacencies. Organises secondary schools into "hubs" (general learning, science, food & textiles, hall + canteen), each a cluster of learning spaces plus breakout and support.',
    flag: 'fact',
  },
  {
    acronym: 'NCC Class 9b',
    name: 'National Construction Code — assembly buildings',
    governs:
      'School teaching buildings are classified Class 9b (assembly), driving fire-egress, occupant-load and life-safety provisions. Boarding, were it added, would be Class 3.',
    flag: 'fact',
  },
  {
    acronym: 'AS 1428',
    name: 'Design for access and mobility',
    governs:
      'Accessibility across circulation, thresholds, sanitary facilities and wayfinding — so every learning space is usable by all students and visitors.',
    flag: 'fact',
  },
  {
    acronym: 'AS/NZS 2107:2016',
    name: 'Acoustics — recommended design sound levels',
    governs:
      'Basis of EFSG acoustic guidance (DG11): classroom reverberation around 0.5–0.6 s, so speech stays intelligible in open and agile settings.',
    flag: 'fact',
  },
  {
    acronym: 'NESA registration',
    name: 'Non-government school premises registration',
    governs:
      'Non-government schools register their premises with NESA — the registration lens through which the facilities brief must ultimately pass.',
    flag: 'nesa',
  },
];

// --- Floorplate logic (build-to-endstate, stage the fit-out) ---------------

export interface FloorLevel {
  level: string;
  role: string;
  spaces: string;
  flag: FlagKind;
}

export const FLOOR_LEVELS: FloorLevel[] = [
  {
    level: 'Ground',
    role: 'Public / shared',
    spaces:
      'Entry, admin, hall / exhibition, commercial kitchen + dining, musalla + wudu, and the makerspace (heavy services, yard access).',
    flag: 'plan',
  },
  {
    level: 'Level 1',
    role: 'Specialist',
    spaces: 'Science / innovation labs, media / arts studio, moot court, and the library / commons.',
    flag: 'plan',
  },
  {
    level: 'Level 2',
    role: 'Cohort + staff',
    spaces: 'Learning studios, advisory home-bases, wellbeing, and staff collaboration.',
    flag: 'plan',
  },
];

// --- Parramatta city-as-campus (real assets) -------------------------------

export interface CityAsset {
  name: string;
  // Existence of the asset is a fact; partnership use is a design plan.
  streams: StreamTag[];
  enables: string;
  access?: string;
  flag: FlagKind;
}

export const CITY_ASSETS: CityAsset[] = [
  {
    name: 'Western Sydney University — Parramatta City & Rydalmere',
    streams: ['tech', 'all'],
    enables:
      'A 14-storey vertical campus (~10,000 students, mainly business) plus the southern Rydalmere site — enterprise and entrepreneurship, STEM mentoring, and tertiary aspiration.',
    flag: 'plan',
  },
  {
    name: 'Powerhouse Parramatta',
    streams: ['media', 'tech', 'all'],
    enables:
      '~30,000 m² of museum: 7 exhibition halls, a 900-seat theatre, cinema, a 200-seat demonstration kitchen and artist studios — design, applied science, food and media.',
    access: 'Opens late 2026.',
    flag: 'plan',
  },
  {
    name: 'Parramatta Justice Precinct',
    streams: ['law'],
    enables:
      "Children's Court, Sydney West Trial Courts, DCJ, Legal Aid and DPP — live anchors for the moot court, civics and legal history.",
    access: 'Court visits need pre-booking and protocols.',
    flag: 'plan',
  },
  {
    name: 'Parramatta Park + Old Government House (UNESCO)',
    streams: ['media', 'law', 'all'],
    enables:
      'National Trust runs curriculum-linked, object-based programs on a World Heritage site — history, First Nations perspectives, heritage and ecology.',
    flag: 'plan',
  },
  {
    name: 'Riverside Theatres',
    streams: ['media'],
    enables:
      'A future lyric, playhouse, black-box and cinema with rehearsal space — performing arts and production technology.',
    access: 'Redevelopment from late 2026.',
    flag: 'plan',
  },
  {
    name: 'City of Parramatta Council',
    streams: ['law', 'all'],
    enables: 'Civics and local government in action — precinct planning and how a city actually runs.',
    flag: 'plan',
  },
  {
    name: 'Westmead health & innovation precinct',
    streams: ['tech'],
    enables:
      'Westmead and Children’s Hospitals plus research institutes — health science and biomedical learning.',
    access: 'One rail stop / light rail away; clinical-area restrictions apply.',
    flag: 'plan',
  },
  {
    name: 'NAB & Westpac (finance / tech cluster)',
    streams: ['tech', 'law'],
    enables:
      'NAB (~6,000 staff at 3 Parramatta Square) and Westpac anchor a ~17,000-job finance cluster — work-integrated learning, data / AI, and finance and enterprise mentoring.',
    flag: 'plan',
  },
];

// --- How city-as-campus is governed (NSW Excursions Policy) -----------------

export interface ExcursionPrinciple {
  point: string;
  flag: FlagKind;
}

export const EXCURSION_PRINCIPLES: ExcursionPrinciple[] = [
  {
    point:
      'Every outing runs under the NSW Excursions Policy: a documented risk assessment and management plan approved before departure, with signed parent consent and medical information.',
    flag: 'fact',
  },
  {
    point:
      'Supervision is set by the risk assessment, not a single fixed ratio — meeting a numeric ratio alone "may not be adequate".',
    flag: 'fact',
  },
  {
    point:
      'The school’s duty of care cannot be delegated to venues or volunteers; mandatory reporting applies throughout.',
    flag: 'fact',
  },
  {
    point:
      'Exploit CBD walkability for low-risk, high-frequency micro-excursions: standardise routes and embark / disembark headcounts.',
    flag: 'plan',
  },
  {
    point:
      'Vet venue and partner staff against the Child Safe Standards and WWCC; schedule recurring sites once a year to streamline repeat risk assessments.',
    flag: 'plan',
  },
];
