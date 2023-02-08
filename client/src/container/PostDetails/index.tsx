import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { Post } from '../Home/types';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST_DETAILS } from '../../GraphQL/Queries/post';
import FeaturedPost from '../../components/Post';
import { PAGE_VIEW_MUTATION } from '../../GraphQL/Mutations/view';

const theme = createTheme();

export default function BlogDetails(props: any) {
  const [role, setRole] = useState('user');
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const { error, loading, data } = useQuery(GET_POST_DETAILS, {
    variables: { postId: id },
  });

  const [newPostView, { error: viewError }] = useMutation(PAGE_VIEW_MUTATION);
  useEffect(() => {
    if (!error && data) {
      setPost(data.GetPost);
    }

    newPostView({
      variables: {
        newPostViewDto: {
          userId: localStorage.getItem('id'),
          postId: id,
        },
      },
    });
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
