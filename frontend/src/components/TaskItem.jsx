import React from "react";

const TaskItem = ({ task, deleteTask, toggleStatus, currentUser }) => {
  const canDelete =
    currentUser?.role === "admin" || currentUser?.userId === task.userId;

  return (
    <li>
      <strong>{task.title}</strong> - {task.description} [
      <span
        style={{
          color: task.status === "completed" ? "green" : "orange",
          cursor: "pointer",
        }}
        onClick={() => toggleStatus(task)}
      >
        {task.status}
      </span>
      ]
      {canDelete && (
        <button
          onClick={() => deleteTask(task._id)}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default TaskItem;
