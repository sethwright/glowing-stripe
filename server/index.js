require("dotenv").config();

const app = require("./server.js");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Broadcasting on port " + PORT);
});

/*
console.log("Running migrations...");
    await db.migrate.latest();

    console.log("Running seeds...");
    await db.seed.run();
*/ 