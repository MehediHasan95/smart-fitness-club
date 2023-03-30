import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/FirebaseConfig";
import { CreatePaymentApi } from "../../Api/PaymentApi";

import { toast } from "react-hot-toast";

const CheckoutForm = ({ pay, selectTrainer, endingDate, today }) => {
  const [paymentConfirm, setPaymentConfirm] = useState({});
  const [user] = useAuthState(auth);
  const [errorMsg, setErrorMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { displayName, email, uid } = user;
  const { id } = paymentConfirm;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      setErrorMsg(error?.message);
    } else {
      setPaymentConfirm(paymentMethod);
      setErrorMsg("");
    }

    if (paymentConfirm) {
      const paymentInfo = {
        pay,
        displayName,
        uid,
        email,
        selectTrainer,
        transictionId: id,
        endingDate,
        today,
      };
      if (selectTrainer && paymentConfirm) {
        CreatePaymentApi(paymentInfo);
      } else {
        toast.error("Select your trainer and pay the payment");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <div className="flex mt-5 justify-center">
          <button
            className=" bg-orange p-2 rounded w-2/6 "
            type="submit"
            disabled={!stripe || !elements}
          >
            Pay
          </button>
        </div>
      </form>
      <p className="text-red-600 text-center my-5">{errorMsg}</p>
    </div>
  );
};

export default CheckoutForm;
