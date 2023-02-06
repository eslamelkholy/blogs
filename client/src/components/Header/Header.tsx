import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  role: {
    role: string;
  };
}

export default function Header(props: HeaderProps) {
  const { title, role } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography component='h2' variant='h5' color='inherit' align='center' noWrap sx={{ flex: 1 }}>
          {title}
        </Typography>
        {role.role === 'admin' && (
          <Button variant='outlined' size='small'>
            <Link to='/users'>Users</Link>
          </Button>
        )}
      </Toolbar>
      <Toolbar component='nav' variant='dense' sx={{ justifyContent: 'space-between', overflowX: 'auto' }}></Toolbar>
    </React.Fragment>
  );
}
