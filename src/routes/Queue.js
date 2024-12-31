import React, { useLayoutEffect, useState } from "react";
import styles from "../styles/QueueVisualizer.module.css";

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

  useLayoutEffect(()=>{document.title = "Queue"},[])

  return (
    <div className={styles.queueVisualizer}>
      <h1 className={styles.title}>Queue</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
        />
        <button onClick={enqueue} className={styles.button}>Enqueue</button>
        <button onClick={dequeue} className={styles.button}>Dequeue</button>
        <button onClick={peek} className={styles.button}>Peek</button>
        <button onClick={clearQueue} className={styles.button}>Clear</button>
      </div>
      <div className={styles.queueContainer}>
        {queue.map((item, index) => (
          <div key={index} className={styles.queueItem}>
            {item}
          </div>
        ))}
        {queue.length === 0 && (
          <div className={styles.emptyQueue}>Queue is Empty</div>
        )}
      </div>
    </div>
  );
};

export default QueueVisualizer;
