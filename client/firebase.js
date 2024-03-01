// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dera-mern-estate.firebaseapp.com",
  projectId: "dera-mern-estate",
  storageBucket: "dera-mern-estate.appspot.com",
  messagingSenderId: "490587900509",
  appId: "1:490587900509:web:ff21d5a97ddaacdd24dbb4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
