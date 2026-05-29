import { SCHOOL, STAGES, STREAMS, EDUCATOR_ROLES } from '../data/vantage';

export default function Overview() {
  const glance: [string, string][] = [
    ['Opens', SCHOOL.opens],
    ['Model', SCHOOL.model],
    ['Credentials', SCHOOL.credentials],
    ['Educators', '4 roles · Mentor & Coach'],
    ['Wellbeing', SCHOOL.meals],
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
                {r.overlay && (
                  <span className="text-xs text-indigo-700"> · [proposed] {r.overlay}</span>
                )}
              </div>
              <div className="text-sm text-ink/70 mt-1">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
