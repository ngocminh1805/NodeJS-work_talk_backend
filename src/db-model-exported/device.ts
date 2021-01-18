/* jshint indent: 2 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export interface deviceAttributes {
  id?: string;
  user_id?: string;
  brand?: string;
  name?: string;
  version?: string;
  manufacturer?: string;
  model?: string;
  os_name?: string;
  os_version?: string;
  status?: any;
  token?: string;
  fcm_token?: string;
  session_code?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class device extends Model<deviceAttributes, deviceAttributes> implements deviceAttributes {
  id?: string;
  user_id?: string;
  brand?: string;
  name?: string;
  version?: string;
  manufacturer?: string;
  model?: string;
  os_name?: string;
  os_version?: string;
  status?: any;
  token?: string;
  fcm_token?: string;
  session_code?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize) {
    device.init({
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    version: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    manufacturer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    model: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    os_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    os_version: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fcm_token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    session_code: {
      type: DataTypes.STRING(255),
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
    tableName: 'device',
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
        name: "ix_device_status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
    ]
  });
  return device;
  }
}
