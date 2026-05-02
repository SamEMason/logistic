import { z } from 'zod';
import { WORKFLOW_STATE } from '@/constants/workflow';

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

export const WorkflowSchema = z.discriminatedUnion('type', [
  BaseSchema.extend({
    type: z.literal(WORKFLOW_STATE.idle),
  }),
  BaseSchema.extend({
    type: z.literal(WORKFLOW_STATE.prepping),
    itemsChecked: z.boolean().default(false),
  }),
  BaseSchema.extend({
    type: z.literal(WORKFLOW_STATE.transit),
  }),
  BaseSchema.extend({
    type: z.literal(WORKFLOW_STATE.arrived),
  }),
  BaseSchema.extend({
    type: z.literal(WORKFLOW_STATE.completed),
  }),
]);

export type Workflow = z.infer<typeof WorkflowSchema>;

export type IdleState = Extract<Workflow, { type: typeof WORKFLOW_STATE.idle }>;

export type PreppingState = Extract<
  Workflow,
  { type: typeof WORKFLOW_STATE.prepping }
>;

export type TransitState = Extract<
  Workflow,
  { type: typeof WORKFLOW_STATE.transit }
>;

export type ArrivedState = Extract<
  Workflow,
  { type: typeof WORKFLOW_STATE.arrived }
>;

export type CompletedState = Extract<
  Workflow,
  { type: typeof WORKFLOW_STATE.completed }
>;
