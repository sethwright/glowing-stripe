const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("./knex");

router.post("/login", async (req, res) => {
  //client sends user and pass
  const { email, password } = req.body;

  //grab password from db
  const user = await db("users").select("*").where({ email });

  if (user.length === 0) {
    res.status(400).send("User doesn't exist");
    return;
  }

  //compare passwords
  bcrypt.compare(password, user[0].password, (err, result) => {
    if (result) {
      const token = jwt.sign(
        { email, premium: user[0].premium },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.sendStatus(200);
    } else {
      res.status(400).send("Invalid password.");
    }
  });
});

router.post("/signup", async (req, res) => {
  //client send email,user,pass,fname,lname,email
  const { email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      req.body.password = hash;
      //save info to db
      try {
        await db("users").insert(req.body);
        const token = jwt.sign(
          { email, premium: false },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        res.cookie("token", token, { httpOnly: true });
        res.sendStatus(200);
      } catch (err) {
        res.sendStatus(400);
        console.error(err);
      }
    });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});

//subscribe
router.get("/users", (req, res) => {
  if (req.user) {
    res.status(200);
    res.send(req.user);
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
