import React from "react";

const TaskItem = ({ task, deleteTask, toggleStatus, currentUser }) => {
  const canDelete =
    currentUser?.role === "admin" || currentUser?.userId === task.userId;

  return (
    <li className="task-card">
      <div>
        <h4>{task.title}</h4>
        <p>{task.description}</p>

        <span
          className={`status ${task.status}`}
          onClick={() => toggleStatus(task)}
        >
          {task.status}
        </span>
      </div>

      {canDelete && (
        <button
          className="danger"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default TaskItem;
