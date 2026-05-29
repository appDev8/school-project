import {
  STANDARDS,
  MASTERY_PLATFORMS,
  BUILD_VS_BUY,
  COMPARATORS,
  type Comparator,
} from '../data/standards';
import { Flag } from '../../components/Flag';

const CATEGORIES: Comparator['category'][] = ['School', 'NSW / Australia', 'University'];

export default function Evidence() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">Why it holds up</div>
        <h1 className="serif text-4xl text-itq">Evidence &amp; standards</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          Manhal is distinctive IP built on open standards — so evidence is portable, the graph
          survives syllabus changes, and the school never gets locked into one vendor. The model is
          grounded in what already works, here and abroad.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">open standards (1EdTech / ADL)</Flag>
          <Flag kind="verify">outcome figures are directional, not guarantees</Flag>
        </div>
      </header>

      {/* Standards */}
      <section>
        <h2 className="serif text-2xl text-itq mb-3">The standards we build on</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {STANDARDS.map((s) => (
            <div key={s.acronym} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="serif text-xl text-itq">{s.acronym}</div>
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-sand text-ink/60">
                  {s.role}
                </span>
              </div>
              <div className="text-sm font-medium text-bronze mt-0.5">{s.name}</div>
              <p className="text-sm text-ink/70 mt-2">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prior art */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">How real platforms model mastery</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The prior art Manhal learns from — and the gap it fills.
        </p>
        <div className="space-y-2">
          {MASTERY_PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 rounded-lg border border-sand bg-white p-3"
            >
              <div className="md:w-56 shrink-0 font-medium text-itq">{p.name}</div>
              <div className="text-sm text-ink/70">{p.model}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Build vs buy */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Build vs buy</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Keep the distinctive IP in-house; rent the commodity layers; don’t reinvent what’s out of
          reach. Pragmatic for a small school with a modest budget.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {BUILD_VS_BUY.map((b) => (
            <div key={b.decision} className={`rounded-xl border p-5 ${b.tone}`}>
              <div className="serif text-lg text-itq mb-2">{b.decision}</div>
              <ul className="space-y-1.5">
                {b.items.map((it) => (
                  <li key={it} className="text-sm text-ink/75 flex gap-2">
                    <span className="text-bronze">·</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparators */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">What the best schools (and universities) teach us</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="practice">documented practice elsewhere</Flag>
        </div>
        <div className="space-y-6">
          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <h3 className="text-[11px] uppercase tracking-widest text-bronze mb-2">{cat}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {COMPARATORS.filter((c) => c.category === cat).map((c) => (
                  <div key={c.name} className="rounded-xl border border-sand bg-white p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-medium text-itq">{c.name}</div>
                      <div className="text-[11px] text-ink/40">{c.place}</div>
                    </div>
                    <p className="text-sm text-ink/70 mt-1">{c.what}</p>
                    <p className="text-sm text-itq/90 mt-2 border-t border-sand pt-2">
                      <span className="text-[10px] uppercase tracking-wide text-bronze">
                        For Vantage:{' '}
                      </span>
                      {c.lesson}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
