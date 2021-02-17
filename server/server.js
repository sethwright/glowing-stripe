const path = require("path");
const express = require("express");
const app = express();
const jwtMiddleWare = require("express-jwt");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(process.env.SECRET_KEY);

const userRoute = require("./user");

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(jwtMiddleWare({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: req => req.cookies.token,
  algorithms: ["HS256"],  
}));

app.use("/auth", userRoute);

// Fetch the Checkout Session to display the JSON result on the success page
//  WE MIGHT NOT NEED THIS LATER ?
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  // http://localhost:5000/checkout-session?sessionId=cs_test_a1BWs4f5VhIFXSSjH1css6O9jgHB5gBT4PgG22XtKjOJ5muzlPOflIXvdo
  console.log(session);

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
      success_url: `${domainURL}?session_id={CHECKOUT_SESSION_ID}`, // NEED 2 FIX THIS
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


// This servers the built app
app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
})

module.exports = app;