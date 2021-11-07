import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

          <Modal
            open={surveyModalOpened}
            onClose={closeSurveyModal}
            aria-labelledby="survey-modal-title"
            aria-describedby="survey-modal-description"
          >
            <Box sx={modalStyles}>
              <Typography id="survey-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="survey-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Container>
  );
}
