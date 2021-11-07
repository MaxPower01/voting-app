import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";

export default function SurveyForm() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [choices, setChoices] = React.useState([]);
  const [authorizeMultipleAnswers, setAuthorizeMultipleAnswers] =
    React.useState(true);

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
    <form noValidate onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            type="text"
            value={title}
            onChange={onInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="description"
            type="text"
            value={description}
            onChange={onInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={10}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
