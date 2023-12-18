import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className=''>
      <Link to={'/'}>
        <h2>Home</h2>
      </Link>

      <Link>
        <h2>Categories</h2>
      </Link>
      <Link>
        <h2>Lists</h2>
      </Link>
      <Link>
        <h2>About Us</h2>
      </Link>

      <form action=''>
        <input type='text' placeholder='seacrh' />
      </form>

      <Link>
        <h2>Log In</h2>
      </Link>
    </div>
  );
}

export default Navbar;
