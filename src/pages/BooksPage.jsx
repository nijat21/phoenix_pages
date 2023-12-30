import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import StarRating from 'react-simple-star-rating';

function BooksPage() {
  const [books, setBooks] = useState([]);
  // const [newEdition, setNewEdition] = useState(null);

  useEffect(() => {
    axios
      .get('https://openlibrary.org/search.json?q=subject:science&limit=1000') //this returns a promise with romance books
      .then(response => {
        console.log(response.data);
        setBooks(response.data.docs);
      });
  }, []);

  const topFive = books.sort((a, b) => b.ratings_average - a.ratings_average).slice(0, 5);
  const books_ten = books.slice(0, 10);

  return (
    <div className=''>
      <div className='flex flex-row'>
        <ul>
          <li>All</li>
          <li>Science</li>
          <li>Literature</li>
          <li>Self-help</li>
          <li>Poetry and Drama</li>
        </ul>
      </div>

      <section className='grid grid-cols-5'>
        {books &&
          topFive.map(book => {
            return (
              <>
                <Link to={`/${book.key}`}>
                  <div key={book.key} className='flex flex-col text-center items-center mt-16'>
                    {book && (
                      <>
                        <div className='h-64 flex justify-center items-center'>
                          <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                            alt='cover'
                            className='text-center object-cover h-60 w-26 '
                          />
                        </div>
                        <div className='h-24 w-36 mt-4'>
                          <h2><strong>{book.title}</strong> ({book.first_publish_year})</h2>
                          <h4>{book.author_name}</h4>
                          <div className='flex'>
                            <Rating initialValue={book.ratings_average.toFixed(1)} />
                            <StarRating ratingValue={book.ratings_average.toFixed(1)} readOnly />
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
    </div>
  );
}

export default BooksPage;
