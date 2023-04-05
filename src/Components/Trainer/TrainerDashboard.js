import React from "react";
import { auth } from "../../Firebase/FirebaseConfig";
import { useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();
  return (
    <div>
      <h1>TrainerDashboard</h1>
      <button
        onClick={() => {
          signOut();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default TrainerDashboard;
