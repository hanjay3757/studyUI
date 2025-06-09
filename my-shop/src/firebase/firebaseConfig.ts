// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhGzjrre1nDC1A9uVXHJm-am6I9RX7_Zs",
    authDomain: "north-test-f9747.firebaseapp.com",
    projectId: "north-test-f9747",
    storageBucket: "north-test-f9747.firebasestorage.app",
    messagingSenderId: "1089759609383",
    appId: "1:1089759609383:web:4a2ce8af5011c0a9630402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
