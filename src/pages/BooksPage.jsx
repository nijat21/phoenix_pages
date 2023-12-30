import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';

function BooksPage() {
  const [books, setBooks] = useState([]);
  // const [newEdition, setNewEdition] = useState(null);

  const getBooksByCategory = async subj => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=subject:${subj}&limit=50`
      );

      setBooks(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // axios
    //   .get('https://openlibrary.org/search.json?q=subject:drama&limit=50') //this returns a promise with books
    //   .then(response => {
    //     console.log(response.data);
    //     setBooks(response.data.docs);
    //   });
    getBooksByCategory('drama');
  }, []);

  // select the top5 books according to their ratings

  const topFive = books
    ? books.sort((a, b) => b.ratings_average - a.ratings_average).slice(0, 5)
    : [];
  // const books_ten = books.slice(0, 10);

  return (
    <>
      <div className='pt-14 ml-10 w-25 flex flex-row'>
        <button className='m-3 border-solid border-2 border-amber-800 rounded-lg pt-1 pb-1 pr-3 pl-3 hover:bg-amber-800 hover:text-white'>
          All
        </button>
        <button
          className='m-3 border-solid border-2 border-amber-800 rounded-lg pt-1 pb-1 pr-3 pl-3 hover:bg-amber-800  hover:text-white'
          onClick={() => getBooksByCategory('science')}
        >
          Science
        </button>
        <button
          className='m-3 border-solid border-2 border-amber-800 rounded-lg pt-1 pb-1 pr-3 pl-3 hover:bg-amber-800  hover:text-white'
          onClick={() => getBooksByCategory('crime')}
        >
          Crime
        </button>
        <button
          className='m-3 border-solid border-2 border-amber-800 rounded-lg pt-1 pb-1 pr-3 pl-3 hover:bg-amber-800  hover:text-white'
          onClick={() => getBooksByCategory('selfhelp')}
        >
          Self-help
        </button>
        <button className='m-3 border-solid border-2 border-amber-800 rounded-lg pt-1 pb-1 pr-3 pl-3 hover:bg-amber-800  hover:text-white'>
          Poetry and Drama
        </button>
      </div>

      <section className='grid grid-cols-5'>
        {books &&
          topFive.map(book => {
            return (
              <>
                <Link key={book.key} to={`/${book.key}`}>
                  <div className='flex flex-col text-center items-center mt-16'>
                    {book && (
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
                            <h4>{book.author_name}</h4>
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
    </>
  );
}

export default BooksPage;
