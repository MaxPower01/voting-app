import React from "react";
import Container from "@mui/material/Container";
import SignupForm from "../modules/authentication/components/SignupForm";

export default function Signup() {
  return (
    <div>
      <Container>
        <h1>Signup</h1>
        <SignupForm />
      </Container>
    </div>
  );
}
