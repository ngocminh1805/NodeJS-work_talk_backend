import { Sequelize } from 'sequelize';
import * as Router from "koa-router";
import { TaskService } from "../services/task-service";
import { InMemoryTaskRepository } from "../models/repositories/in-memory-task-repository";
import {initModels, attachment, attachmentAttributes } from '../db-model-exported/init-models';
 
// import { Task } from "../models/task";
// const DB = require('../common/connection-db'); 
// const attachmentService = new TaskService(new InMemoryTaskRepository());
const DB:Sequelize = require('../common/connection-db')
const router = new Router();
initModels(DB);

//Get all
router.get("/attachment", async (ctx, next) => {
  console.log('test_attachment...')
  let limit = 1;   // number of records per page
  let offset = 0;
  const data = await attachment.findAndCountAll();
  let page = ctx.params.page;      // page number
  let pages = Math.ceil(data.count / limit);
  offset = limit * (page - 1);  
  var attachment_list = await attachment.findAll();
  ctx.body = ({'result': attachment_list, 'count': data.count, 'pages': pages});
  ctx.status = 200;
  next();
});

// // Get by id
// router.get("/tasks/:id", async (ctx) => {
//   //   (ctx.body = "Return task with id "), ctx.params.id;
//   const task = await taskService.get(Number(ctx.params.id));
//   ctx.status = 200;
//   ctx.body = task || [];
// });

//Add task
router.post("/attachment", async (ctx, next) => {
  // ctx.body = "Create a new task";
  // const task = <Task>ctx.request.body;
  // const newTask = await taskService.create(task);

  // ctx.status = 201;
  // ctx.status = 200;
  // ctx.body = newTask;
  // ctx.set("location", "http://localhost:3000/tasks/" + newTask.id);

  // try { 
  //   if(ctx.request.body["key"] == "")  throw "empty";
  //   if(isNaN(ctx.request.body["key"])) throw "not a number";
  // }
  // catch(err) {
  //   var error = {
  //       "error": err
  //   }
  //   ctx.body = error; 
  // }

  await attachment.create(ctx.request.body);
  
  next();
});


router.delete("/attachment/:id", async (ctx, next) => {
  let updateValues = { status: '1'};
  // @ts-ignore
  attachment.update(updateValues, { where: { id: ctx.params.id } }).then((result) => {
  // here your result is simply an array with number of affected rows
  console.log(result);
  // [ 1 ]
  });

  next();
});


export default router;
