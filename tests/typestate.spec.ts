import { expect, describe, test } from 'vitest';
import { useWorkflowStore } from '@/store';
import { WORKFLOW_STATE } from '@/constants/workflow';

describe('TypeState transition functionality', () => {
  test('FSM Logic: IDLE as initial state', () => {
    const store = useWorkflowStore;

    // Initial
    expect(store.getState().workflow.type).toBe(WORKFLOW_STATE.idle);
  });

  test('FSM Logic: IDLE to PREPPING', () => {
    const store = useWorkflowStore;

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().workflow.type).toBe(WORKFLOW_STATE.prepping);
    expect(store.getState().workflow.timestamp).not.toBeNull();
  });

  test('FSM Logic: PREPPING to TRANSIT', () => {
    const store = useWorkflowStore;

    store.getState()._seedState(WORKFLOW_STATE.prepping);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().workflow.type).toBe(WORKFLOW_STATE.transit);
    expect(store.getState().workflow.timestamp).not.toBeNull();
  });

  test('FSM Logic: TRANSIT to ARRIVED', () => {
    const store = useWorkflowStore;

    store.getState()._seedState(WORKFLOW_STATE.transit);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().workflow.type).toBe(WORKFLOW_STATE.arrived);
    expect(store.getState().workflow.timestamp).not.toBeNull();
  });

  test('FSM Logic: ARRIVED to COMPLETED', () => {
    const store = useWorkflowStore;

    store.getState()._seedState(WORKFLOW_STATE.arrived);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().workflow.type).toBe(WORKFLOW_STATE.completed);
    expect(store.getState().workflow.timestamp).not.toBeNull();
  });

  test('FSM Logic: COMPLETED to IDLE', () => {
    const store = useWorkflowStore;

    store.getState()._seedState(WORKFLOW_STATE.completed);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().workflow.type).toBe(WORKFLOW_STATE.idle);
    expect(store.getState().workflow.timestamp).not.toBeNull();
  });
});
