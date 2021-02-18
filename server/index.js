require("dotenv").config();
const db = require("./knex");

const app = require("./server.js");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log("Running migrations...");
    await db.migrate.latest();

    // console.log("Running seeds...");
    // await db.seed.run();

    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
})();
