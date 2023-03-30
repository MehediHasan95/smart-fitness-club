import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/FirebaseConfig";

const UserDashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid col-span-1 lg:grid-cols-5 lg:min-h-screen">
        <div className="col-span-1 p-3 bg-raisinBlack text-white">
          <div className="text-center">
            <h1 className="text-2xl font-semibold uppercase">Dashboard</h1>
          </div>
          <hr className="my-3" />

          <div>
            <NavLink to="profile">
              {({ isActive }) => (
                <button
                  className={
                    isActive
                      ? "bg-orange text-white w-full py-2 mb-3 shadow"
                      : "w-full py-2 mb-3 bg-gray-700"
                  }
                >
                  Profile
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
                  Notices
                </button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4 pr-3">
          <div className="py-2 flex items-center mx-3">
            <h1>
              Welcome{" "}
              <span className="text-orange font-semibold ">
                {!loading && user?.displayName},{" "}
              </span>
              <span>{!loading && user?.email}</span>
            </h1>
            <button
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="flex justify-center items-center ml-auto hover:text-red-600 hover:font-bold"
            >
              <span className="mr-2">LogOut</span>
              <FontAwesomeIcon icon={faSignOut} />
            </button>
          </div>
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
