import { STAGES, STREAMS, BUILDING_BLOCKS, SELF_DIRECTED } from '../data/vantage';
import { DAY_RHYTHM, KIND_TONE, LEARNING_SPINE } from '../data/journey';
import { AMAL_CHALLENGES } from '../data/manhal/projects';
import { Flag } from '../../components/Flag';

const STREAM_COLOR: Record<string, string> = {
  media: '#B26540',
  law: '#6C7D3C',
  tech: '#9A7B4F',
};

export default function LearningModel() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">The pedagogy</div>
        <h1 className="serif text-4xl text-itq">UXL — Unity Experiential Learning</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          Project-based learning + design thinking + Islamic pedagogy, mapped onto the NESA
          curriculum. No traditional subjects — learners work within a stream, and knowledge is
          earned in the service of real projects.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">UXL model — vantagebyunity.school</Flag>
          <Flag kind="fact">no traditional subjects</Flag>
          <Flag kind="proposed">Arabic overlay — The Ihsan Way</Flag>
        </div>
      </header>

      {/* Theory of change — the four building blocks */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="serif text-2xl text-itq">The theory of change — four building blocks</h2>
          <Flag kind="fact">Vantage model</Flag>
        </div>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          UXL isn&rsquo;t a timetable of subjects — it rests on four blocks that work together to
          form the graduate. The platform you&rsquo;re reading makes each one concrete and connected.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUILDING_BLOCKS.map((b) => (
            <div key={b.name} className="rounded-xl border border-sand bg-white p-5">
              <div className="text-2xl text-bronze">{b.icon}</div>
              <div className="serif text-lg text-itq mt-1">{b.name}</div>
              <p className="text-sm text-ink/70 mt-1">{b.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink/50 mt-3 max-w-3xl">
          This isn&rsquo;t experimental: project-based learning is evidence-backed for achievement and
          engagement, and PBL schools already operating in NSW report strong results — Vantage cites
          cohorts with nearly 30% of students achieving ATARs above 90.
        </p>
      </section>

      {/* UXL stages */}
      <section>
        <h2 className="serif text-2xl text-itq mb-3">Three stages, one rising arc</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {STAGES.map((s, i) => (
            <div key={s.id} className="rounded-xl border border-sand bg-white p-5 relative">
              <div className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-itq text-cream text-xs flex items-center justify-center">
                {i + 1}
              </div>
              <div className="text-xs text-bronze mt-2">{s.years}</div>
              <div className="serif text-2xl text-itq">{s.stage}</div>
              <div className="text-sm text-ink/70 mt-1">{s.mode}</div>
              <div className="mt-3 text-xs text-indigo-700 border-t border-sand pt-3">
                <span className="font-medium">{s.arabic}</span>
                <p className="mt-1 text-ink/60 normal-case">{s.overlay}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink/50 mt-2">
          Stage progression mirrors “stage not age” practice (e.g. Lindfield Learning Village, NSW) —
          progress by demonstrated mastery, inside NESA.
        </p>
      </section>

      {/* The spine */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">How it connects</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The platform makes one chain visible end-to-end: mastered knowledge unlocks a real project,
          the project produces portfolio evidence, and a coach holds the whole learner through it.
        </p>
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          {LEARNING_SPINE.map((el, i) => (
            <div key={el.key} className="flex items-stretch gap-2 flex-1">
              <div className="rounded-xl border border-sand bg-white p-4 flex-1">
                <div className="flex items-center gap-2">
                  <span className="serif text-lg text-itq">{el.arabic}</span>
                  <Flag kind={el.flag} />
                </div>
                <div className="text-[11px] uppercase tracking-wide text-bronze mt-0.5">
                  {el.english}
                </div>
                <p className="text-xs text-ink/70 mt-1">{el.gloss}</p>
              </div>
              {i < LEARNING_SPINE.length - 1 && (
                <div className="hidden md:flex items-center text-bronze text-xl">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* A day in Discovery */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">A day in Discovery (Years 7–8)</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="proposed">candidate daily rhythm</Flag>
          <span className="text-xs text-ink/50">
            many blocks confirmed (Full Meal Program, Qur&rsquo;an Halaqa, congregational Dhuhr, the
            Murabbi, micro-projects, city-as-campus); the hour-by-hour ordering is mine — timetable
            not yet published
          </span>
        </div>
        <div className="space-y-2">
          {DAY_RHYTHM.map((b) => (
            <div
              key={b.time}
              className="flex items-start gap-4 rounded-lg border border-sand bg-white p-3"
            >
              <div className="w-14 shrink-0 text-sm font-medium text-itq tabular-nums">{b.time}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ink">{b.title}</span>
                  <span
                    className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full border ${KIND_TONE[b.kind]}`}
                  >
                    {b.kind}
                  </span>
                  {b.role && <span className="text-[11px] text-ink/40">· {b.role}</span>}
                </div>
                <p className="text-sm text-ink/70 mt-0.5">{b.detail}</p>
              </div>
              <div className="shrink-0 pt-0.5">
                <Flag kind={b.flag} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-sand bg-sand/30 p-3 flex items-start gap-2">
          <Flag kind="fact" />
          <p className="text-sm text-ink/75">{SELF_DIRECTED}</p>
        </div>
      </section>

      {/* Micro-projects */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Discovery micro-projects</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="fact">Stage 4 = micro-projects</Flag>
          <Flag kind="plan">illustrative examples</Flag>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {AMAL_CHALLENGES.map((c) => {
            const stream = STREAMS.find((s) => s.id === c.stream);
            return (
              <div key={c.id} className="rounded-xl border border-sand bg-white p-5 space-y-2">
                <div
                  className="text-[11px] uppercase tracking-wide font-medium"
                  style={{ color: STREAM_COLOR[c.stream] }}
                >
                  {stream?.name ?? c.stream}
                </div>
                <div className="serif text-lg text-itq leading-snug">{c.title}</div>
                <p className="text-sm text-ink/70 italic">“{c.driving}”</p>
                <p className="text-sm text-ink/70">{c.summary}</p>
                <div className="text-xs text-ink/50 border-t border-sand pt-2 space-y-0.5">
                  <div>Partner: {c.partner}</div>
                  <div>Deliverable: {c.deliverable}</div>
                  <div>{c.weeks} weeks</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
