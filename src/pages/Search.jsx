import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import Loader from '../components/Loader';
import BookCard from '../pages/BookCard';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { searchTitle, setSearchTitle, enterHandler, setEnterHandler, getTopBooks } =
    useContext(UserContext);

  const navigate = useNavigate();

  const getBooksByCategory = async title => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${title}&limit=50`
      );
      setBooks(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  // Books for the page is opened
  useEffect(() => {
    const searchMechanism = async () => {
      if (searchTitle.trim() !== '') {
        setLoading(true);
        getBooksByCategory(searchTitle).then(() => {
          setLoading(false);
          setEnterHandler('');
        });
      }
    };

    if (enterHandler === 'Enter') {
      searchMechanism();
    } else {
      setLoading(false);
    }
  }, [enterHandler]);

  // Book rating algorithm
  const topFifteen = getTopBooks(books, 15, 300);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex flex-col items-center mx-16'>
          <h1 className='text-3xl my-6'>Search Results</h1>
          <section className='grid grid-cols-5 gap-x-5 gap-y-8 auto-rows-auto'>
            {books &&
              topFifteen.map(book => {
                return (
                  <Link
                    to={`/books${book.key}`}
                    key={book.key}
                    className='min-h-max pb-2 px-1 rounded-br-lg shadow-slate-400 shadow-sm  border-2 border-slate-300 hover:border-slate-700'
                  >
                    <BookCard
                      book={book}
                      setImageLoaded={setImageLoaded}
                      imageLoaded={imageLoaded}
                    />
                  </Link>
                );
              })}
          </section>
          <div className='mt-12 flex justify-center'>
            <button
              className='p-4 rounded-2xl border-2 text-white border-lime-700 text-xl bg-lime-700 hover:bg-lime-600 hover:border-lime-600'
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
