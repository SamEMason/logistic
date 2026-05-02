import BlockContainer from '@/components/BlockContainer';
import { Workflow } from '@/schemas/workflow';
import { formatTimestamp } from '@/utils';

interface CompletedBlockPropsType {
  workflow: Workflow;
  transition: () => void;
}

export default function CompletedBlock({
  workflow,
  transition,
}: CompletedBlockPropsType) {
  const formattedTimestamp = formatTimestamp(workflow.timestamp);

  return (
    <BlockContainer>
      <h1>Completed</h1>
      <div>{workflow.type}</div>
      <div>{formattedTimestamp ? formattedTimestamp : Date.now()}</div>
    </BlockContainer>
  );
}
