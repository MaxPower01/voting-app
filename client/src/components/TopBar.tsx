import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectIsAuthenticated,
  signout,
} from "../modules/authentication/authenticationSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Box from "@mui/system/Box";

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
        <Link to="home">
          <Typography variant="h5">Voting App</Typography>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated ? (
          <React.Fragment>
            <Link to="polls">
              <Button variant="contained" color="primary">
                Polls
              </Button>
            </Link>
            <Button color="primary" onClick={onSignout}>
              Sign out
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="signin">
              <Button color="primary">Sign in</Button>
            </Link>
            <Link to="signup">
              <Button variant="contained" color="primary">
                Sign up
              </Button>
            </Link>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
