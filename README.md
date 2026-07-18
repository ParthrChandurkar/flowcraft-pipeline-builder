# FlowCraft Pipeline Builder

## About

FlowCraft is a visual pipeline builder for composing node-based workflows on a drag-and-drop canvas. It combines a responsive React Flow Frontend with a FastAPI backend that analyzes submitted graphs in the real time.

## Features

- Drag-and-drop canvas for building connected workflow nodes
- Reusable node abstraction for inputs, outputs, LLM prompts, text transforms, notes, math, API calls, filters, and timers
- Dynamic text node handles from `{{variable}}` placeholders
- Animated smooth-step edges, minimap, controls, and grid snapping
- One-click pipeline submission to a backend parser
- Backend response with node count, edge count, and DAG validation

## Tech Stack

- **React 18** - component-based user interface
- **React Flow** - interactive node canvas
- **Zustand** - lightweight state management
- **FastAPI** - high-performance Python API
- **Pydantic** - request validation and data modeling

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

### Prerequisites

Install the following before running the project:

- Python 3.9 or newer
- Node.js 18 or newer with npm
- Git

Clone the repository and move into the project directory:

```bash
git clone <repository-url>
cd vectorshift_assessment
```

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
Interactive API documentation is available at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The app runs at `http://localhost:3000` and expects the backend to be available on port `8000`.

To point the frontend at a different backend URL, set:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

Create `frontend/.env` with this variable before running `npm start` when using a custom backend URL.

## Usage

1. Start the FastAPI backend.
2. Start the React frontend.
3. Drag nodes from the toolbar onto the canvas.
4. Connect handles between nodes to create a pipeline.
5. Click `Run Pipeline` to view node count, edge count, and DAG status.

### Available Nodes

| Node | Purpose |
| --- | --- |
| Input | Defines a named text or file input for the pipeline. |
| Output | Represents the pipeline's text or image result. |
| LLM | Accepts system and prompt inputs and produces a response. |
| Text | Builds text and creates input handles for `{{variable}}` placeholders. |
| Note | Adds an editable annotation to the canvas. |
| Math | Selects an arithmetic operation for two inputs. |
| API Call | Configures an HTTP method and endpoint. |
| Filter | Splits data into pass and fail paths using a condition. |
| Timer | Adds a configurable delay after a trigger. |

Node controls describe the intended workflow configuration. Submitting a pipeline analyzes its graph structure; it does not execute the configured operations.

## Testing

Run the backend tests from the repository root:

```bash
python -m pytest backend/tests
```

## API

### `GET /`

Returns `{"Ping":"Pong"}` and can be used as a basic backend health check.

### `POST /pipelines/parse`

Accepts a pipeline graph containing node IDs and directed edge endpoints:

```json
{
  "nodes": [{ "id": "input-1" }, { "id": "text-1" }],
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

Example request:

```bash
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{"nodes":[{"id":"input-1"},{"id":"text-1"}],"edges":[{"source":"input-1","target":"text-1"}]}'
```

`is_dag` is `false` when the graph contains a cycle or when an edge refers to a node that is not included in `nodes`. Malformed request bodies are rejected by FastAPI with a `422` response.

## Notes

- The backend currently validates graph shape and detects cycles; it does not execute node logic.
- The frontend sends only node IDs and edge endpoints to the backend parser.
