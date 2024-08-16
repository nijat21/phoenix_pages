import { useEffect, useState } from 'react';
import BooksPage from './BooksPage';
import '../styles/homepage.styles.css';
import Ad from '../components/Ad';


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
      {/* Landing page */}
      <Ad windowWidth={windowWidth} />

      <div id='books-page' className='min-h-home-screen overflow-hidden'>
        <BooksPage />
      </div>
    </div>
  );
}
export default HomePage;
