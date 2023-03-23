import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { AuthCreateApi, DeleteApi, UpdateApi } from "../../Api/AuthApi";
import { GlobalContext } from "../../Context/ContextProvider";
import { storage } from "../../Firebase/FirebaseConfig";

const AuthList = () => {
  const { authCollection, create } = useContext(GlobalContext);
  const [update, setUpdate] = useState({});
  const [loader, setLoader] = useState(false);

  const handleDelete = (uid) => {
    DeleteApi(uid);
  };

  const handleRoleUpdate = (e) => {
    const { role, ...rest } = update;
    setUpdate({ role: e, ...rest });
  };

  const handleDisplayNameUpdate = (e) => {
    const { displayName, ...rest } = update;
    setUpdate({ displayName: e, ...rest });
  };

  const handleEmailUpdate = (e) => {
    const { email, ...rest } = update;
    setUpdate({ email: e, ...rest });
  };

  const handleUpdateConfirm = (e) => {
    e.preventDefault();
    if (update.role === "user" || update.role === "trainer") {
      UpdateApi(update);
    } else {
      toast.error("You can only 'user' or 'trainer' added");
    }
  };

  const handleFindOne = (uid) => {
    setUpdate(authCollection.find((e) => e.uid === uid));
  };

  const handleAdminCreateAccount = (e) => {
    e.preventDefault();
    setLoader(true);
    const role = e.target.role.value;
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = e.target.image.files;

    const storageRef = ref(storage, `gallery/${file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const info = {
          role,
          displayName,
          email,
          password,
          create,
          downloadURL,
        };
        AuthCreateApi(info);
        setLoader(false);
        e.target.reset();
      });
    });
  };

  return (
    <div>
      <button className="bg-orange text-white mb-3 w-full hover:bg-deepOrange shadow">
        <label
          htmlFor="my-modal-2"
          className="px-4 py-2 cursor-pointer inline-block w-full"
        >
          Create an account
        </label>
      </button>

      <table className="counter border w-full">
        <thead className="border bg-orange text-white">
          <tr>
            <th className="p-1 lg:p-2 text-xs lg:text-base">SL</th>
            <th className="p-1 lg:p-2 text-xs lg:text-base">Name</th>
            <th className="p-1 lg:p-2 text-xs lg:text-base">Email</th>
            <th className="p-1 lg:p-2 text-xs lg:text-base">Role</th>
            <th className="p-1 lg:p-2 text-xs lg:text-base">Action</th>
          </tr>
        </thead>
        {authCollection.map((list) => (
          <tbody
            key={list.uid}
            className="border text-center hover:bg-gray-200 cursor-pointer"
          >
            <tr>
              <td className="p-1 lg:p-2 text-xs lg:text-base"></td>
              <td className="p-1 lg:p-2 text-xs lg:text-base">
                {list.displayName}
              </td>
              <td className="p-1 lg:p-2 text-xs lg:text-base">{list.email}</td>
              <td className="p-1 lg:p-2 text-xs lg:text-base">
                {list.role.toUpperCase()}
              </td>
              <td className="p-1 lg:p-2 text-xs lg:text-base flex justify-evenly items-center">
                <FontAwesomeIcon
                  onClick={() => handleDelete(list.uid)}
                  icon={faTrash}
                  className="hover:text-orange"
                />

                <label htmlFor="my-modal-1">
                  <FontAwesomeIcon
                    onClick={() => handleFindOne(list.uid)}
                    icon={faEdit}
                    className="hover:text-orange"
                  />
                </label>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* modal  */}
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <label htmlFor="my-modal-1" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center text-orange mb-3">
            Update your profile
          </h3>
          <div>
            <form onSubmit={handleUpdateConfirm}>
              <input
                pattern="[a-z A-Z]{0,}"
                onChange={(e) => handleRoleUpdate(e.target.value)}
                value={update.role}
                type="text"
                className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
                placeholder="role"
                required
              />

              <input
                pattern="[a-z A-Z]{0,}"
                onChange={(e) => handleDisplayNameUpdate(e.target.value)}
                value={update.displayName}
                type="text"
                className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
                placeholder="Name"
                required
              />

              <input
                onChange={(e) => handleEmailUpdate(e.target.value)}
                pattern="[\S+@\S+\.\S+]{0,}"
                value={update.email}
                type="email"
                className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
                placeholder="Email"
                required
              />
              <button className="bg-orange hover:bg-deepOrange text-white w-full p-2 mt-3 border-0 outline-none rounded">
                Update
              </button>
            </form>
          </div>
        </label>
      </label>

      {/* modal  */}

      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <label htmlFor="my-modal-2" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-2xl lg:text-3xl font-bold font-lobster text-center">
            Fitness <span className="text-orange">Club</span>
          </h3>
          <form onSubmit={handleAdminCreateAccount} className="my-3">
            <select
              name="role"
              className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
            >
              <option value="user">USER</option>
              <option value="trainer">TRAINER</option>
            </select>

            <input
              pattern="[a-z A-Z]{0,}"
              name="displayName"
              type="text"
              className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
              placeholder="Name"
              required
            />
            <input
              name="email"
              pattern="[\S+@\S+\.\S+]{0,}"
              type="email"
              className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
              placeholder="Email"
              required
            />
            <input
              name="password"
              pattern="[a-zA-Z0-9]{6,}"
              type="password"
              className="w-full p-2 mb-3 border focus:border-orange outline-none rounded text-raisinBlack"
              placeholder="Password"
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-2 border focus:border-orange outline-none rounded text-raisinBlack"
              required
            />

            <button className="bg-orange hover:bg-deepOrange text-white w-full p-2 mt-3 border-0 outline-none rounded flex justify-center items-center">
              {loader ? (
                <Oval
                  height={25}
                  width={25}
                  color="#ffffff"
                  secondaryColor="#e6e6e6"
                  strokeWidth={5}
                />
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </label>
      </label>
    </div>
  );
};

export default AuthList;
