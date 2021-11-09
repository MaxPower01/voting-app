import React from "react";
import { useSelector } from "react-redux";
import { selectChoices } from "../pollCreationSlice";
import Grid from "@mui/material/Grid";
import PollChoice from "./PollChoice";

export default function PollChoices() {
  const choices = useSelector(selectChoices);

  return (
    <Grid container rowSpacing={1}>
      {choices.map((choice, index) => (
        <Grid key={index} item xs={12}>
          <PollChoice index={index} value={choice} />
        </Grid>
      ))}
    </Grid>
  );
}
