import { toast } from "react-hot-toast";

const AddNoticeApi = (notice) => {
  fetch("http://localhost:5000/notice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notice),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Add notice successfully");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

const NoticeDeleteApi = (id) => {
  fetch(`http://localhost:5000/notice/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Notice delete successfully");
      }
    });
};

const NoticeUpdateApi = (value) => {
  const { id } = value;
  fetch(`http://localhost:5000/notice/${id}`, {
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
        toast.success("Notice update successfully");
      }
    });
};

export { AddNoticeApi, NoticeUpdateApi, NoticeDeleteApi };
