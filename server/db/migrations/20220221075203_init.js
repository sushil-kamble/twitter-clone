/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments().primary();
      table.string("name");
      table.string("handle").notNullable().unique();
      table.string("password").notNullable();
      table.string("avatar");
      table.text("bio");
      table.boolean("followed").defaultTo(false);
      table.integer("followers").defaultTo(0);
      table.integer("following").defaultTo(0);
      table.timestamps(true, true);
    })
    .createTable("tweet", (table) => {
      table.increments().primary();
      table.text("content").notNullable();
      table.integer("likes").defaultTo(0);
      table.boolean("liked").defaultTo(false);
      table.integer("userId").references("id").inTable("user").notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tweet").dropTableIfExists("user");
};
