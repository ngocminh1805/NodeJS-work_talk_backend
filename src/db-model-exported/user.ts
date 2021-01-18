/* jshint indent: 2 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface userAttributes {
  id?: string;
  user_name?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  salt?: string;
  gender?: any;
  status?: any;
  is_admin?: number;
  last_login?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class user extends Model<userAttributes, userAttributes> implements userAttributes {
  id?: string;
  user_name?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  salt?: string;
  gender?: any;
  status?: any;
  is_admin?: number;
  last_login?: Date;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    user.init({
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "user_name"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('0','1','2'),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    is_admin: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
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
    tableName: 'user',
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
        name: "user_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "ix_user_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
  return user;
  }
}
