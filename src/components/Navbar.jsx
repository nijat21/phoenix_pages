import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='h-14 w-screen flex justify-between justify-items-center place-items-center  bg-neutral-900 items-center font-light font-serif'>
      <div className='w-1/3 ml-10'>
        <Link to={'/'} className='flex w-12 h-12 place-items-center'>
          <img
            src='src/assets/logo.png'
            alt='Home'
            className='w-12'
          />
          <div className='ml-2'>
            <p className='text-orange-500 mb-0 text-sm'>Phoenix Pages</p>
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
