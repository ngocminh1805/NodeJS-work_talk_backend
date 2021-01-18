import { Model, Sequelize, where } from "sequelize";
import * as Router from "koa-router";
import {
  initModels,
  chat,
  chatAttributes,
  chat_room,
  chat_roomAttributes,
  user,
  chat_room_member,
  attachment,
} from "../db-model-exported/init-models";
import { v4 as uuidv4 } from "uuid";
const { QueryTypes } = require("sequelize");

// import { Task } from "../models/task";
// const DB = require('../common/connection-db');
// const attachmentService = new TaskService(new InMemoryTaskRepository());
const DB: Sequelize = require("../common/connection-db");
const router = new Router();
initModels(DB);

// chat of room chat

router.post("/chat/:page", async (ctx, next) => {
  console.log("Test get chat of room :", ctx.request.body);
  const body = ctx.request.body;
  let limit = 1; // number of records per page
  let offset = 0;
  let page = ctx.params.page;
  offset = limit * (page - 1);

  const data = await chat.findAll({
    include: [
      {
        //@ts-ignore
        model: attachment,
      },
    ],
    where: { chat_room_id: body.chat_room_id },
    order: [["created_at", "DESC"]],
    offset: offset,
    limit: limit,
  });

  ctx.body = { result: data };
  ctx.status = 200;
  next();
});

// create a message
router.post("/sent-chat", (ctx, next) => {
  console.log("Sent a message : ", ctx.request.body);
  const body = ctx.request.body;
  var id = uuidv4();
  var user_id = body.user_id;
  var chat_room_id = body.chat_room_id;
  var parent_id = body.parent_id || id;
  var message = body.message;
  var message_type = body.message_type;
  var message_status = body.message_status;
  var status = body.status;
  var created_at = new Date();
  var updated_at = new Date();

  chat.create({
    id: id,
    user_id: user_id,
    chat_room_id: chat_room_id,
    parent_id: parent_id,
    message: message,
    message_type: message_type,
    message_status: message_status,
    status: status,
    created_at: created_at,
    updated_at: updated_at,
  });

  ctx.body = {
    message: "gửi tin nhắn thành công",
    result: {
      user_id: user_id,
      chat_room_id: chat_room_id,
      message: message,
    },
  };
  ctx.status = 200;
  next();
});

// chỉnh sửa tin nhắn

router.post("/update-chat/:id", async (ctx, next) => {
  console.log("Test sửa tin nhắn: ", ctx.request.body);
  const body = ctx.request.body;
  var id = ctx.params.id;
  var message = body.message;

  await chat.update({ message: message }, { where: { id: id } });

  ctx.body = { message: "Cập nhật tin nhắn thành công" };
  ctx.status = 200;
});

export default router;
