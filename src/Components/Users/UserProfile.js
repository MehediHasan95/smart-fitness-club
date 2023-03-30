import moment from "moment";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { CreateAttendenceApi } from "../../Api/AttendenceApi";
import { GlobalContext } from "../../Context/ContextProvider";

const UserProfile = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { paymentCollection, create, user, attendenceCollection } =
    useContext(GlobalContext);
  console.log(attendenceCollection);
  const handleAttendence = (e) => {
    e.preventDefault();
    const userAttendence = e.target.attendence.value;
    if (userAttendence === "CONFIRM") {
      const attendenceInfo = {
        create,
        userAttendence,
        id: user.uid,
      };
      CreateAttendenceApi(attendenceInfo);
      e.target.reset();
    } else {
      toast.error("Type Error");
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-2">
      <div className="col-span-2">
        <div>
          {paymentCollection.map((e) => (
            <div className="border p-5 m-3" key={e.uid}>
              <h1 className="text-2xl font-bold "> {e.pay.title}</h1>
              <h1 className="my-2">Duration: {e.pay.duration} Months</h1>
              <h1 className="my-2">Amount: {e.pay.amount} </h1>
              <h1 className="my-2">Trainer: {e.selectTrainer} </h1>
              <h1 className="my-2">transiction Id: {e.transictionId} </h1>
              <h1 className="my-2">
                <span>From: {e.today}</span> <span>To: {e.endingDate}</span>
              </h1>
              <h1>
                {moment(e.endingDate).diff(
                  moment().format("yyyy-MM-DD"),
                  "days"
                ) > 0 ? (
                  <>
                    {moment(e.endingDate).diff(
                      moment().format("yyyy-MM-DD"),
                      "days"
                    )}{" "}
                    Days left
                  </>
                ) : (
                  "Time Up"
                )}{" "}
              </h1>
              <h1>
                {moment(e.endingDate).diff(
                  moment().format("yyyy-MM-DD"),
                  "days"
                ) > 0 ? (
                  <button className="bg-green-600 px-5 py-1 rounded my-3 text-white">
                    Active
                  </button>
                ) : (
                  <button className="bg-red-800 px-5 py-1 rounded my-3 text-white">
                    close
                  </button>
                )}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <form onSubmit={handleAttendence}>
          <input
            className="w-full border my-3 p-2 outline-none text-center"
            type="text"
            name="attendence"
            placeholder="type 'CONFIRM' "
          />
          <button
          // disabled={btnDisabled}
          // className={
          //   btnDisabled
          //     ? "w-full border  p-2 outline-none bg-orange text-white"
          //     : "w-full border  p-2 outline-none bg-gray-400 text-white"
          // }
          >
            Attendence
          </button>
        </form>
        <div>
          <table className="w-full text-center ">
            <thead>
              <tr className="bg-orange text-white">
                <th>SL</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tableSl">
              {attendenceCollection.map((e) => (
                <tr key={e.id}>
                  <td>{}</td>
                  <td>{e.create}</td>
                  <td>{e.userAttendence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
