require("dotenv").config();
// Update with your config settings.

module.exports = {
  client: "pg",
  connection: {
    connectionString:
      process.env.DATABASE_URL ||
      `postgres://${process.env.DB_USER}:${process.env.DB_PW}@127.0.0.1:5432/${process.env.DB_NAME}`,
    ssl: process.env.HAS_SSL ? { rejectUnauthorized: false } : undefined,
  },
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },

  /*
  development: {
    searchPath: "public",
    },
    pool: {
      min: 2,
      max: 10
    },
  },
  */
};
