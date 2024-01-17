import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import RatingDisplay from '../components/RatingDisplay';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function MyBooks() {
  const [myListOfBooks, setMyListOfBooks] = useState(null);
  const [additionalBookInfo, setAdditionalBookInfo] = useState([]);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  const { USERID, setUSERID } = useContext(UserContext);

  const getList = async v => {
    try {
      if (v === 1) {
        const response = await axios.get(
          `${API_URL}/users/${USERID}?_embed=books_to_read`
        );

        setList(1);
        setMyListOfBooks(response.data.books_to_read);
      } else if (v === 2) {
        const response = await axios.get(
          `${API_URL}/users/${USERID}?_embed=books_already_read`
        );

        setList(2);
        setMyListOfBooks(response.data.books_already_read);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBooksByKey = async (bookKey, id) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/works/${bookKey}.json`
      );
      console.log(response);
      response.data.id = id;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorByKey = async authorKey => {
    try {
      const response = await axios.get(
        `https://openlibrary.org${authorKey}.json`
      );
      return response.data.name;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        const promises = myListOfBooks.map(async book => {
          const info = await getBooksByKey(book.bookKey, book.id);

          return info;
        });
        console.log(promises);

        const promisesArray = await Promise.all(promises);
        setAdditionalBookInfo(promisesArray);
        console.log(additionalBookInfo);
      } catch (error) {
        console.error('Error fetching additional book info:', error);
      }
    };

    if (myListOfBooks) {
      fetchAdditionalInfo();
    }
  }, [myListOfBooks]);

  //delete function is working
  const removeFromList = async id => {
    if (list === 1) {
      await axios.delete(`${API_URL}/books_to_read/${id}`);
      getList(1);
    } else if (list === 2) {
      await axios.delete(`${API_URL}/books_already_read/${id}`);
      getList(2);
    }
  };

  return (
    <div className='pt-14 flex flex-col text-center items-center'>
      <h2>Which List do you want to see?</h2>

      <section>
        <button
          onClick={() => getList(1)}
          className='px-4 mx-2 border-solid border-2 border-gray-300 hover:bg-gray-500'
        >
          Want to Read
        </button>

        <button
          onClick={() => getList(2)}
          className='px-4 mx-2 border-solid border-2 border-gray-300 hover:bg-gray-500'
        >
          Already Read
        </button>
      </section>

      {additionalBookInfo &&
        additionalBookInfo.map(book => {
          return (
            book && (
              <div className='flex flex-col text-center items-center mt-16'>
                <Link key={book.key} to={`/books${book.key}`}>
                  <div className='flex flex-col text-center items-center mt-16'>
                    {book && book.covers && (
                      <>
                        <div className='h-64 flex justify-center items-center'>
                          <img
                            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                            alt='cover'
                            className='text-center object-cover h-60 w-26 '
                          />
                        </div>
                        <div className='h-24 mw-44'>
                          <div className='mh-12 flex justify-center items-center'>
                            <h2>
                              <strong>{book.title}</strong>
                              {/* (
                              {book.first_publish_year}) */}
                            </h2>
                          </div>
                          <div className='mh-10 flex justify-center items-center'>
                            {/* <h4>{getAuthorByKey(book.authors[0].author.key)}</h4> */}
                          </div>
                          <div className='mh-6 flex justify-center items-center'>
                            <div className='flex'>
                              {/* <RatingDisplay
                              rating={book.ratings_average.toFixed(1)}
                            /> */}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Link>
                <button
                  onClick={() => removeFromList(book.id)}
                  className='px-4 mx-2 border-solid border-2 border-gray-300 hover:bg-gray-500'
                >
                  Remove
                </button>
              </div>
            )
          );
        })}
    </div>
  );
}

export default MyBooks;
