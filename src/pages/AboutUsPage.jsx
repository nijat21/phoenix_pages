import React from 'react';

function AboutUsPage() {
  const person1 = {
    name: 'Nijat Ismayilov',
    role: 'Co-founder',
    bio: '',
    linkedIn: '/nijat-ismayilov',
    github: '/nijat21',
  };

  const person2 = {
    name: 'Luís Gonçalves',
    role: 'Co-founder',
    bio: '',
    linkedIn: '/luis-dearaujo-goncalves',
    github: '/luigoncalves',
  };
  return (
    <div className='my-10 flex justify-evenly'>
      <section className='w-1/4 flex flex-col px-12 py-10 items-center justify-center border-2 border-neutral-800 rounded-md shadow-sm shadow-slate-500'>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-700 rounded-xl'>
          <img
            src='src/assets/authorGeneric.png'
            alt='Nijat'
            className=' rounded-xl w-16 h-auto mb-4'
          />
          <h1 className='text-center text-2xl'>
            <strong>{person1.name}</strong>
          </h1>
          <h2 className='text-center text-sm'>{person1.role}</h2>
        </div>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-600 rounded-xl'>
          <a
            href='https://linkedin.com/in/nijat-ismayilov'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='src/assets/linkedin_logo2.webp'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto mb-4'
            />
          </a>
          <h2 className='text-center'>{person1.linkedIn}</h2>
        </div>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-500 rounded-xl'>
          <a
            href='https://github.com/nijat21'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='src/assets/githubLogo2.png'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto mb-4'
            />
          </a>
          <h2 className='text-center'>{person1.github}</h2>
        </div>
      </section>

      <section className='w-1/4 flex flex-col px-12 py-10 items-center justify-center border-2 border-neutral-800 rounded-md shadow-sm shadow-slate-500'>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-500 rounded-xl'>
          <img
            src='src/assets/authorGeneric.png'
            alt='Luís'
            className='text-center rounded-xl w-16 h-auto mb-4'
          />
          <h1 className='text-center text-2xl'>
            <strong>{person2.name}</strong>
          </h1>
          <h2 className='text-center text-sm'>{person2.role}</h2>
        </div>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-600 rounded-xl'>
          <a
            href='https://linkedin.com/in/luis-dearaujo-goncalves'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='src/assets/linkedin_logo2.webp'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto mb-4'
            />
          </a>
          <h2 className='text-center'>{person2.linkedIn}</h2>
        </div>
        <div className='flex flex-col items-center w-64 py-6 my-4 px-8 border-2 border-lime-700 rounded-xl'>
          <a
            href='https://github.com/luigoncalves'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src='src/assets/githubLogo2.png'
              alt='/in'
              className='text-center rounded-xl w-16 h-auto mb-4'
            />
          </a>
          <h2 className='text-center'>{person2.github}</h2>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
