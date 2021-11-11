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

export default function VoteDialog(props: PollProps) {
  const dialogState = useSelector(selectVoteDialogState);
  const dispatch = useDispatch();

  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as unknown as number);
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
    }
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
              {props.choices.map((choice, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={choice}
                />
              ))}
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
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
