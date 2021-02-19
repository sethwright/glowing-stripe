const snippets = require("../data/data");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("snippets")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("snippets").insert(snippets);
    });
};
