import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const Payment = ({ payment, selectTrainer, endingDate, today }) => {
  const stripePromise = loadStripe(
    "pk_test_51LWvsNLMcriZxEttA38fplrKRNWlpUER5KuwivRiWd5ukwv25KQZIMZ1jJ4ZytNmSDqYTVhmS1PUzx2R3eOGAtFF00uEKhILxq"
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        pay={payment}
        selectTrainer={selectTrainer}
        endingDate={endingDate}
        today={today}
      />
    </Elements>
  );
};

export default Payment;
