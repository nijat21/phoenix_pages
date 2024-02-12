import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserProvider';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import LoaderFull from '../components/LoaderFull';
import BookCard from '../pages/BookCard';
import NotFound from '../components/NotFound';

function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    searchTitle,
    setSearchTitle,
    enterHandler,
    setEnterHandler,
    getTopBooks,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const getBooksByCategory = async title => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${title}&limit=50`
      );
      setBooks(response.data.docs);
      // setLoading(false);
    } catch (error) {
      navigate('/server-error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Search mechanism
  const searchMechanism = async () => {
    if (searchTitle.trim() !== '') {
      setLoading(true);
      getBooksByCategory(searchTitle).then(() => {
        setLoading(false);
        setEnterHandler('');
      });
    }
  };

  // Running search results every time the page is opened
  useEffect(() => {
    searchMechanism();
  }, []);

  // Go back
  const handleGoBack = () => {
    setSearchTitle('');
    navigate(-1);
  };

  // Books for the page is opened
  useEffect(() => {
    if (enterHandler === 'Enter') {
      searchMechanism();
    }
  }, [enterHandler]);

  // Book rating algorithm
  const topFifteen = getTopBooks(books, 15, 300);

  return (
    <>
      {loading ? (
        <LoaderFull />
      ) : (
        <m.div className='flex flex-col px-20' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}>
          <div className=' flex justify-center'>
            <h1 className='text-3xl py-9 font-bold'>Search Results</h1>
          </div>

          {books.length > 0 && topFifteen.length > 0 ? (
            <section className='grid grid-cols-5 gap-x-8 gap-y-8 auto-rows-auto'>
              {topFifteen.map(book => {
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
          ) : (
            <NotFound />
          )}

          <div className='my-12 flex justify-center'>
            <button
              className='p-4 rounded-2xl text-white text-xl shadow-slate-400 dark:shadow-neutral-900 shadow-md bg-lime-700 hover:bg-lime-600'
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>
        </m.div >
      )
      }
    </>
  );
}

export default Search;
