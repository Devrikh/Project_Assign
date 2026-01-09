import React, { useEffect, useState } from "react";
import API from "../api/api";
import TaskItem from "./TaskItem";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload); // contains userId & role
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching tasks");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating tasks");
      
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting tasks");
    }
  };

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; 
};



  const toggleStatus = async (task) => {
    try {
      const updatedStatus = task.status === "pending" ? "completed" : "pending";
      await API.put(`/tasks/${task._id}`, { status: updatedStatus });
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating tasks");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <form onSubmit={createTask}>
        <input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          required
        />
        <button type="submit">Add Task</button>
        <button onClick={logout}>Logout</button>

      </form>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            toggleStatus={toggleStatus}
            currentUser={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
