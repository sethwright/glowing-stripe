exports.up = function (knex) {
  return knex.schema.table("snippets", (table) => {
    table.string("language").notNullable();
  });
};

exports.down = function (knex) {};
