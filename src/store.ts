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
import Config from '@/config';

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

const StateTransitions: Record<JobState['type'], JobState['type'] | 'RESET'> = {
  IDLE: 'PREPPING',
  PREPPING: 'TRANSIT',
  TRANSIT: 'ARRIVED',
  ARRIVED: 'COMPLETED',
  COMPLETED: 'RESET',
};

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobState: idleState,

      transition: () => {
        // Get current Job State
        const { jobState, reset } = get();
        const now = Date.now();

        if (jobState.type === 'COMPLETED') {
          reset();
          return;
        }

        const transitions = {
          IDLE: { ...preppingState, timestamp: now },
          PREPPING: { ...transitState, timestamp: now },
          TRANSIT: { ...arrivedState, timestamp: now },
          ARRIVED: { ...completedState, timestamp: now },
        } as const;

        const nextState =
          transitions[jobState.type as keyof typeof transitions];

        if (nextState) {
          set({ jobState: nextState as JobState });
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

if (typeof window !== 'undefined' && Config.NODE_ENV === 'DEV') {
  (window as any).store = useJobStore;
}
