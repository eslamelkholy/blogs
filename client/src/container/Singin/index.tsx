import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_USER_EMAIL } from '../../GraphQL/Queries/user';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const { error, loading, data } = useQuery(GET_USER_EMAIL, { variables: { email } });
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString();
    if (email) setEmail(email);
  };

  useEffect(() => {
    if (data && !error) {
      localStorage.setItem('id', data.getUserByEmail.id);
      localStorage.setItem('email', data.getUserByEmail.email);
      localStorage.setItem('role', data.getUserByEmail.role);
      navigate('/');
    }
  }, [email, loading, data, error, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
