import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import FeaturedPostDetails from '../../components/PostDetails';
import { Post } from '../Home/types';
import { useQuery } from '@apollo/client';
import { GET_POST_DETAILS } from '../../GraphQL/post';
import FeaturedPost from '../../components/Post';

const singlePost = {
  title: 'Featured post',
  date: 'Nov 12',
  description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
  image: 'https://source.unsplash.com/random',
  imageLabel: 'Image Text',
  views: 5000,
};

const theme = createTheme();

export default function BlogDetails(props: any) {
  const [role, setRole] = useState('user');
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const { error, loading, data } = useQuery(GET_POST_DETAILS, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (!error && data) {
      setPost(data.GetPost);
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
        <main>{post && <FeaturedPost post={post} role={role} />}</main>
      </Container>
    </ThemeProvider>
  );
}
