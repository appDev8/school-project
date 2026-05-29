import {
  PARTNER_CATEGORIES,
  MOU_TERMS,
  MENTOR_ONBOARDING,
  STREAM_COLOR,
  STREAM_LABEL,
  type PartnerStream,
} from '../data/partnerships';
import { Flag } from '../../components/Flag';

// Order partners are grouped by stream in the "Partners by stream" section.
const STREAM_ORDER: PartnerStream[] = ['media', 'law', 'tech', 'all'];

export default function Partnerships() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">The city as campus</div>
        <h1 className="serif text-4xl text-itq">Industry, university &amp; civic partnerships</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          Parramatta is the campus. Real institutions — a university, cultural and justice
          precincts, an anchor finance cluster and a health hub — supply mentors, sites, real
          briefs and data. Partnerships are MOU-governed and survive staff turnover; every embedded
          Expert in Residence clears a Working With Children Check and child-safe induction first.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">institutions are real Parramatta anchors</Flag>
          <Flag kind="plan">the MOUs &amp; mentor matches are a founding design</Flag>
          <Flag kind="fact">WWCC + Child Safe are NSW requirements</Flag>
        </div>
      </header>

      {/* Partners by stream */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Partners by stream</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Each partner is mapped to the stream it powers most. The institution exists today
          (<span className="text-emerald-700">fact</span>); a Vantage MOU with it is a founding plan.
        </p>
        <div className="space-y-6">
          {STREAM_ORDER.map((stream) => {
            const partners = PARTNER_CATEGORIES.filter((p) => p.stream === stream);
            if (partners.length === 0) return null;
            const color = STREAM_COLOR[stream];
            return (
              <div key={stream}>
                <h3
                  className="text-[11px] uppercase tracking-widest mb-2 flex items-center gap-2"
                  style={{ color }}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {STREAM_LABEL[stream]}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {partners.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-xl border border-sand bg-white p-4 border-l-4"
                      style={{ borderLeftColor: color }}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="font-medium text-itq">{p.name}</div>
                        <div className="text-[11px] text-ink/40">{p.kind}</div>
                      </div>
                      <p className="text-sm text-ink/70 mt-1">{p.whatTheyOffer}</p>
                      <div className="mt-2">
                        <Flag kind={p.flag}>
                          {p.flag === 'fact' ? 'institution exists' : 'partnership is a plan'}
                        </Flag>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MOU governance */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">How partnerships are governed (MOU)</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Every partnership is formalised in a memorandum of understanding — so it is mutually
          clear, child-safe and durable. Safeguarding clauses are NSW law; the rest is the
          instrument we design.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {MOU_TERMS.map((t) => (
            <div key={t.term} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex items-baseline justify-between gap-2">
                <div className="serif text-lg text-itq">{t.term}</div>
                <Flag kind={t.flag} />
              </div>
              <p className="text-sm text-ink/70 mt-2">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mentor onboarding */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Onboarding an Expert in Residence</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Bringing an industry mentor into a project — in order. The first two steps are hard NSW
          gates; the rest is the coaching rhythm that makes the mentoring land.
        </p>
        <ol className="space-y-3">
          {MENTOR_ONBOARDING.map((s, i) => (
            <li key={s.step} className="flex gap-4 rounded-xl border border-sand bg-white p-4">
              <div className="shrink-0 h-7 w-7 rounded-full bg-itq/5 text-itq flex items-center justify-center text-sm font-medium">
                {i + 1}
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-medium text-itq">{s.step}</span>
                  <Flag kind={s.flag} />
                </div>
                <p className="text-sm text-ink/70">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
