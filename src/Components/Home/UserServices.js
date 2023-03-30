import moment from "moment";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/ContextProvider";
import Payment from "../Payment/Payment";

const UserServices = () => {
  const [selectTrainer, setSelectTrainer] = useState("");
  const { id } = useParams();
  const { serviceCollection, authCollection, today } =
    useContext(GlobalContext);
  const details = serviceCollection.find((e) => e.id === id);
  const trainer = authCollection.filter((e) => e.role === "trainer");

  const endingDate = moment(
    moment(today, "yyyy-MM-DD").add(details?.duration, "month")._d
  ).format("yyyy-MM-DD");

  return (
    <div className="min-h-screen bg-raisinBlack text-white">
      <div className="grid  lg:grid-cols-2 items-center ">
        <div className="cols-span-1 ">
          <div className="text-black w-3/4 px-5 py-20 mx-auto">
            <label className="text-orange  mx-2">Plan:</label>
            <input
              className=" w-full p-2 text-white mb-2 outline-none bg-gray-600 "
              type="text"
              value={details?.title}
            />
            <label className="text-orange mx-2">Amount:</label>
            <input
              className="w-full p-2 text-white mb-2 outline-none bg-gray-600"
              type="text"
              value={details?.amount}
            />
            <label className="text-orange mx-2">Duration:</label>
            <input
              className="w-full p-2 text-white mb-2 outline-none bg-gray-600"
              type="text"
              value={details?.duration}
            />
            <label className="text-orange mx-2">Features:</label>
            <select
              name=""
              className="w-full p-2 text-white mb-2 outline-none bg-gray-600"
            >
              {details?.features.map((e) => (
                <option>{e?.features}</option>
              ))}
            </select>

            <label className="text-orange mx-2">Select Trainer:</label>
            <select
              onChange={(e) => setSelectTrainer(e.target.value)}
              className="w-full p-2 text-white mb-2 outline-none bg-gray-600"
            >
              {trainer.map((e) => (
                <option>{e?.displayName}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-orange mx-2 ">Staring Date:</label>{" "}
                <br />
                <input
                  type="date"
                  value={today}
                  className="w-full p-2 text-white mb-2 outline-none bg-gray-600"
                />
              </div>
              <div>
                <label className="text-orange mx-2">Ending Date:</label> <br />
                <input
                  type="date"
                  value={endingDate}
                  className="w-full p-2 text-white mb-2 outline-none bg-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="cols-span-1">
          <div className="w-3/4 mx-auto text-white  bg-gray-600 p-5">
            <h1 className="text-2xl lg:text-3xl font-bold font-lobster text-center py-5 ">
              Fitness <span className="text-orange">Club</span>
            </h1>
            <p className="pb-5 text-xl font-medium px-5 ">
              “I hated every minute of training, but I said, ‘Don’t quit. Suffer
              now and live the rest of your life as a champion.” –
              <span className="text-orange"> Muhammad Ali</span>
            </p>
            <div className="flex justify-center">
              {/* <button className="w-3/6  p-2 mt-4 outline-none bg-orange text-white"></button> */}
            </div>
            <br />{" "}
            <Payment
              payment={details}
              selectTrainer={selectTrainer}
              endingDate={endingDate}
              today={today}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserServices;
