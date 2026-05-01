import { expect, test } from 'vitest';
import { useJobStore } from '@/store';

test('FSM Logic: IDLE to PREPPING', () => {
  const store = useJobStore;

  // Initial
  expect(store.getState().jobState.type).toBe('IDLE');

  // Transition
  store.getState().transition();

  // Verify
  expect(store.getState().jobState.type).toBe('PREPPING');
  expect(store.getState().jobState.timestamp).not.toBeNull();
});
