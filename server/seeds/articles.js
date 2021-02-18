const bcrypt = `bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
      // Store hash in your password DB.
  });
});`;

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("snippets")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("snippets").insert([
        {
          title: "Hello World",
          snippet: "function HelloWorld() { console.log('Hello World') };",
          premium_only: false,
          language: "javascript",
        },
        {
          title: "Hash Password with Bcrypt",
          snippet: bcrypt,
          language: "javascript",
        },
      ]);
    });
};
