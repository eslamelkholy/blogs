import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

interface FeaturedPostProps {
  post: {
    id: number;
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
    views: number;
  };
  role: string;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post, role } = props;

  return (
    <Grid item xs={12} md={8} margin={2}>
      <CardActionArea component='a'>
        <Card sx={{ display: 'flex' }}>
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
              title='Shrimp and Chorizo Paella'
              subheader='September 14, 2016'
            />
            <Typography component='h2' variant='h5'>
              {post.title}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary'>
              {post.date}
            </Typography>
            <Typography variant='subtitle1' paragraph>
              {post.description}
            </Typography>
            <Link aria-label='settings' to={`/postDetails/${post.id}`}>
              Continue reading...
            </Link>
            {role === 'admin' && (
              <Typography variant='subtitle1' align='right' color='primary'>
                {post.views} View
              </Typography>
            )}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
