import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";

const useAuth = () => {
  const [authCollection, setAuthCollection] = useState([]);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "authCollection"), where("role", "!=", "admin")),
      (snapshot) => {
        setAuthCollection(snapshot.docs.map((e) => e.data()));
      }
    );
  }, []);
  return [authCollection, setAuthCollection];
};

export default useAuth;
