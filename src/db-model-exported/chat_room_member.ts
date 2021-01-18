/* jshint indent: 2 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface chat_room_memberAttributes {
  id?: string;
  user_id?: string;
  chat_room_id?: string;
  is_admin?: number;
  status?: any;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class chat_room_member extends Model<chat_room_memberAttributes, chat_room_memberAttributes> implements chat_room_memberAttributes {
  id?: string;
  user_id?: string;
  chat_room_id?: string;
  is_admin?: number;
  status?: any;
  created_by?: string;
  updated_by?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    chat_room_member.init({
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
    is_admin: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
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
    tableName: 'chat_room_member',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
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
        name: "created_by",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "updated_by",
        using: "BTREE",
        fields: [
          { name: "updated_by" },
        ]
      },
      {
        name: "ix_chat_room_member_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
  return chat_room_member;
  }
}
