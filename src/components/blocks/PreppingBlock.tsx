import { Workflow } from '@/schemas/workflow';
import { formatTimestamp } from '@/utils';
import BlockContainer from '../BlockContainer';

interface PreppingBlockPropsType {
  workflow: Workflow;
  transition: () => void;
}

export default function PreppingBlock({
  workflow,
  transition,
}: PreppingBlockPropsType) {
  const formattedTimestamp = formatTimestamp(workflow.timestamp);

  return (
    <BlockContainer>
      <h1>Prepping</h1>
      <div>{workflow.type}</div>
      <div>{formattedTimestamp ? formattedTimestamp : Date.now()}</div>
    </BlockContainer>
  );
}
