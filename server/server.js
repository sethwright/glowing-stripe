const path = require("path");
const express = require("express");
const app = express();
const jwtMiddleWare = require("express-jwt");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(process.env.SECRET_KEY);

const userRoute = require("./user");
const knex = require("./knex");

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  jwtMiddleWare({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    getToken: (req) => req.cookies.token,
    algorithms: ["HS256"],
  })
);

// this sets user routing API endpoints (inside users.js) to URL "/auth/(etc)". 
app.use("/auth", userRoute);


app.get("/checkout-session", async (req, res) => {
  const { session_id } = req.query;
  const { email } = req.user;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  console.log(session);

  // this will compare what the session id in the URL to the session info from the stripe and check the payment status.
  if (session.payment_status === "paid" && email === session.customer_email) {
    try {
      await knex("users").update({ premium: true }).where({ email }); 
      const token = jwt.sign({ email, premium: true }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, { httpOnly: true });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(403);
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { priceID } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: req.user.email,
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}?session_id={CHECKOUT_SESSION_ID}`, // NEED 2 FIX THIS?
      cancel_url: `${domainURL}`,
    });

    res.send({
      sessionId: session.id,
    });
  } catch (err) {
    res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.get("/snippets", async (req, res) => {
  const snippets = await knex("snippets").select("id", "title");
  res.json(snippets);
});

app.get("/snippets/:id", async (req, res) => {
  const records = await knex("snippets").where({ id: req.params.id });

  if (records.length === 0) {
    res.sendStatus(404);
    return;
  }

  const snippet = records[0];

  if (!snippet.premium_only) {
    res.json(snippet);
    return;
  }

  if (req.user === undefined || !req.user.premium) {
    res.sendStatus(403);
  } else {
    res.json(snippet);
  }
});

app.get("/setup", (req, res) => {
  res.send({
    publishKey: process.env.PUBLISHABLE_KEY,
    basicPrice: process.env.PRICE_BASIC,
    premiumPrice: process.env.PRICE_PREMIUM,
  });
});

// This servers the built app
app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

module.exports = app;
