import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
      </Routes>
    </div>
  );
}

export default App;
