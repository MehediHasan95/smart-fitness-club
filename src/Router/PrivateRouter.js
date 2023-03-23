import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Oval } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../Firebase/FirebaseConfig";

const PrivateRouter = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Oval
          height={50}
          width={50}
          color="#fd1803"
          secondaryColor="#e6e6e6"
          strokeWidth={5}
        />
      </div>
    );
  } else if (user) {
    return children;
  } else {
    return (
      <Navigate
        to="/authentication"
        state={{ from: location }}
        replace
      ></Navigate>
    );
  }
};

export default PrivateRouter;
