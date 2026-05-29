import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { useManhal } from '../../store/useManhal';
import { studentSummary, cohortSummary } from '../../lib/cohort';
import { PERSONAS, personaById } from '../data/manhal/personas';
import { NODES } from '../data/manhal/graph';
import { artefactsFor, notesFor, COACH_NOTES } from '../data/manhal/portfolio';
import { challengeById } from '../data/manhal/projects';
import { STATUS_META } from '../../lib/status';
import type { MasteryStatus } from '../data/manhal/types';
import { Flag } from '../../components/Flag';

type Tab = 'student' | 'coach' | 'parent' | 'leadership';
const TABS: { id: Tab; label: string; sub: string }[] = [
  { id: 'student', label: 'Student', sub: 'Ṭālib' },
  { id: 'coach', label: 'Coach', sub: 'Murabbi' },
  { id: 'parent', label: 'Parent', sub: 'Walī' },
  { id: 'leadership', label: 'Leadership', sub: 'Imārah' },
];

export default function Dashboards() {
  const [tab, setTab] = useState<Tab>('student');
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-bronze">One graph, four lenses</div>
        <h1 className="serif text-4xl text-itq">Role dashboards</h1>
        <p className="text-lg text-ink/80 max-w-3xl">
          The same Manhal evidence, read four ways — so a learner, a coach, a parent and the
          leadership team each see exactly what they need to act on.
        </p>
        <div className="flex flex-wrap gap-2">
          <Flag kind="fact">computed from xAPI evidence</Flag>
          <Flag kind="plan">synthetic learners — no real data</Flag>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-sand">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm rounded-t-lg -mb-px border-b-2 transition ${
              tab === t.id
                ? 'border-itq text-itq font-medium'
                : 'border-transparent text-ink/50 hover:text-ink'
            }`}
          >
            {t.label}
            <span className="text-[10px] uppercase tracking-wide opacity-60 ml-1">· {t.sub}</span>
          </button>
        ))}
      </div>

      {tab === 'student' && <StudentView />}
      {tab === 'coach' && <CoachView />}
      {tab === 'parent' && <ParentView />}
      {tab === 'leadership' && <LeadershipView />}
    </div>
  );
}

function PersonaPicker() {
  const { personaId, setPersona } = useManhal();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] uppercase tracking-wide text-ink/50 mr-1">Learner</span>
      {PERSONAS.map((p) => (
        <button
          key={p.id}
          onClick={() => setPersona(p.id)}
          className={`px-3 py-1.5 rounded-lg text-sm border transition ${
            p.id === personaId
              ? 'bg-itq text-cream border-itq'
              : 'bg-cream text-ink border-sand hover:border-bronze'
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}

function StatusBar({ statuses }: { statuses: Map<string, MasteryStatus> }) {
  const counts = new Map<MasteryStatus, number>();
  for (const s of statuses.values()) counts.set(s, (counts.get(s) ?? 0) + 1);
  const total = statuses.size || 1;
  const order: MasteryStatus[] = ['mastered', 'proficient', 'in_progress', 'available', 'locked'];
  return (
    <div className="flex h-2.5 rounded-full overflow-hidden bg-sand">
      {order.map((s) => {
        const c = counts.get(s) ?? 0;
        if (!c) return null;
        return (
          <div
            key={s}
            className={STATUS_META[s].dot}
            style={{ width: `${(c / total) * 100}%` }}
            title={`${STATUS_META[s].label}: ${c}`}
          />
        );
      })}
    </div>
  );
}

