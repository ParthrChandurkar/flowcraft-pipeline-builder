import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const variables = extractVariables(currText);

  const autoResize = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    // Reset height first so scrollHeight shrinks when text is deleted.
    ta.style.height = '0px';
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  useEffect(() => {
    autoResize();
  }, [currText, autoResize]);

  const handleChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div className="base-node" style={{ '--accent': '#ec4899', minWidth: 220, maxWidth: 400 }}>
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: `${((i + 1) / (variables.length + 1)) * 100}%` }}
          title={v}
        />
      ))}

      <div className="node-header">
        <span className="node-icon">TXT</span>
        <span className="node-title">Text</span>
      </div>

      <div className="node-body">
        {variables.length > 0 && (
          <div className="var-tags">
            {variables.map(v => (
              <span key={v} className="var-tag">{v}</span>
            ))}
          </div>
        )}
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={currText}
          onChange={handleChange}
          style={{
            resize: 'none',
            overflow: 'hidden',
            minHeight: '56px',
            width: '100%',
          }}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
