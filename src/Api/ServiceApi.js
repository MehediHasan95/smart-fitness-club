import { toast } from "react-hot-toast";

// Service post
const AddServicesApi = (services) => {
  fetch("http://localhost:5000/addservices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(services),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Services add successfully");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

// Service Delete
const ServiceDeleteApi = (id) => {
  fetch(`http://localhost:5000/addservices/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Service delete successfully");
      }
    });
};

const ServiceUpdateApi = (value) => {
  const { id } = value;
  fetch(`http://localhost:5000/addservices/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Service update successfully");
      }
    });
};

export { AddServicesApi, ServiceDeleteApi, ServiceUpdateApi };
