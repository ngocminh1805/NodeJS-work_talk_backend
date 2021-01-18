import { Sequelize } from "sequelize";
import { attachment, attachmentAttributes } from "./attachment";
import { chat, chatAttributes } from "./chat";
import { chat_room, chat_roomAttributes } from "./chat_room";
import { chat_room_member, chat_room_memberAttributes } from "./chat_room_member";
import { device, deviceAttributes } from "./device";
import { notification, notificationAttributes } from "./notification";
import { user, userAttributes } from "./user";


export {
  attachment, attachmentAttributes,
  chat, chatAttributes,
  chat_room, chat_roomAttributes,
  chat_room_member, chat_room_memberAttributes,
  device, deviceAttributes,
  notification, notificationAttributes,
  user, userAttributes,
};

export function initModels(sequelize: Sequelize) {
  attachment.initModel(sequelize);
  chat.initModel(sequelize);
  chat_room.initModel(sequelize);
  chat_room_member.initModel(sequelize);
  device.initModel(sequelize);
  notification.initModel(sequelize);
  user.initModel(sequelize);

  attachment.belongsTo(chat, { foreignKey: "chat_id"});
  chat.hasMany(attachment, { foreignKey: "chat_id"});
  attachment.belongsTo(user, { foreignKey: "created_by"});
  user.hasMany(attachment, { foreignKey: "created_by"});
  attachment.belongsTo(user, { foreignKey: "updated_by"});
  user.hasMany(attachment, { foreignKey: "updated_by"});
  chat.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(chat, { foreignKey: "user_id"});
  chat.belongsTo(chat_room, { foreignKey: "chat_room_id"});
  chat_room.hasMany(chat, { foreignKey: "chat_room_id"});
  chat.belongsTo(chat, { foreignKey: "parent_id"});
  chat.hasMany(chat, { foreignKey: "parent_id"});
  chat_room.belongsTo(user, { foreignKey: "created_by"});
  user.hasMany(chat_room, { foreignKey: "created_by"});
  chat_room_member.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(chat_room_member, { foreignKey: "user_id"});
  chat_room_member.belongsTo(chat_room, { foreignKey: "chat_room_id"});
  chat_room.hasMany(chat_room_member, { foreignKey: "chat_room_id"});
  chat_room_member.belongsTo(user, { foreignKey: "created_by"});
  user.hasMany(chat_room_member, { foreignKey: "created_by"});
  chat_room_member.belongsTo(user, { foreignKey: "updated_by"});
  user.hasMany(chat_room_member, { foreignKey: "updated_by"});
  device.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(device, { foreignKey: "user_id"});
  notification.belongsTo(user, { foreignKey: "user_id"});
  user.hasMany(notification, { foreignKey: "user_id"});
  notification.belongsTo(chat, { foreignKey: "chat_id"});
  chat.hasMany(notification, { foreignKey: "chat_id"});
  notification.belongsTo(chat_room, { foreignKey: "chat_room_id"});
  chat_room.hasMany(notification, { foreignKey: "chat_room_id"});
  notification.belongsTo(user, { foreignKey: "receiver_id"});
  user.hasMany(notification, { foreignKey: "receiver_id"});

  return {
    attachment,
    chat,
    chat_room,
    chat_room_member,
    device,
    notification,
    user,
  };
}
