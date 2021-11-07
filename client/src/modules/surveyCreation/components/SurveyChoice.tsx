import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";

type SurveyChoiceProps = {
  id: number;
};

export default function SurveyChoice(props: SurveyChoiceProps) {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(value);
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
          label={`Option ${props.id}`}
          type="text"
          value={value}
          onChange={onChange}
          fullWidth
        />
      </Grid>

      <Grid item>
        <IconButton>
          <DeleteRoundedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
