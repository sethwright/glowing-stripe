import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';

function App() {
  const [basicPrice, setBasicPrice] = useState('');
  const [premPrice, setPremPrice] = useState('');
  const [pubKey, setPubKey] = useState('');
  const stripeRef = useRef();

  // this runs once on load and every time the value in the dependency array changes
  useEffect(() => {
    axios.get('/setup').then((res) => {
      setBasicPrice(res.data.basicPrice);
      setPremPrice(res.data.premiumPrice);
      setPubKey(res.data.publishKey);
      loadStripe(res.data.publishKey).then((stripe) => {
        stripeRef.current = stripe;
      });   
    });
  }, []);

  const createCheckoutSession = async (priceID) => {
    const response = await axios.post('/create-checkout-session', { priceID });
    const sessionId = response.data.sessionId;
    await stripeRef.current.redirectToCheckout({ sessionId });
  };
  
  return (
    <div className="App">
      <h1>Stripe API</h1>
      <button onClick={() => createCheckoutSession(basicPrice)}>Basic</button>
      <button onClick={() => createCheckoutSession(premPrice)}>Premium</button>
    </div>
  );
}

export default App;
