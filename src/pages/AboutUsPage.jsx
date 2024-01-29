import React from 'react';

function AboutUsPage() {
  const person1 = {
    name: 'Nijat Ismayilov',
    role: 'Web Developer',
    bio: 'MSc in Entrepreneurship and Innovation',
    linkedIn: '/nijat-ismayilov',
    github: '/nijat21',
  };

  const person2 = {
    name: 'Luís Gonçalves',
    role: 'Web Developer',
    bio: 'MSc. Aerospace Engineering',
    linkedIn: '/luis-dearaujo-goncalves',
    github: '/luigoncalves',
  };
  return (
    <div className=' flex justify-center items-center'>
      <section className=' flex flex-col px-12 py-10 items-center justify-center '>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-700 rounded-xl'>
          <img
            src='../assets/NijatPhoto.jpeg'
            alt='Nijat'
            className=' rounded-xl w-40 h-48 mb-4'
          />
          <h1 className='text-center text-2xl'>
            <strong>{person1.name}</strong>
          </h1>
          <h2 className='text-center text-sm'>{person1.role}</h2>
          <p className='text-center text-sm mt-4'>{person1.bio}</p>
        </div>
        <div className='flex items-center w-64 py-6 my-4 px-8 justify-evenly border-2 border-lime-600 rounded-xl'>
          <a
            href='https://linkedin.com/in/nijat-ismayilov'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='./linkedin_logo2.webp'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto'
            />
          </a>
          <a
            href='https://github.com/nijat21'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='./githubLogo2.png'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto'
            />
          </a>
        </div>
      </section>

      <section className='w-1/4 flex flex-col px-12 py-10 items-center justify-center '>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-700 rounded-xl'>
          <img
            src='../assets/LuisPhoto.jpeg'
            alt='Luís'
            className='text-center rounded-xl w-40 h-48 mb-4'
          />
          <h1 className='text-center text-2xl'>
            <strong>{person2.name}</strong>
          </h1>
          <h2 className='text-center text-sm'>{person2.role}</h2>
          <p className='text-center text-sm mt-4'>{person2.bio}</p>
        </div>
        <div className='flex items-center w-64 py-6 my-4 px-8 justify-evenly border-2 border-lime-600 rounded-xl'>
          <a
            href='https://linkedin.com/in/luis-dearaujo-goncalves'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='./linkedin_logo2.webp'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto'
            />
          </a>
          <a
            href='https://github.com/luigoncalves'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='./githubLogo2.png'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto'
            />
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
