import React, { useContext, useState } from "react";
import {
  AddNoticeApi,
  NoticeDeleteApi,
  NoticeUpdateApi,
} from "../../Api/NoticeApi";
import { GlobalContext } from "../../Context/ContextProvider";
import pinGenerate from "../Utilities/PinGenerate";

const Notices = () => {
  const { notice, create } = useContext(GlobalContext);
  const [update, setUpdate] = useState({});

  const handleNotice = (e) => {
    e.preventDefault();
    const id = pinGenerate();
    const heading = e.target.heading.value;
    const notice = e.target.notice.value;
    const noticeInfo = { id, heading, notice, create };
    AddNoticeApi(noticeInfo);
    e.target.reset();
  };

  const handleRemoveNotice = (id) => {
    NoticeDeleteApi(id);
  };

  const handleEditHeading = (e) => {
    const { heading, ...rest } = update;
    setUpdate({ heading: e, ...rest });
  };
  const handleEditNotice = (e) => {
    const { notice, ...rest } = update;
    setUpdate({ notice: e, ...rest });
  };

  const handleFindOne = (id) => {
    setUpdate(notice.find((e) => e.id === id));
  };

  const handleConfirmUpdateNotice = (update) => {
    NoticeUpdateApi(update);
  };

  return (
    <div className="p-3">
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1">
          <h1 className="text-orange text-2xl text-center mb-3 font-semibold">
            Write notice here
          </h1>
          <form onSubmit={handleNotice}>
            <input
              type="text"
              name="heading"
              className="w-full p-2 mb-3 border focus:outline-orange"
              placeholder="Heading"
            />
            <textarea
              name="notice"
              rows="5"
              className="w-full p-2 mb-3 border focus:outline-orange"
              placeholder="Type here..."
            ></textarea>
            <button className="w-full p-2 border-0 bg-orange text-white">
              Submit
            </button>
          </form>
        </div>
        <div className="col-span-2">
          {notice.map((e) => (
            <div key={e.id} className="border p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl">{e.heading}</h1>
                <h1 className="text-xs">{e.create}</h1>
              </div>
              <p>{e.notice}</p>
              <button
                onClick={() => handleRemoveNotice(e.id)}
                className="py-1 px-3 m-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleFindOne(e.id)}
                className="m-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <label
                  htmlFor="my-modal-4"
                  className="cursor-pointer  inline-block w-full px-6 py-1"
                >
                  Edit
                </label>
              </button>
            </div>
          ))}
        </div>
      </div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h1 className="text-center text-xl mb-3">Update Notice</h1>
          <input
            type="text"
            onChange={(e) => handleEditHeading(e.target.value)}
            value={update.heading}
            className="w-full p-2 mb-3 border focus:outline-orange"
            placeholder="Heading"
          />
          <textarea
            onChange={(e) => handleEditNotice(e.target.value)}
            value={update.notice}
            rows="5"
            className="w-full p-2 mb-3 border focus:outline-orange"
            placeholder="Type here..."
          ></textarea>
          <button
            onClick={() => handleConfirmUpdateNotice(update)}
            className="w-full p-2 border-0 bg-orange text-white"
          >
            Update
          </button>
        </label>
      </label>
    </div>
  );
};

export default Notices;
