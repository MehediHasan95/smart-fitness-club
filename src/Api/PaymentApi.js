import { toast } from "react-hot-toast";

const CreatePaymentApi = (paymentInfo) => {
  fetch("http://localhost:5000/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Add paymentInfo successfully");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
export { CreatePaymentApi };
