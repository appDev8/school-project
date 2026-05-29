import {
  SPACE_TYPES,
  DESIGN_STANDARDS,
  FLOOR_LEVELS,
  CITY_ASSETS,
  EXCURSION_PRINCIPLES,
  type StreamTag,
} from '../data/spaces';
import { CAMPUS } from '../data/vantage';
import { Flag } from '../../components/Flag';

// Stream tag → label + dot colour, reusing the app's stream vocabulary.
const STREAM_META: Record<StreamTag, { label: string; color: string }> = {
  media: { label: 'Media', color: '#B26540' },
  law: { label: 'Law', color: '#6C7D3C' },
  tech: { label: 'Tech', color: '#9A7B4F' },
  all: { label: 'All streams', color: '#2F4A3C' },
};

function StreamChip({ tag }: { tag: StreamTag }) {
  const m = STREAM_META[tag];
  return (
    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-sand text-ink/60">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}

export default function Spaces() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">Where it happens</div>
        <h1 className="serif text-4xl text-itq">Spaces &amp; the city as campus</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          A project-based school needs rooms that flex and a city that teaches. The brief below
          pairs an agile learning-space programme — grounded in NSW standards — with Parramatta’s
          real institutions, so the campus reaches well beyond its own walls.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">benchmarks to NSW EFSG</Flag>
          <Flag kind="verify">all m² indicative — confirm against live EFSG Room Data Sheets</Flag>
          <Flag kind="plan">city partnerships to be negotiated</Flag>
        </div>
        <div className="rounded-xl border border-sand bg-sand/30 p-4 mt-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[11px] uppercase tracking-widest text-bronze">Getting here</div>
            <Flag kind="fact">Vantage facts</Flag>
          </div>
          <p className="text-sm text-itq font-medium mt-1">{CAMPUS.address}</p>
          <p className="text-sm text-ink/70">
            {CAMPUS.toStation}. {CAMPUS.rail} {CAMPUS.bus} Being in the CBD core is what makes the
            “city as campus” practical — the institutions below are mostly within a walk or one stop.
          </p>
        </div>
      </header>

      {/* Space programme */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Space programme</h2>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          The room types a PBL secondary needs, with indicative areas. Innovative schools run
          ~9–12 m² gross/student and cluster 100–120 learners with 4–6 teachers around a shared
          commons.
        </p>
        <div className="overflow-hidden rounded-xl border border-sand bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand/60 text-left">
                <th className="px-4 py-2.5 font-medium text-itq">Space</th>
                <th className="px-4 py-2.5 font-medium text-itq whitespace-nowrap">Area guidance</th>
                <th className="px-4 py-2.5 font-medium text-itq">Note</th>
                <th className="px-4 py-2.5 font-medium text-itq">Basis</th>
              </tr>
            </thead>
            <tbody>
              {SPACE_TYPES.map((s) => (
                <tr key={s.name} className="border-t border-sand align-top">
                  <td className="px-4 py-3 font-medium text-itq whitespace-nowrap">{s.name}</td>
                  <td className="px-4 py-3 text-ink/80 whitespace-nowrap">{s.area}</td>
                  <td className="px-4 py-3 text-ink/70">{s.note}</td>
                  <td className="px-4 py-3">
                    <Flag kind={s.flag} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink/50 mt-2">
          Adjacency logic: wet, noisy and messy spaces (makerspace, kitchen, science) group with
          services; quiet zones (advisory, wellbeing, library) are buffered; the musalla sits at a
          calm threshold with water separated from the prayer floor.
        </p>
      </section>

      {/* Standards basis */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Standards basis</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="fact">NSW / AU regulatory frame</Flag>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {DESIGN_STANDARDS.map((d) => (
            <div key={d.acronym} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="serif text-xl text-itq">{d.acronym}</div>
                <Flag kind={d.flag} />
              </div>
              <div className="text-sm font-medium text-bronze mt-0.5">{d.name}</div>
              <p className="text-sm text-ink/70 mt-2">{d.governs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floorplate logic */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">Floorplate logic</h2>
        <div className="flex items-center gap-2 mb-4">
          <Flag kind="plan">staging strategy</Flag>
        </div>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Build to the ~600-student endstate structurally over 2–3 storeys, then fit out in stages.
          Open Stage 1 (~120) on one upper level above a shared ground floor, and activate further
          studio clusters as cohorts grow. Stacking wet services on a single goods / lift core keeps
          cost in check.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {FLOOR_LEVELS.map((f) => (
            <div key={f.level} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex items-baseline justify-between gap-2">
                <div className="serif text-lg text-itq">{f.level}</div>
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-sand text-ink/60">
                  {f.role}
                </span>
              </div>
              <p className="text-sm text-ink/70 mt-2">{f.spaces}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The city as campus */}
      <section>
        <h2 className="serif text-2xl text-itq mb-1">The city as campus</h2>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Flag kind="fact">assets exist today</Flag>
          <Flag kind="plan">partnership use to be arranged</Flag>
        </div>
        <p className="text-sm text-ink/60 mb-4 max-w-3xl">
          Parramatta is a working CBD of universities, courts, museums and major employers. Each
          asset below is real; the way the school draws on it is the design plan — tagged by the
          stream it most serves.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {CITY_ASSETS.map((c) => (
            <div key={c.name} className="rounded-xl border border-sand bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="font-medium text-itq">{c.name}</div>
                <Flag kind={c.flag} />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {c.streams.map((t) => (
                  <StreamChip key={t} tag={t} />
                ))}
              </div>
              <p className="text-sm text-ink/70 mt-2">{c.enables}</p>
              {c.access && (
                <p className="text-xs text-bronze mt-2">{c.access}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How it's governed */}
      <section className="rounded-xl border border-sand bg-white p-5">
        <h2 className="serif text-2xl text-itq mb-1">How city learning is governed</h2>
        <p className="text-sm text-ink/60 mb-3">
          Reaching into the city raises the duty of care, not lowers it — so the operating discipline
          matters as much as the access.
        </p>
        <ul className="space-y-2">
          {EXCURSION_PRINCIPLES.map((e) => (
            <li key={e.point} className="flex items-start gap-2 text-sm text-ink/75">
              <span className="mt-0.5">
                <Flag kind={e.flag} />
              </span>
              <span>{e.point}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
