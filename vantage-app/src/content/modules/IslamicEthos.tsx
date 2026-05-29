import { VANTAGE_SKILLS, ISLAMIC_RHYTHM, STREAMS, SCHOOL } from '../data/vantage';
import { Flag } from '../../components/Flag';

// ---------------------------------------------------------------------------
// ISLAMIC ETHOS — Vantage's own answer to "how Islamic is this, really?". The
// school is explicit that Islam is the lens the curriculum is built through, not
// a parallel subject. These are confirmed facts (Vantage Skills, the daily/termly
// rhythm); the candidate's "Ihsan Way" overlay builds on them and is flagged.
// ---------------------------------------------------------------------------

export default function IslamicEthos() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">The ethos</div>
        <h1 className="serif text-4xl text-itq">Islam as the architecture</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          The fair question a family asks is whether the faith is genuine or a label. Vantage&rsquo;s
          answer is unambiguous: Islam is not a subject running alongside the &ldquo;real&rdquo;
          curriculum — it is the lens the curriculum is designed through, so every project is
          approached through Islamic reasoning, ethics and purpose.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">Vantage ethos — vantagebyunity.school</Flag>
          <Flag kind="proposed">The Ihsan Way overlay</Flag>
        </div>
      </header>

      {/* Vantage Skills — character assessed, not assumed */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="serif text-2xl text-itq">Character is assessed, not assumed</h2>
          <Flag kind="fact">Vantage Skills framework</Flag>
        </div>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">{VANTAGE_SKILLS.note}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {VANTAGE_SKILLS.competencies.map((c) => (
            <div key={c.name} className="rounded-xl border border-itq/20 bg-itq/[0.03] p-5">
              <div className="serif text-lg text-itq">{c.name}</div>
              <p className="text-sm text-ink/70 mt-1.5">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The deen rhythm */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">How the deen is woven into the day</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Not bolted on — built in. These are the school&rsquo;s confirmed rhythms, from the first
          minutes of the morning to a termly retreat into classical scholarship.
        </p>
        <div className="space-y-3">
          {ISLAMIC_RHYTHM.map((p) => (
            <div
              key={p.name}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 rounded-xl border border-sand bg-white p-4"
            >
              <div className="sm:w-28 shrink-0">
                <div className="text-[10px] uppercase tracking-widest text-bronze">{p.cadence}</div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-itq">{p.name}</span>
                  {p.arabic && <span className="text-sm text-ink/50">· {p.arabic}</span>}
                  <Flag kind="fact" />
                </div>
                <p className="text-sm text-ink/70 mt-1">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Ihsan Way overlay — candidate proposal */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="serif text-2xl text-itq">{SCHOOL.proposedFramework} — my overlay</h2>
          <Flag kind="proposed">candidate proposal</Flag>
        </div>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The school already owns a deep Islamic architecture. What I would add is an operating
          discipline that makes iḥsān <em>measurable</em> inside the learning system — carried in the
          rubric language, the coaching stance and the portfolio, and kept clearly distinct from
          school policy. Each stream gets an explicit ihsan lens:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {STREAMS.map((s) => (
            <div key={s.id} className="rounded-xl border border-sand bg-white p-5">
              <div className="text-2xl" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div className="font-medium mt-1">{s.name}</div>
              <div className="text-xs text-indigo-700 mt-2">[proposed] {s.ihsan}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="rounded-xl border-l-2 border-itq bg-itq/[0.04] p-5">
        <p className="text-sm text-ink/75">
          The distinction the school draws is the one I would protect: the deen isn&rsquo;t layered on
          top of the curriculum — the curriculum grows from it. An honest artefact has to treat it the
          same way, which is why the faith here is structural, never decoration.
        </p>
      </section>
    </div>
  );
}
