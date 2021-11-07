import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SurveyCreationForm from "../modules/surveyCreation/components/SurveyCreationForm";
import DialogTitle from "@mui/material/DialogTitle";

const modalStyles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Surveys() {
  const [surveyModalOpened, setSurveyModalOpened] = React.useState(false);
  const openSurveyModal = () => setSurveyModalOpened(true);
  const closeSurveyModal = () => setSurveyModalOpened(false);

  return (
    <Container>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h1">Surveys</Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" onClick={openSurveyModal}>
            New survey
          </Button>

          <Dialog open={surveyModalOpened} onClose={closeSurveyModal}>
            <DialogTitle>Create new survey</DialogTitle>

            <DialogContent>
              <Box sx={{ paddingTop: 2 }}>
                <SurveyCreationForm />
              </Box>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Container>
  );
}
