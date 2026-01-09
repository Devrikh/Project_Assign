import React from "react";

const TaskItem = ({ task, deleteTask, toggleStatus, currentUser }) => {
  const canDelete =
    currentUser?.role === "admin" || currentUser?._id === task.userId;

  return (
    <div className="bg-slate-950 p-4 rounded-xl shadow flex items-start justify-between">
      <div>
        <h4 className="text-lg font-semibold text-slate-100">{task.title}</h4>
        <p className="text-slate-400 mt-1">{task.description}</p>
        <span
          onClick={() => toggleStatus(task)}
          className={`inline-block mt-3 px-3 py-1 text-sm rounded cursor-pointer
          ${
            task.status === "completed"
              ? "bg-green-500/20 text-green-400"
              : "bg-orange-500/20 text-orange-400"
          }`}
        >
          {task.status}
        </span>
      </div>
      {canDelete}
      {canDelete && (
        <button
          onClick={() => deleteTask(task._id)}
          className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/30 transition"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default TaskItem;
