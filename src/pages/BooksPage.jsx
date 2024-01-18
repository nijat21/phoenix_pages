import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import Loader from '../components/Loader';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [category, setCategory] = useState(null)
  // const [newEdition, setNewEdition] = useState(null);

  const getBooksByCategory = async subj => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?subject=${subj}&limit=50`
      );
      setBooks(response.data.docs);
      // setCategory(subj);
    } catch (error) {
      console.log(error);
    }
  };

  // Subject query that will look for top a generic list of top 5 books
  const genericSubject = '*';

  // Books for the page is opened
  useEffect(() => {
    setLoading(true);
    getBooksByCategory(genericSubject).then(() => {
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
          <div className='pt-14 ml-10 w-25 flex flex-row justify-center text-lg'>
            <button
              className='m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black'
              onClick={() => getBooksByCategory(genericSubject)}
            >
              General
            </button>
            <button
              className='m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black'
              onClick={() => {
                getBooksByCategory('science');
              }}
            >
              Science
            </button>
            <button
              className='m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black'
              onClick={() => getBooksByCategory('crime')}
            >
              Crime
            </button>
            <button
              className='m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black'
              onClick={() => getBooksByCategory('selfhelp')}
            >
              Self-help
            </button>
            <button
              className='m-3 pt-1 pb-1 pr-3 pl-3 border-b-2 border-transparent hover:border-b-2 hover:border-black'
              onClick={() => getBooksByCategory('poetry&subject:drama')}
            >
              Poetry and Drama
            </button>
          </div>

          <div className='flex flex-col'>
            <section className='grid grid-cols-5'>
              {books &&
                topFive.map(book => {
                  return (
                    <>
                      <Link key={book.key} to={`/books${book.key}`}>
                        <div className='flex flex-col text-center items-center mt-16'>
                          {book && book.cover_i && (
                            <>
                              <div className='h-64 flex justify-center items-center'>
                                <img
                                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                  alt='cover'
                                  className='text-center object-cover h-60 w-26 '
                                />
                              </div>
                              <div className='h-24 mw-44'>
                                <div className='mh-12 flex justify-center items-center'>
                                  <h2>
                                    <strong>{book.title}</strong> (
                                    {book.first_publish_year})
                                  </h2>
                                </div>
                                <div className='mh-10 flex justify-center items-center'>
                                  <h4>{book.author_name[0]}</h4>
                                </div>
                                <div className='mh-6 flex justify-center items-center'>
                                  <div className='flex'>
                                    <RatingDisplay
                                      rating={book.ratings_average.toFixed(1)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </Link>
                    </>
                  );
                })}
            </section>
            <div className='mt-12 flex justify-center'>
              <button className='border-solid border-2 border-amber-800 p-3 ml-4 hover:bg-amber-800 text-xl'>
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
