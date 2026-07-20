# FlowCraft Pipeline Builder

## About

FlowCraft is a visual pipeline builder for composing node-based workflows on a drag-and-drop canvas. It combines a responsive React Flow frontend with a FastAPI backend that analyzes submitted graphs in real time.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing](#testing)
- [API](#api)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

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
git clone https://github.com/ParthrChandurkar/flowcraft-pipeline-builder.git
cd flowcraft-pipeline-builder
```

### Quick Start

Run the backend and frontend in separate terminals after cloning the repository:

```bash
# Terminal 1
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

```bash
# Terminal 2
cd frontend
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

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

To point the frontend at a different backend URL, create `frontend/.env`:

```dotenv
REACT_APP_API_BASE_URL=http://localhost:8000
```

Alternatively, set the variable for the current PowerShell session:

```powershell
$env:REACT_APP_API_BASE_URL = "http://localhost:8000"
npm start
```

Restart the development server after changing the backend URL so Create React App can load the new value.

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

Create a production frontend build to catch compilation errors:

```bash
cd frontend
npm run build
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

## Troubleshooting

- If the frontend cannot submit a pipeline, confirm the FastAPI server is running at `http://localhost:8000` and check `REACT_APP_API_BASE_URL`.
- If port `3000` or `8000` is already in use, stop the conflicting process or start the affected service on another port.
- If PowerShell blocks virtual-environment activation, run `Set-ExecutionPolicy -Scope Process Bypass` and activate the environment again.
- If frontend dependencies behave unexpectedly, remove `frontend/node_modules`, run `npm install`, and restart the development server.

## Notes

- The backend currently validates graph shape and detects cycles; it does not execute node logic.
- The frontend sends only node IDs and edge endpoints to the backend parser.

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository and create a focused branch.
2. Make the change and include tests when behavior is affected.
3. Run the backend test suite and frontend production build.
4. Commit with a clear, descriptive message.
5. Open a pull request explaining what changed and why.

Keep pull requests small and avoid committing generated files, local environment files, or dependency directories.
