import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SurveyChoices from "./SurveyChoices";

export default function SurveyCreationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "description") setDescription(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title,
      description,
    };

    console.log("%cSubmitting survey...", "font-size: 1.25em;");
    console.table(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            type="text"
            required
            value={title}
            onChange={onInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            type="text"
            value={description}
            onChange={onInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <SurveyChoices />
        </Grid>

        <Grid item xs={10}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Publish survey
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
