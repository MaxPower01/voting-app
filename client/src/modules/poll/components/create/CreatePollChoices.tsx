import React from "react";
import { useSelector } from "react-redux";
import { selectCreatePollChoices } from "../../pollSlice";
import Grid from "@mui/material/Grid";
import CreatePollChoice from "./CreatePollChoice";

export default function CreatePollChoices() {
  const choices = useSelector(selectCreatePollChoices);

  return (
    <Grid container rowSpacing={1}>
      {choices.map((choice, index) => (
        <Grid key={index} item xs={12}>
          <CreatePollChoice index={index} value={choice} />
        </Grid>
      ))}
    </Grid>
  );
}
