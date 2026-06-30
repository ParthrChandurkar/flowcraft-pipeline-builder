from backend.main import is_dag, parse_pipeline, Edge, Node, Pipeline


def test_is_dag_returns_true_for_linear_graph():
    nodes = [Node(id="input-1"), Node(id="text-1"), Node(id="output-1")]
    edges = [
        Edge(source="input-1", target="text-1"),
        Edge(source="text-1", target="output-1"),
    ]

    assert is_dag(nodes, edges) is True


def test_is_dag_returns_false_for_cycle():
    nodes = [Node(id="a"), Node(id="b")]
    edges = [Edge(source="a", target="b"), Edge(source="b", target="a")]

    assert is_dag(nodes, edges) is False


def test_parse_pipeline_returns_graph_summary():
    result = parse_pipeline(
        Pipeline(
            nodes=[Node(id="input-1"), Node(id="output-1")],
            edges=[Edge(source="input-1", target="output-1")],
        )
    )

    assert result == {
        "num_nodes": 2,
        "num_edges": 1,
        "is_dag": True,
    }
