import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { actionCreator } from './actions';
import { initialState, JobStore } from './state';

export const useJobStore = create<JobStore>()(
  persist(
    (set, get, store) => ({
      ...actionCreator(set, get, store),
      jobState: initialState,
    }),
    {
      name: 'logistic-storage',
    }
  )
);
