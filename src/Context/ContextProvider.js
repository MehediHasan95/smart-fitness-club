import moment from "moment";
import React, { createContext } from "react";
import useAuth from "../Firebase/useAuth";
import useNotice from "../Firebase/useNotice";
import useServices from "../Firebase/useServices";

export const GlobalContext = createContext();
const ContextProvider = ({ children }) => {
  const [authCollection] = useAuth();
  const [serviceCollection] = useServices();
  const [notice] = useNotice();

  const create = moment().format("DD/MM/YYYY HH:mm:ss");

  const shares = { authCollection, serviceCollection, notice, create };

  return (
    <GlobalContext.Provider value={shares}>{children}</GlobalContext.Provider>
  );
};

export default ContextProvider;
