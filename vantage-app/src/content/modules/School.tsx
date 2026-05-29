import {
  SCHOOL,
  STREAMS,
  CAMPUS,
  CAMPUS_SAFETY,
  FEES,
  FEES_NOTE,
  ENROLMENT_STEPS,
  UNITY_LEADERS,
  VANTAGE_EVENT,
  VERIFY_NOTES,
  VANTAGE_SOURCES,
} from '../data/vantage';
import { Flag } from '../../components/Flag';

export default function School() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">The facts</div>
        <h1 className="serif text-4xl text-itq">The school, as it really is</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          A founding leader earns trust by being precise about what is known. Everything here is
          drawn from Vantage’s own channels and the recruitment ad — and clearly separated from what
          I’m still assuming.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">opens January 2027</Flag>
          <Flag kind="fact">Stage 4 (Years 7 &amp; 8) first</Flag>
          <Flag kind="fact">HSC + ATAR retained</Flag>
        </div>
      </header>

      {/* Identity */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-sand bg-white p-5 space-y-2">
          <h2 className="serif text-2xl text-itq">Identity</h2>
          <p className="text-sm text-ink/75">{SCHOOL.oneLine}</p>
          <dl className="text-sm space-y-1 mt-2">
            <Row k="Model" v={SCHOOL.model} />
            <Row k="Campus" v={SCHOOL.address} />
            <Row k="Credentials" v={SCHOOL.credentials} />
            <Row k="Wellbeing" v={SCHOOL.meals} />
            <Row k="Graduate" v="the “Smart Muslim Creative”" />
          </dl>
        </div>
        <div className="rounded-xl border border-sand bg-white p-5 space-y-2">
          <h2 className="serif text-2xl text-itq">Operator — Unity Grammar</h2>
          <p className="text-sm text-ink/70">
            Independent co-ed Islamic school, founded {SCHOOL.parent.founded} in {SCHOOL.parent.location};
            NESA-registered K–12; CIS member. Vantage is built on its foundations.
          </p>
          <ul className="text-sm space-y-1.5 mt-2">
            {UNITY_LEADERS.map((l) => (
              <li key={l.name}>
                <span className="font-medium text-itq">{l.name}</span>
                <span className="text-ink/60"> — {l.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Streams */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Three specialisation streams</h2>
        <div className="flex items-center gap-2 mb-3">
          <Flag kind="fact">no traditional subjects</Flag>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {STREAMS.map((s) => (
            <div key={s.id} className="rounded-xl border border-sand bg-white p-5">
              <div className="text-2xl" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div className="font-medium mt-1">{s.name}</div>
              <div className="text-sm text-ink/70 mt-1">{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Campus, transport & fees */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-sand bg-white p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="serif text-2xl text-itq">Campus &amp; getting here</h2>
            <Flag kind="fact">Vantage facts</Flag>
          </div>
          <p className="text-sm text-itq font-medium">{CAMPUS.address}</p>
          <p className="text-sm text-ink/70">{CAMPUS.toStation}.</p>
          <ul className="text-sm text-ink/70 space-y-1.5 mt-1 border-t border-sand pt-2">
            <li className="flex gap-2"><span className="text-bronze shrink-0">›</span>{CAMPUS.hub}</li>
            <li className="flex gap-2"><span className="text-bronze shrink-0">›</span>{CAMPUS.rail}</li>
            <li className="flex gap-2"><span className="text-bronze shrink-0">›</span>{CAMPUS.bus}</li>
          </ul>
        </div>
        <div className="rounded-xl border border-sand bg-white p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="serif text-2xl text-itq">Fees</h2>
            <Flag kind="fact">2027 pricing</Flag>
          </div>
          <div className="space-y-2 mt-1">
            {FEES.map((f) => (
              <div key={f.label} className="flex items-baseline gap-3 border-b border-sand pb-2 last:border-0 last:pb-0">
                <div className="serif text-xl text-itq tabular-nums w-20 shrink-0">{f.amount}</div>
                <div>
                  <div className="text-sm font-medium text-itq">{f.label}<span className="text-ink/50 font-normal"> · per year</span></div>
                  <div className="text-sm text-ink/60">{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/50 pt-1">{FEES_NOTE}</p>
        </div>
      </section>

      {/* Safety getting to campus */}
      <section className="rounded-xl border border-sand bg-white p-5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h2 className="serif text-2xl text-itq">{CAMPUS_SAFETY.question}</h2>
        </div>
        <p className="text-sm text-ink/60 mb-3 max-w-3xl">
          The short answer is yes — and here is the substance behind it: the facts that make the
          commute low-risk, and the supervision discipline the school adds on top.
        </p>
        <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2">
          {CAMPUS_SAFETY.points.map((p) => (
            <li key={p.point} className="flex items-start gap-2 text-sm text-ink/75">
              <span className="mt-0.5">
                <Flag kind={p.flag} />
              </span>
              <span>{p.point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Enrolment + Event */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-sand bg-white p-5">
          <h2 className="serif text-2xl text-itq mb-3">Enrolment — four steps</h2>
          <ol className="space-y-3">
            {ENROLMENT_STEPS.map((e, i) => (
              <li key={e.step} className="flex gap-3">
                <span className="h-6 w-6 shrink-0 rounded-full bg-itq text-cream text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <div className="font-medium text-itq">{e.step}</div>
                  <div className="text-sm text-ink/60">{e.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-sand bg-white p-5">
          <h2 className="serif text-2xl text-itq mb-1">Meet them in person</h2>
          <Flag kind="fact">public event</Flag>
          <div className="serif text-lg text-itq mt-3">{VANTAGE_EVENT.name}</div>
          <div className="text-sm text-ink/75 mt-1">
            {VANTAGE_EVENT.date} · {VANTAGE_EVENT.time}
          </div>
          <div className="text-sm text-ink/60">{VANTAGE_EVENT.venue}</div>
          <p className="text-sm text-ink/70 mt-2">{VANTAGE_EVENT.note}</p>
        </div>
      </section>

      {/* What I'm still verifying */}
      <section className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
        <h2 className="serif text-2xl text-itq mb-1">What I’m still verifying</h2>
        <p className="text-sm text-ink/60 mb-3">
          Named openly — I won’t present assumptions as facts.
        </p>
        <ul className="space-y-2">
          {VERIFY_NOTES.map((n) => (
            <li key={n} className="flex items-start gap-2 text-sm text-ink/75">
              <span className="mt-0.5">
                <Flag kind="verify" />
              </span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sources */}
      <section>
        <h2 className="serif text-2xl text-itq mb-3">Sources</h2>
        <ul className="flex flex-wrap gap-2">
          {VANTAGE_SOURCES.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-3 py-1.5 rounded-lg border border-sand bg-white hover:border-bronze text-itq transition"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-ink/50 w-28 shrink-0">{k}</dt>
      <dd className="text-ink/80">{v}</dd>
    </div>
  );
}
