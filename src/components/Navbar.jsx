import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import UserMenu from './UserMenu';
import CategoriesMenu from './CategoriesMenu';
import DropdownMobile from './DropdownMobile';
import '../styles/navbar.styles.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userLogin,
    setUserLogin,
    searchTitle,
    setSearchTitle,
    enterHadler,
    setEnterHandler,
  } = useContext(UserContext);

  /////////////////////////

  // This code will make update the window size variable everytime the page is loaded and update the component taking that into account

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  ////////////////////////

  const handleSearch = e => {
    e.preventDefault();
    setSearchTitle(e.target.value);
    // if (location.pathname !== '/search') {
    //   navigate('/search');
    // }
  };

  // if the Enter key is pressed, that is passed to the Search page
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setEnterHandler('Enter');
      if (location.pathname !== '/search') {
        navigate('/search');
      }
    }
  };

  // Clear Search title
  const handleClick = () => {
    setSearchTitle('');
  };

  return (
    <>
      <nav className='navbar'>
        {windowWidth < 680 && (
          <div className='w-1/3 ml-4 '>
            <button className='dropdown'>
              <DropdownMobile />
            </button>
          </div>
        )}

        <div className='first-div '>
          <Link to={'/'} className='first-div-link '>
            <img src='/assets/logo.png' alt='Home' className='logo-img' />
            {windowWidth > 680 && (
              <div className='ml-1'>
                <p className='text-amber-800 text-bold mb-0 text-3xl'>
                  Phoenix Pages
                </p>
              </div>
            )}
          </Link>
        </div>

        {windowWidth > 680 && (
          <div className='w-1/3 flex justify-around text-center text-xl '>
            <button onClick={() => handleClick()}>
              <Link to={'/'}>
                <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
                  Home
                </h2>
              </Link>
            </button>
            <div className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
              <div tabIndex='0' role='button' onClick={() => handleClick()}>
                <CategoriesMenu />
              </div>
            </div>
            <button onClick={() => handleClick()}>
              <Link to={'/aboutus'}>
                <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
                  About Us
                </h2>
              </Link>
            </button>
            {userLogin && (
              <Link to={'/mybooks'} onClick={() => handleClick()}>
                <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
                  My Books
                </h2>
              </Link>
            )}
          </div>
        )}

        <div className='third-div'>
          {windowWidth > 680 && (
            <input
              type='text'
              placeholder='Search by title'
              className='text-neutral-200 mr-3 pl-2 border-2 border-neutral-600 rounded-xl bg-transparent h-8 text-justify'
              value={searchTitle}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
          )}
          {userLogin ? (
            <div className='user-symbol zoom-container'>
              <UserMenu initial={userLogin[0].toUpperCase()} />
            </div>
          ) : (
            <Link to={'/login'} className='login zoom-container'>
              <h2>Log In</h2>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
