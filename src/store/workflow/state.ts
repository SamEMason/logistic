import { WORKFLOW_STATE } from '@/constants/workflow';
import {
  ArrivedState,
  CompletedState,
  IdleState,
  Workflow,
  PreppingState,
  TransitState,
} from '@/schemas/workflow';

export type WorkflowStore = {
  workflow: Workflow;
  transition: () => void;
  _seedState: (targetState: Workflow['type']) => void;
  reset: () => void;
};

export type WorkflowActions = Omit<WorkflowStore, 'workflow'>;

// --- 1. STATE DEFINITIONS (Blueprints) ---

export const idleState: IdleState = {
  type: WORKFLOW_STATE.idle,
  timestamp: null,
};

export const preppingState: PreppingState = {
  type: WORKFLOW_STATE.prepping,
  timestamp: null,
  itemsChecked: false,
};

export const transitState: TransitState = {
  type: WORKFLOW_STATE.transit,
  timestamp: null,
};

export const arrivedState: ArrivedState = {
  type: WORKFLOW_STATE.arrived,
  timestamp: null,
};

export const completedState: CompletedState = {
  type: WORKFLOW_STATE.completed,
  timestamp: null,
};

export const initialState = idleState;

// --- 2. TRANSITION LOGIC (The Rules) ---

export const StateTransitions: Record<Workflow['type'], Workflow['type']> = {
  [WORKFLOW_STATE.idle]: WORKFLOW_STATE.prepping,
  [WORKFLOW_STATE.prepping]: WORKFLOW_STATE.transit,
  [WORKFLOW_STATE.transit]: WORKFLOW_STATE.arrived,
  [WORKFLOW_STATE.arrived]: WORKFLOW_STATE.completed,
  [WORKFLOW_STATE.completed]: WORKFLOW_STATE.idle,
};

// --- 3. STATE ACTIONS (The Builders) ---

const STATE_MAP = {
  [WORKFLOW_STATE.idle]: idleState,
  [WORKFLOW_STATE.prepping]: preppingState,
  [WORKFLOW_STATE.transit]: transitState,
  [WORKFLOW_STATE.arrived]: arrivedState,
  [WORKFLOW_STATE.completed]: completedState,
} as const;

export const buildState = (type: Workflow['type'], timestamp: number) => {
  const baseState = STATE_MAP[type];

  return { ...baseState, timestamp } as Workflow;
};
