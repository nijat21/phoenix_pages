import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { motion as m } from "framer-motion";
import BooksPage from './BooksPage';
import { Link as ScrollLink } from 'react-scroll';


function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    // Attach scroll event listener
    const booksPageOffset = document.getElementById('home-page').offsetHeight;
    window.addEventListener('scroll', handleScroll);
    setScrollPosition(window.scrollY);
    if (scrollPosition > booksPageOffset) {
      setScrolled(true);
    }
  }

  useEffect(() => {
    handleScroll();
    // Remove event listener to avoid unnecessary checks
    window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition])




  return (
    <div className="w-screen min-h-screen flex flex-col relative overflow-hidden">
      <div id='home-page' className='bg-bkg bg-cover bg-center w-screen h-screen flex items-center justify-center mt-0'>
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeIn" }} exit={{ opacity: 0 }}
          className='overflow-hidden text-neutral-200 mt-20 w-fit  flex flex-col items-center bg-black bg-opacity-40 p-8 rounded-tl-5xl rounded-br-5xl backdrop-blur-sm'>
          <div className='overflow-hidden'>
            <m.h1 className='text-8xl p-8'
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.75 }}
            >Phoenix Pages
            </m.h1>
          </div>
          <m.h3 className='text-2xl p-6'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 1 }}>
            "In the eternal flames of words, wisdom rises, forever reborn on Phoenix Pages."
          </m.h3>
          <m.div className='p-6 flex justify-center items-center'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 1 }}>
            <ScrollLink
              to="books-page"
              spy={true}
              smooth={true}
              offset={-60}
              duration={600}>
              <button className='border-solid border-2 border-amber-800 p-3 ml-4 rounded-tr-lg rounded-bl-lg hover:bg-amber-800 text-xl'
                onClick={() => setScrolled(true)}>
                Discover books <ChevronDownIcon className='mx-2' boxSize={7} />
              </button>
            </ScrollLink>
          </m.div>
        </m.div>
      </div>
      <div id='books-page' className='min-h-screen overflow-hidden'>
        {scrolled &&
          <BooksPage />
        }
      </div>
    </div>
  );
}
export default HomePage;
