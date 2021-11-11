import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./modules/authentication/authenticationSlice";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Polls from "./pages/Polls";
import Box from "@mui/material/Box";

export default function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <TopBar />

      <Routes>
        <Route
          path="/home"
          element={
            isAuthenticated ? <Navigate replace to="/polls" /> : <Home />
          }
        />

        <Route path="" element={<Navigate replace to="/home" />} />

        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate replace to="/polls" /> : <Signup />
          }
        />

        <Route
          path="/signin"
          element={
            isAuthenticated ? <Navigate replace to="/polls" /> : <Signin />
          }
        />

        <Route
          path="/polls"
          element={
            isAuthenticated ? <Polls /> : <Navigate replace to="/signup" />
          }
        />
      </Routes>

      <Box sx={{ height: "5em" }} />
    </BrowserRouter>
  );
}
