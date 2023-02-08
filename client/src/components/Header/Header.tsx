import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppBar, Link } from '@mui/material';

interface HeaderProps {
  title: string;
  role: string;
}

const signInPage = () => {
  return !window.location.href.toString().includes('signin');
};

export default function Header(props: HeaderProps) {
  const { title, role } = props;

  return signInPage() ? (
    <React.Fragment>
      <AppBar position='static' color='default' elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Typography component='h2' variant='h5' color='inherit' align='center' noWrap sx={{ flex: 1 }}>
            {title}
          </Typography>
          <Button variant='outlined' size='small' style={{ marginRight: '1%', position: 'absolute' }}>
            <Link href='/'>Home</Link>
          </Button>
          {role !== undefined && (
            <Button variant='outlined' size='small' style={{ marginRight: '1%' }}>
              <Link href='/signin'>Logout</Link>
            </Button>
          )}
          {role === 'admin' && (
            <Button variant='outlined' size='small'>
              <Link href='/users'>Users</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  ) : (
    <></>
  );
}
