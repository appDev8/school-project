import { Suspense, useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { registry, GROUPS } from './registry';
import { SCHOOL } from './content/data/vantage';

export default function App() {
  const groups = GROUPS.filter((g) => registry.some((r) => r.group === g));
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-itq focus:text-cream focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      {/* Mobile top bar */}
      <header className="print:hidden md:hidden flex items-center justify-between bg-itq text-cream px-4 py-3 sticky top-0 z-20">
        <div className="serif text-lg leading-tight">{SCHOOL.name}</div>
        <button
          type="button"
          onClick={() => setNavOpen((v) => !v)}
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={navOpen}
          className="p-2 -mr-2 rounded hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream/60"
        >
          <span className="block w-5 h-0.5 bg-cream mb-1" />
          <span className="block w-5 h-0.5 bg-cream mb-1" />
          <span className="block w-5 h-0.5 bg-cream" />
        </button>
      </header>

      {/* Drawer backdrop (mobile only, when open) */}
      {navOpen && (
        <div
          className="print:hidden md:hidden fixed inset-0 z-30 bg-ink/40"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`print:hidden w-72 shrink-0 bg-itq text-cream p-5 flex flex-col gap-6 overflow-y-auto z-40
          fixed inset-y-0 left-0 transform transition-transform duration-200
          md:static md:translate-x-0 md:transition-none md:h-screen md:sticky md:top-0 ${
            navOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          <div className="serif text-xl leading-tight">{SCHOOL.name}</div>
          <div className="text-xs opacity-80 mt-1">
            {SCHOOL.operator} · {SCHOOL.tagline}
          </div>
        </div>

        <nav aria-label="Primary" className="flex flex-col gap-5 text-sm">
          {groups.map((g) => (
            <div key={g} className="flex flex-col gap-1">
              <div className="uppercase text-[10px] tracking-widest opacity-60">{g}</div>
              {registry
                .filter((r) => r.group === g)
                .map((r) => (
                  <NavLink
                    key={r.id}
                    to={`/${r.slug}`}
                    onClick={() => setNavOpen(false)}
                    className={({ isActive }) =>
                      `px-2 py-1 rounded transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cream/60 ${
                        isActive
                          ? 'bg-cream/15 text-white'
                          : 'opacity-85 hover:opacity-100 hover:bg-cream/10'
                      }`
                    }
                  >
                    {r.title}
                  </NavLink>
                ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full flex items-center gap-2 text-xs px-2.5 py-2 rounded border border-cream/20 hover:bg-cream/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream/60"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9V3h12v6" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
              <path d="M6 14h12v7H6z" />
            </svg>
            Save this page as PDF
          </button>
          <div className="text-[10px] opacity-60 leading-snug">{SCHOOL.status}</div>
        </div>
      </aside>

      <main id="main" className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto p-6 md:p-8">
          <Suspense
            fallback={
              <div className="flex items-center gap-2 text-sm text-ink/40 py-12">
                <span className="h-2 w-2 rounded-full bg-bronze animate-pulse" />
                Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              {registry.map((r) => (
                <Route key={r.id} path={`/${r.slug}`} element={<r.Component />} />
              ))}
              <Route path="*" element={<Navigate to="/overview" replace />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
