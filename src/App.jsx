import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion as m } from 'framer-motion';
import { Toaster, toast } from 'sonner';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import BooksPage from './pages/BooksPage';
import SingleBookPage from './pages/SingleBookPage';
import AuthorPage from './pages/AuthorPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import DeleteUser from './pages/DeleteUser';
import Profile from './pages/Profile';
import MyBooks from './pages/MyBooks';
import Search from './pages/Search';
import Footer from './components/Footer';
import FourOFour from './pages/FourOFour';
import ServerError from './pages/ServerError';

function App() {

  return (
    <div className='bg-bgk dark:bg-neutral-700 dark:text-neutral-200'>
      <Navbar />
      <Toaster richColors position='bottom-right' />
      <AnimatePresence>
        <div className='min-h-screen overflow-x-hidden overflow-y-hidden pt-16'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route path='books/works/:bookKey' element={<SingleBookPage />} />
            <Route path='/authors/:authorKey' element={<AuthorPage />} />
            <Route path='/mybooks' element={<MyBooks />} />
            <Route path='/aboutus' element={<AboutUsPage />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/deleteuser' element={<DeleteUser />} />
            <Route path='/search' element={<Search />} />

            <Route path='/server-error' element={<ServerError />} />
            <Route path='*' element={<FourOFour />} />
          </Routes>
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
