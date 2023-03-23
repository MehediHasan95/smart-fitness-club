import { toast } from "react-hot-toast";

// POST and CREATE ACCOUNT
const AuthCreateApi = (info) => {
  fetch("http://localhost:5000/authcreate", {
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
        toast.success("Account create successfully");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

// POST
const AuthApi = (authInfo) => {
  fetch("http://localhost:5000/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      toast.success("Successfull");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

// UPDATE
const UpdateApi = (value) => {
  const { uid } = value;
  fetch(`http://localhost:5000/auth/${uid}`, {
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
        toast.success("Account update successfully");
      }
    });
};

// DELETE
const DeleteApi = (uid) => {
  fetch(`http://localhost:5000/auth/${uid}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Account delete successfully");
      }
    });
};

export { AuthCreateApi, AuthApi, UpdateApi, DeleteApi };
