import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='w-screen flex justify-between justify-items-center place-items-center  h-11 bg-neutral-900 items-center font-light font-serif'>
      <div className='w-1/3 ml-10'>
        <Link to={'/'} className='flex w-7 h-9 place-items-center'>
          <img
            src='src/assets/Phoenix-2-removebg-preview.png'
            alt='Home'
            className='w-7'
          />
          <div className='ml-2'>
            <p className='text-amber-800 mb-0 text-xs'>Phoenix</p>
            <p className='text-amber-800 mt-0 text-xs'>Pages</p>
          </div>
        </Link>
      </div>
      <div className='w-1/3 flex justify-between text-center'>
        <Link to={'/categories'}>
          <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
            Categories
          </h2>
        </Link>
        <Link>
          <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
            Lists
          </h2>
        </Link>
        <Link to={'/aboutus'}>
          <h2 className='text-neutral-200 hover:border-b hover:border-neutral-200'>
            About Us
          </h2>
        </Link>
      </div>

      <div className='w-1/3 flex justify-end mr-10'>
        <form action='' className='text-neutral-200 mr-3'>
          <input type='text' placeholder=' Search' />
        </form>

        <Link className=' text-neutral-200 hover:border-b hover:border-neutral-200'>
          <h2>Log In</h2>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
