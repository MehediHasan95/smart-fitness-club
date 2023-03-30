import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./FirebaseConfig";

const usePayment = () => {
  const [payment, setPayment] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    onSnapshot(
      query(collection(db, `paymentCollection/${user?.uid}/paymentList`)),
      (snapshot) => {
        setPayment(snapshot.docs.map((e) => e.data()));
      }
    );
  }, [user]);
  return [payment, setPayment];
};

export default usePayment;
