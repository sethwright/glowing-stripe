import axios from "axios";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Verify() {
  const location = useLocation();
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    axios
      .get(`/checkout-session${location.search}`)
      .then((res) => {
        setStatusCode(res.status);
      })
      .catch((err) => {
        setStatusCode(err.response.status);
      });
  }, []);

  return (
    <>
      {statusCode === 200 && <Redirect to="/" />}
      {statusCode === 400 && (
        <div>
          Server could not process your request at this time, please try again
          later.
        </div>
      )}
      {statusCode === 403 && <div>Payment failed</div>}
    </>
  );
}
