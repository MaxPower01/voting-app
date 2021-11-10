import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3ua1qKSgXew-xahCpbTySzVnXRU8Tnnk",
  authDomain: "voting-app-9bc32.firebaseapp.com",
  projectId: "voting-app-9bc32",
  storageBucket: "voting-app-9bc32.appspot.com",
  messagingSenderId: "45920948929",
  appId: "1:45920948929:web:ef50beb6f5d64dc2fb3a40",
  measurementId: "G-CGW6DZQXEN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth();
