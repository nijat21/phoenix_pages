import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import Loader from '../components/Loader';
import BookCard from './BookCard';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [category, setCategory] = useState('')

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
      : // .slice(0, 5)
      [];
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
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${category === genericSubject && "bg-yellow-100 border-black"}`}
              onClick={() => getBooksByCategory(genericSubject)}
            >
              General
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${category === 'science' && "bg-yellow-100 border-black"}`}
              onClick={() => {
                getBooksByCategory('science');
              }}
            >
              Science
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${category === 'crime' && "bg-yellow-100 border-black"}`}
              onClick={() => getBooksByCategory('crime')}
            >
              Crime
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${category === 'selfhelp' && "bg-yellow-100 border-black"}`}
              onClick={() => getBooksByCategory('selfhelp')}
            >
              Self-help
            </button>
            <button
              className={`m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black ${category === 'poetry&subject:drama' && "bg-yellow-100 border-black"}`}
              onClick={() => getBooksByCategory('poetry&subject:drama')}
            >
              Poetry and Drama
            </button>
          </div>

          <div className='flex flex-col mr-5 ml-5'>
            <section className='grid grid-cols-5 gap-5'>
              {books &&
                topFive.map(book => {
                  return (
                    <div key={book.key}>
                      <BookCard book={book} setImageLoaded={setImageLoaded} imageLoaded={imageLoaded} />
                    </div>
                  )
                })}
            </section>
            <div className='mt-12 flex justify-center'>
              <button className='border-solid border-2 border-amber-800 p-3 ml-4 hover:bg-amber-800 hover:text-white text-xl'>
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
