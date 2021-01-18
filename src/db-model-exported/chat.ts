/* jshint indent: 2 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface chatAttributes {
  id?: string;
  user_id?: string;
  chat_room_id?: string;
  parent_id?: string;
  message?: string;
  message_type?: any;
  message_status?: any;
  status?: any;
  created_at?: Date;
  updated_at?: Date;
}

export class chat extends Model<chatAttributes, chatAttributes> implements chatAttributes {
  id?: string;
  user_id?: string;
  chat_room_id?: string;
  parent_id?: string;
  message?: string;
  message_type?: any;
  message_status?: any;
  status?: any;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    chat.init({
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
    chat_room_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'chat_room',
        key: 'id'
      }
    },
    parent_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message_type: {
      type: DataTypes.ENUM('0','1','2','3','4','5','6'),
      allowNull: true
    },
    message_status: {
      type: DataTypes.ENUM('0','1','2'),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'),
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
    tableName: 'chat',
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
        name: "_chat_room_id_created_at_uc",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_room_id" },
          { name: "created_at" },
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
        name: "ix_chat_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "chat_ibfk_3_idx",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
  return chat;
  }
}
