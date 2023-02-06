import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostDetails from './container/PostDetails';
import Header from './components/Header/Header';
import Blog from './container/Home';
import Users from './container/User';

function App() {
  const [role, setRole] = useState({ role: 'user' });

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem('role') as any);
    if (userRole) {
      setRole(userRole);
    }
  }, []);
  return (
    <BrowserRouter>
      <Header title='Blog' role={role} />
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path='users' element={<Users />} />
        <Route path='postDetails/:id' element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
