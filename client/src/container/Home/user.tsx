import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import FeaturedPost from '../../components/Post';
import { useQuery } from '@apollo/client';
import { RoleProps, Post } from './types';
import { GET_USER_POSTS } from '../../GraphQL/Timeline.ts';
import { defaultPaginationDto } from '../../util/pagination';

export default function UserPostPage(props: RoleProps) {
  const { role } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const { error, loading, data } = useQuery(GET_USER_POSTS, {
    variables: { pageOptionDto: defaultPaginationDto, userId: localStorage.getItem('id') },
  });

  useEffect(() => {
    if (!error && data) {
      setPosts(data.GetUserPosts.entities);
    }
  }, [data, error, loading]);

  return (
    <Grid container md={12} spacing={4}>
      {posts.map((post) => (
        <FeaturedPost key={post.id} post={post} role={role} />
      ))}
    </Grid>
  );
}
