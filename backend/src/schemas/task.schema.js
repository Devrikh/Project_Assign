const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };
