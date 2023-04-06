import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";

import Payment from "../Payment/Payment";

function ViewServices({
  today,
  authCollection,
  viewServices,
  serviceCollection,
  buyNewService,
  resetState,
}) {
  const [chooseTrainer, setChooseTrainer] = useState("");
  const [selectedService, setSelectedService] = useState({});

  const trainer = authCollection.filter((e) => e.role === "trainer");
  const selectedTrainer = trainer.find((e) => e.uid === chooseTrainer);

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

  console.log(selectedService);

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
                onClick={() => resetState()}
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                <FontAwesomeIcon icon={faXmark} />
              </label>
              <h3 className="text-lg font-bold">
                {selectedService.id ? "Payment now" : "Purchase any services"}
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
                              className="text-center"
                            >
                              <option selected disabled>
                                Selected
                              </option>
                              {trainer.map((e) => (
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
                  <div className="text-white">
                    <p>Payment now</p>
                    <Payment serviceDetails={serviceDetails} />
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
