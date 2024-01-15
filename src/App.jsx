import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AboutUsPage from './pages/AboutUsPage';
import BooksPage from './pages/BooksPage';
import SingleBookPage from './pages/SingleBookPage';
import AuthorPage from './pages/AuthorPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import DeleteUser from './pages/DeleteUser';

function App() {
  return (
    <div>
      <Navbar />
      <div className='pt-12'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/books' element={<BooksPage />} />
          <Route path='books/works/:bookKey' element={<SingleBookPage />} />
          <Route path='/authors/:authorKey' element={<AuthorPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/aboutus' element={<AboutUsPage />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/deleteuser' element={<DeleteUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
