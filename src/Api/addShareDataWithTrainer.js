import { toast } from "react-hot-toast";

const addShareDataWithTrainer = (share) => {
  fetch("http://localhost:5000/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(share),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Share successfull");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export { addShareDataWithTrainer };
