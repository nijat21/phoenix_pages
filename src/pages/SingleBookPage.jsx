import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

function SingleBookPage() {
  const { bookKey } = useParams();

  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);

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

  useEffect(() => {
    if (book && book.authors) {
      axios
        .get(`https://openlibrary.org${book.authors[0].author.key}.json`)
        .then(response => {
          setAuthor(response.data);
        })
        .catch(error => {
          console.error('Error fetching author:', error);
        });
    }
  }, [book]);

  return (
    <div>
      {
        <div className='pt-14'>
          {/* only return books with cover and author information */}
          {book && book.covers[0] && author && (
            <section className='flex flex-col justify-items-center m-10 items-center border-solid border-2 border-amber-800'>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                alt='cover'
                className='text-center object-contain w-85 mb-5'
              />
              <h2 className='mb-10'><strong>{book.title}</strong></h2>
              <p>
                {typeof book.description === 'object'
                  ? book.description.value
                  : book.description}
              </p>

              <p className='mt-5'>
                <Link to={`${author.key}`}>{`Author: ${author.name}`}</Link>
              </p>
              <div className='my-10'>
                <select name="" id="">
                  <option value="">Want to Read</option>
                  <option value="">Already Read</option>
                </select>
              </div>
            </section>
          )}
        </div>
      }
    </div>
  );
}

export default SingleBookPage;
