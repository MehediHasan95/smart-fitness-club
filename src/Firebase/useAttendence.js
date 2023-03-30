import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./FirebaseConfig";

const useAttendence = () => {
  const [attendenceCollection, setAttendenceCollection] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `attendenceCollection/${user?.uid}/attendenceList`),
        orderBy("create", "asc")
      ),
      (snapshot) => {
        setAttendenceCollection(snapshot.docs.map((e) => e.data()));
      }
    );
  }, [user]);
  return [attendenceCollection, setAttendenceCollection];
};

export default useAttendence;
