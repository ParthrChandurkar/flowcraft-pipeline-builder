import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode }  from './nodes/inputNode';
import { LLMNode }    from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode }   from './nodes/textNode';
import { NoteNode, MathNode, ApiNode, FilterNode, TimerNode } from './nodes/customNodes';
import 'reactflow/dist/style.css';

const nodeTypes = {
  customInput: InputNode,
  llm:         LLMNode,
  customOutput: OutputNode,
  text:        TextNode,
  note:        NoteNode,
  math:        MathNode,
  api:         ApiNode,
  filter:      FilterNode,
  timer:       TimerNode,
};

const proOptions = { hideAttribution: true };
const gridSize = 20;

const selector = (s) => ({
  nodes: s.nodes, edges: s.edges,
  getNodeID: s.getNodeID, addNode: s.addNode,
  onNodesChange: s.onNodesChange,
  onEdgesChange: s.onEdgesChange,
  onConnect: s.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const raw = event.dataTransfer.getData('application/reactflow');
    if (!raw) return;
    const { nodeType } = JSON.parse(raw);
    if (!nodeType) return;
    const position = rfInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    const id = getNodeID(nodeType);
    addNode({ id, type: nodeType, position, data: { id, nodeType } });
  }, [rfInstance, getNodeID, addNode]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        onConnect={onConnect} onDrop={onDrop} onDragOver={onDragOver}
        onInit={setRfInstance} nodeTypes={nodeTypes}
        proOptions={proOptions} snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#2e3650" gap={gridSize} />
        <Controls />
        <MiniMap nodeColor="#252b3b" maskColor="rgba(15,17,23,0.7)" />
      </ReactFlow>
    </div>
  );
};
