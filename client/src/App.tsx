import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import PostDetails from './container/PostDetails';
import Header from './components/Header/Header';
import Blog from './container/Home';
import Users from './container/User';
import SignIn from './container/Singin';

const link = from([new HttpLink({ uri: 'http://localhost:3000/graphql' })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  const [role, setRole] = useState('user');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <img
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: -1,
          }}
          src='https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          alt="an artist's rendition of a black hole in space"
        />
        <Header title='Blog' role={role} />

        <Routes>
          <Route path='/' element={<Blog />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='users' element={<Users />} />
          <Route path='postDetails/:id' element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
