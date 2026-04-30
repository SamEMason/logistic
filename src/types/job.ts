export type JobState =
  | IdleState
  | PreppingState
  | TransitState
  | CompletedState;

export type IdleState = {
  type: 'IDLE';
};

export type PreppingState = {
  type: 'PREPPING';
  prepStartTime: number | null;
};

export type TransitState = {
  type: 'TRANSIT';
  itemsChecked: boolean;
  transitStartTime: number | null;
};

export type CompletedState = {
  type: 'COMPLETED';
  completedTime: number | null;
};
