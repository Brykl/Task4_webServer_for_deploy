import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';


const defaultTheme = createTheme();


const darkTheme  = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});



export default function SignUp() {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
if(!data.get('email').includes('@')) {
    setErrorMessage("email is uncorrect");
} else {
    axios.post('https://task4-web-server-for-deploy-server.vercel.app/register', {
            email: data.get('email'),
            login: data.get('login'),
            password: data.get('password')
        })
        .then(result => {
            console.log(result);
            if (result.data.message === 'User created successfully') {
                navigate('/login');
            }
        })
        .catch(err => {
            console.error("Ошибка при отправке запроса:", err);
            setErrorMessage(err.response.data.message);
        });
}  
    };
    

    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            // backgroundColor: '#ffff',
            outline: '1px solid #282c34',
            borderRadius: '15px',
            padding: '30px',
            marginTop: 13,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Typography component="h1" variant="h5">
            Sign up
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="login"
              label="Login name"
              id="login"
              autoComplete="login"
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}