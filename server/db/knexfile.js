// Update with your config settings.

const { knexSnakeCaseMappers } = require("objection");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "twitter_clone",
      user: "sushilkamble",
      password: null,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    // Seeds - Files that store initial data
    ...knexSnakeCaseMappers,
  },
};
