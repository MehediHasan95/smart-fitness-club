import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CreateAttendenceApi } from "../../Api/AttendenceApi";
import { GlobalContext } from "../../Context/ContextProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import servicesCooking from "../../Assets/servicescooking.gif";

const UserProfile = () => {
  const [restMinute, setRestMinute] = useState(0);
  const { paymentCollection, create, user, attendenceCollection } =
    useContext(GlobalContext);

  const lastAttendance = attendenceCollection.slice(-1)[0];

  useEffect(() => {
    let minutes = moment(lastAttendance?.next).diff(
      moment().format("DD/MM/YYYY HH:mm:ss"),
      "minutes"
    );

    if (minutes > 0) {
      setRestMinute(minutes);
    } else {
      setRestMinute(0);
    }
  }, [restMinute, lastAttendance]);

  useEffect(() => {
    for (const index in { ...paymentCollection }) {
      const service = { ...paymentCollection }[index];
      const diff = moment(service.endingDate).diff(
        moment().format("yyyy-MM-DD"),
        "days"
      );
      if (diff > 0) {
        updateDoc(
          doc(db, `paymentCollection/${user?.uid}/list`, service.docRef),
          {
            serviceEnd: diff,
          }
        );
        updateDoc(
          doc(
            db,
            `shareCollection/${service.selectedTrainer.uid}/list`,
            service.docRef
          ),
          {
            serviceEnd: diff,
          }
        );
      } else {
        updateDoc(
          doc(db, `paymentCollection/${user?.uid}/list`, service.docRef),
          {
            serviceEnd: 0,
          }
        );
        updateDoc(
          doc(
            db,
            `shareCollection/${service.selectedTrainer.uid}/list`,
            service.docRef
          ),
          {
            serviceEnd: 0,
          }
        );
      }
    }
  }, [paymentCollection, user]);

  const handleAttendence = (e) => {
    e.preventDefault();
    const userAttendence = e.target.attendence.value;
    if (userAttendence === "CONFIRM") {
      const attendenceInfo = {
        next: moment(
          moment(create, "DD/MM/YYYY HH:mm:ss").add(1, "days")._d
        ).format("DD/MM/YYYY HH:mm:ss"),
        create,
        userAttendence,
        id: user.uid,
      };

      CreateAttendenceApi(attendenceInfo);
      e.target.reset();
    } else {
      toast.error("Please type 'CONFIRM'");
    }
  };

  return (
    <>
      {paymentCollection.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-2">
          <div className="col-span-1 lg:col-span-2">
            {paymentCollection?.map((e) => (
              <div
                key={e.uid}
                className="py-3 px-5 flex justify-between items-center mb-2 bg-red-100 shadow"
              >
                <div>
                  <h1 className="text-2xl font-semibold">{e.title}</h1>
                  <div className="flex">
                    <p>{e.duration} months</p>
                    <span className="mx-2">||</span>
                    <p>{e.amount}tk</p>
                  </div>
                  <p>
                    TxID: <span className="uppercase">{e.transactionId}</span>
                  </p>
                  <p>Starting date: {e.today}</p>
                  <p>Ending date: {e.endingDate}</p>
                  <p>Trainer: {e.selectedTrainer?.displayName}</p>
                  <p>
                    Service:{" "}
                    {e.serviceEnd > 0 ? (
                      <span className="text-green-600 font-bold">ACTIVE</span>
                    ) : (
                      <span className="text-red-600 font-bold">CLOSE</span>
                    )}
                  </p>
                </div>
                <div className="text-center uppercase">
                  {e.serviceEnd > 0 ? (
                    <h1>
                      <span className="text-3xl lg:text-8xl text-orange font-bold">
                        {e.serviceEnd}
                      </span>
                      <br />
                      <span>days left</span>
                    </h1>
                  ) : (
                    <p>
                      <span className="text-3xl lg:text-8xl text-orange font-bold">
                        {e.serviceEnd}
                      </span>
                      <br />
                      <span>Times up</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <form onSubmit={handleAttendence}>
              <input
                className="w-full border mb-2 p-2 outline-none text-center"
                type="text"
                name="attendence"
                placeholder="type 'CONFIRM'"
              />
              {!restMinute ? (
                <button className="w-full  p-2 mb-2 outline-none bg-orange text-white">
                  Submit
                </button>
              ) : (
                <p className="p-2 mb-2 text-center text-green-600">
                  Attendance complete
                </p>
              )}
            </form>
            <div>
              {attendenceCollection.length > 0 ? (
                <table className="tableSl text-center w-full">
                  <tr className="bg-orange text-white">
                    <th className="border">SL</th>
                    <th className="border">Name</th>
                    <th className="border">Action</th>
                  </tr>
                  {attendenceCollection.map((e) => (
                    <tr key={e.id}>
                      <td className="border">{}</td>
                      <td className="border">{e.create.slice(0, 11)}</td>
                      <td className="border">{e.userAttendence && "✅"}</td>
                    </tr>
                  ))}
                </table>
              ) : (
                <p className="text-center">Attendance not found</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center min-h-90">
          <img src={servicesCooking} alt="" className="w-3/6" />
        </div>
      )}
    </>
  );
};

export default UserProfile;
