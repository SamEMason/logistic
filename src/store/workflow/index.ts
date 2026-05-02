import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { actionCreator } from './actions';
import { initialState, WorkflowStore } from './state';

export const useWorkflowStore = create<WorkflowStore>()(
  persist(
    (set, get, store) => ({
      ...actionCreator(set, get, store),
      workflow: initialState,
    }),
    {
      name: 'workflow-storage',
    }
  )
);
