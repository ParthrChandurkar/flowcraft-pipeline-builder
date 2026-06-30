import { useStore } from './store';
import { API_BASE_URL } from './config';

export const SubmitButton = ({ onResult }) => {
  const nodes = useStore(s => s.nodes);
  const edges = useStore(s => s.edges);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map(n => ({ id: n.id })),
          edges: edges.map(e => ({ source: e.source, target: e.target })),
        }),
      });
      if (!res.ok) {
        throw new Error(`Pipeline analysis failed with status ${res.status}`);
      }
      const data = await res.json();
      onResult(data);
    } catch (err) {
      alert(`${err.message}. Make sure the API server is running at ${API_BASE_URL}.`);
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
