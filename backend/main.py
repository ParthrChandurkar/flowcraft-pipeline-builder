from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source not in graph or edge.target not in graph:
            return False
        graph[edge.source].append(edge.target)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node.id: WHITE for node in nodes}

    def dfs(node_id):
        color[node_id] = GRAY
        for neighbor in graph.get(node_id, []):
            if color.get(neighbor) == GRAY:
                return False
            if color.get(neighbor) == WHITE:
                if not dfs(neighbor):
                    return False
        color[node_id] = BLACK
        return True

    for node in nodes:
        if color[node.id] == WHITE:
            if not dfs(node.id):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag
    }
