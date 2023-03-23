import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdRJABEH8EZXfgaLh8bOZd2sUNqODK3cQ",
  authDomain: "smart-fitness-club.firebaseapp.com",
  projectId: "smart-fitness-club",
  storageBucket: "smart-fitness-club.appspot.com",
  messagingSenderId: "1085837691",
  appId: "1:1085837691:web:beaf062a4cf24b8db5edde",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
