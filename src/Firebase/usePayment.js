import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./FirebaseConfig";

const usePayment = () => {
  const [paymentCollection, setPaymentCollection] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `paymentCollection/${user?.uid}/list`),
        orderBy("create", "asc")
      ),
      (snapshot) => {
        setPaymentCollection(snapshot.docs.map((e) => e.data()));
      }
    );
  }, [user]);
  return [paymentCollection, setPaymentCollection];
};

export default usePayment;
