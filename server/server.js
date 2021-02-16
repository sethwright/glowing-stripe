const express = require("express");
const app = express();

const stripe = require("stripe")(process.env.SECRET_KEY);

// body parser middleware
app.use(express.json());

// Fetch the Checkout Session to display the JSON result on the success page
//  WE MIGHT NOT NEED THIS LATER ?
app.get("/checkout-session", async (req, res) => {
  const { sessionID } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionID);
  res.send(session);
});

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { priceID } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: [
        "card",
      ],
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}`,
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

app.get("/setup", (req, res) => {
    res.send({
        publishKey: process.env.PUBLISHABLE_KEY,
        basicPrice: process.env.PRICE_BASIC,
        premiumPrice: process.env.PRICE_PREMIUM,
    });
});

module.exports = app;