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
      table
        .string("avatar")
        .defaultTo(
          "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
        );
      table.text("bio");
      table.timestamps(true, true);
    })
    .createTable("follow", (table) => {
      table.increments().primary();
      table.integer("from").references("id").inTable("user").notNullable();
      table.integer("to").references("id").inTable("user").notNullable();
      table.unique(["from", "to"]);
      table.timestamps(true, true);
    })
    .createTable("tweet", (table) => {
      table.increments().primary();
      table.text("content").notNullable();
      table.integer("likes").defaultTo(0);
      table.integer("userId").references("id").inTable("user").notNullable();
      table.timestamps(true, true);
    })
    .createTable("tweet_likes", (table) => {
      table.increments().primary();
      table.integer("userId").references("id").inTable("user").notNullable();
      table.integer("tweetId").references("id").inTable("tweet").notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tweet_likes")
    .dropTableIfExists("tweet")
    .dropTableIfExists("follow")
    .dropTableIfExists("user");
};
