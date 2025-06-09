// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoMJucGIRu74wszo1mgLNTTV2wPLAomqQ",
  authDomain: "react-shop-app-f03f4.firebaseapp.com",
  projectId: "react-shop-app-f03f4",
  storageBucket: "react-shop-app-f03f4.firebasestorage.app",
  messagingSenderId: "772585104745",
  appId: "1:772585104745:web:36e5a6909977bd0a1dc9f8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// export const db = getFirestore(app);
