import { faCircleArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Payment from "../Payment/Payment";
import { GlobalContext } from "../../Context/ContextProvider";

function ViewServices({ viewServices, buyNewService, resetState }) {
  const {
    today,
    serviceCollection,
    authCollection,
    successfullPayment,
    setSuccessfullPayment,
  } = useContext(GlobalContext);

  const [trainerId, setChooseTrainer] = useState("");
  const [selectedService, setSelectedService] = useState({});
  const [trainerList, setTrainerList] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState({});

  useEffect(() => {
    setTrainerList(authCollection.filter((e) => e.role === "trainer"));
  }, [authCollection]);

  useEffect(() => {
    setSelectedTrainer(trainerList.find((e) => e.uid === trainerId));
  }, [trainerId, trainerList]);

  const endingDate = moment(
    moment(today, "yyyy-MM-DD").add(selectedService?.duration, "month")._d
  ).format("yyyy-MM-DD");

  const serviceDetails = {
    uid: buyNewService.uid,
    displayName: buyNewService.displayName,
    email: buyNewService.email,
    ...selectedService,
    selectedTrainer,
    serviceEnd: parseInt(selectedService?.duration),
    today,
    endingDate,
  };

  const handleChooseService = (service) => {
    setSelectedService(service);
  };

  const handleBackBtn = () => {
    setSelectedTrainer(undefined);
  };

  const handleCloseModal = () => {
    setSuccessfullPayment({});
    setSelectedTrainer(undefined);
  };

  return (
    <>
      {viewServices.length > 0 ? (
        <div>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box max-w-4xl relative">
              <label
                onClick={() => resetState()}
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                <FontAwesomeIcon icon={faXmark} />
              </label>
              <div className="mb-5">
                <h3 className="text-lg font-bold text-orange uppercase">
                  {viewServices[0]?.displayName}
                </h3>
                <p>{viewServices[0]?.email}</p>
              </div>
              <div className="grid gap-5 grid-cols-2">
                {viewServices.map((e) => (
                  <div className="col-span-1">
                    <h1 className="text-2xl font-semibold text-orange">
                      {e.title}
                    </h1>
                    <p>TxID: {e.transactionId}</p>

                    <div className="my-3">
                      <p>
                        Duration: {e.duration} months || Amount: {e.amount}tk
                      </p>
                      <p>
                        Buying {e.today} Ending {e.endingDate}
                      </p>
                      <p>Services end: {e.serviceEnd} days left</p>
                    </div>

                    <div className="my-3">
                      <h1>Trainer name: {e.selectedTrainer.displayName}</h1>
                      <h1>Trainer email: {e.selectedTrainer.email}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box max-w-4xl relative">
              <label
                onClick={() => {
                  resetState();
                  handleCloseModal();
                }}
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                <FontAwesomeIcon icon={faXmark} />
              </label>
              <h3 className="text-lg font-bold text-center">
                {selectedTrainer
                  ? "Payment now"
                  : "Which service do you want to buy"}
              </h3>
              <div className="py-4">
                {!selectedTrainer ? (
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border bg-raisinBlack text-white">
                        <td>Title</td>
                        <td>Duration</td>
                        <td>Amount</td>
                        <td>Trainer</td>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceCollection.map((service) => (
                        <tr className="border">
                          <td>{service.title}</td>
                          <td>{service.duration}/Mo</td>
                          <td>{service.amount}tk</td>
                          <td>
                            <select
                              onChange={(e) => {
                                handleChooseService(service);
                                setChooseTrainer(e.target.value);
                              }}
                              className="text-center cursor-pointer"
                            >
                              <option selected disabled>
                                Selected
                              </option>
                              {trainerList.map((e) => (
                                <option key={e.uid} value={e.uid}>
                                  {e.displayName}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    {successfullPayment.id ? (
                      <div className="text-center">
                        <p>
                          Your payment{" "}
                          <span className="text-green-500">
                            {successfullPayment.status}
                          </span>
                          <br />
                          <small>
                            TxID:{" "}
                            <span className="uppercase text-amber-300">
                              {successfullPayment.id}
                            </span>
                          </small>
                        </p>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleBackBtn()}
                          className="text-raisinBlack hover:text-red-600"
                        >
                          <FontAwesomeIcon
                            icon={faCircleArrowLeft}
                            className="mr-1"
                          />
                          Back
                        </button>
                        <div className="text-white">
                          <Payment serviceDetails={serviceDetails} />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ViewServices;
