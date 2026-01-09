const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./modules/auth/auth.routes");
const taskRoutes = require("./modules/task/task.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/tasks", taskRoutes);

module.exports = app;