import { Knex } from "knex";

export interface IDatabaseManager {
  db: () => Knex;
}
