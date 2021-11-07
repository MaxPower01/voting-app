import React from "react";
import Container from "@mui/material/Container";
import SignupForm from "../modules/authentication/components/SignupForm";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Signup() {
  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h1">Signup</Typography>
        </Grid>

        <Grid item>
          <SignupForm />
        </Grid>
      </Grid>
    </Container>
  );
}
