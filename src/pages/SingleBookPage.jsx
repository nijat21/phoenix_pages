import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBookPage() {
  const { bookKey } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`https://openlibrary.org/works/${bookKey}.json`) //this returns a promise
      .then(response => {
        console.log(response.data);
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
      });
  }, []);

  return (
    <div className='pt-14'>
      {book && (
        <section className='flex flex-col justify-items-center m-10 items-center border-solid border-2 border-amber-800'>
          <img
            src={`https://covers.openlibrary.org/b/id/${book.covers}-L.jpg`}
            alt='cover'
            className='text-center object-contain w-85 mb-5'
          />
          <h1 className='mb-10'>{book.title}</h1>
          <p>
            {typeof book.description === 'object'
              ? book.description.value
              : book.description}
          </p>
        </section>
      )}
    </div>
  );
}

export default SingleBookPage;
