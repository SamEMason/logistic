import { create } from 'zustand';
import { IdleState, JobState } from './types/job';

type JobStore = {
  jobState: JobState;
  reset: () => void;
};

const initialState: IdleState = { type: 'IDLE' };

export const useJobStore = create<JobStore>((set) => ({
  jobState: initialState,

  reset: () =>
    set({
      jobState: initialState,
    }),
}));
