import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Box from "@mui/system/Box";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  selectIsAuthenticated,
  signout,
} from "../modules/authentication/authenticationSlice";

export default function TopBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onSignout = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    dispatch(signout());
  };

  return (
    <AppBar position="sticky" color="default" sx={{ marginBottom: 2 }}>
      <Toolbar sx={{ columnGap: "0.5em" }}>
        <Typography variant="h5">
          <Link to="home">Voting App</Link>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated ? (
          <React.Fragment>
            <Button variant="contained" color="primary">
              <Link to="surveys">Surveys</Link>
            </Button>
            <Button color="primary" onClick={onSignout}>
              Sign out
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button color="primary">
              <Link to="signin">Sign in</Link>
            </Button>
            <Button variant="contained" color="primary">
              <Link to="signup">Sign up</Link>
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
