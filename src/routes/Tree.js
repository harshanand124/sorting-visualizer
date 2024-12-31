import React, { useState } from "react";
import "../styles/TreeTraversalVisualizer.css";

// Sample Binary Tree for Visualization
const root = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: {
    value: 3,
    left: { value: 6, left: null, right: null },
    right: { value: 7, left: null, right: null },
  },
};

const TreeTraversalVisualizer = () => {
  const [currentPath, setCurrentPath] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [traversalType, setTraversalType] = useState("Preorder");

  // Traversal Algorithms
  const preorder = (node) => {
    if (!node) return [];
    return [node.value, ...preorder(node.left), ...preorder(node.right)];
  };

  const inorder = (node) => {
    if (!node) return [];
    return [...inorder(node.left), node.value, ...inorder(node.right)];
  };

  const postorder = (node) => {
    if (!node) return [];
    return [...postorder(node.left), ...postorder(node.right), node.value];
  };

  const levelOrder = (node) => {
    if (!node) return [];
    const queue = [node];
    const result = [];
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return result;
  };

  const startTraversal = () => {
    setIsAnimating(true);
    let path = [];
    switch (traversalType) {
      case "Preorder":
        path = preorder(root);
        break;
      case "Inorder":
        path = inorder(root);
        break;
      case "Postorder":
        path = postorder(root);
        break;
      case "Level Order":
        path = levelOrder(root);
        break;
      default:
        break;
    }
    animateTraversal(path);
  };

  const resetTraversal = () => {
    setCurrentPath([]);
    setIsAnimating(false);
  };

  // Animate traversal through nodes
  const animateTraversal = (path) => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < path.length) {
        setCurrentPath((prevPath) => [...prevPath, path[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1000);
  };

  // Render the tree and highlight nodes based on traversal path
  const renderTree = (node, x, y, offset) => {
    if (!node) return null;
    const isHighlighted = currentPath.includes(node.value);

    return (
      <g key={node.value}>
        <circle cx={x} cy={y} r={20} fill={isHighlighted ? "orange" : "lightblue"} />
        <text x={x} y={y} fontSize="12" textAnchor="middle" fill="black">
          {node.value}
        </text>
        {node.left && (
          <>
            <line x1={x} y1={y} x2={x - offset} y2={y + 50} stroke="black" />
            {renderTree(node.left, x - offset, y + 50, offset / 2)}
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y} x2={x + offset} y2={y + 50} stroke="black" />
            {renderTree(node.right, x + offset, y + 50, offset / 2)}
          </>
        )}
      </g>
    );
  };

  return (
    <div className="tree-visualizer">
      <h2>Tree Traversal</h2>
      <div className="controls">
        <button onClick={startTraversal} disabled={isAnimating}>
          {isAnimating ? "Animating..." : "Start Traversal"}
        </button>
        <button onClick={resetTraversal} disabled={isAnimating}>
          Reset
        </button>
        <select onChange={(e) => setTraversalType(e.target.value)} value={traversalType}>
          <option value="Preorder">Preorder</option>
          <option value="Inorder">Inorder</option>
          <option value="Postorder">Postorder</option>
          <option value="Level Order">Level Order</option>
        </select>
      </div>
      <svg width={600} height={400}>
        {renderTree(root, 300, 50, 100)}
      </svg>
      <div className="output">
        <h3>Traversal Path:</h3>
        <p>{currentPath.join(" -> ")}</p>
      </div>
    </div>
  );
};

export default TreeTraversalVisualizer;
