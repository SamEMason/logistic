export type JobState =
  | IdleState
  | PreppingState
  | TransitState
  | ArrivedState
  | CompletedState;

type GeneralState = {
  timestamp: number | null;
  location?: {
    x: number;
    y: number;
    notes?: string;
  };
};

export type IdleState = GeneralState & {
  type: 'IDLE';
};

export type PreppingState = GeneralState & {
  type: 'PREPPING';
  itemsChecked: boolean;
};

export type TransitState = GeneralState & {
  type: 'TRANSIT';
};

export type ArrivedState = GeneralState & {
  type: 'ARRIVED';
};

export type CompletedState = GeneralState & {
  type: 'COMPLETED';
};
