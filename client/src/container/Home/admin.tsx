import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import FeaturedPost from '../../components/Post';
import { useQuery } from '@apollo/client';
import { RoleProps, Posts } from './types';
import { GET_ADMIN_POSTS } from '../../GraphQL/Timeline.ts';
import { defaultPaginationDto } from '../../util/pagination';

export default function AdminPostPage(props: RoleProps) {
  const { role } = props;
  const [posts, setPosts] = useState<Posts[]>([]);
  const { error, loading, data } = useQuery(GET_ADMIN_POSTS, {
    variables: { pageOptionDto: defaultPaginationDto, userId: localStorage.getItem('id') },
  });

  useEffect(() => {
    if (!error && data) {
      setPosts(data.GetProfilePosts.entities);
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
