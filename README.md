# FlowCraft Pipeline Builder

FlowCraft is a visual workflow editor built with React Flow and FastAPI. Users can arrange and connect nodes on a canvas, then submit the graph to an API that reports its size and whether it is a directed acyclic graph.

## Features

- Drag-and-drop workflow canvas with grid snapping, controls, and a minimap
- Reusable input, output, LLM, text, note, math, API, filter, and timer nodes
- Dynamic text-node handles derived from `{{variable}}` placeholders
- Zustand-based client state
- Backend validation of node references and graph cycles

## Architecture

The React frontend owns the editable node and edge state. Selecting **Run Pipeline** sends node IDs and edge endpoints to the FastAPI backend. The backend validates the graph, counts its nodes and edges, and returns whether it is a DAG.

## Tech Stack

- React 18 and React Flow
- Zustand
- FastAPI and Pydantic
- pytest

## Getting Started

Prerequisites: Node.js 18 or newer, npm, and Python 3.9 or newer.

Start the backend:

```bash
cd backend
python -m venv .venv
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:3000` and calls the API at `http://localhost:8000` by default.

## API

`GET /` returns a basic service message. `POST /pipelines/parse` accepts nodes and edges and returns `num_nodes`, `num_edges`, and `is_dag`.

## Testing

```bash
python -m pytest backend/tests
```

## Limitations

- Pipelines are analyzed but not executed.
- Workflow state is not persisted.
- Authentication and multi-user collaboration are not implemented.

