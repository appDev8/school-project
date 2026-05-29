import {
  ROADMAP_PHASES,
  HIRING_SEQUENCE,
  GROWTH_MODEL,
  GROWTH_ENDSTATE,
  WORKSTREAMS,
  BUDGET_SHAPE,
  RISKS,
} from '../data/roadmap';
import { Flag } from '../../components/Flag';

export default function Roadmap() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">From appointment to first HSC</div>
        <h1 className="serif text-4xl text-itq">The road to opening — and beyond</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          The Head of School commences in the July 2026 design &amp; launch phase; the school opens
          with Years 7 &amp; 8 in January 2027 and grows toward Year 12. Below is how I would run
          that arc — the phasing, the growth, the parallel workstreams, the shape of the budget, and
          the risks I would carry openly.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">commences Jul 2026 · opens Jan 2027</Flag>
          <Flag kind="fact">grows toward Year 12</Flag>
          <Flag kind="plan">phasing &amp; budget are my plan</Flag>
        </div>
      </header>

      {/* Phased timeline */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Five phases to a mature school</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Each phase has one job. The anchors — appointment, launch, first HSC cohort — are fixed;
          the work inside each phase is the candidate plan.
        </p>
        <div className="space-y-3">
          {ROADMAP_PHASES.map((p, i) => (
            <div key={p.id} className="rounded-xl border border-sand bg-white p-5 relative pl-8">
              <div className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-itq text-cream text-xs flex items-center justify-center">
                {i + 1}
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="serif text-xl text-itq">{p.phase}</div>
                  <div className="text-xs text-bronze">{p.window}</div>
                </div>
                <Flag kind={p.flag} />
              </div>
              <p className="text-sm text-ink/70 italic mt-2">{p.intent}</p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 border-t border-sand pt-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm text-ink/70">
                    <span className="text-bronze shrink-0">›</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-lg bg-sand/40 border border-sand p-3">
                <div className="text-[10px] uppercase tracking-widest text-bronze mb-1.5">
                  Artefacts shipped
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                  {p.artefacts.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-itq/90">
                      <span className="text-olive shrink-0">✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment & onboarding ramp */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Recruitment &amp; onboarding ramp</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Who comes in when, and the running headcount it builds to. Leadership lands first to set
          the spine; the whole founding team is in for a 2–4 week induction before term one. The full
          role model, salary bands and skill profiles live in People &amp; staffing — this is the
          timeline view.
        </p>
        <div className="space-y-3">
          {HIRING_SEQUENCE.map((h) => (
            <div
              key={h.window}
              className="rounded-xl border border-sand bg-white p-5 flex flex-col md:flex-row md:items-start gap-3 md:gap-5"
            >
              <div className="md:w-44 shrink-0">
                <div className="text-xs text-bronze">{h.window}</div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="serif text-2xl text-itq tabular-nums">{h.cumulativeFte}</span>
                  <span className="text-[11px] text-ink/50">cumulative FTE</span>
                </div>
                <div className="mt-1">
                  <Flag kind={h.flag} />
                </div>
              </div>
              <div className="flex-1 md:border-l md:border-sand md:pl-5">
                <div className="text-sm font-medium text-itq">{h.hires}</div>
                <p className="text-sm text-ink/70 mt-1.5">{h.onboarding}</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-ink/50 pt-1">
            FTE figures are the candidate staffing plan, sequenced to the phases above. The jump into
            January 2027 is the founding team arriving together for induction.
          </p>
        </div>
      </section>

      {/* Growth model */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">The growth model</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="plan">enrolment ramp is indicative</Flag>
        </div>
        <div className="rounded-xl border border-sand bg-white p-5 space-y-3">
          {GROWTH_MODEL.map((g) => {
            const pct = Math.round((g.cohort / GROWTH_ENDSTATE) * 100);
            return (
              <div key={g.year} className="flex items-center gap-3">
                <div className="w-12 shrink-0 serif text-itq tabular-nums">{g.year}</div>
                <div className="w-24 shrink-0 text-xs text-ink/60">{g.years}</div>
                <div className="flex-1 h-7 rounded-md bg-sand/70 overflow-hidden relative">
                  <div
                    className="h-full bg-itq/80 rounded-md flex items-center justify-end pr-2"
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-[11px] text-cream tabular-nums font-medium">
                      ~{g.cohort}
                    </span>
                  </div>
                </div>
                <div className="w-40 shrink-0 text-xs text-ink/50 hidden md:block">{g.note}</div>
              </div>
            );
          })}
          <p className="text-xs text-ink/50 pt-2 border-t border-sand">
            Bars are relative to the ~{GROWTH_ENDSTATE}-student endstate the building is sized for.
            Numbers are indicative — final intake depends on demand and class structure.
          </p>
        </div>
      </section>

      {/* Workstreams */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Parallel workstreams</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Six tracks run at once through Foundations. Each has a clear owner so nothing waits on the
          Head of School alone.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {WORKSTREAMS.map((w) => (
            <div key={w.name} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="serif text-lg text-itq">{w.name}</div>
                <Flag kind={w.flag} />
              </div>
              <div className="text-[11px] uppercase tracking-wide text-bronze mt-0.5">{w.owner}</div>
              <p className="text-sm text-ink/70 mt-2 border-t border-sand pt-2">{w.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Budget shape */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">The shape of the budget</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Flag kind="verify">proportions, not a costed budget</Flag>
          <Flag kind="plan">to be modelled against confirmed fees</Flag>
        </div>
        <div className="rounded-xl border border-sand bg-white p-5 space-y-3">
          {BUDGET_SHAPE.map((b) => (
            <div key={b.area} className="flex items-center gap-3">
              <div className="w-52 shrink-0 text-sm text-itq font-medium flex items-center gap-2">
                {b.area}
                <Flag kind={b.flag} />
              </div>
              <div className="flex-1 h-6 rounded-md bg-sand/70 overflow-hidden">
                <div
                  className="h-full bg-bronze/70 rounded-md"
                  style={{ width: `${b.share}%` }}
                />
              </div>
              <div className="w-10 shrink-0 text-right text-sm tabular-nums text-ink/70">
                {b.share}%
              </div>
            </div>
          ))}
          <p className="text-xs text-ink/50 pt-2 border-t border-sand">
            Staff-heavy, as schools are. The Full Meal Program is a deliberate Vantage line item.
            These are directional proportions — a real budget waits on published fees and the final
            staffing model.
          </p>
        </div>
      </section>

      {/* Risks */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Risks I would carry openly</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          A founding leader names the risks and the mitigation in the same breath. Each pairing
          below is one I would track from day one.
        </p>
        <div className="space-y-2">
          {RISKS.map((r) => (
            <div
              key={r.risk}
              className="grid md:grid-cols-2 gap-1 md:gap-4 rounded-xl border border-sand bg-white p-4"
            >
              <div className="flex items-start gap-2">
                <Flag kind={r.flag} />
                <span className="text-sm font-medium text-itq">{r.risk}</span>
              </div>
              <div className="text-sm text-ink/70 md:border-l md:border-sand md:pl-4">
                {r.mitigation}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
