# Vantage by Unity — System Design / Architecture (Deliverable L)

> Produced via `/system-design`, 2026-05-29. Pragmatic for a solo builder → small team.
> This is the architecture for **the product**: a board-ready interactive **showcase + working prototype** of the Vantage learning system, with **Manhal** as the backbone.

## 1. What this product is (scope)
- A **deployable web application** that presents deliverables **A–L** as living, interactive modules, and **demonstrates Manhal** (the mastery knowledge graph) with realistic **synthetic** data and four role dashboards.
- It is a **candidate pitch artifact + working prototype**, NOT a production Student Information System. Therefore: **no real student PII**, all personas/evidence are synthetic, no real auth. It is architected so it *could* migrate to the real standards-based backend later (§11).
- Replaces the single-file `index.html` proof-of-concept with a real, component-based, type-safe build.

## 2. Requirements
**Functional**
- Modules A–L, each a self-contained, navigable section with sources + fact-flags.
- **Manhal**: interactive knowledge graph (nodes = NESA outcomes; edges = prerequisite/related), node detail (Bloom, resources, mastery check), mastery-gating simulation, and the visible chain **knowledge → ’Amal Challenge → Athar portfolio → Murabbi coaching**.
- **Role dashboards**: student / coach / parent / leadership over shared demo data.
- **Real spine vs candidate overlay**: Vantage facts are factual; "The Ihsan Way" is flagged `[proposed]`.
- Board-pack **exports** (PDF + PPTX) retained.
- Fact-flag system: `FACT · PRACTICE · PLAN · PROPOSED · VERIFY · NESA · NSW$`.

**Non-functional**
- **Static/edge deployable** (GitHub Pages / Vercel / Cloudflare Pages), CDN-fast, zero server to run.
- **Maintainable**: typed, component-based, testable pure logic for the Manhal engine.
- **Extensible content**: adding/editing a deliverable = editing a data/MDX module + registry entry.
- Solo-buildable now; legible to a small team later.
- Accessible (keyboard, contrast), responsive.

## 3. Recommended stack (decisions + trade-offs)
| Concern | Choice | Why / trade-off |
|---|---|---|
| Framework | **Vite + React 18 + TypeScript** | Keeps existing React knowledge; real build + types; static output deploys anywhere. (vs Next.js: SSR overkill for a private static artifact; vs Astro: heavy interactivity (graph/dashboards) favours an SPA.) |
| Styling | **Tailwind CSS** (earth-tone tokens) | Carry the current design language; fast, consistent. |
| Routing | **React Router (HashRouter)** | Works on *any* static host incl. Pages project sub-paths with no server rewrites. (Trade-off: `#` URLs; fine for a pitch artifact.) |
| Knowledge graph | **React Flow (`@xyflow/react`)** | Purpose-built for interactive node/edge graphs (prereq edges, custom nodes, pan/zoom). (vs cytoscape: heavier; vs hand-rolled D3: more work.) |
| Charts | **Recharts** | React-native, declarative; cleaner than imperative Chart.js. |
| State | **Zustand** (tiny) | For the active demo persona + simulated Manhal progress. Minimal boilerplate. |
| Content | **TypeScript data modules + MDX** for narrative | Structured data for graph/dashboards; MDX for prose-heavy deliverables. |
| Exports | **jsPDF + jspdf-autotable**, **PptxGenJS** | Already proven in the prototype. |
| Tests | **Vitest** for the Manhal engine (pure functions) | The gating logic is the IP — unit-test it. |
| CI/Deploy | **GitHub Actions → GitHub Pages** initially | Free, repo already live. Vercel as one-click upgrade (connector available). |

## 4. Information architecture (nav → deliverables)
1. **Overview** — pitch landing: Vantage at a glance (real spine), `[proposed]` approach banner, readiness/health, KPIs *(A + B summary)*
2. **The School** — Vantage factual dossier: identity, 3 streams, UXL stages, 4 educator roles, parent org, sources *(B)*
3. **The Learning Model** — pedagogy; UXL Discovery/Mastery/Impact; The Ihsan Way `[proposed]`; comparator evidence *(A + E)*
4. **Manhal** — interactive knowledge graph + node detail + gating; the knowledge→project→portfolio→coaching chain; architecture & build-vs-buy *(C)*
5. **Student Journey** — day-in-the-life by stage; Y7–8 micro-projects; timetable shapes; coaching cadence *(D)*
6. **Dashboards** — student / coach / parent / leadership over Manhal demo data *(C)*
7. **Spaces** — space program + indicative floorplate; **City-as-Campus** Parramatta map *(F + G)*
8. **People** — staffing & recruitment; FTE; NSW salary bands; org chart *(H)*
9. **Onboarding & Training** — educator training, coach-the-coach, PBL cert, fidelity rubric *(I)*
10. **Partnerships** — industry MOU pack, mentor governance, stream matching *(J)*
11. **Roadmap & Finance** — build plan, schedule, budget, critical path to 2027 + NESA *(K)*
12. **Evidence & Sources** — research dossiers, fact-flag legend, assumptions register

