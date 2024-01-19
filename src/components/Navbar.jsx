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

  return (
    <>
      {userLogin ? (
        <nav className='h-15 w-screen flex justify-between justify-items-center place-items-center  bg-neutral-900 items-center font-light font-serif fixed'>
          <div className='mw-1/3 ml-10 w-1/3 '>
            <Link to={'/'} className='flex h-12 place-items-center'>
              <img src='src/assets/phoenix.webp' alt='Home' className='w-12' />
              <div className='ml-1'>
                <p className='text-red-700 mb-0 text-sm font-sans'>
                  Phoenix Pages
                </p>
              </div>
            </Link>
          </div>

          <div className='w-1/3 flex justify-around text-center text-lg '>
            <Link to={'/'}>
              <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
                Home
              </h2>
            </Link>
            <div className='text-neutral-200 hover:border-b hover:border-neutral-200'>
              <CategoriesMenu />
            </div>
            <Link to={'/aboutus'}>
              <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
                About Us
              </h2>
            </Link>
            <Link to={'/mybooks'}>
              <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
                My Books
              </h2>
            </Link>
          </div>
          <div className=' w-1/3 mr-10 flex text-lg items-center justify-end '>
            <input
              type='text'
              placeholder=' Search'
              className='text-amber-800 mr-3 pl-1 border-2 border-amber-800 rounded-xl bg-transparent h-8 text-justify'
            />
            <div>
              <UserMenu initial={userLogin[0].toUpperCase()} />
            </div>
          </div>
        </nav>
      ) : (
        <nav className='h-13 w-screen flex justify-between justify-items-center place-items-center  bg-neutral-900 items-center font-light font-serif fixed'>
          <div className='mw-1/3 ml-10 w-1/3 '>
            <Link to={'/'} className='flex h-12 place-items-center'>
              <img src='src/assets/phoenix.webp' alt='Home' className='w-12' />
              <div className='ml-1'>
                <p className='text-red-800 mb-0 text-xl text-bold font-serif'>
                  Phoenix Pages
                </p>
              </div>
            </Link>
          </div>
          <div className='w-1/3 flex justify-around text-center text-lg '>
            <Link to={'/'}>
              <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
                Home
              </h2>
            </Link>
            <div className='text-neutral-200 hover:border-b hover:border-neutral-200'>
              <CategoriesMenu />
            </div>
            <Link to={'/aboutus'}>
              <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
                About Us
              </h2>
            </Link>
          </div>
          <div className=' w-1/3 mr-10 flex text-lg items-center justify-end '>
            <input
              type='text'
              placeholder=' Search'
              className='text-amber-800 mr-3 border-2 border-amber-800 rounded-xl bg-transparent h-8'
            />
            <Link
              to={'/login'}
              className=' text-neutral-200 hover:border-b hover:border-neutral-200'
            >
              <h2>Log In</h2>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
