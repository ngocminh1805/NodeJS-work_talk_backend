/* jshint indent: 2 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface chat_roomAttributes {
  id?: string;
  avatar?: string;
  title?: string;
  slogan?: string;
  description?: string;
  status?: any;
  type?: any;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class chat_room extends Model<chat_roomAttributes, chat_roomAttributes> implements chat_roomAttributes {
  id?: string;
  avatar?: string;
  title?: string;
  slogan?: string;
  description?: string;
  status?: any;
  type?: any;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    chat_room.init({
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    slogan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    type: {
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
    tableName: 'chat_room',
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
        name: "created_by",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "ix_chat_room_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
  return chat_room;
  }
}
