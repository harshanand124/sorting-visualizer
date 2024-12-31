import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Graph.module.css";

const Graph = () => {
  const [selectedMaze, setSelectedMaze] = useState("MAZE 1");
  const [path, setPath] = useState([]);
  const [isBFS, setIsBFS] = useState(true);
  const bfsCanvasRef = useRef(null);
  const dfsCanvasRef = useRef(null);

  const mazes = {
    "MAZE 1": {
      nodes: [
        { id: "A", adj: ["B", "C"], x: 100, y: 100 },
        { id: "B", adj: ["D", "E"], x: 200, y: 50 },
        { id: "C", adj: ["F"], x: 200, y: 150 },
        { id: "D", adj: [], x: 300, y: 25 },
        { id: "E", adj: [], x: 300, y: 75 },
        { id: "F", adj: [], x: 300, y: 200 },
      ],
    },
    "MAZE 2": {
      nodes: [
        { id: "A", adj: ["B"], x: 100, y: 100 },
        { id: "B", adj: ["C", "D"], x: 200, y: 100 },
        { id: "C", adj: ["E"], x: 300, y: 50 },
        { id: "D", adj: ["E"], x: 300, y: 150 },
        { id: "E", adj: [], x: 400, y: 100 },
      ],
    },
    "MAZE 3": {
      nodes: [
        { id: "X", adj: ["Y"], x: 100, y: 100 },
        { id: "Y", adj: ["Z"], x: 200, y: 100 },
        { id: "Z", adj: [], x: 300, y: 100 },
      ],
    },
  };

  const startNode = "A";
  const targetNode = "F";

  useEffect(() => {
    resetGraph();
  }, [selectedMaze]);

  // Reset graph state
  const resetGraph = () => {
    setPath([]);
    const currentGraph = mazes[selectedMaze];
    drawGraph(bfsCanvasRef.current, currentGraph, []);
    drawGraph(dfsCanvasRef.current, currentGraph, []);
  };

  const bfs = () => {
    const currentGraph = mazes[selectedMaze];
    const queue = [];
    const cameFrom = {};
    const traversalPath = [];

    queue.push(getNodeById(currentGraph, startNode));
    cameFrom[startNode] = null;

    while (queue.length > 0) {
      const current = queue.shift();
      traversalPath.push(current.id);

      if (current.id === targetNode) break;

      current.adj.forEach((id) => {
        if (!cameFrom[id]) {
          cameFrom[id] = current.id;
          queue.push(getNodeById(currentGraph, id));
        }
      });
    }

    setPath(traversalPath);
    drawGraph(bfsCanvasRef.current, currentGraph, traversalPath);
  };

  const dfs = () => {
    const currentGraph = mazes[selectedMaze];
    const stack = [];
    const cameFrom = {};
    const traversalPath = [];

    stack.push(getNodeById(currentGraph, startNode));
    cameFrom[startNode] = null;

    while (stack.length > 0) {
      const current = stack.pop();
      if (traversalPath.includes(current.id)) continue;

      traversalPath.push(current.id);

      if (current.id === targetNode) break;

      current.adj.forEach((id) => {
        if (!cameFrom[id]) cameFrom[id] = current.id;
        stack.push(getNodeById(currentGraph, id));
      });
    }

    setPath(traversalPath);
    drawGraph(dfsCanvasRef.current, currentGraph, traversalPath);
  };

  const getNodeById = (graph, id) =>
    graph.nodes.find((node) => node.id === id);

  const drawGraph = (canvas, graph, traversalPath) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    graph.nodes.forEach((node) => {
      node.adj.forEach((adjNodeId) => {
        const adjNode = getNodeById(graph, adjNodeId);
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(adjNode.x, adjNode.y);
        ctx.strokeStyle = "#666";
        ctx.stroke();
      });
    });

    // Draw nodes
    graph.nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI);
      ctx.fillStyle = traversalPath.includes(node.id) ? "#ff5722" : "#aeced2";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.fillText(node.id, node.x - 5, node.y + 5);
    });
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h2>BFS/DFS Pathfinder</h2>
          <div className={styles.mazeContainer}>
            {["MAZE 1"].map((maze) => (
              <span
                key={maze}
                onClick={() => setSelectedMaze(maze)}
                className={maze === selectedMaze ? styles.active : ""}
              >
                {maze}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div styles={{display : "flex", justifyContent : "center", alignItems : "center", textTransform : "uppercase"}} className={styles.canvasContainer}>
            <p>
            Start Node : {startNode}
            </p>
            <p>
            Target Node : {targetNode}
            </p>
        </div>
      <div className={styles.graphContainer}>
        <div className={styles.canvasContainer}>
          <h3>Breadth-First Search</h3>
          <canvas ref={bfsCanvasRef} width={400} height={300}></canvas>
        </div>
        <div className={styles.canvasContainer}>
          <h3>Depth-First Search</h3>
          <canvas ref={dfsCanvasRef} width={400} height={300}></canvas>
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={() => (isBFS ? bfs() : dfs())}>
          <i className="fa fa-play" aria-hidden="true"></i> Play
        </button>
        <button onClick={resetGraph}>
          <i className="fa fa-repeat" aria-hidden="true"></i> Reset
        </button>
        <button onClick={() => setIsBFS(!isBFS)}>
          Switch to {isBFS ? "DFS" : "BFS"}
        </button>
      </div>
      <div className={styles.output}>
        <h3>Traversal Path:</h3>
        <p>{path.join(" -> ")}</p>
      </div>
    </div>
  );
};

export default Graph;
