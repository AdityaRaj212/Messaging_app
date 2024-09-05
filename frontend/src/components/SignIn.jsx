import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/SignIn.css';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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

const SignIn = () => {
  const {setIsAuthenticated, setUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('/api/user/signIn', { email, password });
      const { user, token } = response.data;
      // setUser(user);
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);

      // const result = await axios.post('/api/user/signIn', {
      //   email,
      //   password
      // });
  
      // console.log(result.status);
      if(response.status){
        console.log('Signed in');
        navigate('/')
      }else{
        console.log('Signin failed');
      }
    }catch(err){
      console.error('yo', err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="background">
        <Container component="main" maxWidth="xs" className="login-container">
          <Box className="login-box animate-fade-in">
            <Typography component="h1" variant="h5" color="primary" className="animate-slide-in">
              Login
            </Typography>
            <Box component="form" className="login-form">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                className="login-button animate-bounce"
                onClick={handleSubmit}
              >
                Login
              </Button>
              <div className='info'>
                Don't have an account? <a href='/signup'>Sign Up</a>
              </div>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;
