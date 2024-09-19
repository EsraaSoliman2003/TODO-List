"use client";
import Bar from "@/components/bar/Bar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Tasks from "@/components/tasks/Tasks";
import { useSession } from "next-auth/react";

export default function TasksManagement() {
  const session = useSession();
  console.log(session)
  const [tasks, setTasks] = useState([]);

  const url="http://localhost:3000"

  useEffect(() => {
    // Define an async function within useEffect and call it
    const fetchTasks = async () => {
      const res = await fetch(`${url}/api/tasks/`);
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      // Add task to the server
      await fetch(`${url}/api/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ desc: newTask }),
      });

      // Fetch updated tasks
      const res = await fetch(`${url}/api/tasks/`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (taskId, updatedDesc) => {
    try {
      await fetch(`${url}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ desc: updatedDesc }),
      });

      // Fetch updated tasks
      const res = await fetch(`${url}/api/tasks/`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${url}/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      // Fetch updated tasks
      const res = await fetch(`${url}/api/tasks/`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.page}>
      <Bar onAddTask={handleAddTask} />
      <Tasks
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
