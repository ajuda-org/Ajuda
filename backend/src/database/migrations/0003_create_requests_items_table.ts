import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("requests_items", table => {
    table.increments("id").primary();
    table
      .string("request_id")
      .notNullable()
      .references("id")
      .inTable("requests");
    table.string("item_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("requests_items");
}
