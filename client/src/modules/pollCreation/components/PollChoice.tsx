import React from "react";
import { useDispatch } from "react-redux";
import { removeChoice, updateChoice } from "../pollCreationSlice";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";

type PollChoiceProps = {
  index: number;
  value: string;
};

export default function PollChoice(props: PollChoiceProps) {
  const dispatch = useDispatch();

  // Cannot use "useState" here because it will interfer with the re-rendering of the parent component "SurveyChoices",
  // causing the current component to be desynchronized with its state.
  let value = props.value;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    value = e.target.value;
    dispatch(updateChoice({ index: props.index, value }));
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
      columnSpacing={2}
      sx={{ width: "100%" }}
    >
      <Grid item sx={{ flexGrow: 1 }}>
        <TextField
          label={`Choice #${props.index + 1}`}
          type="text"
          value={value}
          onChange={onChange}
          fullWidth
        />
      </Grid>

      <Grid item>
        <IconButton onClick={() => dispatch(removeChoice(props.index))}>
          <DeleteRoundedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
