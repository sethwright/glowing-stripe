
exports.up = function(knex) {
  return knex.schema.table("users", (table) => {
    table.string('email');
    table.unique('email');
  })
};

exports.down = function(knex) {
  
};
