import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTableIfNotExists("users", function (table) {
    table
      .uuid("id")
      .notNullable()
      .defaultTo(knex.raw("uuid_generate_v1()"))
      .primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
    table.bigInteger("birthdate").notNullable();
    table.string("phone_number").notNullable().unique();
    table.string("password").notNullable();
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;');
}
