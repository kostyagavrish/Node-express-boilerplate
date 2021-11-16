module.exports = {
  sessionSecret: "B7Jdj93os8WlZ",
  sessionAge: 1000 * 60 * 60 * 24 * 2,
  salt: "S03Dsdsd29nSDvP",
  port: 3000,
  dbConfig: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "0000",
      database: "postgres",
      host: "localhost",
      // host: "172.16.238.1",
    },
  },
  redisConfig: {
    host: process.env.REDIS_URL,
    port: "6379",
  },
};
