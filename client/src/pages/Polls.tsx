import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { openDialog } from "../modules/pollCreation/pollCreationSlice";
import PollCreationDialog from "../modules/pollCreation/components/PollCreationDialog";

export default function Polls() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h1">Polls</Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" onClick={() => dispatch(openDialog())}>
            New poll
          </Button>

          <PollCreationDialog />
        </Grid>
      </Grid>
    </Container>
  );
}
