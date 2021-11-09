import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import App from "./App";
import "./index.css";
import { getAuth } from "firebase/auth";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
