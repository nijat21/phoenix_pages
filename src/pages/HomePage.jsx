import React from 'react';
import { Link } from 'react-router-dom';
import Plx from 'react-plx';

const parallaxData = [
  {
    start: 'self',
    duration: '100vh',
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];

function HomePage() {
  return (
    <div
      className="bg-[url('../assets/darkAcademiaLibrary.jpeg')] bg-cover w-screen h-screen
     flex items-center justify-center align-middle relative"
    >
      <div className='text-white w-fit flex flex-col items-center '>
        <h1 className='text-8xl pl-8 pr-8'>Phoenix Pages</h1>
        <h3 className='text-2xl mt-16'>
          "In the eternal flames of words, wisdom rises, forever reborn on
          Phoenix Pages."
        </h3>
        <div className='mt-16 flex justify-center items-center'>
          <Link
            to={'/books'}
            className='border-solid border-2 border-amber-800 p-3 ml-4 rounded-tr-lg rounded-bl-lg hover:bg-amber-800 text-xl'
          >
            Find all our books here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
