import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/ContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";

const TrainerViewList = () => {
  const [id, setId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [userAttendence, setUserAttendence] = useState([]);
  const [unique, setUnique] = useState([]);
  const { shareCollection, attendenceCollection } = useContext(GlobalContext);

  useEffect(() => {
    setUserDetails(shareCollection.filter((e) => e.uid === id));
    if (id) {
      onSnapshot(
        query(
          collection(db, `attendenceCollection/${id}/attendenceList`),
          orderBy("create", "asc")
        ),
        (snapshot) => {
          setUserAttendence(snapshot.docs.map((e) => e.data()));
        }
      );
    }
  }, [id, shareCollection, attendenceCollection]);

  console.log(userAttendence);
  useEffect(() => {
    const unique2 = shareCollection.filter((obj, index) => {
      return index === shareCollection.findIndex((o) => obj.uid === o.uid);
    });

    setUnique(unique2);
  }, [shareCollection]);
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="col-span-1">
        {unique?.map((e) => (
          <Link>
            <div className="flex justify-between items-center mb-2 p-2 bg-red-200">
              <div>
                <h1 className="font-bold text-xl">{e.displayName}</h1>
                <p>{e.email}</p>
              </div>
              <button className="p-2 mt-1">
                <FontAwesomeIcon
                  onClick={() => setId(e.uid)}
                  className="text-orange text-xl"
                  icon={faArrowAltCircleRight}
                />
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="lg:col-span-2">
        {userDetails.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-3">
            <div>
              <div className=" border p-3">
                {userDetails?.map((userDetails) => (
                  <div className=" my-2">
                    <h1 className="font-bold text-2xl text-orange">
                      {userDetails?.title}
                    </h1>
                    <h1>Starting Date : {userDetails?.today}</h1>
                    <h1>Ending Date : {userDetails?.endingDate}</h1>
                    <h1> Services {userDetails?.serviceEnd} More to go .</h1>
                    <h1>
                      {" "}
                      Features :
                      <ul className="list">
                        {userDetails?.features?.map((e) => (
                          <li className="ml-3">{e?.features}</li>
                        ))}
                      </ul>
                    </h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="border p-3">
              <div>
                {userAttendence.length > 0 ? (
                  <table className="tableSl text-center w-full">
                    <tr className="bg-orange text-white">
                      <th className="border">SL</th>
                      <th className="border">Name</th>
                      <th className="border">Action</th>
                    </tr>
                    {userAttendence.map((e) => (
                      <tr key={e.id}>
                        <td className="border">{}</td>
                        <td className="border">{e.create.slice(0, 11)}</td>
                        <td className="border">{e.userAttendence}</td>
                      </tr>
                    ))}
                  </table>
                ) : (
                  <p
                    className="text-center text-red-500
                "
                  >
                    {" "}
                    Attendence not found{" "}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center ">Click to view information</p>
        )}
      </div>
    </div>
  );
};

export default TrainerViewList;
