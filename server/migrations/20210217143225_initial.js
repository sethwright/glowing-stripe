
exports.up = function(knex) {
  return knex.schema
  .createTable("users", (table) => {
      table.increments("id").index().primary();
      table.unique("username").notNullable();
      table.string("password").notNullable();
      table.boolean("premium").defaultTo(false);
      table.string("firstname");
      table.string("lastname");

  })
  .createTable("snippets", (table) => {
      table.increments("id").index().primary();
      table.string("title").notNullable();
      table.string("snippet").notNullable();
      table.boolean("premium_only").defaultTo(true); // ? best to defaultTo(true), demo will demonstrate redirect to subscription page
  })
};


exports.down = function(knex) {};
