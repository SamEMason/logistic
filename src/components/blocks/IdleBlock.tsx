import { Workflow } from '@/schemas/workflow';
import { formatTimestamp } from '@/utils';
import BlockContainer from '@/components/BlockContainer';
import TransitionButton from '@/components/TransitionButton';

interface IdleBlockPropsType {
  workflow: Workflow;
  transition: () => void;
}

export default function IdleBlock({
  workflow,
  transition,
}: IdleBlockPropsType) {
  const formattedTimestamp = formatTimestamp(workflow.timestamp);

  return (
    <BlockContainer>
      <h1>Idle</h1>
      <div>{workflow.type}</div>
      <div>{formattedTimestamp ? formattedTimestamp : Date.now()}</div>
    </BlockContainer>
  );
}
