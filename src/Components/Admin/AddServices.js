import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AddServicesApi,
  ServiceDeleteApi,
  ServiceUpdateApi,
} from "../../Api/ServiceApi";
import { GlobalContext } from "../../Context/ContextProvider";
import pinGenerate from "../Utilities/PinGenerate";

const AddServices = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [features, setFeatures] = useState([]);
  const { serviceCollection, create } = useContext(GlobalContext);

  const [update, setUpdate] = useState({});

  let addNewFeatures = () => {
    setFeatures([...features, { features: "" }]);
  };

  let removeFeatures = (i) => {
    let newFeatures = [...features];
    newFeatures.splice(i, 1);
    setFeatures(newFeatures);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...features];
    newFormValues[i][e.target.name] = e.target.value;
    setFeatures(newFormValues);
  };

  const handleAddServices = () => {
    const id = pinGenerate();
    if (title && duration && amount && features) {
      const sercices = { id, title, duration, amount, features, create };
      AddServicesApi(sercices);
    } else {
      toast.error("The field cannot be empty");
    }
  };

  const handleRemoveService = (id) => {
    ServiceDeleteApi(id);
  };

  const handleExitTitle = (e) => {
    const { title, ...rest } = update;
    setUpdate({ title: e, ...rest });
  };

  const handleEditDuration = (e) => {
    const { duration, ...rest } = update;
    setUpdate({ duration: e, ...rest });
  };

  const handleEditAmount = (e) => {
    const { amount, ...rest } = update;
    setUpdate({ amount: e, ...rest });
  };

  const handleEditFeatures = (e, index) => {
    const { features, ...rest } = update;
    const edit = features[index];
    // setUpdate({ features: (features[index].features = e), ...rest });

    // const edit = { features: e, ...rest };
    // console.log(edit);

    // setUpdate({ features: e, ...rest });
    // for (const element of update.features) {
    //   console.log(element);
    // }
    // const { features, ...rest } = update;
    // console.log(features);
  };

  const handleFindOne = (id) => {
    setUpdate(serviceCollection.find((e) => e.id === id));
  };

  const handleServicesUpdate = (update) => {
    ServiceUpdateApi(update);
  };

  return (
    <div>
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1">
          <div className="border p-3">
            <h1 className="text-center text-xl mb-3">Add Services</h1>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full border p-2 mb-2 focus:outline-orange"
              placeholder="Title"
            />
            <input
              onChange={(e) => setDuration(e.target.value)}
              type="number"
              className="w-full border p-2 mb-2 focus:outline-orange"
              placeholder="Duration"
            />
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="text"
              className="w-full border p-2 mb-2 focus:outline-orange"
              placeholder="Amount"
            />

            <button
              onClick={() => addNewFeatures()}
              className="w-full p-2 mb-2 border bg-gray-200"
            >
              Add Features <FontAwesomeIcon icon={faPlus} />
            </button>

            {features.map((element, index) => (
              <div className="flex justify-between" key={index}>
                <input
                  onChange={(e) => handleChange(index, e)}
                  type="text"
                  name="features"
                  className="w-full border p-2 mb-2 focus:outline-orange"
                  placeholder={`Features - ${index}`}
                />

                {index ? (
                  <button
                    type="button"
                    className="p-2 mb-2 ml-1 border hover:bg-red-600 hover:text-white"
                    onClick={() => removeFeatures(index)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                ) : null}
              </div>
            ))}

            <button
              onClick={handleAddServices}
              className="w-full p-2 bg-orange text-white hover:bg-deepOrange"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          {serviceCollection.map((e) => (
            <div key={e.id} className="border mb-3 p-3">
              <h1 className="text-3xl">{e.title}</h1>
              <p>Duration: {e.duration}</p>
              <p>Amount: {e.amount}</p>
              <ul className="list pl-2">
                {e.features.map((e, index) => (
                  <li key={index}>{e.features}</li>
                ))}
              </ul>
              <button
                onClick={() => handleRemoveService(e.id)}
                className="py-1 px-3 m-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleFindOne(e.id)}
                className="m-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <label
                  htmlFor="my-modal-3"
                  className="cursor-pointer  inline-block w-full px-6 py-1"
                >
                  Edit
                </label>
              </button>
            </div>
          ))}
        </div>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <label htmlFor="my-modal-3" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center mb-3">Update service</h3>
          <div>
            <input
              onChange={(e) => handleExitTitle(e.target.value)}
              value={update.title}
              type="text"
              className="w-full border p-2 mb-2 focus:outline-orange"
              placeholder="Title"
            />
            <input
              onChange={(e) => handleEditDuration(e.target.value)}
              value={update.duration}
              type="number"
              className="w-full border p-2 mb-2 focus:outline-orange"
              placeholder="Duration"
            />
            <input
              onChange={(e) => handleEditAmount(e.target.value)}
              value={update.amount}
              type="text"
              className="w-full border p-2 mb-2 focus:outline-orange"
              placeholder="Amount"
            />

            {/* {update?.features?.map((e, index) => (
              <input
                key={index}
                onChange={(e) => handleEditFeatures(e.target.value, index)}
                // onChange={() => handleEditFeatures()}
                type="text"
                name="features"
                value={e.features}
                className="w-full border border-orange p-2 mb-2 focus:outline-orange"
                placeholder="Features"
              />
            ))} */}

            <button
              onClick={() => handleServicesUpdate(update)}
              className="w-full p-2 bg-orange text-white hover:bg-deepOrange"
            >
              Update
            </button>
          </div>
        </label>
      </label>
    </div>
  );
};

export default AddServices;
