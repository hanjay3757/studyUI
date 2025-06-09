// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF7Rznd7qSde1tl0aRVXg3e3L3tITlgYY",
  authDomain: "my-shop-d745e.firebaseapp.com",
  projectId: "my-shop-d745e",
  storageBucket: "my-shop-d745e.firebasestorage.app",
  messagingSenderId: "869210991500",
  appId: "1:869210991500:web:67519007d0672108b144a9",
  measurementId: "G-SFVK9EXQHM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
