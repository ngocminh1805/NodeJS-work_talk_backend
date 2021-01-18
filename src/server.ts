import { Sequelize } from "sequelize";
import * as Koa from "koa";
import * as Router from "koa-router";
// Routes
import taskRoute from "./routes/task";
import attachmentRoute from "./routes/attachment";
import chatRoute from "./routes/chat";
import chatRoomRoute from "./routes/chat-room";

import logger = require("koa-logger");
import bodyParser = require("koa-bodyparser");

const DB: Sequelize = require("./common/connection-db");
// https://stackoverflow.com/questions/13179109/singleton-pattern-in-nodejs-is-it-needed

// Koa
const app = new Koa();
const koaBody = require('koa-body');
const router = new Router();

// ================
const path = require("path");
const fs = require("fs");

// =============== DB

//Test connection DB

DB.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

// Query DB

// End DB ===============

//init
app.use(logger());
app.use(bodyParser());
app.use(koaBody({ multipart: true }));

/**
 * Routes
 * */

// router.get("/", async (ctx) => {
//   ctx.body = "Welcome to My Koa App";
// });

app.use(router.routes());
app.use(taskRoute.routes());
app.use(attachmentRoute.routes());
app.use(chatRoute.routes());
app.use(chatRoomRoute.routes());

// app.use(function(ctx, next) {
//   var today = new Date();
//   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   var info = {
//    "source": {
//       "time": time,
//       "method": ctx.request.method,
//       "agent": ctx.request.header['user-agent'],
//       "body" : ctx.request.body,
//       "url": ctx.request.url,
//       "resultcode": ctx.response.status,

//    }
//   };
//   var dictstring = JSON.stringify(info);
//   var folderName = date;
//   var fildeName = date + '.txt';
//   if (!fs.existsSync(path.join("./recordedReq", folderName))) {
//       fs.mkdirSync(path.join("./recordedReq", folderName));
//       fs.writeFile("./recordedReq/" + folderName + "/" + fildeName , dictstring + "\n", (err:any, rs:any) =>{
//           if (err){
//               console.log(err);
//           }
//       });
//       }
//   else {
//       fs.readFile("./recordedReq/" + folderName + "/" + fildeName,  function (err:any, data:any) {
//           if (err){
//                   console.log(err);
//           }
//           else{
//               fs.appendFile("./recordedReq/" + folderName + "/" + fildeName, dictstring + "\n", function (err:any, data:any) {
//                 if (err) {
//                     throw err;
//                 }
//             });

//           }

//       })
//   }
//   next();
// });

app.listen(3000);

console.log("My Koa server is up and listening on port 3000");
