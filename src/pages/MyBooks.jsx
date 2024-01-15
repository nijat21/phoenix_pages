import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app';
const USERID = 1;

function MyBooks() {
  const [myListOfBooks, setMyListOfBooks] = useState(null);
  const [loading, setLoading] = useState(true);

  const getList = async v => {
    if ((v = 1)) {
      const response = await axios.get(
        `${API_URL}/users/${USERID}?_embed=books_to_read`
      );

      setMyListOfBooks(response.data.books_to_read);
    } else if ((v = 2)) {
      const response = await axios.get(
        `${API_URL}/users/${USERID}?_embed=books_already_read`
      );

      setMyListOfBooks(response.data.books_already_read);
    }
  };

  return (
    <div className='pt-14'>
      <h2>Which List do you want to see?</h2>

      <button onClick={() => getList(1)}>Want to Read</button>

      <button onClick={() => getList(2)}>Already Read</button>

      {myListOfBooks &&
        myListOfBooks.map(book => {
          return (
            <>
              <Link key={book.bookKey} to={`/books/works/${book.bookKey}`}>
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
    </div>
  );
}

export default MyBooks;
