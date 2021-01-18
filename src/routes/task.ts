import * as Router from "koa-router";
import { TaskService } from "../services/task-service";
import { InMemoryTaskRepository } from "../models/repositories/in-memory-task-repository";
import { Task } from "../models/task";

const router = new Router();
const taskService = new TaskService(new InMemoryTaskRepository());

//Get all
router.get("/tasks", async (ctx) => {
  // ctx.body = 'Get all tasks'
  const tasks = await taskService.getAll();
  ctx.status = 200;
  ctx.body = tasks;
});

// Get by id
router.get("/tasks/:id", async (ctx) => {
  //   (ctx.body = "Return task with id "), ctx.params.id;
  const task = await taskService.get(Number(ctx.params.id));
  ctx.status = 200;
  ctx.body = task || [];
});

//Add task
router.post("/tasks", async (ctx) => {
  //   ctx.body = "Create a new task";
  const task = <Task>ctx.request.body;
  const newTask = await taskService.create(task);

  //   ctx.status = 201;
  ctx.status = 200;
  ctx.body = newTask;
  ctx.set("location", "http://localhost:3000/tasks/" + newTask.id);
});

// Update task by id
router.put("/tasks/:id", async (ctx) => {
  //   (ctx.body = "Update task with id "), ctx.params.id;
  const task = <Task>ctx.request.body;
  const updateTask = await taskService.update(Number(ctx.params.id), task);
  ctx.status = 200;
  ctx.body = updateTask || [];
  //   if (updateTask) {
  //     ctx.status = 200;
  //     ctx.body = updateTask || [];
  //   } else {
  //     ctx.throw(404);
  //   }
});

//Remove task
router.delete("/tasks/:id", async (ctx) => {
  //   (ctx.body = "Delete task with id "), ctx.params.id;
  const deleteTask = await taskService.delete(Number(ctx.params.id));
  ctx.status = 200;
  ctx.body = deleteTask || [];
  //   if (deleteTask) {
  //     ctx.status = 200;
  //     ctx.body = deleteTask;
  //   } else {
  //     ctx.throw(404);
  //   }
});

export default router;
