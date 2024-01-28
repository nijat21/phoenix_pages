import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import RatingDisplay from '../components/RatingDisplay';
import Loader from '../components/Loader';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function MyBooks() {
  const [myListOfBooks, setMyListOfBooks] = useState(null);
  const [additionalBookInfo, setAdditionalBookInfo] = useState([]);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const { USERID, setUSERID } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [length, setLength] = useState(50);
  const navigate = useNavigate();

  const showTitle = titleLength => {
    setShow(!show);
    if (show) {
      setLength(titleLength);
    } else {
      setLength(50);
    }
  };

  const getList = async v => {
    try {
      if (v === 1) {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/users/${USERID}?_embed=books_to_read`
        );
        setLoading(false);
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
      navigate('/server-error');
      console.log(error);
    }
  };

  const getBooksByKey = async (bookKey, id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://openlibrary.org/works/${bookKey}.json`
      );
      // console.log(response);
      setLoading(false);
      response.data.id = id;
      return response.data;
    } catch (error) {
      navigate('/server-error');
      console.log(error);
    }
  };

  // const getAuthorByKey = async authorKey => {
  //   try {
  //     const response = await axios.get(
  //       `https://openlibrary.org${authorKey}.json`
  //     );
  //     return response.data.name;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getList(1);
  }, [USERID]);

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        setLoading(true);
        const promises = myListOfBooks.map(async book => {
          const info = await getBooksByKey(book.bookKey, book.id);

          return info;
        });
        // console.log(promises);

        const promisesArray = await Promise.all(promises);
        setAdditionalBookInfo(promisesArray);
        setLoading(false);
        // console.log(additionalBookInfo);
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

  const addToAlreadyRead = async (key, id) => {
    const newKey = key.slice(7);
    const requestBook = { bookKey: newKey, userId: USERID };
    await axios.post(`${API_URL}/books_already_read`, requestBook);
    await axios.delete(`${API_URL}/books_to_read/${id}`);
    getList(1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='py-5 flex flex-col text-center'>
          <section>
            <button
              onClick={() => getList(1)}
              className={`m-3 py-1 px-3 ${list === 1
                ? 'border-b-2 border-black'
                : 'border-b-2 border-transparent'
                } hover:border-b-2 hover:border-black`}
            >
              Want to Read
            </button>

            <button
              onClick={() => getList(2)}
              className={`m-3 py-1 px-3 ${list === 2
                ? 'border-b-2 border-black'
                : 'border-b-2 border-transparent'
                } hover:border-b-2 hover:border-black`}
            >
              Already Read
            </button>
          </section>

          <section className='flex overflow-x-scroll h-auto gap-5 mx-20 my-10 py-8 border-b-2 border-t-2 border-amber-800 '>
            {additionalBookInfo &&
              additionalBookInfo.map(book => {
                return (
                  book && (
                    <Link
                      key={book.key}
                      to={`/books${book.key}`}
                      className='min-h-max w-1/5 pb-2 px-3 flex-shrink-0 rounded-br-lg shadow-slate-400 shadow-sm  border-2 border-slate-300 hover:border-slate-700'
                    >
                      <div className='flex flex-col h-auto text-center items-center'>
                        {book && book.covers && (
                          <>
                            <div className='h-64 flex justify-center items-center'>
                              <img
                                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
                                alt='cover'
                                className='text-center object-cover h-60 w-26 rounded-tr-lg rounded-br-lg shadow-slate-400 shadow-sm w-40 '
                              />
                            </div>
                            <div className='h-24 mw-44'>
                              <div className=' flex justify-center items-center'>
                                <h2>
                                  <strong className='max-w-xs'>
                                    {book.title.slice(0, length)}
                                  </strong>{' '}
                                  {book.title.length > 50 && (
                                    <button
                                      className='ml-1 font-thin text-gray-400 hover:bg-slate-200 hover:px-1'
                                      onClick={e => {
                                        e.stopPropagation();
                                        showTitle(book.title.length);
                                        e.preventDefault();
                                      }}
                                    >
                                      {show ? 'more' : 'less'}
                                    </button>
                                  )}
                                </h2>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className='flex justify-center text-sm'>
                        {list === 1 && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              addToAlreadyRead(book.key, book.id);
                              e.preventDefault();
                            }}
                            className='w-1/2 px-2 py-1 mx-2 mb-2 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700'
                          >
                            Already Read
                          </button>
                        )}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            removeFromList(book.id);
                            e.preventDefault();
                          }}
                          className='w-1/2 px-2 py-1 mx-1 mb-2 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700'
                        >
                          Remove
                        </button>
                      </div>
                    </Link>
                  )
                );
              })}
          </section>
          <div className='my-2 mr-20 self-end flex flex-col '>
            <button
              className=' p-2 rounded-2xl border-2 text-white border-lime-700 text-l bg-lime-700 hover:bg-lime-600 hover:border-lime-600'
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MyBooks;
