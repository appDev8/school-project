import { GRADUATE_VISION } from '../data/vantage';
import {
  RESPONSIBILITIES,
  CAPABILITY_PROOFS,
  DIMENSIONS,
  CHILD_SAFETY,
} from '../data/brief';
import { Flag } from '../../components/Flag';

// ---------------------------------------------------------------------------
// ANSWERING THE BRIEF — the candidate's explicit response to the Head of School
// advertisement. The ad invites a "creative or reflective artefact" showing how
// the candidate approaches learning, leadership and purpose. This page names that
// framing and maps the ad's own criteria onto the evidence built across the app.
// ---------------------------------------------------------------------------

export default function Brief() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">
          A creative &amp; reflective artefact
        </div>
        <h1 className="serif text-4xl text-itq">Answering the brief</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          The advertisement invites &ldquo;a creative or reflective artefact that offers insight into
          how [the candidate] approaches learning, leadership and purpose.&rdquo; This platform
          <em> is</em> that artefact — not a slide deck about a school, but a working prototype of its
          spine: the curriculum graph, the operating model and the culture, built and connected so
          they can be stress-tested in the open.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">mapped to the public advertisement</Flag>
          <Flag kind="plan">the build is my candidate response</Flag>
        </div>
      </header>

      {/* North star */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="serif text-2xl text-itq">Everything here serves one graduate</h2>
          <Flag kind="fact">Vantage purpose</Flag>
        </div>
        <div className="rounded-xl border border-itq/20 bg-itq/[0.03] p-5">
          <div className="serif text-2xl text-itq">The {GRADUATE_VISION.archetype}</div>
          <p className="text-sm text-ink/70 mt-1 max-w-3xl">
            &mdash; {GRADUATE_VISION.definition}. My test for every decision in this artefact was
            simple: does it help form this graduate, inside NESA, without trading off the HSC?
          </p>
        </div>
      </section>

      {/* The dimensions the brief weighs */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Held to the whole brief</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The ad seeks a visionary pioneer with the systems-thinking to make a vision operational,
          the innovation to build something new, and the faith to anchor it. Each dimension below is
          answered by something concrete you can open and inspect.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIMENSIONS.map((d) => (
            <div key={d.name} className="rounded-xl border border-sand bg-white p-5 flex flex-col">
              <div className="serif text-lg text-itq">{d.name}</div>
              <p className="text-sm text-ink/70 mt-1.5 flex-1">{d.claim}</p>
              <a
                href={`#/${d.pointer.slug}`}
                className="text-xs text-bronze hover:text-itq mt-3 inline-flex items-center gap-1"
              >
                {d.pointer.label} <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Core responsibilities → evidence */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">The role, answered point by point</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The six core responsibilities from the advertisement, each met not with a promise but with
          a built, inspectable piece of this platform.
        </p>
        <div className="space-y-3">
          {RESPONSIBILITIES.map((r, i) => (
            <div key={i} className="rounded-xl border border-sand bg-white p-5 relative pl-8">
              <div className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-itq text-cream text-xs flex items-center justify-center">
                {i + 1}
              </div>
              <div className="text-sm font-medium text-itq">{r.responsibility}</div>
              <p className="text-sm text-ink/70 mt-2 border-t border-sand pt-2">{r.response}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.evidence.map((e) => (
                  <a
                    key={e.slug + e.label}
                    href={`#/${e.slug}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-sand/60 border border-sand text-itq hover:bg-sand"
                  >
                    {e.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities evidenced */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Capabilities, evidenced</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The qualifications and attributes the ad asks for — and where this artefact demonstrates
          them rather than asserts them.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {CAPABILITY_PROOFS.map((c, i) => (
            <div key={i} className="rounded-xl border border-sand bg-white p-4">
              <div className="text-sm font-medium text-itq">{c.capability}</div>
              <p className="text-sm text-ink/70 mt-1.5 border-t border-sand pt-2">{c.proof}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to read this artefact */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">How to read this artefact honestly</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          A founding leader earns trust by separating what is confirmed from what is proposed. Every
          claim in this platform carries a flag, so you always know what you&rsquo;re looking at.
        </p>
        <div className="rounded-xl border border-sand bg-white p-5 space-y-2.5">
          <div className="flex items-start gap-3">
            <Flag kind="fact" />
            <span className="text-sm text-ink/70">
              Confirmed about Vantage / Unity Grammar, or a real external standard.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Flag kind="nesa" />
            <span className="text-sm text-ink/70">A verified NESA syllabus outcome.</span>
          </div>
          <div className="flex items-start gap-3">
            <Flag kind="plan" />
            <span className="text-sm text-ink/70">
              My candidate plan — the design decisions I would bring as Head of School.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Flag kind="proposed" />
            <span className="text-sm text-ink/70">
              The Ihsan Way overlay — my proposal, clearly distinct from school policy.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Flag kind="verify" />
            <span className="text-sm text-ink/70">
              Indicative or to-be-confirmed — stated as such rather than hidden.
            </span>
          </div>
        </div>
      </section>

      {/* Child safety */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="serif text-2xl text-itq">First, keep them safe</h2>
          <Flag kind="fact">child-safe commitment</Flag>
        </div>
        <div className="rounded-xl border-l-2 border-terra bg-terra/[0.04] p-5">
          <p className="text-sm text-ink/75">{CHILD_SAFETY}</p>
        </div>
      </section>
    </div>
  );
}
