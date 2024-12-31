import React, { useState } from "react";
import "../styles/KnapsackVisualizer.css";

const KnapsackVisualizer = () => {
  const [items, setItems] = useState([]);
  const [maxWeight, setMaxWeight] = useState(10);
  const [result, setResult] = useState(null);

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { weight: "", value: "" }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const knapsack = (items, maxWeight) => {
    const n = items.length;
    const dp = Array.from({ length: n + 1 }, () => Array(maxWeight + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= maxWeight; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    const selectedItems = [];
    let w = maxWeight;
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selectedItems.push(items[i - 1]);
        w -= items[i - 1].weight;
      }
    }

    return { maxValue: dp[n][maxWeight], selectedItems };
  };

  const handleSubmit = () => {
    const validItems = items.filter((item) => item.weight && item.value);
    const result = knapsack(validItems, maxWeight);
    setResult(result);
  };

  return (
    <div className="knapsack-container">
      <h2>Knapsack Problem Visualizer</h2>
      <div className="item-input-container">
        {items.map((item, index) => (
          <div key={index} className="item-input">
            <input
              type="number"
              placeholder="Weight"
              value={item.weight}
              onChange={(e) =>
                handleInputChange(index, "weight", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Value"
              value={item.value}
              onChange={(e) =>
                handleInputChange(index, "value", e.target.value)
              }
            />
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddItem}>Add Item</button>
      <div className="output-container">
        <input
          type="number"
          value={maxWeight}
          onChange={(e) => setMaxWeight(e.target.value)}
          placeholder="Max Weight"
        />
        <button onClick={handleSubmit}>Calculate Knapsack</button>
        {result && (
          <div>
            <h3>Max Value: {result.maxValue}</h3>
            <h4>Selected Items:</h4>
            <ul>
              {result.selectedItems.map((item, index) => (
                <li key={index}>
                  Weight: {item.weight}, Value: {item.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnapsackVisualizer;
