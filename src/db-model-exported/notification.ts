/* jshint indent: 2 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface notificationAttributes {
  id?: string;
  user_id?: string;
  chat_id?: string;
  chat_room_id?: string;
  receiver_id?: string;
  content?: string;
  status?: any;
  type?: any;
  is_read?: number;
  created_at?: Date;
  updated_at?: Date;
}

export class notification extends Model<notificationAttributes, notificationAttributes> implements notificationAttributes {
  id?: string;
  user_id?: string;
  chat_id?: string;
  chat_room_id?: string;
  receiver_id?: string;
  content?: string;
  status?: any;
  type?: any;
  is_read?: number;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    notification.init({
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    chat_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    chat_room_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'chat_room',
        key: 'id'
      }
    },
    receiver_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('0','1','2','3','4','5','6'),
      allowNull: true
    },
    is_read: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "_type_chat_id_uc",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "chat_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "chat_id",
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "chat_room_id",
        using: "BTREE",
        fields: [
          { name: "chat_room_id" },
        ]
      },
      {
        name: "receiver_id",
        using: "BTREE",
        fields: [
          { name: "receiver_id" },
        ]
      },
      {
        name: "ix_notification_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
  return notification;
  }
}
