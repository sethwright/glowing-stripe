
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        // {username: 'bob', password: 'appletree', premium: true, firstname: 'Robert', lastname: 'Smith'},
        // {username: 'jeff', password: '123', firstname: 'Jeff', lastname: 'Bezos'},
      ]);
    })
};