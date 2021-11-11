import React from "react";
import { useDispatch } from "react-redux";
import { openVoteDialog } from "../pollSlice";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import VoteDialog from "./vote/VoteDialog";

export type PollProps = {
  id: string;
  userId: string;
  title: number;
  date: string;
  description: string;
  choices: Array<string>;
};

export default function Poll(props: PollProps) {
  const dispatch = useDispatch();

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title={props.title} subheader={props.description} />

      <CardContent>
        {props.choices.map((choice, index) => (
          <Typography key={index} variant="body1">
            {choice}
          </Typography>
        ))}
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="large"
          variant="text"
          onClick={() => dispatch(openVoteDialog(props.id))}
        >
          Vote
        </Button>
      </CardActions>

      <VoteDialog
        id={props.id}
        userId={props.userId}
        title={props.title}
        choices={props.choices}
        date={props.date}
        description={props.description}
      />
    </Card>
  );
}
