import React, { useContext } from "react";
import { GlobalContext } from "../../Context/ContextProvider";

const TrainerNotice = () => {
  const { notice } = useContext(GlobalContext);
  return (
    <div className="p-3">
      {notice.map((e) => (
        <div className="border p-5 mb-5 ">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold text-orange ">{e.heading}</h1>
            <p>{e.create}</p>
          </div>

          <p className="">{e.notice}</p>
        </div>
      ))}
    </div>
  );
};

export default TrainerNotice;
