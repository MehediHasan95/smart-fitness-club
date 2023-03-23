import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";

const useServices = () => {
  const [serviceCollection, setServiceCollection] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "serviceCollection"), orderBy("create", "asc")),
      (snapshot) => {
        setServiceCollection(snapshot.docs.map((e) => e.data()));
      }
    );
  }, []);
  return [serviceCollection, setServiceCollection];
};

export default useServices;