// ---- Student -------------------------------------------------------------
function StudentView() {
  const { personaId } = useManhal();
  const s = studentSummary(personaId);
  const arts = artefactsFor(personaId);
  const notes = notesFor(personaId);
  const activeProject = [...s.projects].sort((a, b) => b.pct - a.pct)[0];
  const mastered = NODES.filter((n) => s.statuses.get(n.id) === 'mastered');

  return (
    <div className="space-y-6">
      <PersonaPicker />
      <div className="rounded-xl border border-sand bg-white p-5">
        <div className="serif text-2xl text-itq">{s.persona.name}</div>
        <div className="text-sm text-ink/60">
          Year {s.persona.year} · {s.persona.stream} stream
        </div>
        <p className="text-sm text-ink/70 mt-1">{s.persona.blurb}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50">Coverage</div>
          <div className="text-3xl font-semibold text-bronze mt-1">{s.coverage.pct}%</div>
          <div className="text-xs text-ink/50 mt-1">
            {s.coverage.mastered} mastered · {s.coverage.proficient} proficient
          </div>
          <div className="mt-3">
            <StatusBar statuses={s.statuses} />
          </div>
        </div>

        <div className="rounded-xl border border-sand bg-white p-5 md:col-span-2">
          <div className="text-[11px] uppercase tracking-wide text-ink/50">Working toward</div>
          {activeProject && (
            <>
              <div className="serif text-lg text-itq mt-1">{activeProject.title}</div>
              <div className="flex items-center justify-between text-xs text-ink/60 mt-2">
                <span>
                  {activeProject.ready}/{activeProject.required} outcomes ready
                </span>
                <span>{activeProject.unlocked ? 'Unlocked ✓' : `${activeProject.pct}%`}</span>
              </div>
              <div className="h-2 rounded-full bg-sand mt-1 overflow-hidden">
                <div
                  className={`h-full ${activeProject.unlocked ? 'bg-olive' : 'bg-terra'}`}
                  style={{ width: `${activeProject.pct}%` }}
                />
              </div>
              <p className="text-xs text-ink/60 mt-2">
                {challengeById(activeProject.id)?.driving}
              </p>
            </>
          )}
          <div className="mt-4">
            <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-1.5">
              Recommended next
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.next.map((n) => (
                <span
                  key={n.id}
                  className="text-xs px-2 py-1 rounded-md border border-bronze/50 bg-cream text-itq"
                >
                  {n.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-2">
            Athar — recent portfolio
          </div>
          <ul className="space-y-3">
            {arts.map((a) => (
              <li key={a.id} className="border-l-2 border-bronze/40 pl-3">
                <div className="text-sm font-medium text-itq">{a.title}</div>
                <div className="text-[11px] text-ink/40 uppercase tracking-wide">
                  {a.kind} · {a.outcomes.join(', ')}
                </div>
                <p className="text-xs text-ink/70 mt-1 italic">“{a.reflection}”</p>
              </li>
            ))}
            {arts.length === 0 && <li className="text-sm text-ink/40">No artefacts yet.</li>}
          </ul>
        </div>

        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-2">
            Mastered ({mastered.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {mastered.map((n) => (
              <span
                key={n.id}
                className="text-xs px-2 py-1 rounded-md bg-itq/10 text-itq border border-itq/20"
              >
                {n.title}
              </span>
            ))}
            {mastered.length === 0 && <span className="text-sm text-ink/40">Just getting started.</span>}
          </div>
          {notes[0] && (
            <div className="mt-4 text-xs text-ink/60">
              <span className="uppercase tracking-wide text-ink/40">Coach · </span>
              {notes[0].note}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Coach ---------------------------------------------------------------
function CoachView() {
  const { students } = cohortSummary();
  const recentNotes = [...COACH_NOTES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-sand bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream text-ink/50 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left p-3">Learner</th>
              <th className="text-left p-3">Coverage</th>
              <th className="text-left p-3 hidden md:table-cell">Status mix</th>
              <th className="text-left p-3">Signal</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const nearUnlock = s.projects.find((p) => !p.unlocked && p.pct >= 50);
              const signal = nearUnlock
                ? `1–2 outcomes from “${nearUnlock.title}”`
                : s.coverage.pct < 15
                  ? 'Early — encourage & settle in'
                  : s.projects.some((p) => p.unlocked)
                    ? 'Project unlocked — in delivery'
                    : 'Building foundations';
              return (
                <tr key={s.persona.id} className="border-t border-sand">
                  <td className="p-3">
                    <div className="font-medium text-itq">{s.persona.name}</div>
                    <div className="text-[11px] text-ink/40">
                      Yr {s.persona.year} · {s.persona.stream}
                    </div>
                  </td>
                  <td className="p-3 text-bronze font-medium">{s.coverage.pct}%</td>
                  <td className="p-3 hidden md:table-cell w-48">
                    <StatusBar statuses={s.statuses} />
                  </td>
                  <td className="p-3 text-ink/70">{signal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-sand bg-white p-5">
        <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-3">
          Action queue — recent coaching notes
        </div>
        <ul className="space-y-3">
          {recentNotes.map((n) => {
            const who = personaById(n.studentId)?.name ?? n.studentId;
            return (
              <li key={n.id} className="flex items-start gap-3">
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-sand text-ink/60 mt-0.5 shrink-0">
                  {n.focus}
                </span>
                <div>
                  <div className="text-sm">
                    <span className="font-medium text-itq">{who}</span>{' '}
                    <span className="text-ink/40 text-xs">· {n.date}</span>
                  </div>
                  <p className="text-sm text-ink/70">{n.note}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ---- Parent --------------------------------------------------------------
function ParentView() {
  const { personaId } = useManhal();
  const s = studentSummary(personaId);
  const arts = artefactsFor(personaId);
  const notes = notesFor(personaId);
  const wellbeing = notes.find((n) => n.focus === 'wellbeing') ?? notes[0];
  const project = [...s.projects].sort((a, b) => b.pct - a.pct)[0];
  const masteredCount = s.coverage.mastered;

  return (
    <div className="space-y-6">
      <PersonaPicker />
      <div className="rounded-xl border border-sand bg-white p-6">
        <p className="serif text-2xl text-itq leading-relaxed">
          This term, {s.persona.name.split(' ')[0]} has mastered{' '}
          <span className="text-olive">{masteredCount}</span> learning outcomes and is{' '}
          {project?.unlocked ? 'leading' : 'working toward'} a real project.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50">Their project</div>
          {project && (
            <>
              <div className="serif text-lg text-itq mt-1">{project.title}</div>
              <p className="text-sm text-ink/70 mt-1">{challengeById(project.id)?.summary}</p>
              <div className="text-xs text-ink/50 mt-2">
                {project.unlocked
                  ? 'Unlocked — now applying the maths in a real build.'
                  : `Almost there — ${project.ready} of ${project.required} skills ready.`}
              </div>
            </>
          )}
        </div>
        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50">
            A note from the Learning Coach
          </div>
          {wellbeing ? (
            <>
              <p className="text-sm text-ink/80 mt-2">{wellbeing.note}</p>
              <div className="text-xs text-ink/40 mt-2">
                {wellbeing.coach} · {wellbeing.date}
              </div>
            </>
          ) : (
            <p className="text-sm text-ink/50 mt-2">No notes this week.</p>
          )}
        </div>
      </div>

      {arts[0] && (
        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50">
            Something they made
          </div>
          <div className="serif text-lg text-itq mt-1">{arts[0].title}</div>
          <p className="text-sm text-ink/70 mt-1 italic">“{arts[0].reflection}”</p>
        </div>
      )}
    </div>
  );
}

// ---- Leadership ----------------------------------------------------------
const STATUS_HEX: Record<MasteryStatus, string> = {
  mastered: '#2F4A3C',
  proficient: '#6C7D3C',
  in_progress: '#B26540',
  available: '#9A7B4F',
  locked: '#D8DED3',
};

function LeadershipView() {
  const c = cohortSummary();
  const coverageData = c.students.map((s) => ({
    name: s.persona.name.split(' ')[0],
    coverage: s.coverage.pct,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Metric label="Learners" value={c.students.length} tone="text-ink" />
        <Metric label="Avg coverage" value={`${c.avgCoverage}%`} tone="text-bronze" />
        <Metric label="Outcomes mastered" value={c.totalMastered} tone="text-itq" />
        <Metric label="Projects unlocked" value={c.unlockedProjects} tone="text-olive" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-3">
            Coverage by learner
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageData} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#1F2421' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip cursor={{ fill: '#EEF1EC' }} />
                <Bar dataKey="coverage" radius={[4, 4, 0, 0]} fill="#9A7B4F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-sand bg-white p-5">
          <div className="text-[11px] uppercase tracking-wide text-ink/50 mb-3">
            Status distribution (cohort × outcomes)
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={c.statusDist} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <XAxis
                  dataKey="status"
                  tick={{ fontSize: 11, fill: '#1F2421' }}
                  tickFormatter={(s: MasteryStatus) => STATUS_META[s].label}
                />
                <YAxis tick={{ fontSize: 12, fill: '#888' }} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#EEF1EC' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {c.statusDist.map((d) => (
                    <Cell key={d.status} fill={STATUS_HEX[d.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <p className="text-xs text-ink/50">
        In production this rolls up from the LRS across every cohort, with the same gating logic —
        giving leadership a live read on mastery, project readiness and where to direct coaching.
      </p>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number | string; tone: string }) {
  return (
    <div className="rounded-lg border border-sand bg-white p-4">
      <div className="text-[11px] uppercase tracking-wide text-ink/50">{label}</div>
      <div className={`text-2xl font-semibold mt-1 ${tone}`}>{value}</div>
    </div>
  );
}
