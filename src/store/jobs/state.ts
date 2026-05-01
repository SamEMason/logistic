import { JOB_STATE } from '@/constants/jobstate';
import {
  ArrivedState,
  CompletedState,
  IdleState,
  JobState,
  PreppingState,
  TransitState,
} from '@/types/job';

export type JobStore = {
  jobState: JobState;
  transition: () => void;
  _seedState: (targetState: JobState['type']) => void;
  reset: () => void;
};

export type JobActions = Omit<JobStore, 'jobState'>;

// --- 1. STATE DEFINITIONS (Blueprints) ---

export const idleState: IdleState = { type: JOB_STATE.idle, timestamp: null };

export const preppingState: PreppingState = {
  type: JOB_STATE.prepping,
  timestamp: null,
  itemsChecked: false,
};

export const transitState: TransitState = {
  type: JOB_STATE.transit,
  timestamp: null,
};

export const arrivedState: ArrivedState = {
  type: JOB_STATE.arrived,
  timestamp: null,
};

export const completedState: CompletedState = {
  type: JOB_STATE.completed,
  timestamp: null,
};

export const initialState = idleState;

// --- 2. TRANSITION LOGIC (The Rules) ---

export const StateTransitions: Record<JobState['type'], JobState['type']> = {
  [JOB_STATE.idle]: JOB_STATE.prepping,
  [JOB_STATE.prepping]: JOB_STATE.transit,
  [JOB_STATE.transit]: JOB_STATE.arrived,
  [JOB_STATE.arrived]: JOB_STATE.completed,
  [JOB_STATE.completed]: JOB_STATE.idle,
};

// --- 3. STATE ACTIONS (The Builders) ---

const STATE_MAP = {
  [JOB_STATE.idle]: idleState,
  [JOB_STATE.prepping]: preppingState,
  [JOB_STATE.transit]: transitState,
  [JOB_STATE.arrived]: arrivedState,
  [JOB_STATE.completed]: completedState,
} as const;

export const buildState = (type: JobState['type'], timestamp: number) => {
  const baseState = STATE_MAP[type];

  return { ...baseState, timestamp } as JobState;
};
