import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { dateParse } from '../../util/date';
import { Post } from '../../container/Home/types';

interface FeaturedPostProps {
  post: Post;
  role: string;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post, role } = props;

  return (
    <Grid item md={12} margin={2} width={'100%'}>
      <CardActionArea component='a'>
        <Card>
          <CardContent sx={{ flex: 1 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                  R
                </Avatar>
              }
              action={
                <Link aria-label='settings' to={`/postDetails/${post.id}`}>
                  View
                </Link>
              }
              title={post.title}
              subheader={dateParse(post.created_at)}
            />
            <Typography component='h2' variant='h5'>
              {post.subTitle}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary'></Typography>
            <Typography variant='subtitle1' paragraph>
              {post.text}
            </Typography>
            <Link aria-label='settings' to={`/postDetails/${post.id}`}>
              Continue reading...
            </Link>
            {role === 'admin' && (
              <Typography variant='subtitle1' align='right' color='primary'>
                {post.totalPostViews} Total Views
              </Typography>
            )}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
