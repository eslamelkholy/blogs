import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import AdminPostPage from './admin';
import UserPostPage from './user';

const theme = createTheme();

export default function Blog() {
  const [role, setRole] = useState('');
  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container md={12} spacing={4}>
            <Grid xs={2}></Grid>

            {role && (
              <Grid xs={8} width={'90%'}>
                {role === 'admin' ? <AdminPostPage role={role} /> : <UserPostPage role={role} />}
              </Grid>
            )}
            <Grid xs={2}></Grid>
          </Grid>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          <Pagination count={50} color='primary' />
        </div>
      </Container>
    </ThemeProvider>
  );
}
