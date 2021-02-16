require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// body parser middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log("Broadcasting on port "  + PORT);
});