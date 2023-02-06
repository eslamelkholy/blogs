import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FeaturedPost from '../../components/Post';
import { useState, useEffect } from 'react';

const AllPosts = [
  {
    id: 1,
    title: 'Featured post',
    date: 'Nov 12',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
    views: 5000,
  },
  {
    id: 2,
    title: 'Post title',
    date: 'Nov 11',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
    views: 5000,
  },
  {
    id: 3,
    title: 'Featured post',
    date: 'Nov 12',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
    views: 5000,
  },
  {
    id: 4,
    title: 'Post title',
    date: 'Nov 11',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
    views: 5000,
  },
];

const adminPosts = [
  {
    id: 1,
    title: 'Featured post',
    date: 'Nov 12',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
    views: 5000,
  },
];

const theme = createTheme();

export default function Blog() {
  const [role, setRole] = useState({ role: 'user' });

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
          {role.role === 'admin' ? (
            <Grid container spacing={4}>
              {adminPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} role={role} />
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {AllPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} role={role} />
              ))}
            </Grid>
          )}
        </main>
      </Container>
    </ThemeProvider>
  );
}
