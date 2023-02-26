import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { redirect } from "react-router-dom";
import axiosClient from "../Api/axiosClient";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState()
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const { auth, setAuth } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axiosClient({
        method: 'post',
        url: 'auth/login',
        data: {
          email,
          pass
        }
      })
      .then( response => {
        let accessToken = response?.data?.token
        setAuth({ email, pass, accessToken })
        setEmail('')
        setPass('')
      })
    } catch (error) {
      if(!error?.response){
        setErrorMessage('No server resposne')
      } else if (error?.response?.status === 400){
        setErrorMessage('Missing email or password')
      } else if (error?.response?.status === 401){
        setErrorMessage('Unauthorized')
      } else {
        setErrorMessage('Login failed')
      }
      console.log(errorMessage);
    }
  }
  useEffect( () => console.log(auth),[auth])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
