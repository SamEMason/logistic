import { Workflow } from '@/schemas/workflow';
import { formatTimestamp } from '@/utils';
import BlockContainer from '../BlockContainer';

interface TransitBlockPropsType {
  workflow: Workflow;
  transition: () => void;
}

export default function TransitBlock({
  workflow,
  transition,
}: TransitBlockPropsType) {
  const formattedTimestamp = formatTimestamp(workflow.timestamp);

  return (
    <BlockContainer>
      <h1>Transit</h1>
      <div>{workflow.type}</div>
      <div>{formattedTimestamp ? formattedTimestamp : Date.now()}</div>
    </BlockContainer>
  );
}
