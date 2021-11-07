import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./modules/authentication/authenticationSlice";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Surveys from "./pages/Surveys";

export default function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <TopBar />

      <Routes>
        <Route
          path="/home"
          element={
            isAuthenticated ? <Navigate replace to="/surveys" /> : <Home />
          }
        />
        <Route path="" element={<Navigate replace to="/home" />} />

        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate replace to="/surveys" /> : <Signup />
          }
        />

        <Route path="/signin" element={<Signin />} />

        <Route
          path="/surveys"
          element={
            isAuthenticated ? <Surveys /> : <Navigate replace to="/signup" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
