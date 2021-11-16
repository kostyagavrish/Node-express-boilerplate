import { Knex, knex } from "knex";
import * as pg from "pg";
import { IDatabaseManager } from "./interfaces/database";
const { dbConfig } = require("../config");

const createUnixSocketPool = () => {
  const newConfig = { ...dbConfig, pool: { min: 0, max: 1 } };
  pg.types.setTypeParser(20, parseInt);
  return knex(newConfig);
};

class DatabaseManager implements IDatabaseManager {
  database: null | Knex;
  constructor(private createUnixSocketPool: () => Knex) {
    this.database = null;
  }
  public db() {
    if (!this.database) {
      this.database = this.createUnixSocketPool();
      return this.database;
    }
    return this.database;
  }
}
export default new DatabaseManager(createUnixSocketPool);
