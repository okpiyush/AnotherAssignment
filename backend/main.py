from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edge(BaseModel):
    from_node: str
    to_node: str

class PipelineData(BaseModel):
    nodes: List[str] 
    edges: List[Edge] 

def is_dag(nodes: List[str], edges: List[Edge]) -> bool:
    from collections import defaultdict, deque
    graph = defaultdict(list)
    in_degree = {node: 0 for node in nodes}
    for edge in edges:
        graph[edge.from_node].append(edge.to_node)
        in_degree[edge.to_node] += 1
    queue = deque([node for node in nodes if in_degree[node] == 0])
    visited_count = 0
    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return visited_count == len(nodes)

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    if is_dag(data.nodes, data.edges):
        return {'edgesLen': len(data.edges), 'nodesLen': len(data.nodes), 'is_dag': True}
    else:
        return {'edgesLen': len(data.edges), 'nodesLen': len(data.nodes), 'is_dag': False}

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}
