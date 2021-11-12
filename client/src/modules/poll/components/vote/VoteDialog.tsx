import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeVoteDialog, selectVoteDialogState } from "../../pollSlice";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { PollProps } from "../Poll";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";
import {
  doc,
  Timestamp,
  updateDoc,
  increment,
  writeBatch,
  query,
  collection,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { auth, db } from "../../../authentication/firebase";
import { v4 as uuid } from "uuid";
import TextField from "@mui/material/TextField";

export default function VoteDialog(props: PollProps) {
  const dialogState = useSelector(selectVoteDialogState);
  const dispatch = useDispatch();

  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [name, setName] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText("");
    setError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === null) {
      setHelperText("Please select an option.");
      setError(true);
    } else {
      console.log("%cSubmitting vote...", "font-size: 1.25em;");

      const voteId = uuid();

      const batch = writeBatch(db);

      const q = query(
        collection(db, "choices"),
        where("pollId", "==", props.id),
        where("id", "==", value),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      const voteRef = doc(db, "votes", voteId);

      batch.set(voteRef, {
        id: voteId,
        pollId: props.id,
        choiceId: value,
        userId: auth.currentUser?.uid,
        timestamp: Timestamp.now(),
        username: name,
      });

      querySnapshot.forEach((docSnapshot) => {
        batch.update(docSnapshot.ref, { votes: increment(1) });
      });

      // Must close dialog before committing batch to avoid doing an update on an unmounted component.
      handleDialogClose();
      await batch.commit();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDialogClose = () => {
    dispatch(closeVoteDialog(props.id));
    setValue(null);
    setHelperText("");
    setError(false);
  };

  return (
    <Dialog
      scroll="paper"
      open={dialogState.id === props.id && dialogState.opened}
      onClose={handleDialogClose}
    >
      <DialogTitle>{props.title}</DialogTitle>

      <DialogContent>
        <form id="vote" onSubmit={handleSubmit}>
          <FormControl
            sx={{ m: 3 }}
            component="fieldset"
            error={error}
            variant="standard"
          >
            <FormLabel component="legend">Choices</FormLabel>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              {props.choices
                .sort((a, b) => a.index - b.index)
                .map((choice, index) => (
                  <FormControlLabel
                    key={index}
                    value={choice.id}
                    control={<Radio />}
                    label={choice.value}
                  />
                ))}
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>

          <TextField
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Button
              form="vote"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Vote
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
