import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-[url('src/assets/darkAcademiaLibrary.jpeg')] bg-cover h-screen pt-10 flex items-center justify-center">
      <div className='text-white w-fit flex flex-col items-center'>
        <h1 className='text-8xl mb-20 pl-8 pr-8'>Phoenix Pages</h1>
        <h3 className=''>
          "In the eternal flames of words, wisdom rises, forever reborn on
          Phoenix Pages."
        </h3>
        <div className='mt-8 flex justify-center items-center'>
          <button className='border-solid border-2 border-amber-800 p-3 ml-4 hover:bg-amber-800'>
            <Link to={'/categories'}>Find all our books here</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
