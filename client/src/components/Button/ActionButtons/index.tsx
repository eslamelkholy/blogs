import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function UserButtons() {
  return (
    <React.Fragment>
      <Button variant='outlined' size='small'>
        Edit
      </Button>
      <Button variant='outlined' size='small'>
        Delete
      </Button>
    </React.Fragment>
  );
}
