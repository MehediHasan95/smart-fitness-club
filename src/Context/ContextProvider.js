import moment from "moment";
import React, { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/FirebaseConfig";
import useAttendence from "../Firebase/useAttendence";
import useAuth from "../Firebase/useAuth";
import useNotice from "../Firebase/useNotice";
import usePayment from "../Firebase/usePayment";
import useServices from "../Firebase/useServices";

export const GlobalContext = createContext();
const ContextProvider = ({ children }) => {
  const [authCollection] = useAuth();
  const [serviceCollection] = useServices();
  const [notice] = useNotice();
  const [paymentCollection] = usePayment();
  const [attendenceCollection] = useAttendence();
  const [user] = useAuthState(auth);

  const create = moment().format("DD/MM/YYYY HH:mm:ss");
  const today = moment().format("yyyy-MM-DD");

  const shares = {
    authCollection,
    serviceCollection,
    notice,
    create,
    today,
    paymentCollection,
    user,
    attendenceCollection,
  };

  return (
    <GlobalContext.Provider value={shares}>{children}</GlobalContext.Provider>
  );
};

export default ContextProvider;
