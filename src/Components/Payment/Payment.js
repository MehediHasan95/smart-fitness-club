import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const Payment = ({ serviceDetails }) => {
  const stripePromise = loadStripe(
    "pk_test_51MqYWOIkb8dsmfJkn85XyZw2pfTFXaD96yYrukGo502RGXvEJZOR2mWQ3UjFHAPBo1jpQ4nT6rAEGcMIbMu1v4Zm00owIgXKJx"
  );

  return (
    <div className="bg-gray-700 rounded-lg p-5 w-3/4 mx-auto shadow">
      <Elements stripe={stripePromise}>
        <CheckoutForm serviceDetails={serviceDetails} />
      </Elements>
    </div>
  );
};

export default Payment;
