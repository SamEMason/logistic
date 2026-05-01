import { JobState } from '@/types/job';

type JobStateType = JobState['type'];

export const JOB_STATE = {
  idle: 'IDLE',
  prepping: 'PREPPING',
  transit: 'TRANSIT',
  arrived: 'ARRIVED',
  completed: 'COMPLETED',
} as const satisfies Record<string, JobStateType>;
