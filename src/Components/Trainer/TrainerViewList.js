import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/ContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const TrainerViewList = () => {
  const [id, setId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  console.log(userDetails);
  const { shareCollection } = useContext(GlobalContext);

  useEffect(() => {
    setUserDetails(shareCollection.filter((e) => e.uid === id));
  }, [id, shareCollection]);
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="col-span-1">
        {shareCollection?.map((e) => (
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
    </div>
  );
};

export default TrainerViewList;
