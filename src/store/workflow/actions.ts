import { StateCreator } from 'zustand';
import { WorkflowActions, WorkflowStore } from './state';
import { Workflow } from '@/schemas/workflow';
import { buildState, initialState, StateTransitions } from './state';
import { WORKFLOW_STATE } from '@/constants/workflow';

export const actionCreator: StateCreator<
  WorkflowStore,
  [['zustand/persist', unknown]],
  [],
  WorkflowActions
> = (set, get, _) => ({
  transition: () => {
    const state = get();

    const currentType = state.workflow.type;
    const nextType: Workflow['type'] = StateTransitions[currentType];
    const now = Date.now();

    if (currentType === WORKFLOW_STATE.completed) {
      state.reset();
      return;
    }

    set({ workflow: buildState(nextType, now) });
  },

  _seedState: (targetState: Workflow['type']) => {
    set({ workflow: buildState(targetState, Date.now()) });
  },

  reset: () => {
    set({ workflow: { ...initialState, timestamp: Date.now() } as Workflow });

    // Trigger end of shift lifecycle logic below
    // ...
  },
});
