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
  const { category, setCategory } = useContext(UserContext);

  const getBooksByCategory = async subj => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?subject=${subj}&limit=50`
      );
      setBooks(response.data.docs);
      setCategory(subj);
      // Saving category locally
      localStorage.setItem('selectedCategory', subj);
    } catch (error) {
      console.log(error);
    }
  };

  // Subject query that will look for top a generic list of top 5 books
  const genericSubject = '*';

  // Books for the page is opened
  useEffect(() => {
    setLoading(true);
    // if there is a selected category, initialCategory gets it's value, if not, it gets genericSubject
    const selectedCategory = localStorage.getItem('selectedCategory');
    const initialCategory = selectedCategory || genericSubject;
    getBooksByCategory(initialCategory).then(() => {
      setLoading(false);
    });
  }, []);

  // Book rating algorithm
  const getTopFive = input => {
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
    return five.slice(0, 5);
  };
  const topFive = getTopFive(books);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='pt-5 mb-5 ml-10 w-25 flex flex-row justify-center text-lg'>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${
                category === genericSubject && ' border-black'
              }`}
              onClick={() => getBooksByCategory(genericSubject)}
            >
              General
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${
                category === 'science' && 'border-b-2 border-black'
              }`}
              onClick={() => {
                getBooksByCategory('science');
              }}
            >
              Science
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${
                category === 'crime' && 'border-b-2 border-black'
              }`}
              onClick={() => getBooksByCategory('crime')}
            >
              Crime
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${
                category === 'selfhelp' && 'border-b-2 border-black'
              }`}
              onClick={() => getBooksByCategory('selfhelp')}
            >
              Self-help
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${
                category === 'poetry&subject:drama' && 'border-b-2 border-black'
              }`}
              onClick={() => getBooksByCategory('poetry&subject:drama')}
            >
              Poetry and Drama
            </button>
          </div>

          <div className='flex flex-col mr-5 ml-5'>
            <section className='grid grid-cols-5 gap-5 auto-rows-auto'>
              {books &&
                topFive.map(book => {
                  return (
                    <Link
                      key={book.key}
                      to={`/books${book.key}`}
                      className='min-h-max flex-shrink-0 rounded-br-lg shadow-slate-400 shadow-sm  border-2 border-slate-300 hover:border-slate-700'
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
              <button className='mt-4 p-4 rounded-2xl  shadow-slate-400 shadow-sm border-2 text-white border-lime-700 bg-lime-700 hover:bg-lime-600 hover:border-lime-600 text-xl'>
                <Link to={'/books'}>Discover more</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BooksPage;
