import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='w-screen flex  place-content-evenly h-10 bg-neutral-600 items-center font-light'>
      <Link to={'/'}>
        <img
          src='src/assets/Phoenix-2-removebg-preview.png'
          alt='Home'
          className='w-7'
        />
      </Link>
      <Link to={'/categories'}>
        <h2 className='text-neutral-200'>Categories</h2>
      </Link>
      <Link>
        <h2 className='text-neutral-200'>Lists</h2>
      </Link>
      <Link>
        <h2 className='text-neutral-200'>About Us</h2>
      </Link>

      <form action='' className='text-neutral-200 rounded-xl'>
        <input type='text' placeholder=' Search' />
      </form>

      <Link className='ml-15 text-neutral-200'>
        <h2>Log In</h2>
      </Link>
    </div>
  );
}

export default Navbar;
