import { Sequelize } from "sequelize";
import * as Router from "koa-router";
import { v4 as uuidv4 } from "uuid";
import {
  initModels,
  chat_room,
  chat_roomAttributes,
  chat_room_member,
  chat,
  user,
  attachment,
  chatAttributes,
} from "../db-model-exported/init-models";

const DB: Sequelize = require("../common/connection-db");
//@ts-ignore
const Op = Sequelize.Op;
const router = new Router();

initModels(DB);

// Get all

router.get("/chat-room/:page/:limit", async (ctx, next) => {
  console.log("test chat room ...");
  let limit = parseInt(ctx.params.limit); // number of records per page
  let offset = 0;
  const data = await chat_room.findAndCountAll();
  let page = ctx.params.page;
  let pages = Math.ceil(data.count / limit);
  offset = limit * (page - 1);

  var chat_room_list = await chat_room.findAll({
    attributes: ["id", "title", "status", "avatar", "type"],
    include: [
      {
        //@ts-ignore
        model: chat,

        attributes: ["message", "message_type", "message_status"],
        order: [["created_at", "DESC"]],
        separate: true,
        // limit: 5,
        // subQuery: false,
        include: [
          {
            //@ts-ignore
            model: user,
            attributes: ["user_name", "avatar", "status"],
          },
        ],
      },
    ],

    order: [["created_at", "DESC"]],
    // offset: offset,
    // limit: limit,
  });

  ctx.body = { result: chat_room_list, count: data.count, total_pages: pages };
  ctx.status = 200;
  next();
});

// Get chat room - id

router.get("/chat-room/:id", async (ctx, next) => {
  console.log("test chat room id ...");
  var chatroom = await chat_room.findOne({
    where: { id: ctx.params.id },
    attributes: [
      "id",
      "title",
      "slogan",
      "status",
      "avatar",
      "type",
      "description",
    ],
    include: [
      {
        //@ts-ignore
        model: chat,
        attributes: ["message", "message_type", "message_status", "created_at"],
        include: [
          {
            // model: attachment,
          },
        ],
        order: [["created_at", "DESC"]],
      },
    ],
  });
  ctx.body = { result: chatroom };
  ctx.status = 200;
  next();
});

// get chat room user

router.get("/chat-room-member/:id", async (ctx, next) => {
  console.log("test chat room user id ...");

  var chatroom_member = await chat_room_member.findAll({
    attributes: ["id"],
    include: [
      {
        //@ts-ignore
        model: user,
        attributes: ["user_name", "avatar", "status", "is_admin", "last_login"],
      },
    ],
    where: { chat_room_id: ctx.params.id },
  });

  ctx.body = { result: chatroom_member };
  ctx.status = 200;
  next();
});

// add chat room

router.post("/chat-room", (ctx, next) => {
  console.log("test create chat room:", ctx.request.body);
  var id = uuidv4();
  const body = ctx.request.body;
  var title = body.title;
  var createBy = body.createBy;
  var type = body.type;
  var status = body.status;
  var slogan = body.slogan || "";
  var description = body.description || "";
  var avatar = body.avatar || "";

  chat_room.create({
    id: id,
    created_by: createBy,
    title: title,
    type: type,
    status: status,
    slogan: slogan,
    avatar: avatar,
    description: description,
    created_at: new Date(),
    updated_at: new Date(),
  });

  ctx.body = {
    message: "Thêm nhóm chat thành công",
    result: {
      id: id,
      title: title,
      createBy: createBy,
      type: type,
      status: status,
    },
  };
  ctx.status = 200;
  next();
});

// xóa chat room id

router.post("/delete-chat-room", async (ctx, next) => {
  const body = ctx.request.body;
  console.log("Test delete a room chat : ", body);

  await chat_room
    .destroy({
      where: { id: body.id },
    })
    .then((result) => {
      console.log("RESULT :", result);
      ctx.body = { message: "xóa thành công" };
    })
    .catch((err) => {
      ctx.body = { message: "không xóa được", error: err };
    });
  ctx.status = 200;
  next();
});

// tìm kiếm nhóm chat

router.post("/search-chat-room/:page", async (ctx, next) => {
  const body = ctx.request.body;
  console.log("Test search room : ", ctx.request.body);

  let limit = 3; // number of records per page
  let offset = 0;
  let page = ctx.params.page;
  offset = limit * (page - 1);

  const list_chat_room = await chat_room.findAll({
    attributes: ["id", "title", "status", "avatar", "type"],
    include: [
      {
        //@ts-ignore
        model: chat,
        attributes: ["message", "message_type", "message_status"],
        limit: 1,
        order: [["created_at", "DESC"]],
      },
      {
        //@ts-ignore
        model: user,
        attributes: ["avatar", "user_name", "status", "created_at"],
      },
    ],
    where: {
      title: {
        // $like:
        [Op.like]: `%${body.text}%`,
      },
    },
    order: [["created_at", "DESC"]],
    offset: offset,
    limit: limit,
  });

  // let pages = Math.ceil(list_chat_room.length / limit);

  ctx.body = {
    result: list_chat_room,
    page: page,
  };
  ctx.status = 200;
});

// sửa nhóm chat

router.post("/update-room-chat/:id", async (ctx, next) => {
  console.log("Test update room chat : ", ctx.request.body);

  const body = ctx.request.body;
  var id = ctx.params.id;
  var title = body.title;
  var slogan = body.slogan;
  var description = body.description;
  var avatar = body.avatar;
  await chat_room.update(
    {
      title: title,
      slogan: slogan,
      description: description,
      avatar: avatar,
      updated_at: new Date(),
    },
    { where: { id: id } }
  );

  ctx.body = {
    result: {
      id: id,
      title: title,
      slogan: slogan,
      description: description,
      avatar: avatar,
      updated_at: new Date(),
    },
  };
  ctx.status = 200;
});

export default router;
