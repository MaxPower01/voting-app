import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Box from "@mui/system/Box";
import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar sx={{ columnGap: "0.5em" }}>
        <Typography variant="h5">
          <Link to="home">Voting App</Link>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Button color="primary">
          <Link to="signin">Sign in</Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link to="signup">Sign up</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
