import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="LLM"
    icon="AI"
    accentColor="#6366f1"
    inputs={[
      { id: 'system', label: 'System Prompt' },
      { id: 'prompt', label: 'User Prompt' },
    ]}
    outputs={[{ id: 'response', label: 'Response' }]}
  >
    <p className="node-desc">Large Language Model</p>
  </BaseNode>
);
