import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signin } from "../authenticationSlice";
import { auth } from "../firebase";
import faker from "faker";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SignupForm() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO : Persist login state

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(signin());
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("%cSigning up...", "font-size: 1.25em;");
  };

  const fillWithFaker = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const password = faker.internet.password();

    setUsername(faker.internet.userName());
    setEmail(faker.internet.email());
    setPassword(password);
    setConfirmPassword(password);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={10}>
          <Button
            onClick={fillWithFaker}
            variant="contained"
            color="secondary"
            fullWidth
          >
            Fill with faker
          </Button>
        </Grid> */}
        <Grid item xs={10}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
