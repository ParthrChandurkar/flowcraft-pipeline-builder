import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';

const ResultModal = ({ result, onClose }) => (
  <div className="result-modal-overlay" onClick={onClose}>
    <div className="result-modal" onClick={e => e.stopPropagation()}>
      <h3>Pipeline Analysis</h3>
      <div className="result-row">
        <span className="result-key">Nodes</span>
        <span className="result-val">{result.num_nodes}</span>
      </div>
      <div className="result-row">
        <span className="result-key">Edges</span>
        <span className="result-val">{result.num_edges}</span>
      </div>
      <div className="result-row">
        <span className="result-key">Is DAG?</span>
        <span className={`result-val ${result.is_dag}`}>
          {result.is_dag ? 'Yes' : 'No (contains cycle)'}
        </span>
      </div>
      <button className="modal-close" onClick={onClose}>Close</button>
    </div>
  </div>
);

function App() {
  const [result, setResult] = useState(null);
  const clearCanvas = useStore(s => s.clearCanvas);

  return (
    <div className="app-wrapper">
      <header className="topbar">
        <div className="topbar-logo">
          <span className="logo-vs">FC</span>
          FlowCraft Pipeline Builder
        </div>
        <button className="clear-btn" onClick={clearCanvas}>
          Clear Canvas
        </button>
      </header>

      <div className="canvas-area">
        <PipelineToolbar />
        <PipelineUI />
      </div>

      <SubmitButton onResult={setResult} />

      {result && <ResultModal result={result} onClose={() => setResult(null)} />}
    </div>
  );
}

export default App;
