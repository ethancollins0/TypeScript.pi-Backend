module.exports = {
  development: {
    client: "pg",
    connection: "postgres://ethan:password@localhost:5432/typescriptpi",
    migrations: {
      directory: "./src/knex/migrations"
    },
    seeds: {
      directory: "./src/knex/seeds"
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds"
    }
  }
};
