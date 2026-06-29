const NODES = [
  { type: 'customInput', label: 'Input', icon: 'IN' },
  { type: 'customOutput', label: 'Output', icon: 'OUT' },
  { type: 'llm', label: 'LLM', icon: 'AI' },
  { type: 'text', label: 'Text', icon: 'TXT' },
  { type: 'note', label: 'Note', icon: 'N' },
  { type: 'math', label: 'Math', icon: '+-' },
  { type: 'api', label: 'API Call', icon: 'API' },
  { type: 'filter', label: 'Filter', icon: 'IF' },
  { type: 'timer', label: 'Timer', icon: 'T' },
];

export const PipelineToolbar = () => {
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="toolbar">
      <div className="toolbar-label">Nodes</div>
      {NODES.map(({ type, label, icon }) => (
        <div
          key={type}
          className="draggable-node"
          draggable
          onDragStart={e => onDragStart(e, type)}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};
