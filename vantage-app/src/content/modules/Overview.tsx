import { SCHOOL, STAGES, STREAMS, EDUCATOR_ROLES, FEES, GRADUATE_VISION } from '../data/vantage';
import { Flag } from '../../components/Flag';

export default function Overview() {
  const glance: [string, string][] = [
    ['Opens', SCHOOL.opens],
    ['Model', SCHOOL.model],
    ['Credentials', SCHOOL.credentials],
    ['Campus', 'Parramatta CBD · 7-min walk from the station'],
    ['Fees', `${FEES[0].amount}/yr · scholarships ${FEES[1].amount}`],
    ['Wellbeing', SCHOOL.meals],
    ['Educators', '4 roles · Mentor & Coach'],
    ['Class ratio', `${SCHOOL.ratio} educator-to-learner`],
    ['Operator', `${SCHOOL.parent.name} · ${SCHOOL.parent.ceo}`],
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-bronze">
          {SCHOOL.operator} · {SCHOOL.location}
        </div>
        <h1 className="serif text-4xl text-itq">{SCHOOL.name}</h1>
        <p className="text-lg text-ink/80">{SCHOOL.oneLine}</p>
        <div className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          [proposed] {SCHOOL.proposedFramework} — {SCHOOL.proposedNote}
        </div>
      </header>

      <section>
        <h2 className="serif text-2xl text-itq mb-3">Vantage at a glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {glance.map(([k, v]) => (
            <div key={k} className="rounded-lg border border-sand bg-white p-4">
              <div className="text-[11px] uppercase tracking-wide text-ink/50">{k}</div>
              <div className="text-sm font-medium mt-1">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="serif text-2xl text-itq">The graduate we&rsquo;re forming</h2>
          <Flag kind="fact">Vantage purpose</Flag>
        </div>
        <div className="rounded-xl border border-itq/20 bg-itq/[0.03] p-5">
          <div className="serif text-2xl text-itq">
            The {GRADUATE_VISION.archetype}
          </div>
          <p className="text-sm text-ink/70 mt-1 max-w-3xl">
            &mdash; {GRADUATE_VISION.definition}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {GRADUATE_VISION.qualities.map((q) => (
              <div key={q.name} className="rounded-lg border border-sand bg-white p-3">
                <div className="text-sm font-medium text-itq">{q.name}</div>
                <p className="text-xs text-ink/60 mt-1">{q.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/50 mt-4 border-t border-sand pt-3 max-w-3xl">
            <span className="uppercase tracking-wide text-bronze">Mission · </span>
            {GRADUATE_VISION.mission}.
          </p>
        </div>
      </section>

      <section>
        <h2 className="serif text-2xl text-itq mb-3">The journey — UXL stages</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {STAGES.map((s) => (
            <div key={s.id} className="rounded-lg border border-sand bg-white p-4">
              <div className="text-xs text-bronze">{s.years}</div>
              <div className="serif text-xl text-itq">{s.stage}</div>
              <div className="text-sm mt-1">{s.mode}</div>
              <div className="text-xs text-indigo-700 mt-2">
                [proposed] {s.arabic}: {s.overlay}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="serif text-2xl text-itq mb-3">Three specialisation streams</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {STREAMS.map((s) => (
            <div key={s.id} className="rounded-lg border border-sand bg-white p-4">
              <div className="text-2xl" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div className="font-medium mt-1">{s.name}</div>
              <div className="text-sm text-ink/70 mt-1">{s.detail}</div>
              <div className="text-xs text-indigo-700 mt-2">[proposed] {s.ihsan}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="serif text-2xl text-itq mb-3">Educators — the four roles</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {EDUCATOR_ROLES.map((r) => (
            <div key={r.name} className="rounded-lg border border-sand bg-white p-4">
              <div className="font-medium">
                {r.name}
                {r.overlay &&
                  (r.overlayFlag === 'fact' ? (
                    <span className="text-xs text-olive"> · {r.overlay}</span>
                  ) : (
                    <span className="text-xs text-indigo-700"> · [proposed] {r.overlay}</span>
                  ))}
              </div>
              <div className="text-sm text-ink/70 mt-1">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
