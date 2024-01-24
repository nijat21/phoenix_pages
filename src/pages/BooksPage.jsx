import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import Loader from '../components/Loader';
import BookCard from './BookCard';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [booksCount, setBooksCount] = useState(5);
  const [discoverClicked, setDiscoverClicked] = useState(false);
  const { category, setCategory } = useContext(UserContext);


  // Subject query that will look for top a generic list of top 5 books
  const genericSubject = '*';

  // If any category selected save that, or else save genericSubject in local storage
  const claimCategory = () => {
    {
      category ?
        localStorage.setItem('selectedCategory', category)
        :
        setCategory(category)
      localStorage.setItem('selectedCategory', genericSubject)
    }

  }

  const getBooksByCategory = async (cat) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://openlibrary.org/search.json?subject=${cat}&limit=50`
      );
      setLoading(false);
      setBooks(response.data.docs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  // Books updated every time category changes
  useEffect(() => {
    claimCategory();
    const selectedCategory = localStorage.getItem('selectedCategory');
    getBooksByCategory(selectedCategory)
  }, [category]);

  // Book rating algorithm
  const getTopBooks = (input, n) => {
    const five = input
      ? input
        .filter(book => book.readinglog_count > 300)
        .sort(
          (a, b) =>
            b.ratings_average * 0.5 +
            (b.already_read_count /
              (b.readinglog_count - b.currently_reading_count)) *
            5 *
            0.5 -
            (a.ratings_average * 0.5 +
              (a.already_read_count /
                (a.readinglog_count - a.currently_reading_count)) *
              5 *
              0.5)
        )
      : [];
    return five.slice(0, n);
  };
  const topBooks = getTopBooks(books, booksCount);

  const handleDiscoverMore = () => {
    setDiscoverClicked(true);
    setBooksCount(booksCount + 5);
  };

  const handleSeeLess = () => {
    setDiscoverClicked(false);
    setBooksCount(5);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='mb-10'>
          <div className='py-5 flex flex-row justify-center items-center text-lg'>
            <button
              className={`m-3 py-1 px-3  ${category === genericSubject
                ? 'border-b-2 border-black'
                : 'border-b-2 border-transparent'
                } hover:border-b-2 hover:border-black`}
              onClick={() => setCategory(genericSubject)}
            >
              General
            </button>
            <button
              className={`m-3 py-1 px-3 ${category === 'science'
                ? 'border-b-2 border-black'
                : 'border-b-2 border-transparent'
                } hover:border-b-2 hover:border-black`}
              onClick={() => setCategory('science')}
            >
              Science
            </button>
            <button
              className={`m-3 py-1 px-3 ${category === 'crime'
                ? 'border-b-2 border-black'
                : 'border-b-2 border-transparent'
                } hover:border-b-2 hover:border-black`}
              onClick={() => setCategory('crime')}
            >
              Crime
            </button>
            <button
              className={`m-3 py-1 px-3 ${category === 'selfhelp'
                ? 'border-b-2 border-black'
                : 'border-b-2 border-transparent'
                } hover:border-b-2 hover:border-black`}
              onClick={() => setCategory('selfhelp')}
            >
              Self-help
            </button>
            <button
              className={`m-3 py-1 px-3 ${category === 'poetry&subject:drama'
                ? 'border-b-2 border-black'
                : 'border-b-2 border-transparent'
                } hover:border-b-2 hover:border-black`}
              onClick={() => setCategory('poetry&subject:drama')}
            >
              Poetry and Drama
            </button>
          </div>

          <div className='flex flex-col mx-16'>
            <section className='grid grid-cols-5 gap-x-5 gap-y-8 auto-rows-auto'>
              {books &&
                topBooks.map(book => {
                  return (
                    <Link
                      key={book.key}
                      to={`/books${book.key}`}
                      className='min-h-max pb-2 px-1 flex-shrink-0 rounded-br-lg shadow-slate-400 shadow-sm  border-2 border-slate-300 hover:border-slate-700'
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
            <div className='mt-12  flex justify-center'>
              <button
                className='w-40 p-2 mx-2 rounded-2xl  shadow-slate-400 shadow-sm border-2 text-white border-lime-700 bg-lime-700 hover:bg-lime-600 hover:border-lime-600 text-xl'
                onClick={handleDiscoverMore}
              >
                Discover More
              </button>
              {discoverClicked && (
                <button
                  className='w-40 p-2 mx-2 rounded-2xl  shadow-slate-400 shadow-sm border-2 text-white border-lime-700 bg-lime-700 hover:bg-lime-600 hover:border-lime-600 text-xl'
                  onClick={handleSeeLess}
                >
                  See Less
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BooksPage;
