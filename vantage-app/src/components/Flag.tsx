import type { ReactNode } from 'react';
import type { FlagKind } from '../content/data/vantage';

// A small provenance chip. Every claim in the app is tagged so a reviewer can
// tell a verified fact from an established practice, a plan, or my [proposed] overlay.
const STYLES: Record<FlagKind, string> = {
  fact: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  practice: 'bg-sky-50 text-sky-700 border-sky-200',
  plan: 'bg-slate-100 text-slate-600 border-slate-200',
  proposed: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  verify: 'bg-amber-50 text-amber-700 border-amber-200',
  nesa: 'bg-purple-50 text-purple-700 border-purple-200',
  'nsw$': 'bg-teal-50 text-teal-700 border-teal-200',
};

const LABELS: Record<FlagKind, string> = {
  fact: 'fact',
  practice: 'practice',
  plan: 'plan',
  proposed: 'proposed',
  verify: 'verify',
  nesa: 'NESA',
  'nsw$': 'NSW $',
};

export function Flag({ kind, children }: { kind: FlagKind; children?: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border ${STYLES[kind]}`}
    >
      {LABELS[kind]}
      {children != null && (
        <span className="normal-case tracking-normal opacity-90">· {children}</span>
      )}
    </span>
  );
}
