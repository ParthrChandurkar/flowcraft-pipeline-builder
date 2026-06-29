import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="OUT"
      accentColor="#f59e0b"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[{ id: 'passthrough', label: 'Passthrough' }]}
    >
      <label className="node-label">
        Name
        <input className="node-input" value={currName} onChange={e => setCurrName(e.target.value)} />
      </label>
      <label className="node-label">
        Type
        <select className="node-select" value={outputType} onChange={e => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
