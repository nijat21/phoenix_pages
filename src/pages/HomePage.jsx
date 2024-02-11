import { ChevronDownIcon } from '@chakra-ui/icons';
import { motion as m } from "framer-motion";
import BooksPage from './BooksPage';
import { Link as ScrollLink } from 'react-scroll';


function HomePage() {
  // const [scrolled, setScrolled] = useState(false);

  // const handleScroll = () => {
  //   const homePageOffset = document.getElementById('home-page').offsetTop;
  //   const scrollPosition = window.scrollY;
  //   const booksPageOffset = document.getElementById('books-page').offsetTop;
  //   if (scrollPosition > homePageOffset && !scrolled) {
  //     setScrolled(true);
  //     window.scrollTo({
  //       top: booksPageOffset,
  //       behavior: 'smooth',
  //       duration: 1000
  //     });
  //     window.removeEventListener('scroll', handleScroll);
  //   } else if (scrollPosition < homePageOffset && scrolled) {
  //     setScrolled(false);
  //     window.addEventListener('scroll', handleScroll);
  //   }
  // }


  // useEffect(() => {
  //   // Attach scroll event listener
  //   window.addEventListener('scroll', handleScroll);
  //   // Remove event listener to avoid memory leaks
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [scrolled])


  return (
    <div className="w-screen min-h-screen flex flex-col relative overflow-hidden scrollbar scrollbar-thumb-neutral-600 dark:scrollbar-thumb-neutral-800 scrollbar-track-transparent">
      <div id='home-page' className='bg-bkg bg-cover bg-center w-screen h-screen flex items-center justify-center mt-0 z-20'>
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeIn" }} exit={{ opacity: 0 }}
          className='w-3/5 overflow-hidden text-neutral-200 mt-20 flex flex-col items-center bg-black bg-opacity-40 p-8 rounded-tl-5xl rounded-br-5xl backdrop-blur-sm'>
          <div className='overflow-hidden'>
            <m.h1 className='text-8xl p-8'
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.75 }}
            >Phoenix Pages
            </m.h1>
          </div>
          <m.h3 className='text-2xl p-6 text-center'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 1 }}>
            <i>Eternity of knowledge is preserved in books and guested in memories of people from generation to generation.</i>
            <br />
            <p className='pt-2 text-2xl'>Find your next books, plan and track your reading!</p>
          </m.h3>
          <m.div className='p-6 flex justify-center items-center'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 1 }}>
            <ScrollLink className='border-solid border-2 border-amber-800 p-3 ml-4 rounded-tr-lg rounded-bl-lg hover:bg-amber-800 text-xl'
              to="books-page" spy={true} smooth={true} offset={-64} duration={600}>
              Discover books <ChevronDownIcon className='mx-2' boxSize={7} />
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
