"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./tsks.module.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

export default function Tasks({ tasks, onUpdateTask, onDeleteTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedDesc, setUpdatedDesc] = useState("");
  const inputRef = useRef(null); // Create a ref for the input

  // Focus the input when editingTaskId changes
  useEffect(() => {
    if (editingTaskId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTaskId]);
  

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setUpdatedDesc(task.desc);
  };

  const handleUpdateTask = async () => {
    await onUpdateTask(editingTaskId, updatedDesc);
    setEditingTaskId(null); // Exit editing mode
    setUpdatedDesc(""); // Clear input field
  };

  return (
    <div className={styles.container}>
      {tasks.length === 0 ? (
        <div className={styles.empty}>No tasks found.</div>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className={styles.task}>
            <input
              className={styles.input}
              type="text"
              value={editingTaskId === task._id ? updatedDesc : task.desc}
              onChange={(e) => setUpdatedDesc(e.target.value)}
              disabled={editingTaskId !== task._id}
              ref={editingTaskId === task._id ? inputRef : null}
            />
            <EditNoteOutlinedIcon
              onClick={() => handleEditClick(task)}
              className={styles.icon}
              style={{ display: editingTaskId === task._id ? "none" : "block" }}
            />
            <DeleteOutlineOutlinedIcon
              onClick={() => onDeleteTask(task._id)}
              className={styles.icon}
              style={{ display: editingTaskId === task._id ? "none" : "block" }}
            />
            {editingTaskId === task._id && (
              <button onClick={handleUpdateTask} className={styles.btn}>
                Save
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
