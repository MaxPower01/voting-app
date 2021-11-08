import React from "react";
import { useSelector } from "react-redux";
import { selectSurveyCreationChoices } from "../surveyCreationSlice";
import Grid from "@mui/material/Grid";
import SurveyChoice from "./SurveyChoice";

export default function SurveyChoices() {
  const choices = useSelector(selectSurveyCreationChoices);

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
