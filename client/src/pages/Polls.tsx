import React from "react";
import { useDispatch } from "react-redux";
import { openCreatePollDialog } from "../modules/poll/pollSlice";
import {
  collection,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../modules/authentication/firebase";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreatePollDialog from "../modules/poll/components/create/CreatePollDialog";
import Poll from "../modules/poll/components/Poll";

export default function Polls() {
  const dispatch = useDispatch();

  const [polls, loading, error] = useCollectionData(
    query(collection(db, "polls"), orderBy("timestamp", "desc"), limit(25))
  );

  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h1">Polls</Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            onClick={() => dispatch(openCreatePollDialog())}
          >
            New poll
          </Button>

          <CreatePollDialog />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {polls != null &&
              polls.map((poll, index) => (
                <Grid key={index} item xs={12} sm={10} md={8} lg={7}>
                  <Poll
                    id={poll.id}
                    userId={poll.userId}
                    title={poll.title}
                    description={poll.description}
                    choices={poll.choices}
                    date={Timestamp.fromMillis(poll.timestamp.seconds * 1000)
                      .toDate()
                      .toLocaleString()}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
