import { faHome, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/FirebaseConfig";
import { GlobalContext } from "../../Context/ContextProvider";

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [adminInfo, setAdminInfo] = useState({});
  const { adminCollection } = useContext(GlobalContext);

  useEffect(() => {
    setAdminInfo(adminCollection.find((e) => e.uid === user.uid));
  }, [adminCollection, user.uid]);

  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid col-span-1 lg:grid-cols-5 lg:min-h-screen">
        <div className="col-span-1 p-3 bg-raisinBlack text-white">
          <div className="text-center">
            <h1 className="text-2xl lg:text-3xl font-bold font-lobster">
              Fitness <span className="text-orange">Club</span>
            </h1>
          </div>
          <hr className="my-3" />

          <div>
            <NavLink to="list">
              {({ isActive }) => (
                <button
                  className={
                    isActive
                      ? "bg-orange text-white w-full py-2 mb-3 shadow"
                      : "w-full py-2 mb-3 bg-gray-700"
                  }
                >
                  User & Trainer List
                </button>
              )}
            </NavLink>

            <NavLink to="add-services">
              {({ isActive }) => (
                <button
                  className={
                    isActive
                      ? "bg-orange text-white w-full py-2 mb-3 shadow"
                      : "w-full py-2 mb-3 bg-gray-700"
                  }
                >
                  Add Services
                </button>
              )}
            </NavLink>

            <NavLink to="notice">
              {({ isActive }) => (
                <button
                  className={
                    isActive
                      ? "bg-orange text-white w-full py-2 mb-3 shadow"
                      : "w-full py-2 mb-3 bg-gray-700"
                  }
                >
                  Write Notices
                </button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4 pr-3">
          <div className="py-2 flex justify-between items-center mx-3">
            <div>
              <h1>
                Welcome{" "}
                <span className="text-orange font-semibold ">
                  {adminInfo?.displayName},{" "}
                </span>
                <span>{adminInfo?.email}</span>
              </h1>
            </div>

            <div className="flex">
              <Link to="/">
                <span className="mx-5 text-orange hover:font-bold">
                  <FontAwesomeIcon icon={faHome} /> Home
                </span>
              </Link>
              <button
                onClick={() => {
                  signOut();
                  navigate("/");
                }}
                className="flex justify-center items-center ml-auto hover:text-red-600 hover:font-bold"
              >
                <span className="mr-2">Logout</span>
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
