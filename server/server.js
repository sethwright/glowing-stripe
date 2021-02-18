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

app.use("/auth", userRoute);

// Fetch the Checkout Session to display the JSON result on the success page
//  WE MIGHT NOT NEED THIS LATER ?
app.get("/checkout-session", async (req, res) => {
  const { session_id } = req.query;
  const { username } = req.user;
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status === "paid") { ///???? no, bad validation
    try {
      await knex("users").update({ premium: true }).where({ username }); 
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(400);
    }
  }

  // http://localhost:5000/checkout-session?sessionId=cs_test_a1BWs4f5VhIFXSSjH1css6O9jgHB5gBT4PgG22XtKjOJ5muzlPOflIXvdo
  // console.log(session);

  // res.send(session);
});

/** 
 {
    "id": "cs_test_a1c0fQYuwcgn3caGmo5s2DG108amZ1P0EBDiAYJzGuQxHkBVlNhxssZfBW",
    "object": "checkout.session",
    "allow_promotion_codes": null,
    "amount_subtotal": 500,
    "amount_total": 500,
    "billing_address_collection": null,
    "cancel_url": "http://localhost:5000/",
    "client_reference_id": null,
    "currency": "jpy",
    "customer": "cus_IxmgcaLZoYLdQa",
    "customer_details": {
        "email": "aaa@aaa.com",
        "tax_exempt": "none",
        "tax_ids": []
    },
    "customer_email": null,
    "livemode": false,
    "locale": null,
    "metadata": {},
    "mode": "subscription",
    "payment_intent": null,
    "payment_method_types": [
        "card"
    ],
    "payment_status": "paid",
    "setup_intent": null,
    "shipping": null,
    "shipping_address_collection": null,
    "submit_type": null,
    "subscription": "sub_Ixmg0hofSJIBty",
    "success_url": "http://localhost:5000/?session_id={CHECKOUT_SESSION_ID}",
    "total_details": {
        "amount_discount": 0,
        "amount_tax": 0
    }
}
*/

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { priceID } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      //customer-email???
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
