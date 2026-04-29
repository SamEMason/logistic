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
  prepStartTime: number;
};

export type TransitState = {
  type: 'TRANSIT';
  itemsChecked: boolean;
  transitStartTime: number;
};

export type CompletedState = {
  type: 'COMPLETED';
  completedTime: number;
};
