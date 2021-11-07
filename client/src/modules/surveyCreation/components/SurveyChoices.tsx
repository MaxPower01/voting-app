import React from "react";
import Grid from "@mui/material/Grid";
import SurveyChoice from "./SurveyChoice";

export default function SurveyChoices() {
  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <SurveyChoice id={1} />
      </Grid>
      <Grid item xs={12}>
        <SurveyChoice id={2} />
      </Grid>
    </Grid>
  );
}
