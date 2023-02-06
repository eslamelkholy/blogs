import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import FeaturedPostDetails from '../../components/PostDetails';

const singlePost = {
  title: 'Featured post',
  date: 'Nov 12',
  description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
  image: 'https://source.unsplash.com/random',
  imageLabel: 'Image Text',
  views: 5000,
};

const theme = createTheme();

export default function Blog() {
  const [role, setRole] = useState({ role: 'admin' });

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem('role') as any);
    if (userRole) {
      setRole(userRole);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <main>
          <FeaturedPostDetails key={singlePost.title} post={singlePost} role={role} />
        </main>
      </Container>
    </ThemeProvider>
  );
}
