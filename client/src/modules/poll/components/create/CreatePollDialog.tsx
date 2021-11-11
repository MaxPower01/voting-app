import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {
  selectCreatePollDialogOpened,
  closeCreatePollDialog,
  addChoice,
  selectCreatePollChoices,
  updateChoice,
  resetChoices,
} from "../../pollSlice";
import CreatePollChoices from "./CreatePollChoices";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { auth, db } from "../../../authentication/firebase";
import faker from "faker";
import { v4 as uuid } from "uuid";

export default function CreatePollDialog() {
  const dispatch = useDispatch();

  const dialogOpened = useSelector(selectCreatePollDialogOpened);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const choices = useSelector(selectCreatePollChoices);

  const fillWithFaker = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setTitle(faker.lorem.sentence().replace(/\./g, "?"));
    setDescription(faker.lorem.paragraph());

    choices.forEach((choice, index) => {
      dispatch(
        updateChoice({
          index,
          value: `#${index + 1} – ${faker.lorem.sentence().replace(/\./g, "")}`,
        })
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("%cSubmitting poll...", "font-size: 1.25em;");
    console.table({ title, description, choices });

    await setDoc(
      doc(
        db,
        "polls",
        `${auth.currentUser?.uid}-${Timestamp.now().nanoseconds}`
      ),
      {
        id: uuid(),
        userId: auth.currentUser?.uid,
        timestamp: Timestamp.now(),
        title,
        description,
        choices,
      }
    );

    dispatch(closeCreatePollDialog());

    setTitle("");
    setDescription("");
    dispatch(resetChoices());
  };

  return (
    <Dialog
      scroll="paper"
      open={dialogOpened}
      onClose={() => dispatch(closeCreatePollDialog())}
    >
      <DialogTitle>New poll</DialogTitle>

      <DialogContent>
        <form id="new-poll" onSubmit={handleSubmit}>
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
                <CreatePollChoices />
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
              variant="contained"
              color="secondary"
              onClick={fillWithFaker}
              fullWidth
            >
              Fill with faker
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              form="new-poll"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Publish poll
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
