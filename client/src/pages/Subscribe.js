import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default function Subscribe() {
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [yearlyPrice, setYearlyPrice] = useState("");
  const [pubKey, setPubKey] = useState("");
  const stripeRef = useRef();

  // this runs once on load and every time the value in the dependency array changes
  useEffect(() => {
    axios.get("/setup").then((res) => {
      setMonthlyPrice(res.data.monthlyPrice);
      setYearlyPrice(res.data.yearlyPrice);
      setPubKey(res.data.publishKey);
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
      <h1>Stripe API</h1>
      <button onClick={() => createCheckoutSession(monthlyPrice)}>Monthly</button>
      <button onClick={() => createCheckoutSession(yearlyPrice)}>Yearly</button>
    </div>
  );
}
