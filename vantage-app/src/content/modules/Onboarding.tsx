import {
  ONBOARDING_PHASES,
  TRAINING_PILLARS,
  MANHAL_TRAINING,
} from '../data/onboarding';
import { Flag } from '../../components/Flag';

export default function Onboarding() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">
          Onboarding &amp; educator training
        </div>
        <h1 className="serif text-4xl text-itq">Building the educators who run the model</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          A founding team is not hired ready-made — it is built. We onboard, train and coach
          educators into the four roles, ground them in documented practice, and teach them to run
          Manhal day-to-day. The throughline is coaching, not appraisal: improvement is the norm.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="practice">PBLWorks Gold Standard PBL</Flag>
          <Flag kind="practice">Jim Knight Impact Cycle</Flag>
          <Flag kind="plan">candidate program design</Flag>
          <Flag kind="proposed">the Ihsan Way coaching overlay</Flag>
        </div>
      </header>

      {/* The onboarding journey — numbered timeline */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">The onboarding journey</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          From appointment in mid-2026 to a coached first term in 2027 — each phase builds on the
          last, moving an educator from compliance and foundations into confident, coached delivery.
        </p>
        <div className="space-y-3">
          {ONBOARDING_PHASES.map((p, i) => (
            <div
              key={p.phase}
              className="rounded-xl border border-sand bg-white p-5 relative pl-8"
            >
              <div className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-itq text-cream text-xs flex items-center justify-center">
                {i + 1}
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="serif text-xl text-itq">{p.phase}</div>
                  <div className="text-xs text-bronze">{p.when}</div>
                </div>
                <Flag kind={p.flag} />
              </div>
              <p className="text-sm text-ink/70 italic mt-2">{p.intent}</p>
              <ul className="mt-3 space-y-1.5 border-t border-sand pt-3">
                {p.focus.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink/70">
                    <span className="text-bronze shrink-0">›</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How we train (the methods) */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">How we train (the methods)</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Two established frameworks plus a local instrument. The frameworks are documented practice;
          the fidelity rubric is my design, built on top of them.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {TRAINING_PILLARS.map((t) => (
            <div key={t.name} className="rounded-xl border border-sand bg-white p-5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="serif text-lg text-itq leading-snug">{t.name}</div>
                <Flag kind={t.flag} />
              </div>
              <div className="text-[11px] uppercase tracking-wide text-bronze">{t.basis}</div>
              <p className="text-sm text-ink/70 border-t border-sand pt-2">{t.gives}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning to run Manhal */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Learning to run Manhal</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Flag kind="plan">platform training design</Flag>
          <span className="text-xs text-ink/50">
            each module is owned by the educator role that uses it most
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {MANHAL_TRAINING.map((m) => (
            <div key={m.title} className="rounded-xl border border-sand bg-white p-5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="serif text-lg text-itq leading-snug">{m.title}</div>
                <Flag kind={m.flag} />
              </div>
              <div className="text-[11px] uppercase tracking-wide font-medium text-olive">
                {m.who}
              </div>
              <p className="text-sm text-ink/70 border-t border-sand pt-2">{m.outcome}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
