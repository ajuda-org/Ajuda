import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("requests", table => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.integer("status").notNullable();
    table.string("latitude").notNullable();
    table.string("longitude").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("requests");
}
