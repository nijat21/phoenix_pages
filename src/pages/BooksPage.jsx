import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion as m } from "framer-motion";
import UserContext from '../context/UserProvider';
import Loader from '../components/Loader';
import BookCard from './BookCard';


function BooksPage() {
  const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [booksCount, setBooksCount] = useState(5);
  const [discoverClicked, setDiscoverClicked] = useState(false);
  const [homeHeight, setHomeHeight] = useState('screen');
  const navigate = useNavigate();

  const { category, setCategory, getTopBooks, loading, setLoading } = useContext(UserContext);

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
    setHomeHeight('2screen');
  };

  const handleSeeLess = () => {
    setDiscoverClicked(false);
    setBooksCount(5);
    setHomeHeight('screen');
  };

  return (
    <div className={`h-${homeHeight} px-20`}>
      <div className='py-5 h-24 flex flex-row justify-center items-center text-xl z-20'>
        <button
          className={`m-3 py-1 px-3  ${category === '*'
            ? 'border-b-2 border-black dark:border-neutral-200'
            : 'border-b-2 border-transparent'
            } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('*')}
        >
          General
        </button>
        <button
          className={`m-3 py-1 px-3 ${category === 'science'
            ? 'border-b-2 border-black dark:border-neutral-200'
            : 'border-b-2 border-transparent'
            } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('science')}
        >
          Science
        </button>
        <button
          className={`m-3 py-1 px-3 ${category === 'crime'
            ? 'border-b-2 border-black dark:border-neutral-200'
            : 'border-b-2 border-transparent'
            } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('crime')}
        >
          Crime
        </button>
        <button
          className={`m-3 py-1 px-3 ${category === 'selfhelp'
            ? 'border-b-2 border-black dark:border-neutral-200'
            : 'border-b-2 border-transparent'
            } hover:border-b-2 hover:border-black dark:hover:border-neutral-200`}
          onClick={() => setCategory('selfhelp')}
        >
          Self-help
        </button>
        <button
          className={`m-3 py-1 px-3 ${category === 'poetry&subject:drama'
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
        <m.div className='flex flex-col' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}>
          <section className='grid grid-cols-5 gap-x-8 gap-y-8 auto-rows-auto'>
            {books &&
              topBooks.map(book => {
                return (
                  <BookCard
                    key={book._id}
                    book={book}
                    setImageLoaded={setImageLoaded}
                    imageLoaded={imageLoaded}
                  />
                );
              })}
          </section>
          <div className='h-44 flex justify-center text-xl'>
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
