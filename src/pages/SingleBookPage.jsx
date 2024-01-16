import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const API_URL = 'https://server-phoenix-pages.adaptable.app';
const USERID = 1;
const userId = 1;

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

  const wantToRead = async () => {
    const requestBook = { bookKey, userId };

    const response = await axios.get(
      `${API_URL}/users/${USERID}?_embed=books_to_read`
    );

    const bookCheck = response.data.books_to_read.find(
      book => book.bookKey === bookKey
    );

    if (bookCheck) {
      console.log('This book is already on the list');
    } else {
      await axios.post(`${API_URL}/books_to_read`, requestBook);
    }
  };

  const alreadyRead = async () => {
    const requestBook = { bookKey, userId };

    const response = await axios.get(
      `${API_URL}/users/${USERID}?_embed=books_already_read`
    );

    const bookCheck = response.data.books_already_read.find(
      book => book.bookKey === bookKey
    );

    if (bookCheck) {
      console.log('This book is already on the list');
    } else {
      await axios.post(`${API_URL}/books_already_read`, requestBook);
    }
  };

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
              <h2 className='mb-10'>
                <strong>{book.title}</strong>
              </h2>
              <p>
                {typeof book.description === 'object'
                  ? book.description.value
                  : book.description}
              </p>

              <p className='mt-5'>
                <Link to={`${author.key}`}>{`Author: ${author.name}`}</Link>
              </p>
              <div className='my-4 flex flex-col'>
                {/* <button className='mt-4 border-solid border-2 border-amber-800 hover:bg-amber-800 text-l'>
                  <select name="" id="">
                    <option value="">Want to Read</option>
                    <option value="">Already Read</option>
                  </select>
                </button> */}
                <button onClick={() => wantToRead()}>
                  Add to "Want to Read List"
                </button>
                <button onClick={() => alreadyRead()}>
                  Add to "Already Read List"
                </button>
                <button className='mt-4 border-solid border-2 border-amber-800 hover:bg-amber-800 text-l'>
                  Go Back
                </button>
              </div>
            </section>
          )}
        </div>
      }
    </div>
  );
}

export default SingleBookPage;
