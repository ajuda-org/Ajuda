import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("requests_helpers", table => {
    table.increments("id").primary();
    table
      .string("request_id")
      .notNullable()
      .references("id")
      .inTable("requests");
    table.string("user_id").notNullable().references("id").inTable("users");
    table.integer("status").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("requests_helpers");
}
