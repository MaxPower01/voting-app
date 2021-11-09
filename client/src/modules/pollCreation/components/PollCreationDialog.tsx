import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PollChoices from "./PollChoices";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {
  selectDialogOpened,
  closeDialog,
  addChoice,
  selectChoices,
} from "../pollCreationSlice";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

export default function PollCreationDialog() {
  const dispatch = useDispatch();

  const dialogOpened = useSelector(selectDialogOpened);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const choices = useSelector(selectChoices);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title,
      description,
      choices,
    };

    console.log("%cSubmitting survey...", "font-size: 1.25em;");
    console.table(data);
  };

  return (
    <Dialog
      scroll="paper"
      open={dialogOpened}
      onClose={() => dispatch(closeDialog())}
    >
      <DialogTitle>New poll</DialogTitle>

      <DialogContent>
        <form id="new-survey" onSubmit={onSubmit}>
          <Box sx={{ paddingTop: 2 }}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setTitle(e.target.value)
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  type="text"
                  multiline
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">Choices</Typography>
              </Grid>

              <Grid item xs={12}>
                <PollChoices />
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>

      <DialogActions>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => dispatch(addChoice())}
            >
              Add choice
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              form="new-survey"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Publish survey
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
