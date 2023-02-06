import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Blog from './container/Home';
import Users from './container/User';
import PostDetails from './container/PostDetails';

function App() {
  return (
    <BrowserRouter>
      <Header title='Blog' />
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path='users' element={<Users />} />
        <Route path='postDetails/:id' element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
