
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'bob', password: 'appletree', premium: true, firstname: 'Robert', lastname: 'Smith'},
        {username: 'jeff', password: '123', firstname: 'Jeff', lastname: 'Bezos'},
      ]);
    })
};


/*
  .createTable("users", (table) => {
      table.increments("id").index().primary();
      table.unique("username").notNullable();
      table.string("password").notNullable();
      table.boolean("premium").defaultTo(false);
      table.string("firstname");
      table.string("lastname");

  })
  .createTable("content", (table) => {
      table.increments("id").index().primary();
      table.string("title").notNullable();
      table.string("content_type").notNullable();
      table.boolean("premium_only").defaultTo(true); // ? best to defaultTo(true), demo will demonstrate redirect to subscription page
  })
*/