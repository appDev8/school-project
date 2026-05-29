import { create } from 'zustand';
import { PERSONAS } from '../content/data/manhal/personas';

// Shared UI state: which synthetic learner we're viewing and which outcome is
// selected. Dashboards and the graph read from here so they stay in sync.
interface ManhalState {
  personaId: string;
  nodeId: string | null;
  setPersona: (id: string) => void;
  selectNode: (id: string | null) => void;
}

export const useManhal = create<ManhalState>((set) => ({
  personaId: PERSONAS[0].id,
  nodeId: null,
  setPersona: (id) => set({ personaId: id, nodeId: null }),
  selectNode: (id) => set({ nodeId: id }),
}));
