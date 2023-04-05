import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AppPaymentApi } from "../../Api/PaymentApi";
import { Oval } from "react-loader-spinner";
import { addShareDataWithTrainer } from "../../Api/addShareDataWithTrainer";
import { GlobalContext } from "../../Context/ContextProvider";
import PinGenerate from "../Utilities/PinGenerate.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

const CheckoutForm = ({ serviceDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setpaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setpaymentSuccess] = useState({});
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    if (serviceDetails.amount) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: serviceDetails.amount }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [serviceDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setToggle(true);
    if (!stripe || !elements) {
      setToggle(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      setToggle(false);
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setToggle(false);
      setpaymentError(error.message);
    } else {
      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user.displayName,
              email: user.email,
            },
          },
        })
        .then(function (result) {
          setToggle(false);
          setpaymentSuccess(result.paymentIntent);

          if (result.paymentIntent.id) {
            const docRef = PinGenerate();
            AppPaymentApi({
              docRef,
              transactionId: result.paymentIntent.id,
              ...serviceDetails,
            });
            addShareDataWithTrainer({
              docRef,
              transactionId: result.paymentIntent.id,
              ...serviceDetails,
            });
            updateDoc(doc(db, `authCollection/${serviceDetails.uid}`), {
              docRef: docRef,
            });
          }
        });
      setpaymentError("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#ffffff",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="cursor-pointer w-full mt-5 rounded-full p-1 bg-indigo-500 hover:bg-indigo-600"
            disabled={!stripe || !elements || !clientSecret}
          >
            Pay
          </button>
        </div>
      </form>
      {toggle ? (
        <p className="my-3 flex justify-center items-center">
          <Oval
            height={25}
            width={25}
            color="#ffffff"
            secondaryColor="#e6e6e6"
            strokeWidth={5}
          />
        </p>
      ) : (
        <div className="text-center">
          <p className="my-3 text-rose-600">{paymentError}</p>
          {paymentSuccess.status && (
            <>
              <p>
                Your payment{" "}
                <span className="text-green-500">{paymentSuccess.status}</span>
                <br />
                <small>
                  TxID:{" "}
                  <span className="uppercase text-amber-300">
                    {paymentSuccess.id}
                  </span>
                </small>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
