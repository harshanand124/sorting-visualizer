import React, { useState } from "react";
import styles from "../styles/StackVisualizer.module.css";

const App = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [lastPushed, setLastPushed] = useState(null);
  const [lastPopped, setLastPopped] = useState(null);
  const [message, setMessage] = useState("");

  const pushHandler = () => {
    if (!inputValue) {
      setMessage("Please enter a value.");
      return;
    }

    if (stack.length === 5) {
      setMessage("Stack Overflow");
      return;
    }

    const newStack = [...stack, inputValue];
    setStack(newStack);
    setLastPushed(inputValue);
    setInputValue("");
    setMessage(`Item ${inputValue} is pushed.`);
  };

  const popHandler = () => {
    if (stack.length === 0) {
      setMessage("Stack Underflow");
      return;
    }

    const newStack = [...stack];
    const poppedValue = newStack.pop();
    setStack(newStack);
    setLastPopped(poppedValue);
    setMessage(`Item ${poppedValue} is popped.`);
  };

  const resetHandler = () => {
    setStack([]);
    setLastPushed(null);
    setLastPopped(null);
    setMessage("");
  };

  return (
    <div className={styles.appContainer}>
      <header>
        <h1 className={styles.heading}>Stack Visualizer</h1>
      </header>

      <div className={styles.stackContainer}>
        <div className={styles.controls}>
          <input
            type="number"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={`${styles.button} ${styles.push}`} onClick={pushHandler}>
            Push
          </button>
          <button className={`${styles.button} ${styles.pop}`} onClick={popHandler}>
            Pop
          </button>
          <button className={`${styles.button} ${styles.reset}`} onClick={resetHandler}>
            Reset
          </button>
        </div>

        <div className={styles.stackDisplay}>
          <div className={styles.stack}>
            {stack.map((item, index) => (
              <div key={index} className={styles.stackItem}>
                {item}
              </div>
            ))}
          </div>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <h3>Top of the Stack:</h3>
              <div className={styles.infoBox}>{stack[stack.length - 1] || ""}</div>
            </div>
            <div className={styles.infoItem}>
              <h3>Last Pushed Item:</h3>
              <div className={styles.infoBox}>{lastPushed || ""}</div>
            </div>
            <div className={styles.infoItem}>
              <h3>Last Popped Item:</h3>
              <div className={styles.infoBox}>{lastPopped || ""}</div>
            </div>
            <div className={styles.infoItem}>
              <h3>Size of the Stack:</h3>
              <div className={styles.infoBox}>{stack.length}</div>
            </div>
          </div>
        </div>

        <div className={styles.messageBox}>
          <h2>Message Box</h2>
          <div className={styles.message}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
