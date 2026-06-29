// BaseNode.js - Core abstraction for all node types
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  icon,
  accentColor = '#6366f1',
  inputs = [],    // [{ id, label, position? }]
  outputs = [],   // [{ id, label, position? }]
  children,
}) => {
  return (
    <div className="base-node" style={{ '--accent': accentColor }}>
      {/* Input handles */}
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: input.position ?? `${((i + 1) / (inputs.length + 1)) * 100}%` }}
          title={input.label}
        />
      ))}

      {/* Node header */}
      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title">{title}</span>
      </div>

      {/* Node body */}
      <div className="node-body">
        {children}
      </div>

      {/* Output handles */}
      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: output.position ?? `${((i + 1) / (outputs.length + 1)) * 100}%` }}
          title={output.label}
        />
      ))}
    </div>
  );
};
