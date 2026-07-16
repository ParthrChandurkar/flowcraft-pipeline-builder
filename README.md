# FlowCraft Pipeline Builder

## ✨ About

FlowCraft is a visual pipeline builder for composing node-based workflows on a drag-and-drop canvas. It combines a responsive React Flow frontend with a FastAPI backend that analyzes submitted graphs in real time.

## 🚀 Features

- 🎨 Drag-and-drop canvas for building connected workflow nodes
- 🧩 Reusable node abstraction for inputs, outputs, LLM prompts, text transforms, notes, math, API calls, filters, and timers
- 🔗 Dynamic text node handles from `{{variable}}` placeholders
- ✨ Animated smooth-step edges, minimap, controls, and grid snapping
- ▶️ One-click pipeline submission to a backend parser
- ✅ Backend response with node count, edge count, and DAG validation

## 🛠️ Tech Stack

- ⚛️ **React 18** — component-based user interface
- 🧭 **React Flow** — interactive node canvas
- 🐻 **Zustand** — lightweight state management
- ⚡ **FastAPI** — high-performance Python API
- 🛡️ **Pydantic** — request validation and data modeling

## 📁 Project Structure

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

## 🏁 Getting Started

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

To point the frontend at a different backend URL, set:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

## 💡 Usage

1. Start the FastAPI backend.
2. Start the React frontend.
3. Drag nodes from the toolbar onto the canvas.
4. Connect handles between nodes to create a pipeline.
5. Click `Run Pipeline` to view node count, edge count, and DAG status.

## 🧪 Testing

Run the backend tests from the repository root:

```bash
python -m pytest backend/tests
```

## 🔌 API

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

## 📝 Notes

- The backend currently validates graph shape and detects cycles; it does not execute node logic.
- The frontend sends only node IDs and edge endpoints to the backend parser.
