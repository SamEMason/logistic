import { expect, describe, test } from 'vitest';
import { useJobStore } from '@/store';
import { JOB_STATE } from '@/constants/jobstate';

describe('TypeState transition functionality', () => {
  test('FSM Logic: IDLE as initial state', () => {
    const store = useJobStore;

    // Initial
    expect(store.getState().jobState.type).toBe(JOB_STATE.idle);
  });

  test('FSM Logic: IDLE to PREPPING', () => {
    const store = useJobStore;

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().jobState.type).toBe(JOB_STATE.prepping);
    expect(store.getState().jobState.timestamp).not.toBeNull();
  });

  test('FSM Logic: PREPPING to TRANSIT', () => {
    const store = useJobStore;

    store.getState()._seedState(JOB_STATE.prepping);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().jobState.type).toBe(JOB_STATE.transit);
    expect(store.getState().jobState.timestamp).not.toBeNull();
  });

  test('FSM Logic: TRANSIT to ARRIVED', () => {
    const store = useJobStore;

    store.getState()._seedState(JOB_STATE.transit);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().jobState.type).toBe(JOB_STATE.arrived);
    expect(store.getState().jobState.timestamp).not.toBeNull();
  });

  test('FSM Logic: ARRIVED to COMPLETED', () => {
    const store = useJobStore;

    store.getState()._seedState(JOB_STATE.arrived);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().jobState.type).toBe(JOB_STATE.completed);
    expect(store.getState().jobState.timestamp).not.toBeNull();
  });

  test('FSM Logic: COMPLETED to IDLE', () => {
    const store = useJobStore;

    store.getState()._seedState(JOB_STATE.completed);

    // Transition
    store.getState().transition();

    // Verify
    expect(store.getState().jobState.type).toBe(JOB_STATE.idle);
    expect(store.getState().jobState.timestamp).not.toBeNull();
  });
});
