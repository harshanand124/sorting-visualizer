import React, { useState } from "react";
import "../styles/QueueVisualizer.css";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Enqueue operation
  const enqueue = () => {
    if (inputValue.trim() === "") return;
    setQueue([...queue, inputValue]);
    setInputValue("");
  };

  // Dequeue operation
  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1)); // Remove the first element
    } else {
      alert("Queue is empty!");
    }
  };

  // Peek operation
  const peek = () => {
    if (queue.length > 0) {
      alert(`Front Element: ${queue[0]}`);
    } else {
      alert("Queue is empty!");
    }
  };

  // Clear the queue
  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <div className="queue-visualizer">
      <h1>Queue Algorithm Visualizer</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue}>Dequeue</button>
        <button onClick={peek}>Peek</button>
        <button onClick={clearQueue}>Clear</button>
      </div>
      <div className="queue-container">
        {queue.map((item, index) => (
          <div key={index} className="queue-item">
            {item}
          </div>
        ))}
        {queue.length === 0 && <div className="empty-queue">Queue is Empty</div>}
      </div>
    </div>
  );
};

export default QueueVisualizer;
