import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./FirebaseConfig";

const useShare = () => {
  const [shareCollection, setShareCollection] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `shareCollection/${user?.uid}/list`),
        orderBy("create", "desc")
      ),
      (snapshot) => {
        setShareCollection(snapshot.docs.map((e) => e.data()));
      }
    );
  }, [user]);
  return [shareCollection, setShareCollection];
};

export default useShare;
