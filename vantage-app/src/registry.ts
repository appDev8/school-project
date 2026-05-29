import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export interface NavItem {
  id: string;
  slug: string;
  title: string;
  group: string;
  Component: LazyExoticComponent<ComponentType>;
}

/** Ordered nav groups; only those with at least one registered item are shown. */
export const GROUPS = [
  'Overview',
  'The Learning Model',
  'Manhal',
  'Dashboards',
  'Build & Operate',
  'Evidence',
];

/**
 * The single source of truth for navigation + routing. Add a module here to
 * surface it. Components are lazy-loaded so heavy routes (React Flow in Manhal,
 * Recharts in Dashboards) split into their own chunks and never bloat first load.
 */
export const registry: NavItem[] = [
  {
    id: 'overview',
    slug: 'overview',
    title: 'Overview',
    group: 'Overview',
    Component: lazy(() => import('./content/modules/Overview')),
  },
  {
    id: 'school',
    slug: 'school',
    title: 'The school — facts',
    group: 'Overview',
    Component: lazy(() => import('./content/modules/School')),
  },
  {
    id: 'learning-model',
    slug: 'learning-model',
    title: 'UXL learning model',
    group: 'The Learning Model',
    Component: lazy(() => import('./content/modules/LearningModel')),
  },
  {
    id: 'manhal',
    slug: 'manhal',
    title: 'Manhal — knowledge graph',
    group: 'Manhal',
    Component: lazy(() => import('./content/modules/Manhal')),
  },
  {
    id: 'dashboards',
    slug: 'dashboards',
    title: 'Role dashboards',
    group: 'Dashboards',
    Component: lazy(() => import('./content/modules/Dashboards')),
  },
  {
    id: 'spaces',
    slug: 'spaces',
    title: 'Spaces & city campus',
    group: 'Build & Operate',
    Component: lazy(() => import('./content/modules/Spaces')),
  },
  {
    id: 'people',
    slug: 'people',
    title: 'People & staffing',
    group: 'Build & Operate',
    Component: lazy(() => import('./content/modules/People')),
  },
  {
    id: 'onboarding',
    slug: 'onboarding',
    title: 'Onboarding & training',
    group: 'Build & Operate',
    Component: lazy(() => import('./content/modules/Onboarding')),
  },
  {
    id: 'partnerships',
    slug: 'partnerships',
    title: 'Industry partnerships',
    group: 'Build & Operate',
    Component: lazy(() => import('./content/modules/Partnerships')),
  },
  {
    id: 'roadmap',
    slug: 'roadmap',
    title: 'Roadmap & operations',
    group: 'Build & Operate',
    Component: lazy(() => import('./content/modules/Roadmap')),
  },
  {
    id: 'evidence',
    slug: 'evidence',
    title: 'Evidence & standards',
    group: 'Evidence',
    Component: lazy(() => import('./content/modules/Evidence')),
  },
];
