import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BooksPage() {
  const [books, setBooks] = useState([]);
  // const [newEdition, setNewEdition] = useState(null);

  useEffect(() => {
    axios
      .get('https://openlibrary.org/search.json?q=title:sapiens') //this returns a promise with romance books
      .then(response => {
        console.log(response.data);
        setBooks(response.data.docs);
      });
  }, []);

  const books_ten = books.slice(0, 10);

  return (
    <div>
      <h1>Romance</h1>

      <section className='grid grid-cols-4'>
        {books &&
          books.map(book => {
            return (
              <Link to={`/${book.key}`}>
                <div key={book.key} className='flex flex-col items-center mb-7'>
                  <h2 className='text-center'>{book.title}</h2>
                  {book && (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt='cover'
                      className='text-center'
                    />
                  )}
                  <h4 className='text-center'>Author(s): {book.author_name}</h4>
                  <p className='text-center'>Year: {book.first_publish_year}</p>
                  <p className='text-center'>Rating: {book.ratings_average}</p>
                </div>
              </Link>
            );
          })}
      </section>
    </div>
  );
}

export default BooksPage;
