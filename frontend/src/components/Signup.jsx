import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, useStepContext } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/Signup.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const Signup = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post('/api/user/signUp', {
      name,
      userName,
      email,
      password
    });

    console.log(result.status);
    if(result.status){
      console.log('signed up');
    }else{
      console.log('Signup failed');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="background">
        <Container component="main" maxWidth="xs" className="signup-container">
          <Box className="signup-box animate-fade-in">
            <Typography component="h1" variant="h5" color="primary" className="animate-slide-in">
              Sign Up
            </Typography>
            <Box component="form" className="signup-form">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value = {name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value = {userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="signup-button animate-bounce"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <div className='info'>
                Already have an account? <a href='/login'>Login</a>
              </div>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
