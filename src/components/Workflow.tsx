'use client';

import { WORKFLOW_STATE } from '@/constants/workflow';
import { useWorkflowStore } from '@/store';

import {
  IdleBlock,
  PreppingBlock,
  TransitBlock,
  ArrivedBlock,
  CompletedBlock,
} from './blocks';
import TransitionButton from './TransitionButton';

const RenderBlock = {
  [WORKFLOW_STATE.idle]: IdleBlock,
  [WORKFLOW_STATE.prepping]: PreppingBlock,
  [WORKFLOW_STATE.transit]: TransitBlock,
  [WORKFLOW_STATE.arrived]: ArrivedBlock,
  [WORKFLOW_STATE.completed]: CompletedBlock,
};

export default function Workflow() {
  const workflow = useWorkflowStore((state) => state.workflow);
  const transition = useWorkflowStore((state) => state.transition);

  const CurrentBlock = RenderBlock[workflow.type];

  return (
    <div className="flex flex-col flex-1 gap-4">
      <h1 className="text-xl font-black">Workflow</h1>
      <CurrentBlock workflow={workflow} transition={transition} />
      <TransitionButton transition={transition}>Next Step</TransitionButton>
    </div>
  );
}
