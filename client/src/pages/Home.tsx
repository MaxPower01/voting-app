import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h1">Home</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
