# Comparators & the Manhal Mastery Knowledge-Graph (Deliverables E + C-input)

> Compiled 2026-05-29. Web content treated as untrusted **data**.
> Tags: **FACT** = documented · **ELSEWHERE** = practice at a named school/platform · **REC** = recommendation for a NESA/HSC-bound Islamic PBL school.

## Part 1 — Comparator schools & pedagogy

- **High Tech High (US)** — full PBL; public exhibitions of authentic products; integrated team-taught projects; embedded college-access teams. A lottery-based Harvard study (2015) found ~+10.9pt four-year-college enrolment. **REC:** adopt public exhibitions + a dedicated HSC/university-access team so PBL doesn't trade off tertiary entry. (hightechhigh.org; dash.harvard.edu/handle/1/23519639)
- **Big Picture Learning / Met (US + Australia)** — "one student at a time": advisories, real-world internships (~2 days/week), competency credential; runs locally as **Big Picture Education Australia**. **REC:** advisory + community internships — natural fit for an Islamic school's community ties. (aurora-institute.org; education-reimagined.org; link.springer.com/article/10.1007/s44217-024-00148-0)
- **NuVu Studio (US)** — architecture-studio model; no courses/grades/bells; ~2-week intensives; ~12 students with 2 coaches; portfolio + narrative assessment. **REC:** use the studio intensive + coaching pair as a periodic mode. (nuvuschool.org; kqed.org/mindshift/35232)
- **Finland — phenomenon-based learning** — core curriculum mandates ≥1 multidisciplinary module/year. **REC:** guarantee a cross-disciplinary unit each term with explicit scaffolds for scoping. (teachermagazine.com)
- **Lindfield Learning Village (NSW DoE)** — **"stage not age"**: progress by demonstrated stage; transdisciplinary; K–12 hubs. **REC:** the strongest NSW proof that stage-based progression is operable within NESA — directly relevant to Manhal's mastery-gating. (2ser.com; schoolinfrastructure.nsw.gov.au …Lindfield-Learning-Village_Education-Model.pdf)
- **Templestowe College (VIC)** — student-led; 5-year individual learning plans; no year levels; "yes is the default." **REC:** individual learning plans + graduated student agency (earn autonomy by demonstrating foundations). (hundred.org)
- **Australian Science & Maths School (SA)** — Yr 10–12 on Flinders campus; three interdisciplinary "Central Studies" mapped to SACE. **REC:** university partnership + senior interdisciplinary units mapped explicitly to HSC. (asms.sa.edu.au; en.wikipedia.org)
- **NSW Islamic/independent PBL** — inquiry/PBL already live: Al-Hidayah; Australian International Academy (Strathfield); Arkana College (Personal Interest Project exhibitions). **REC:** an exhibition/personal-project capstone is already culturally normalised. (strathfield.aia.nsw.edu.au; arkana.nsw.edu.au)
- **Universities** — *Minerva* (fully active learning, Socratic Forum, sessions recorded for feedback); *Olin* (project-based engineering, e-portfolio competency tracking); *Maastricht* (problem-based "seven-jump" tutorials since 1976). **REC:** adopt the seven-jump as a teachable repeatable PBL protocol; Minerva-style active-learning norms. (amacad.org; olin.edu; maastrichtuniversity.nl)

## Part 2 — Mastery knowledge-graph architecture for **Manhal**

**How real platforms model mastery (FACT/ELSEWHERE).**
- *Khan Academy* — per-skill levels Attempted→Familiar→Proficient→Mastered (0/50/80/100; <70% drops a level); fixed outcome, variable time.
- *ALEKS* — Knowledge Space Theory models a "knowledge state" + "what they're ready to learn next" (~25–30 item diagnostic).
- *Knewton (Alta)* / *Realizeit* — bind content to a semantic **knowledge graph** and adapt in real time (UCF reported higher pass rates with Realizeit).
- *CK-12* — free standards-aligned FlexBooks + adaptive practice → usable resource layer.

**LMS competency layers (FACT).** Canvas **Outcomes + Learning Mastery Gradebook** and Moodle **Competency frameworks** record per-outcome mastery — but **do not** natively model a *prerequisite graph*.

**Standards to build on (1EdTech / ADL).**
- **xAPI + LRS** — the evidence backbone: activities emit Actor–Verb–Object statements (e.g., *student / mastered / outcome*) to a Learning Record Store; captures **in-app and real-world/project** evidence — ideal for PBL. (xapi.com)
- **CASE** — exchange/version competency frameworks with stable IDs → **wrap NESA outcomes as a CASE framework**.
- **Open Badges 3.0** — portable credentials for mastered nodes/capstones.
- **Caliper Analytics** — standardised learning-event profiles (alternative/complement to xAPI).

**Educational knowledge graphs (FACT).** Research models concepts as nodes with **directed prerequisite edges** + **undirected semantic edges**, plus resource-to-concept mapping; prerequisite-ordered study improves success. (jedm.educationaldatamining.org)

### REC — practical Manhal data model (one node per NESA outcome)
- **Node:** `outcome_id` (NESA code), title, **Bloom level**, stage, status.
- **Edges:** `prerequisite_of` (directed; gates unlock) + `related_to` (semantic).
- **Resources:** `[{type: video|text|task, url, modality}]`.
- **Mastery check:** linked assessment + **threshold** (e.g., ≥80% to "proficient"; gate at "mastered").
- **Evidence/attempt records:** **xAPI statements in an LRS** — every attempt, project artefact, coach observation, timestamped.
- **Portfolio link:** each mastered node references the artefact(s) evidencing it → student portfolio; issue an **Open Badge** at capstone.

### REC — build vs buy (small school, modest budget)
- **Don't** custom-build an adaptive engine (ALEKS/Knewton-class is out of reach).
- **Buy/host commodity layers:** an LMS competency layer (**Moodle** open-source, or Canvas) for outcomes + gradebook; **CK-12** for free resources; an open-source/affordable **LRS** (Learning Locker / Veracity) for xAPI evidence.
- **Build lightly:** the **prerequisite graph + mastery gating + portfolio glue** as a thin app over those standards — store NESA outcomes as CASE, write xAPI to the LRS, surface unlock logic + the coaching dashboard. Keeps the distinctive IP (graph + PBL evidence) in-house while standards keep you portable.

> Caveat: HTH / Big Picture / Realizeit-UCF outcome figures come from program-affiliated or single-study sources — directionally useful, not guarantees.
