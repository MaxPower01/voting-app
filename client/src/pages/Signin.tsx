import React from "react";
import SigninForm from "../modules/authentication/components/SigninForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Signin() {
  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h1">Signup</Typography>
        </Grid>

        <Grid item>
          <SigninForm />
        </Grid>
      </Grid>
    </Container>
  );
}
