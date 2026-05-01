import { StateCreator } from 'zustand';
import { JobActions, JobStore } from './state';
import { JobState } from '@/types/job';
import { buildState, initialState, StateTransitions } from './state';
import { JOB_STATE } from '@/constants/jobstate';

export const actionCreator: StateCreator<
  JobStore,
  [['zustand/persist', unknown]],
  [],
  JobActions
> = (set, get, _) => ({
  transition: () => {
    const state = get();

    const currentType = state.jobState.type;
    const nextType: JobState['type'] = StateTransitions[currentType];
    const now = Date.now();

    if (currentType === JOB_STATE.completed) {
      state.reset();
      return;
    }

    set({ jobState: buildState(nextType, now) });
  },

  _seedState: (targetState: JobState['type']) => {
    set({ jobState: buildState(targetState, Date.now()) });
  },

  reset: () => {
    set({ jobState: { ...initialState, timestamp: Date.now() } as JobState });

    // Trigger end of shift lifecycle logic below
    // ...
  },
});