## 5. Data models (core types)
```ts
// ---- Manhal graph ----
type Bloom = 'remember'|'understand'|'apply'|'analyze'|'evaluate'|'create';
type Stage = 'Stage4'|'Stage5'|'Stage6';
type MasteryStatus = 'locked'|'available'|'in_progress'|'proficient'|'mastered';
type StreamId = 'media'|'law'|'tech';

interface OutcomeNode {
  id: string;            // NESA outcome code, e.g. "MA4-ARI-01"
  caseId: string;        // CASE GUID (standards-portable)
  title: string; description: string;
  stage: Stage; kla: string; stream?: StreamId;
  bloom: Bloom;
  resources: Resource[];
  masteryCheck: { type: string; threshold: number };  // e.g. 0.8
  feedsProjects: string[];   // ’Amal Challenge ids
}
interface Resource { type:'video'|'text'|'task'|'interactive'; title:string; url?:string; modality:string; }
interface Edge { from:string; to:string; type:'prerequisite'|'related'; }

// ---- Evidence (xAPI-shaped) ----
interface XapiStatement {
  actor:{ id:string; name:string };
  verb:'attempted'|'completed'|'mastered'|'submitted'|'observed';
  object:{ id:string; type:'outcome'|'project'|'artefact' };
  result?:{ score?:{ scaled:number }; success?:boolean };
  context?:{ coachId?:string; projectId?:string };
  timestamp:string;
}

// ---- Athar portfolio ----
interface PortfolioArtefact {
  id:string; studentId:string; projectId:string;
  title:string; type:'doc'|'media'|'build'|'reflection';
  evidencesOutcomes:string[]; coachFeedback?:CoachNote[]; badgeId?:string; // Open Badge at capstone
}
interface CoachNote { coachId:string; role:CoachRole; date:string; note:string; }
type CoachRole = 'LearningCoach'|'ExpeditionGuide'|'CompetencyArchitect'|'ExpertInResidence';

// ---- ’Amal Challenge (project) ----
interface AmalChallenge {
  id:string; title:string; stream:StreamId; stage:Stage;
  drivingQuestion:string; industryPartner?:string;
  outcomes:string[]; phase:'launch'|'build'|'exhibition';
  cityAsCampusSites?:string[];
}

// ---- Personas (synthetic) ----
interface Student { id:string; name:string; stage:Stage; stream:StreamId; advisoryId:string; }

// ---- Content registry ----
interface DeliverableModule {
  id:'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L';
  slug:string; title:string; group:string;
  component: React.LazyExoticComponent<React.ComponentType>;
  sources: Source[]; flags: FlagKind[];
}
```

## 6. The Manhal engine (in-house IP — pure functions, tested)
`lib/manhalEngine.ts`: given `(nodes, edges, evidence[])` compute per-node **status** (a node is `available` only when all `prerequisite` parents are `mastered`), **% coverage** by stage/KLA, **next-best nodes**, and **project-readiness** (a ’Amal Challenge unlocks when its required outcomes reach `proficient`). This is the "thin app over standards" — the distinctive logic, fully unit-tested with Vitest. Dashboards + the graph render off its output.

## 7. Component / folder structure
```
vantage-app/
  index.html  vite.config.ts  tailwind.config.ts  tsconfig.json
  src/
    main.tsx  App.tsx                 // HashRouter + Layout
    registry.ts                       // deliverables A–L
    theme.ts                          // earth-tone tokens
    layout/   Sidebar Topbar Flag SourceList Section ProposedBanner
    components/
      manhal/   KnowledgeGraph NodeDetail MasteryBar StatusPill
      dash/     StudentDash CoachDash ParentDash LeadershipDash DashCard
      viz/      Donut BarTrend Timeline Gantt FloorplateDiagram CityMap OrgChart
      shared/   FeatureCard StreamChip ExportButtons KpiTile
    content/
      data/   vantage.ts streams.ts journey.ts spaces.ts cityCampus.ts
              staffing.ts salaryBands.ts partnerships.ts roadmap.ts budget.ts
              manhal/  graph.ts evidence.ts personas.ts projects.ts portfolio.ts
      modules/  Overview School LearningModel Manhal StudentJourney
                Dashboards Spaces People Onboarding Partnerships Roadmap Evidence (.tsx/.mdx)
    lib/   manhalEngine.ts  xapi.ts  exportPdf.ts  exportPptx.ts
    lib/__tests__/ manhalEngine.test.ts
```

