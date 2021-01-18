const env = {
  reverseProxy: {},
  nodeApp: {
    port: 80,
    host: "172.16.40.43",
  },
  redisApp: {
    port: 6379,
    host: "172.16.40.42",
  },
  redisPushstream: {
    port: 6379,
    host: "172.16.40.44",
  },
  pushStreamServer: {
    port: 8080,
    host: "123.31.43.225",
  },
  mysqlDB: {
    database: "work_talk",
    username: "root",
    password: "Hyper@123",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  JWT_SECRET: "Hyperlogy",
};

export { env };
