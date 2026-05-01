import { create } from 'zustand';
import {
  ArrivedState,
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
const idleState: IdleState = { type: 'IDLE', timestamp: null };

// IDLE state set as initial system state
const preppingState: PreppingState = {
  type: 'PREPPING',
  timestamp: null,
  itemsChecked: false,
};

const transitState: TransitState = {
  type: 'TRANSIT',
  timestamp: null,
};

const arrivedState: ArrivedState = {
  type: 'ARRIVED',
  timestamp: null,
};

const completedState: CompletedState = {
  type: 'COMPLETED',
  timestamp: null,
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
            set({ jobState: { ...preppingState, timestamp: Date.now() } });
            break;
          case 'PREPPING':
            set({
              jobState: { ...transitState, timestamp: Date.now() },
            });
            break;
          case 'TRANSIT':
            set({ jobState: { ...arrivedState, timestamp: Date.now() } });
            break;
          case 'ARRIVED':
            set({ jobState: { ...completedState, timestamp: Date.now() } });
            break;
          case 'COMPLETED':
            reset();
            break;
        }
      },

      _seedState: (targetState: string) => {
        const setState: Record<string, JobState> = {
          idle: { ...idleState, timestamp: Date.now() },
          prepping: { ...preppingState, timestamp: Date.now() },
          transit: { ...transitState, timestamp: Date.now() },
          arrived: { ...arrivedState, timestamp: Date.now() },
          completed: { ...completedState, timestamp: Date.now() },
        };

        const state = setState[targetState.toLowerCase().trim()];

        set({ jobState: state });
      },

      reset: () => set({ jobState: idleState }),
    }),
    {
      name: 'logistic-storage',
    }
  )
);
