import { Fragment } from 'react';
import {
  FTE_MODEL,
  RECRUIT_PRIORITIES,
  SALARY_BANDS,
  COMPLIANCE,
  type StaffCategory,
} from '../data/staffing';
import { Flag } from '../../components/Flag';

const CATEGORIES: StaffCategory[] = ['Leadership', 'Teaching/Coaching', 'Wellbeing', 'Operations'];

const TOTAL_FTE = FTE_MODEL.reduce((sum, r) => sum + r.count, 0);

const aud = (n: number) => `$${n.toLocaleString('en-AU')}`;
const fte = (n: number) => n.toLocaleString('en-AU');

export default function People() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">People &amp; staffing</div>
        <h1 className="serif text-4xl text-itq">Who builds the school</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          A founding-year team of roughly twenty, built around Vantage&rsquo;s four educator roles
          and led by a Head of School. Recruit in sequence, pay against the 2025 independent-schools
          award, and clear every NSW safeguarding gate before a single student arrives.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="plan">org structure is my design</Flag>
          <Flag kind="nsw$">award salary scales (MEA 2025)</Flag>
          <Flag kind="fact">NSW legal requirements</Flag>
        </div>
      </header>

      {/* Founding-year team */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Founding-year team</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Indicative FTE for ~120 students (Years 7 &amp; 8), grouped by category. The teaching block
          maps to the four educator roles; partnerships and wellbeing run blended at launch and
          convert to full FTE as cohorts grow.
        </p>
        <div className="rounded-xl border border-sand bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-bronze border-b border-sand">
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Purpose</th>
                <th className="px-5 py-3 font-medium text-right">FTE</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat) => {
                const rows = FTE_MODEL.filter((r) => r.category === cat);
                const subtotal = rows.reduce((sum, r) => sum + r.count, 0);
                return (
                  <Fragment key={cat}>
                    <tr className="bg-cream/60 border-b border-sand">
                      <td
                        colSpan={3}
                        className="px-5 py-1.5 text-[11px] uppercase tracking-widest text-itq/70"
                      >
                        {cat} · {fte(subtotal)} FTE
                      </td>
                    </tr>
                    {rows.map((r) => (
                      <tr key={r.title} className="border-b border-sand/60 align-top">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-itq">{r.title}</span>
                            <Flag kind={r.flag} />
                          </div>
                        </td>
                        <td className="px-5 py-3 text-ink/70">{r.purpose}</td>
                        <td className="px-5 py-3 text-right tabular-nums text-ink/80">
                          {fte(r.count)}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                );
              })}
              <tr className="bg-itq/5">
                <td className="px-5 py-3 serif text-itq" colSpan={2}>
                  Total — founding year
                </td>
                <td className="px-5 py-3 text-right serif text-itq tabular-nums">
                  {fte(TOTAL_FTE)} FTE
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink/50 mt-2">
          Within the research&rsquo;s ≈ 20&ndash;21 FTE envelope; final numbers depend on the
          timetable, release rates and advisory load.
        </p>
      </section>

      {/* Recruitment sequencing */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Who we recruit first, and why</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="plan">founding-team sequencing</Flag>
        </div>
        <div className="space-y-3">
          {RECRUIT_PRIORITIES.map((p, i) => (
            <div key={p.role} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                <div className="flex items-baseline gap-3 md:w-72 shrink-0">
                  <span className="serif text-2xl text-bronze/60 tabular-nums">{i + 1}</span>
                  <span className="font-medium text-itq">{p.role}</span>
                </div>
                <div className="text-[11px] uppercase tracking-widest text-bronze mt-1 md:mt-0">
                  {p.when}
                </div>
              </div>
              <p className="text-sm text-ink/70 mt-3">{p.rationale}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-sand text-ink/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Salary bands */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Salary bands</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="nsw$">Independent Schools (Teachers) MEA 2025</Flag>
          <Flag kind="verify">leadership figure is market context</Flag>
        </div>
        <div className="rounded-xl border border-sand bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-bronze border-b border-sand">
                <th className="px-5 py-3 font-medium">Band</th>
                <th className="px-5 py-3 font-medium text-right">Annual base</th>
                <th className="px-5 py-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {SALARY_BANDS.map((b) => (
                <tr key={b.band} className="border-b border-sand/60 align-top last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-itq">{b.band}</span>
                      <Flag kind={b.flag} />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-itq font-medium">
                    {aud(b.amount)}
                  </td>
                  <td className="px-5 py-3 text-ink/70">{b.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink/50 mt-2">
          Scales effective from the first full pay period on/after 1 Feb 2025. Confirm the specific
          agreement the school adopts — some independents run their own EAs above the MEA.
        </p>
      </section>

      {/* Compliance & safeguarding */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Compliance &amp; safeguarding</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Non-negotiable NSW gates for every person working with children — cleared before
          commencement, not after.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {COMPLIANCE.map((c) => (
            <div key={c.name} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="serif text-lg text-itq">{c.name}</div>
                <Flag kind={c.flag} />
              </div>
              <p className="text-sm text-ink/70 mt-2">{c.requirement}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
