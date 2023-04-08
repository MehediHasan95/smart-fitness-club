import moment from "moment";
import React, { createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/FirebaseConfig";
import useAttendence from "../Firebase/useAttendence";
import useAuth from "../Firebase/useAuth";
import useNotice from "../Firebase/useNotice";
import usePayment from "../Firebase/usePayment";
import useServices from "../Firebase/useServices";
import useShare from "../Firebase/useShare";

export const GlobalContext = createContext();
const ContextProvider = ({ children }) => {
  const [authCollection] = useAuth();
  const [serviceCollection] = useServices();
  const [notice] = useNotice();
  const [paymentCollection] = usePayment();
  const [shareCollection] = useShare();
  const [attendenceCollection] = useAttendence();
  const [user] = useAuthState(auth);
  const [successfullPayment, setSuccessfullPayment] = useState({});

  const create = moment().format("DD/MM/YYYY HH:mm:ss");
  const today = moment().format("yyyy-MM-DD");
  const userPhoto = "https://user";

  const shares = {
    authCollection,
    serviceCollection,
    notice,
    create,
    today,
    paymentCollection,
    shareCollection,
    user,
    userPhoto,
    attendenceCollection,
    setSuccessfullPayment,
    successfullPayment,
  };

  console.log("Context", successfullPayment);

  return (
    <GlobalContext.Provider value={shares}>{children}</GlobalContext.Provider>
  );
};

export default ContextProvider;
