import React from 'react';

function AboutUsPage() {
  const person1 = {
    name: 'Nijat Ismaylov',
    role: 'Co-founder',
    bio: '',
    linkedIn: '/something here',
  };

  const person2 = {
    name: 'Luís Gonçalves',
    role: 'Co-founder',
    bio: '',
    linkedIn: '/luis-dearaujo-goncalves',
  };
  return (
    <div className='my-20 flex justify-evenly'>
      <section className='flex flex-col justify-center border-2 border-amber-800'>
        <div className='border-2 border-amber-800'>
          <h1 className='text-center'>{person1.name}</h1>
          <h2 className='text-center'>{person1.role}</h2>
          <img
            src='src/assets/authorGeneric.png'
            alt='Nijat'
            className='text-center rounded-xl w-16 h-auto'
          />
        </div>
        <div>
          <img
            src='src/assets/linkedin_logo2.webp'
            alt='/in'
            className='text-center rounded-xl w-16 h-auto'
          />
          <h2 className='text-center'>{person1.linkedIn}</h2>
        </div>
      </section>

      <section className='flex flex-col justify-center border-2 border-amber-800'>
        <div className='border-2 border-amber-800'>
          <h1 className='text-center'>{person2.name}</h1>
          <h2 className='text-center'>{person2.role}</h2>
          <img
            src='src/assets/authorGeneric.png'
            alt='Luís'
            className='text-center rounded-xl w-16 h-auto'
          />
        </div>
        <div className='flex flex-col justify-center'>
          <img
            src='src/assets/linkedin_logo2.webp'
            alt='/in'
            className='text-center rounded-xl w-16 h-auto'
          />
          <h2 className='text-center'>{person2.linkedIn}</h2>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
