import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { useState } from 'react';
import getCurrentTime from './components/index';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

export default function SignIn() {
  let currentDate = new Date();
  const [userName, setUserName] = useState('')
  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('task4-web-app-server.vercel.app/login', {email: data.get('email'),
    password: data.get('password'),
    lastLogin: getCurrentTime(currentDate)})
    .then(result => {
      console.log(result)
      if(result.data.success) {
        navigate(`/main/${result.data.user.login}`);
      } 
    })
    .catch(err => {
      console.error("Ошибка при отправке запроса:", err);
      setErrorMessage(err.response.data.message);
  });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
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
            Sign in
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


