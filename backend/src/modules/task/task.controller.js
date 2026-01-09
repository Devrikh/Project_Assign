const Task = require("./task.model");
const mongoose = require("mongoose"); 

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, userId: req.user.userId });
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(200).json({ tasks });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    await task.save();
    res.json({ message: "Task updated", task });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId))
      return res.status(400).json({ message: "Invalid task ID" });

    let task;
    if (req.user.role === "admin") {
      task = await Task.findById(taskId);
    } else {
      task = await Task.findOne({ _id: taskId, userId: req.user.userId });
    }

    if (!task) return res.status(404).json({ message: "Task not found" });

    await Task.deleteOne({ _id: task._id });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createTask, getTasks, updateTask, deleteTask };