## 8. Content system (each deliverable = a living module)
- A deliverable is a **data module** (typed) + a **view** (`.tsx` or `.mdx`) + a **registry entry** (id, slug, group, sources, flags).
- The sidebar/nav is generated from `registry.ts` → adding a module is a one-line registry change + the files.
- Prose-heavy deliverables (onboarding, partnerships, roadmap narrative) use **MDX** so content edits don't touch logic. Data-heavy ones (Manhal, dashboards, budget) use typed data + components.
- Every claim renders through `<Flag>` + `<SourceList>` so factual provenance is always visible.

## 9. Standards mapping (demo now → real later)
- **CASE**: `OutcomeNode.caseId` mirrors a CASE GUID so NESA outcomes are portable to/from a real CASE service.
- **xAPI**: `XapiStatement` shape matches the Experience API; in the prototype these are seeded JSON; in production they POST to an LRS (Learning Locker/Veracity).
- **Open Badges 3.0**: `PortfolioArtefact.badgeId` issues at capstone.
- This means the demo's data shapes are **production-true**, easing migration.

## 10. Deployment
- `vite build` → static `dist/`. **Base path** = `/school-project/` for the existing Pages repo, or `/` for a custom domain / Vercel.
- **Initial**: GitHub Actions builds on push to `main` and publishes `dist/` to Pages.
- **Upgrade path**: Vercel (preview deploys per PR, custom domain) — connector available; one import.
- HashRouter avoids any host-side rewrite config. *(All deploys require explicit user authorization.)*

## 11. Scale / "as it grows" (path to the real system)
When/if this becomes the school's actual platform:
- Add **auth (SSO)** + **RBAC** for the four dashboards; introduce real **PII** handling under NSW privacy obligations.
- Swap seeded data for: **Moodle/Canvas** competency layer (outcomes + gradebook), **CK-12** resources, a hosted **LRS** for xAPI, and a **CASE** service for NESA frameworks.
- Keep the **Manhal engine** (graph + gating + portfolio glue) as the in-house core; everything else is a commodity integration. Static front-end → add a thin API/edge layer (Cloudflare Workers + D1/KV available) only when real data demands it.

## 12. Security & privacy (by design)
- **Synthetic data only**; no real students, no credentials, no financial/ID data — consistent with safety constraints and correct for a public pitch artifact.
- No third-party calls that leak data; all assets local/CDN. Cookie-free.

## 13. Build phases
1. **Scaffold** Vite+React+TS+Tailwind; layout shell + sidebar from registry; theme tokens; deploy pipeline (no publish yet).
2. **Spine data**: port corrected Vantage facts (UXL stages, 4 roles, streams) + research data into typed modules; Overview + School + Learning Model + Evidence modules.
3. **Manhal core**: graph data (a real Stage-4 outcome slice) + engine + KnowledgeGraph + NodeDetail + tests.
4. **Dashboards** (4 roles) + personas/evidence/projects/portfolio demo data.
5. **Journey, Spaces, People, Onboarding, Partnerships, Roadmap & Finance** modules.
6. **Exports** (PDF/PPTX), polish, a11y, responsive.
7. **Verify** (headless) → **deploy** (with authorization).

## 14. Skills to create (`/skill-creator`) + connectors
- **`vantage-platform`** (build-conventions skill): stack, design tokens, fact-flag system, the content-module + registry pattern, the Manhal data contracts — so any future session extends the app consistently. *(Create after scaffold, when there's a concrete pattern to encode.)*
- Candidate future skills: **`nesa-outcome-importer`** (syllabus → Manhal nodes), **`board-pack-export`** (standardised PDF/PPTX), **`deploy-static-site`**.
- **Connectors**: GitHub (repo/CI) already in use; **Vercel** (deploy) available; **Cloudflare** (Workers/D1/KV) reserved for the future real-data layer. All connector/deploy actions gated on explicit user authorization.

## 15. Decisions made (defaults; revisable) & open items
- **Chosen**: Vite+React+TS+Tailwind · HashRouter · React Flow · Recharts · Zustand · MDX content · Vitest · new folder `vantage-app/` (old `index.html` left intact until parity) · Pages-first deploy.
- **Open (will proceed with default unless redirected)**: final host (Pages vs Vercel) — *default Pages*; whether the new app **replaces** the live site at parity or lives at a sub-path — *default: replace at parity, after sign-off*; how much real NESA Stage-4 outcome data to seed — *default: one rich KLA slice (e.g., Mathematics Stage 4) + sampled others*.
```
