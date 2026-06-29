import { useStore } from './store';

export const SubmitButton = ({ onResult }) => {
  const nodes = useStore(s => s.nodes);
  const edges = useStore(s => s.edges);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map(n => ({ id: n.id })),
          edges: edges.map(e => ({ source: e.source, target: e.target })),
        }),
      });
      const data = await res.json();
      onResult(data);
    } catch (err) {
      alert('Backend not reachable. Make sure uvicorn is running on port 8000.');
    }
  };

  return (
    <div className="submit-bar">
      <button className="submit-btn" onClick={handleSubmit}>
        Run Pipeline
      </button>
    </div>
  );
};
