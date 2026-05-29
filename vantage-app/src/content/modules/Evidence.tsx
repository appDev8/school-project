import type { ReactNode } from 'react';
import {
  STANDARDS,
  MASTERY_PLATFORMS,
  BUILD_VS_BUY,
  COMPARATORS,
  type Comparator,
} from '../data/standards';
import {
  NESA_STAGE4_MATHS_SOURCE,
  NESA_STRAND_ORDER,
  type NesaStrand,
} from '../data/manhal/nesaStage4Maths';
import { importNesaOutcomes } from '../../lib/nesaImport';
import { Flag } from '../../components/Flag';

const CATEGORIES: Comparator['category'][] = ['School', 'NSW / Australia', 'University'];

// Run the real importer at render — this is the live pipeline, not a mock.
const IMPORT = importNesaOutcomes(NESA_STAGE4_MATHS_SOURCE);
const NODE_BY_CODE = new Map(IMPORT.nodes.map((n) => [n.id, n]));

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

      {/* Live NESA syllabus import */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">The NESA syllabus, imported live</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Manhal isn’t hand-typed outcome by outcome. A verified syllabus source feeds a pure
          importer that emits CASE-wrapped graph nodes and prerequisite edges. The table below is
          rendered straight from that importer running on the real Stage&nbsp;4 Mathematics
          outcomes — re-import when NESA revises the syllabus and the graph refreshes itself.
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Flag kind="nesa">{IMPORT.summary.total} real Stage-4 outcomes</Flag>
          <Flag kind="fact">{IMPORT.summary.edges} prerequisite edges</Flag>
          <Flag kind="plan">prerequisite order is Manhal’s design</Flag>
        </div>

        {/* the pipeline, named */}
        <div className="rounded-xl border border-sand bg-sand/30 p-4 mb-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <code className="text-xs text-itq">nesaStage4Maths.ts</code>
            <span className="text-bronze">→</span>
            <code className="text-xs text-itq">importNesaOutcomes()</code>
            <span className="text-bronze">→</span>
            <span className="text-ink/70">CASE-wrapped OutcomeNode[] + GraphEdge[]</span>
            <span className="text-bronze">→</span>
            <span className="text-ink/70">graph + gating</span>
          </div>
          <p className="text-xs text-ink/50 mt-2">
            {IMPORT.summary.framework}. Source codes and focus areas are verified NESA facts;
            descriptors are short paraphrases (the full syllabus text is copyright).
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-sand bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand/60 text-left">
                <th className="px-4 py-2.5 font-medium text-itq whitespace-nowrap">Outcome</th>
                <th className="px-4 py-2.5 font-medium text-itq">Focus area</th>
                <th className="px-4 py-2.5 font-medium text-itq">What it requires</th>
                <th className="px-4 py-2.5 font-medium text-itq">Source</th>
              </tr>
            </thead>
            <tbody>
              {NESA_STRAND_ORDER.map((strand: NesaStrand) => {
                const inStrand = NESA_STAGE4_MATHS_SOURCE.outcomes.filter(
                  (o) => o.strand === strand,
                );
                if (inStrand.length === 0) return null;
                return (
                  <FragmentRows key={strand} strand={strand} count={inStrand.length}>
                    {inStrand.map((o) => {
                      const node = NODE_BY_CODE.get(o.code);
                      const nesa = node?.standards?.find((s) => s.framework === 'NESA');
                      return (
                        <tr key={o.code} className="border-t border-sand align-top">
                          <td className="px-4 py-2.5 whitespace-nowrap">
                            <code className="text-xs text-itq font-medium">{o.code}</code>
                          </td>
                          <td className="px-4 py-2.5 text-ink/80">{o.focusArea}</td>
                          <td className="px-4 py-2.5 text-ink/60">{o.descriptor}</td>
                          <td className="px-4 py-2.5">
                            <Flag kind={nesa?.flag ?? 'nesa'} />
                          </td>
                        </tr>
                      );
                    })}
                  </FragmentRows>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink/50 mt-2">
          The interactive graph shows a curated, fully-authored 12-outcome slice; this importer
          ingests the complete verified Stage-4 set. A test asserts every node in the demo graph
          maps back to a real outcome here, so the two never drift apart.
        </p>
      </section>

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

// A strand sub-header row followed by its outcome rows (table-friendly fragment).
function FragmentRows({
  strand,
  count,
  children,
}: {
  strand: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <>
      <tr className="bg-cream/70">
        <td
          colSpan={4}
          className="px-4 py-1.5 text-[11px] uppercase tracking-widest text-bronze border-t border-sand"
        >
          {strand} · {count}
        </td>
      </tr>
      {children}
    </>
  );
}
