import React from "react";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <TopBar />

        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="" element={<Navigate replace to="home" />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
