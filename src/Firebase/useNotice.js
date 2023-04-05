import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";

const useNotice = () => {
  const [noticeCollection, setNoticeCollection] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "noticeCollection"), orderBy("create", "asc")),
      (snapshot) => {
        setNoticeCollection(snapshot.docs.map((e) => e.data()));
      }
    );
  }, []);
  return [noticeCollection, setNoticeCollection];
};

export default useNotice;
