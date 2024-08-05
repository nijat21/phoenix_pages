import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useContext, useState } from 'react';
import { motion as m } from 'framer-motion';
import BooksPage from './BooksPage';
import { Link as ScrollLink } from 'react-scroll';
import '../styles/homepage.styles.css';

function HomePage() {

  // This code will make update the window size variable everytime the page is loaded and update the component taking that into account

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  ////////////////////////

  return (
    <div className='w-screen min-h-screen flex flex-col relative overflow-hidden scrollbar scrollbar-thumb-neutral-600
     dark:scrollbar-thumb-neutral-800 scrollbar-track-transparent'>
      <div
        id='home-page'
        className='bg-bkg bg-cover bg-center w-screen h-screen flex items-center justify-center mt-0 z-20'
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
          exit={{ opacity: 0 }}
          className='black-canva'
        >
          <div className='overflow-hidden'>
            <m.h1
              className='title'
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.75 }}
            >
              Phoenix Pages
            </m.h1>
          </div>
          <m.h3
            className='text'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 1 }}
          >
            <i>
              Eternity of knowledge is preserved in books and guested in
              memories of people from generation to generation.
            </i>
            <br />
            <p className='more-text'>
              Find your next books, plan and track your reading!
            </p>
          </m.h3>
          <m.div
            className='scroll-div'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 1 }}
          >
            <ScrollLink
              className='discover-button'
              to='books-page'
              spy={true}
              smooth={true}
              offset={-64}
              duration={600}
            >
              Discover books{' '}
              {windowWidth > 680 ? (
                <ChevronDownIcon className='down-icon' boxSize={7} />
              ) : (
                <ChevronDownIcon className='down-icon' boxSize={5} />
              )}
            </ScrollLink>
          </m.div>
        </m.div>
      </div>
      <div id='books-page' className='min-h-home-screen overflow-hidden'>
        <BooksPage />
      </div>
    </div>
  );
}
export default HomePage;
