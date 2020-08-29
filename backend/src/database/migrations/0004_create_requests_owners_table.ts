import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("requests_owners", table => {
    table.increments("id").primary();
    table
      .string("request_id")
      .notNullable()
      .references("id")
      .inTable("requests");
    table.string("user_id").notNullable().references("id").inTable("users");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("requests_owners");
}
