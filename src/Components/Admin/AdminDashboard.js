import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import { auth } from "../../Firebase/FirebaseConfig";

const AdminDashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  return (
    <div>
      <div className="grid col-span-1 lg:grid-cols-5 lg:min-h-screen">
        <div className="col-span-1 p-3 bg-raisinBlack text-white">
          <div className="text-center">
            <h1 className="text-2xl">{!loading && user?.displayName}</h1>
            <p className="text-xs">{!loading && user?.email}</p>
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
                  Notices
                </button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4 pr-3">
          <div className="py-2">
            <button
              onClick={() => signOut()}
              className="flex justify-center items-center ml-auto hover:text-red-600 hover:font-bold"
            >
              <span className="mr-1">LogOut</span>
              <FontAwesomeIcon icon={faSignOut} />
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
