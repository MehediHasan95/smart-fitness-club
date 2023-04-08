import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/ContextProvider";
import Payment from "../Payment/Payment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UserServices = () => {
  const { id } = useParams();
  const [chooseTrainer, setChooseTrainer] = useState("");
  const {
    serviceCollection,
    paymentCollection,
    authCollection,
    today,
    user,
    userPhoto,
  } = useContext(GlobalContext);

  const details = serviceCollection.find((e) => e.id === id);
  const trainer = authCollection.filter((e) => e.role === "trainer");
  const selectedTrainer = trainer.find((e) => e.uid === chooseTrainer);
  const [previousServious, setPreviousServious] = useState({});

  const endingDate = moment(
    moment(today, "yyyy-MM-DD").add(details?.duration, "month")._d
  ).format("yyyy-MM-DD");

  const serviceDetails = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    ...details,
    selectedTrainer,
    serviceEnd: parseInt(details?.duration),
    today,
    endingDate,
  };

  useEffect(() => {
    setPreviousServious(paymentCollection.slice(-1)[0]);
  }, [paymentCollection]);

  return (
    <>
      {user?.photoURL === userPhoto ? (
        <div className="bg-raisinBlack text-white">
          <Link to="/">
            <button className="px-4 py-1 m-3 flex items-center absolute">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="ml-2">Go to Home</span>
            </button>
          </Link>

          {!previousServious?.serviceEnd ? (
            <div className="grid gap-5 lg:grid-cols-2 place-items-center min-h-screen">
              <div className="cols-span-1 w-11/12 lg:w-4/5 mx-auto">
                <div className="bg-gray-600 p-5">
                  <h1 className="text-4xl mb-3 font-semibold">
                    {details?.title}
                  </h1>
                  <p>Duration: {details?.duration} month</p>
                  <p>Amount: {details?.amount}tk</p>
                  <p>
                    Starts on <span className="text-orange">{today}</span> and
                    ends on <span className="text-orange">{endingDate}</span>
                  </p>

                  <ul className="features-list my-3">
                    <p>Features list:</p>
                    {details?.features.map((e, index) => (
                      <li key={index} className="italic">
                        {e.features}
                      </li>
                    ))}
                  </ul>

                  <label>
                    Choose a trainer: {selectedTrainer?.displayName}
                    <select
                      onChange={(e) => setChooseTrainer(e.target.value)}
                      className="w-full p-1 outline-none bg-gray-800"
                    >
                      <option selected disabled>
                        Please select a trainer
                      </option>
                      {trainer?.map((e) => (
                        <option key={e.uid} value={e.uid}>
                          {e.displayName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className="cols-span-1 w-11/12 lg:w-full mx-auto">
                <div className="w-11/12 lg:w-3/4 mx-auto text-white  bg-gray-600 p-5">
                  {!selectedTrainer && (
                    <>
                      <h1 className="text-2xl lg:text-3xl font-bold font-lobster text-center py-5 ">
                        Fitness <span className="text-orange">Club</span>
                      </h1>
                      <p className="pb-5 text-xl font-medium px-5 text-center">
                        “I hated every minute of training, but I said, ‘Don’t
                        quit. Suffer now and live the rest of your life as a
                        champion.” –
                        <span className="text-orange"> Muhammad Ali</span>
                      </p>
                    </>
                  )}
                  {selectedTrainer && (
                    <div>
                      <h1 className="text-center uppercase mb-5 text-xl">
                        Order Summary
                      </h1>
                      <div className="mb-8">
                        <p className="flex justify-between">
                          <span>Payable amount:</span>
                          <span>{details?.amount} tk</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Tax</span>
                          <span>0.0 tk</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Service charge</span>
                          <span>0.0 tk</span>
                        </p>
                        <hr className="mt-3" />
                        <p className="flex justify-between">
                          <span>Sub-total</span>
                          <span>{details?.amount} tk</span>
                        </p>
                      </div>
                      <Payment serviceDetails={serviceDetails} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen grid place-items-center">
              <h1 className="text-2xl text-center">
                You cannot purchase any other service while <br /> you are
                running the {previousServious.title} service
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-raisinBlack min-h-screen flex items-center justify-center text-white relative">
          <Link to="/">
            <button className="px-4 py-1 m-3 flex items-center absolute top-0 left-0">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="ml-2">Go to Home</span>
            </button>
          </Link>
          <h1 className="text-white text-center text-2xl ">
            Admins and Trainers can't purchase any services 😔
          </h1>
        </div>
      )}
    </>
  );
};

export default UserServices;
