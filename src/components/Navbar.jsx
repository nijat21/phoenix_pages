import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import UserMenu from './UserMenu';
import CategoriesMenu from './CategoriesMenu';

function Navbar() {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [selected, setSelected] = useState('');

  const handleChange = e => {
    const result = e.target.value;
    setSelected(result);
    if (result === 'profile') {
      navigate('/profile');
    } else if (result === 'mybooks') {
      navigate('/mybooks');
    } else if (result === 'logout') {
      setUserLogin('');
      navigate('/');
    }
  };

  const handleSearch = () => {
    navigate('/search');
  }

  return (
    <>
      <nav className='h-16 w-screen flex justify-between justify-items-center place-items-center  bg-neutral-900 items-center font-light font-serif fixed'>
        <div className='mw-1/3 ml-10 w-1/3 '>
          <Link to={'/'} className='flex h-12 place-items-center'>
            <img src='src/assets/phoenix-removebg-preview.png' alt='Home' className='w-14' />
            <div className='ml-1'>
              <p className='text-red-800 text-bold mb-0 text-3xl'>
                Phoenix Pages
              </p>
            </div>
          </Link>
        </div>

        <div className='w-1/3 flex justify-around text-center text-xl '>
          <Link to={'/'}>
            <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
              Home
            </h2>
          </Link>
          <div className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
            <CategoriesMenu />
          </div>
          <Link to={'/aboutus'}>
            <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
              About Us
            </h2>
          </Link>
          {userLogin &&
            <Link to={'/mybooks'}>
              <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'>
                My Books
              </h2>
            </Link>
          }
        </div>
        <div className='w-1/3 mr-10 flex text-xl items-center justify-end '>
          <input
            type='text'
            placeholder=' Search'
            className='text-neutral-200 mr-3 pl-2 border-2 border-neutral-600 rounded-xl bg-transparent h-8 text-justify'
            onChange={handleSearch}
          />
          {userLogin ?
            <div className="zoom-container">
              <UserMenu initial={userLogin[0].toUpperCase()} />
            </div>
            :
            <Link
              to={'/login'}
              className=' text-neutral-200 hover:border-b hover:border-neutral-200 zoom-container'
            >
              <h2>Log In</h2>
            </Link>
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;
