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
import { JOB_STATE } from './constants/jobstate';

type JobStore = {
  jobState: JobState;
  transition: () => void;
  _seedState: (targetState: string) => void;
  reset: () => void;
};

// IDLE state set as initial system state
const idleState: IdleState = { type: JOB_STATE.idle, timestamp: null };

// IDLE state set as initial system state
const preppingState: PreppingState = {
  type: JOB_STATE.prepping,
  timestamp: null,
  itemsChecked: false,
};

const transitState: TransitState = {
  type: JOB_STATE.transit,
  timestamp: null,
};

const arrivedState: ArrivedState = {
  type: JOB_STATE.arrived,
  timestamp: null,
};

const completedState: CompletedState = {
  type: JOB_STATE.completed,
  timestamp: null,
};

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobState: idleState,

      transition: () => {
        // Get current Job State
        const { jobState, reset } = get();
        const now = Date.now();

        if (jobState.type === JOB_STATE.completed) {
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

      reset: () => {
        set({ jobState: { ...idleState, timestamp: Date.now() } });

        // Trigger end of shift lifecycle logic below
        // ...
      },
    }),
    {
      name: 'logistic-storage',
    }
  )
);
