import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AboutUsPage from './pages/AboutUsPage';
import BooksPage from './pages/BooksPage';
import SingleBookPage from './pages/SingleBookPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/books' element={<BooksPage />} />
        <Route path='books/works/:bookKey' element={<SingleBookPage />} />
        <Route path='authors/:authorKey' element={<AuthorPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
      </Routes>
    </div>
  );
}

export default App;
