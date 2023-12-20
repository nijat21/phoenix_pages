import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-[url('src/assets/retro-big-library-illustration-ai-generative-free-photo.jpg')] bg-cover h-screen">
      <div className='bg-neutral-300 w-fit'>
        <h1>Phoenix Pages</h1>
        <h3>
          "In the eternal flames of words, wisdom rises, forever reborn on
          Phoenix Pages."
        </h3>
        Find your books
        <button className='border-solid border-2 border-sky-500 p-3'>
          <Link to={'/categories'}>Here</Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
