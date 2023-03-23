import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";

const useNotice = () => {
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "noticeCollection"), orderBy("create", "asc")),
      (snapshot) => {
        setNotice(snapshot.docs.map((e) => e.data()));
      }
    );
  }, []);
  return [notice, setNotice];
};

export default useNotice;
