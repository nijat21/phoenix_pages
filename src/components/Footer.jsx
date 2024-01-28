import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-neutral-800 h-16 p-6 text-center flex justify-between '>
      <div className='w-1/4 text-neutral-200'>&copy; 2024 Phoenix Pages</div>
      <div className='w-1/4  flex justify-center '>
        <img
          src={['../src/assets/icons8-instagram.png']}
          alt='ig'
          className='w-5 h-5 mr-7'
        />
        <img
          src='../src/assets/icons8-linkedin-50.png'
          alt='in'
          className='w-5 h-5 mr-7'
        />
        <Link to='https://github.com/nijat21/phoenix_pages.git' target='_blank'>
          <img
            src='../src/assets/icons8-github-30.png'
            alt='gh'
            className='w-5 h-5 mr-7'
          />
        </Link>
        {/* <img src='src/assets/youtube.png' alt='yt' className='w-5 h-5 mr-7' /> */}
        <img
          src='../src/assets/icons8-facebook-50.png'
          alt='fb'
          className='w-5 h-5 mr-7'
        />
      </div>
    </footer>
  );
}

export default Footer;
