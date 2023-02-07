import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FeaturedPost from '../../components/Post';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { GET_USER_POSTS } from '../../GraphQL/Queries';
import { useQuery } from '@apollo/client';

const theme = createTheme();

interface Posts {
  id: number;
  created_at: string;
  text: string;
  title: string;
  totalPostViews: number;
  subTitle: string;
}

export default function Blog() {
  const { error, loading, data } = useQuery(GET_USER_POSTS, {
    variables: { pageOptionDto: { take: 10, page: 1 }, userId: localStorage.getItem('id') },
  });
  const [role, setRole] = useState('user');
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    if (!error && data) {
      setPosts(data.GetUserPosts.entities);
    }
  }, [data, error, loading]);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container md={10} spacing={4}>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <main>
                <Grid container md={12} spacing={4}>
                  {posts.map((post) => (
                    <FeaturedPost key={post.id} post={post} role={role} />
                  ))}
                </Grid>
              </main>
            </Grid>
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
