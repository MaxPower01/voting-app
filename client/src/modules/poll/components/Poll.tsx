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
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../authentication/firebase";
import {
  collection,
  DocumentData,
  limit,
  query,
  where,
} from "firebase/firestore";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import Grid from "@mui/material/Grid";
import { LinearProgress } from "@mui/material";
import styled from "@mui/system/styled";

export type PollProps = {
  id: string;
  userId: string;
  title: number;
  date: string;
  description: string;
  choices: Array<Data<DocumentData, "", "">>;
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));

export default function Poll(props: PollProps) {
  const dispatch = useDispatch();

  const [votes, loadingVotes, errorVotes] = useCollectionData(
    query(
      collection(db, "votes"),
      limit(1),
      where("userId", "==", auth.currentUser?.uid),
      where("pollId", "==", props.id)
    )
  );

  const [choices, loadingChoices, errorChoices] = useCollectionData(
    query(collection(db, "choices"), where("pollId", "==", props.id))
  );

  const normalize = (value: number) => {
    if (choices == null) return 0;
    const choicesVotes = choices.map((choice) => choice.votes);
    const max = Math.max(...choicesVotes);
    const min = Math.min(...choicesVotes);
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title={props.title} subheader={props.description} />
      <CardContent>
        <Grid container spacing={1}>
          {votes != null && votes.length > 0
            ? choices != null &&
              choices.length > 0 &&
              choices.map((choice, index) => (
                <Grid key={index} item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="body1" display="inline">
                      {choice.value}
                    </Typography>

                    <Typography variant="body2" display="inline">
                      {` (${choice.votes} ${
                        choice.votes > 1 ? "votes" : "vote"
                      })`}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <BorderLinearProgress
                      variant="determinate"
                      value={normalize(choice.votes)}
                    />
                    {choice.votes}
                  </Grid>
                </Grid>
              ))
            : props.choices != null &&
              props.choices.map((choice, index) => (
                <Grid key={index} item xs={12}>
                  <Typography variant="body1">{choice}</Typography>
                </Grid>
              ))}
        </Grid>

        {/* {props.choices != null &&
          props.choices.map((choice, index) => (
            <Typography key={index} variant="body1">
              {choice}
            </Typography>
          ))} */}
      </CardContent>

      {(votes == null || votes.length === 0) &&
        choices != null &&
        choices.length > 0 && (
          <React.Fragment>
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
              choices={choices}
              date={props.date}
              description={props.description}
            />
          </React.Fragment>
        )}
    </Card>
  );
}
