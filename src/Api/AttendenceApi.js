import { toast } from "react-hot-toast";

const CreateAttendenceApi = (info) => {
  fetch("http://localhost:5000/attendence", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Attendence successfully");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export { CreateAttendenceApi };
