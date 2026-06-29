import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');
  return (
    <BaseNode id={id} title="Note" icon="N" accentColor="#facc15">
      <textarea
        className="node-textarea"
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={3}
      />
    </BaseNode>
  );
};

export const MathNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.op || '+');
  return (
    <BaseNode
      id={id} title="Math" icon="+-" accentColor="#0ea5e9"
      inputs={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]}
      outputs={[{ id: 'result', label: 'Result' }]}
    >
      <label className="node-label">
        Operation
        <select className="node-select" value={op} onChange={e => setOp(e.target.value)}>
          {['+', '-', '*', '/'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    </BaseNode>
  );
};

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');
  return (
    <BaseNode
      id={id} title="API Call" icon="API" accentColor="#8b5cf6"
      inputs={[{ id: 'body', label: 'Body' }]}
      outputs={[{ id: 'response', label: 'Response' }, { id: 'status', label: 'Status' }]}
    >
      <label className="node-label">
        Method
        <select className="node-select" value={method} onChange={e => setMethod(e.target.value)}>
          {['GET', 'POST', 'PUT', 'DELETE'].map(m => <option key={m}>{m}</option>)}
        </select>
      </label>
      <label className="node-label">
        URL
        <input className="node-input" value={url} onChange={e => setUrl(e.target.value)} />
      </label>
    </BaseNode>
  );
};

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');
  return (
    <BaseNode
      id={id} title="Filter" icon="IF" accentColor="#ef4444"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[{ id: 'pass', label: 'Pass' }, { id: 'fail', label: 'Fail' }]}
    >
      <label className="node-label">
        Condition
        <input className="node-input" value={condition} onChange={e => setCondition(e.target.value)} />
      </label>
    </BaseNode>
  );
};

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');
  return (
    <BaseNode
      id={id} title="Timer" icon="T" accentColor="#14b8a6"
      inputs={[{ id: 'trigger', label: 'Trigger' }]}
      outputs={[{ id: 'done', label: 'Done' }]}
    >
      <label className="node-label">
        Delay
        <input className="node-input" type="number" value={delay} onChange={e => setDelay(e.target.value)} />
      </label>
      <label className="node-label">
        Unit
        <select className="node-select" value={unit} onChange={e => setUnit(e.target.value)}>
          {['ms', 's', 'min'].map(u => <option key={u}>{u}</option>)}
        </select>
      </label>
    </BaseNode>
  );
};
