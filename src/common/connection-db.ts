
import { Sequelize } from "sequelize";
import { env } from "./env";

const DB = new Sequelize(
    env.mysqlDB.database,
    env.mysqlDB.username,
    env.mysqlDB.password,
    {
      host: env.mysqlDB.host,
      // @ts-ignored
      dialect: env.mysqlDB.dialect,
      port: env.mysqlDB.port,
      pool: {
        max: env.mysqlDB.pool.max,
        min: env.mysqlDB.pool.min,
        acquire: env.mysqlDB.pool.acquire,
        idle: env.mysqlDB.pool.idle,
      },
    }
  );

module.exports = DB
