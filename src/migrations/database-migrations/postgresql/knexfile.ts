const { dbConfig } = require("../../../../config");

module.exports = {
  development: {
    ...dbConfig,
    migrations: {
      directory: "./migrations.list",
    },
  },
};
