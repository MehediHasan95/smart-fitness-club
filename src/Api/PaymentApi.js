import { toast } from "react-hot-toast";

const AppPaymentApi = (paymentDetail) => {
  fetch("http://localhost:5000/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentDetail),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Payment successfull");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export { AppPaymentApi };
