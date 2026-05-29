import type { MasteryStatus } from '../content/data/manhal/types';

// Single source of truth for how each mastery status looks across the app
// (graph nodes, badges, legend, dashboards) so colour == meaning everywhere.

export const STATUS_ORDER: MasteryStatus[] = [
  'mastered',
  'proficient',
  'in_progress',
  'available',
  'locked',
];

export interface StatusMeta {
  label: string;
  dot: string; // bg utility for a small dot
  text: string; // text colour utility
  card: string; // full card styling for the graph node
}

export const STATUS_META: Record<MasteryStatus, StatusMeta> = {
  mastered: {
    label: 'Mastered',
    dot: 'bg-itq',
    text: 'text-itq',
    card: 'bg-itq text-cream border-itq',
  },
  proficient: {
    label: 'Proficient',
    dot: 'bg-olive',
    text: 'text-olive',
    card: 'bg-olive text-cream border-olive',
  },
  in_progress: {
    label: 'In progress',
    dot: 'bg-terra',
    text: 'text-terra',
    card: 'bg-terra text-cream border-terra',
  },
  available: {
    label: 'Available',
    dot: 'bg-bronze',
    text: 'text-bronze',
    card: 'bg-white text-ink border-bronze',
  },
  locked: {
    label: 'Locked',
    dot: 'bg-ink/30',
    text: 'text-ink/40',
    card: 'bg-sand text-ink/40 border-sand border-dashed',
  },
};
