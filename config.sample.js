module.exports = {
  type: "object",
  properties: {
    salt: { type: "string" },
    sessionSecret: { type: "string" },
    sessionAge: { type: "number" },
    port: { type: "number" },
    dbConfig: {
      type: "object",
      properties: {
        client: { type: "string" },
        connection: {
          type: "object",
          properties: {
            user: { type: "string" },
            password: { type: "string" },
            database: { type: "string" },
            host: { type: "string" },
          },
          required: ["user", "password", "database", "host"],
        },
      },
      required: ["client", "connection"],
    },
    redisConfig: {
      type: "object",
      properties: {
        client: { type: "string" },
        host: { type: "string" },
        port: { type: "string" },
      },
      required: ["client", "host", "port"],
    },
  },
  required: ["salt", "port", "dbConfig", "redisConfig", "sessionSecret"],
};
