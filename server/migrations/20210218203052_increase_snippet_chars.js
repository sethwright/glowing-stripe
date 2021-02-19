
exports.up = function(knex) {
  return knex.raw('alter TABLE snippets ALTER COLUMN snippet TYPE varchar(20000)');
};

exports.down = function(knex) {
  
};
