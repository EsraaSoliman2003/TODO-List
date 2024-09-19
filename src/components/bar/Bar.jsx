"use client"
import React, { useState } from "react";
import styles from "./bar.module.css";

export default function Bar({onAddTask}) {
  const [task, setTask] = useState("")


  const handleAddTask = async () => {
    if (task.trim() === "") return;

    // Clear input field
    setTask("");

    // Notify parent component to refresh tasks
    onAddTask(task);
  };


  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <input
          className={styles.input}
          type="text"
          placeholder="Write Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className={styles.btn} onClick={handleAddTask}>Add Task</button>

      </div>
    </div>
  );
}
