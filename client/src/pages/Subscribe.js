import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect } from "react-router-dom";

export default function Subscribe() {
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [yearlyPrice, setYearlyPrice] = useState("");
  const [statusCode, setStatusCode] = useState();
  const stripeRef = useRef();

  // this runs once on load and every time the value in the dependency array changes
  useEffect(() => {
    axios
      .get("/auth/user")
      .then((res) => {
        setStatusCode(res.status);
      })
      .catch((err) => {
        setStatusCode(err.response.status);
      });
    axios.get("/setup").then((res) => {
      setMonthlyPrice(res.data.monthlyPrice);
      setYearlyPrice(res.data.yearlyPrice);
      loadStripe(res.data.publishKey).then((stripe) => {
        stripeRef.current = stripe;
      });
    });
  }, []);

  const createCheckoutSession = async (priceID) => {
    const response = await axios.post("/create-checkout-session", { priceID });
    const sessionId = response.data.sessionId;
    await stripeRef.current.redirectToCheckout({ sessionId });
  };

  return (
    <div className="Subscribe">
      {statusCode === 403 && <Redirect to="/login" />}
      {statusCode === 200 && (
        <>
          <h1>Stripe API</h1>
          <button onClick={() => createCheckoutSession(monthlyPrice)}>
            Monthly
          </button>
          <button onClick={() => createCheckoutSession(yearlyPrice)}>
            Yearly
          </button>
        </>
      )}
    </div>
  );
}

// this page neesds to redirect if not logged in
// it looks like shit
