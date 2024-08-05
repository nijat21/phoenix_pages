import { useState, useRef, useEffect, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import { motion as m } from 'framer-motion';

function CategoriesMenu() {
  const catMenu = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setCategory } = useContext(UserContext);


  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleCategoryClick = cat => {
    console.log(cat);
    setCategory(cat);
    setOpen(false);
    navigate('/books');
  };

  useEffect(() => {
    const handleOutsideClick = e => {
      {
        open &&
          catMenu.current &&
          !catMenu.current.contains(e.target) &&
          setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open, catMenu]);

  return (
    <div
      className='text-neutral-200 flex justify-center flex-col'
      ref={catMenu}
    >
      <div className='flex items-center justify-center'>
        <Link className='relative active:bg-neutral-100' onClick={handleOpen}>
          <i className='fa-solid fa-bars'></i>
        </Link>
      </div>
      <div className='flex justify-center'>
        {open ? (
          <m.div
            initial={{ opacity: 0, y: '0%' }}
            animate={{ opacity: 1, y: '2.5%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className='absolute mt-2 ml-14 flex flex-col justify-center items-center py-4 bg-neutral-900 backdrop-filter backdrop-blur-3xl px-3 border-solid border-2 border-neutral-200 rounded-xl min-w-32'
          >
            <Link
              className='hover:border-b hover:border-neutral-200 zoom-container'
              to={'/books'}
            >
              Categories
            </Link>
            {user && (
              <Link
                className='hover:border-b hover:border-neutral-200 zoom-container'
                to={'/mybooks'}
              >
                My Books
              </Link>
            )}
            <Link
              className='hover:border-b hover:border-neutral-200 zoom-container'
              to={'/aboutus'}
            >
              About Us
            </Link>
            <button
              className='hover:border-b hover:border-neutral-200 zoom-container'
              onClick={() => handleCategoryClick('selfhelp')}
            >
              Search
            </button>
          </m.div>
        ) : null}
      </div>
    </div>
  );
}

export default CategoriesMenu;
