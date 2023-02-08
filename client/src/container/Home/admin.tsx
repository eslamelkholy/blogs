import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import FeaturedPost from '../../components/Post';
import { useQuery } from '@apollo/client';
import { RoleProps, Post } from './types';
import { GET_ADMIN_POSTS } from '../../GraphQL/Queries/Timeline.ts';
import { defaultPaginationDto } from '../../util/pagination';
import { PaginationMetaDto } from '../pagination/paginationDto';
import { Pagination } from '@mui/material';

export default function AdminPostPage(props: RoleProps) {
  const { role } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationMetaDto>(defaultPaginationDto);
  const [currentPage, setCurrentPage] = useState(1);

  const { error, loading, data, refetch } = useQuery(GET_ADMIN_POSTS, {
    variables: { pageOptionDto: { take: paginationData.take, page: currentPage }, userId: localStorage.getItem('id') },
  });

  useEffect(() => {
    if (!error && data) {
      setPosts(data.GetProfilePosts.entities);
      setPaginationData({ ...data.GetProfilePosts.pagination, take: paginationData.take, page: currentPage });
    }
  }, [data, error, loading]);

  useEffect(() => {
    refetch({ pageOptionDto: { take: paginationData.take, page: currentPage }, userId: localStorage.getItem('id') });
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Grid container md={12} spacing={4}>
      {posts.map((post) => (
        <FeaturedPost key={post.id} post={post} role={role} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <Pagination count={paginationData?.pageCount || 1} color='primary' onChange={handleChangePage} />
      </div>
    </Grid>
  );
}
