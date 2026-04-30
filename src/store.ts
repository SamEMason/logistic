import { create } from 'zustand';
import {
  CompletedState,
  IdleState,
  JobState,
  PreppingState,
  TransitState,
} from './types/job';
import { persist } from 'zustand/middleware';

type JobStore = {
  jobState: JobState;
  transition: () => void;
  reset: () => void;
};

// IDLE state set as initial system state
const idleState: IdleState = { type: 'IDLE' };

// IDLE state set as initial system state
const preppingState: PreppingState = {
  type: 'PREPPING',
  prepStartTime: null,
};

const transitState: TransitState = {
  type: 'TRANSIT',
  itemsChecked: true,
  transitStartTime: null,
};

const completedState: CompletedState = {
  type: 'COMPLETED',
  completedTime: null,
};

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobState: idleState,

      transition: () => {
        // Get current Job State
        const { jobState, reset } = get();

        switch (jobState.type) {
          case 'IDLE':
            set({ jobState: { ...preppingState, prepStartTime: Date.now() } });
            break;
          case 'PREPPING':
            set({
              jobState: { ...transitState, transitStartTime: Date.now() },
            });
            break;
          case 'TRANSIT':
            set({ jobState: { ...completedState, completedTime: Date.now() } });
            break;
          case 'COMPLETED':
            reset();
            break;
        }
      },

      reset: () => set({ jobState: idleState }),
    }),
    {
      name: 'logistic-storage',
    }
  )
);
