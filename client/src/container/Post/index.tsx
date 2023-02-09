import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { postStyle } from './style';
import { Grid, TextField } from '@mui/material';
import SearchPage from '../search/index';
import { useMutation } from '@apollo/client';
import { CREATE_POST_MUTATION } from '../../GraphQL/Mutations/post';

export const PostPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedUsers, setSelectedUsers] = React.useState<any>([]);
  const [segmentType, setSegmentType] = React.useState('');

  const [createPost] = useMutation(CREATE_POST_MUTATION);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title')?.toString();
    const subTitle = formData.get('subtitle')?.toString();
    const text = formData.get('text')?.toString();

    createPost({
      variables: {
        createPostInput: {
          userId: localStorage.getItem('id'),
          title,
          subTitle,
          text,
          segmentType,
          userIds: selectedUsers.map((user: any) => (user = user?.id)),
        },
      },
    });

    window.location.replace('/');
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Add Post
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={postStyle}>
          <Grid>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Segment Type
            </Typography>
            <SearchPage setSelectedUsers={setSelectedUsers} segmentType={segmentType} setSegmentType={setSegmentType} />
          </Grid>
          <Grid>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Post Details
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin='normal' required fullWidth id='title' label='Title' name='title' autoComplete='title' autoFocus />
              <TextField
                margin='normal'
                required
                fullWidth
                id='subtitle'
                label='Sub Title'
                name='subtitle'
                autoComplete='subtitle'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='text'
                label='Text'
                name='text'
                autoComplete='text'
                autoFocus
                multiline
                rows={8}
              />

              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Send Post
              </Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
