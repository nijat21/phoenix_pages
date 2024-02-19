import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import UserContext from '../context/UserProvider';
import Loader from '../components/Loader';
import BookCard from './BookCard';
import '../styles/bookspage.styles.css';

function BooksPage() {
  const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [booksCount, setBooksCount] = useState(5);
  const [discoverClicked, setDiscoverClicked] = useState(false);
  const [homeHeight, setHomeHeight] = useState('screen');
  const navigate = useNavigate();

  /////////////////////////

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

  const { category, setCategory, getTopBooks, loading, setLoading } =
    useContext(UserContext);

  // Subject query that will look for a generic list of top 5 books
  // const genericSubject = '*';

  // If any category selected save that, or else save genericSubject in local storage
  const claimCategory = cat => {
    {
      localStorage.setItem('selectedCategory', cat);
    }
  };

  // Fetching books by category
  const getBooksByCategory = async cat => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://openlibrary.org/search.json?subject=${cat}&limit=50`
      );
      setBooks(response.data.docs);
    } catch (error) {
      console.log(error);
      navigate('/server-error');
    } finally {
      setLoading(false);
    }
  };

  // Books updated every time category changes
  useEffect(() => {
    console.log(category);
    const selectedCat = category;
    if (selectedCat) {
      setLoading(true);
      claimCategory(selectedCat);
      getBooksByCategory(selectedCat);
    }
  }, [category]);

  // Book rating algorithm
  const topBooks = getTopBooks(books, booksCount, 300);

  const handleDiscoverMore = () => {
    setDiscoverClicked(true);
    setBooksCount(booksCount + 5);
    if (windowWidth > 680) {
      setHomeHeight('2screen');
    } else {
      setHomeHeight('2screen-mobile');
    }
  };

  const handleSeeLess = () => {
    setDiscoverClicked(false);
    setBooksCount(5);
    if (windowWidth > 680) {
      setHomeHeight('screen');
    } else {
      setHomeHeight('screen-mobile');
    }
  };

  // h-${homeHeight}

  return (
    <div className={`h-${homeHeight} main-div`}>
      <div className='categories '>
        <button
          className={`categories-buttons  ${
            category === '*'
              ? 'border-b-2 border-black dark:border-neutral-200'
              : 'border-b-2 border-transparent'
          } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('*')}
        >
          General
        </button>
        <button
          className={`categories-buttons ${
            category === 'science'
              ? 'border-b-2 border-black dark:border-neutral-200'
              : 'border-b-2 border-transparent'
          } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('science')}
        >
          Science
        </button>
        <button
          className={`categories-buttons ${
            category === 'crime'
              ? 'border-b-2 border-black dark:border-neutral-200'
              : 'border-b-2 border-transparent'
          } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('crime')}
        >
          Crime
        </button>
        <button
          className={`categories-buttons ${
            category === 'selfhelp'
              ? 'border-b-2 border-black dark:border-neutral-200'
              : 'border-b-2 border-transparent'
          } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('selfhelp')}
        >
          Self-help
        </button>
        <button
          className={`categories-buttons ${
            category === 'poetry&subject:drama'
              ? 'border-b-2 border-black dark:border-neutral-200'
              : 'border-b-2 border-transparent'
          } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('poetry&subject:drama')}
        >
          Poetry and Drama
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <m.div
          className={`flex ${
            windowWidth < 680 ? `h-${homeHeight} flex-col` : 'flex-col'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          exit={{ opacity: 0 }}
        >
          <section className='books'>
            {books &&
              topBooks.map(book => {
                return (
                  <BookCard
                    key={book.key}
                    book={book}
                    setImageLoaded={setImageLoaded}
                    imageLoaded={imageLoaded}
                  />
                );
              })}
          </section>
          <div className='flex justify-center text-xl'>
            <button
              className='my-16 w-40 h-12 p-2 rounded-2xl  shadow-slate-400 shadow-md text-white bg-lime-700 
              hover:bg-lime-600 dark:shadow-neutral-900'
              onClick={handleDiscoverMore}
            >
              Discover More
            </button>
            {discoverClicked && (
              <button
                className='my-16 w-40 h-12 p-2 mx-2 rounded-2xl  shadow-slate-400 shadow-md text-white bg-lime-700 
                hover:bg-lime-600  dark:shadow-neutral-900'
                onClick={handleSeeLess}
              >
                See Less
              </button>
            )}
          </div>
        </m.div>
      )}
    </div>
  );
}

export default BooksPage;
