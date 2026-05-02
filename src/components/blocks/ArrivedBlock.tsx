import BlockContainer from '@/components/BlockContainer';
import { Workflow } from '@/schemas/workflow';
import { formatTimestamp } from '@/utils';

interface ArrivedBlockPropsType {
  workflow: Workflow;
  transition: () => void;
}

export default function ArrivedBlock({
  workflow,
  transition,
}: ArrivedBlockPropsType) {
  const formattedTimestamp = formatTimestamp(workflow.timestamp);

  return (
    <BlockContainer>
      <h1>Arrived</h1>
      <div>{workflow.type}</div>
      <div>{formattedTimestamp ? formattedTimestamp : Date.now()}</div>
    </BlockContainer>
  );
}
