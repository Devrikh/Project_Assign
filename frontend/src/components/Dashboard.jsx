import React, { useEffect, useState } from "react";
import API from "../api/api";
import TaskItem from "./TaskItem";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");


  const filteredTasks = tasks.filter(
  (task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
);



  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);

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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="flex items-center justify-between px-6 py-4 bg-slate-950 shadow">
        <div>
          <h3 className="text-xl font-semibold">Task Dashboard</h3>
          {user && (
  <div className="flex items-center gap-2 mt-1">
    <div className="w-6 h-6 bg-sky-400 text-slate-900 rounded-full flex items-center justify-center font-semibold">
      {user.name[0].toUpperCase()}
    </div>
    <p className="text-sm text-slate-400">
      {user.name} ({user.role})
    </p>
  </div>
)}
        </div>

        <div className="flex items-center gap-3">
    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-3 py-2 rounded bg-slate-900 border border-slate-700
                 focus:outline-none focus:border-sky-400 text-sm"
    />

    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
    >
      Logout
    </button>
  </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <form
          onSubmit={createTask}
          className="bg-slate-950 p-6 rounded-xl shadow mb-8 flex flex-col md:flex-row gap-4"
        >
          <input
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            className="flex-1 p-2 rounded bg-slate-900 border border-slate-700
                     focus:outline-none focus:border-sky-400 text-slate-100"
          />

          <input
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
            className="flex-1 p-2 rounded bg-slate-900 border border-slate-700
                     focus:outline-none focus:border-sky-400 text-slate-100"
          />

          <button
            type="submit"
            className="bg-sky-400 text-slate-900 font-semibold px-6 py-2 rounded
                     hover:opacity-90 transition"
          >
            Add Task
          </button>
        </form>

        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <p className="text-slate-400 text-center">
              No tasks yet. Add one above!
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                toggleStatus={toggleStatus}
                currentUser={user}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
