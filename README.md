# FlowCraft Pipeline Builder

FlowCraft is a visual pipeline builder for composing node-based workflows on a drag-and-drop canvas. It includes a React Flow frontend for creating pipelines and a FastAPI backend that analyzes a submitted graph.

## Features

- Drag-and-drop canvas for building connected workflow nodes
- Reusable node abstraction for inputs, outputs, LLM prompts, text transforms, notes, math, API calls, filters, and timers
- Dynamic text node handles from `{{variable}}` placeholders
- Animated smooth-step edges, minimap, controls, and grid snapping
- One-click pipeline submission to a backend parser
- Backend response with node count, edge count, and DAG validation

## Tech Stack

- React 18
- React Flow
- Zustand
- FastAPI
- Pydantic

## Project Structure

```text
.
|-- backend/
|   |-- main.py
|   `-- requirements.txt
`-- frontend/
    |-- public/
    |-- src/
    |   |-- nodes/
    |   |-- App.js
    |   |-- store.js
    |   |-- toolbar.js
    |   |-- ui.js
    |   `-- submit.js
    `-- package.json
```

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

On Windows PowerShell, activate the environment with:

```powershell
.\.venv\Scripts\Activate.ps1
```

The API runs at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The app runs at `http://localhost:3000` and expects the backend to be available on port `8000`.

## API

### `POST /pipelines/parse`

Accepts a pipeline graph:

```json
{
  "nodes": [{ "id": "input-1" }],
  "edges": [{ "source": "input-1", "target": "text-1" }]
}
```

Returns graph analysis:

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## Notes

- The backend currently validates graph shape and detects cycles; it does not execute node logic.
- The frontend sends only node IDs and edge endpoints to the backend parser.
