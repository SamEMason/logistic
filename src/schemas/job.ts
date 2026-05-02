import { z } from 'zod';
import { JOB_STATE } from '@/constants/jobstate';

const LocationSchema = z.object({
  x: z.number(),
  y: z.number(),
  notes: z.string().optional(),
});

const BaseSchema = z.object({
  timestamp: z.number().nullable(),
  location: LocationSchema.optional(),
  notes: z.string().optional(),
});

export const JobStateSchema = z.discriminatedUnion('type', [
  BaseSchema.extend({
    type: z.literal(JOB_STATE.idle),
  }),
  BaseSchema.extend({
    type: z.literal(JOB_STATE.prepping),
    itemsChecked: z.boolean().default(false),
  }),
  BaseSchema.extend({
    type: z.literal(JOB_STATE.transit),
  }),
  BaseSchema.extend({
    type: z.literal(JOB_STATE.arrived),
  }),
  BaseSchema.extend({
    type: z.literal(JOB_STATE.completed),
  }),
]);

export type JobState = z.infer<typeof JobStateSchema>;

export type IdleState = Extract<JobState, { type: typeof JOB_STATE.idle }>;

export type preppingState = Extract<
  JobState,
  { type: typeof JOB_STATE.prepping }
>;

export type transitState = Extract<
  JobState,
  { type: typeof JOB_STATE.transit }
>;

export type arrivedState = Extract<
  JobState,
  { type: typeof JOB_STATE.arrived }
>;

export type completedState = Extract<
  JobState,
  { type: typeof JOB_STATE.completed }
>;
