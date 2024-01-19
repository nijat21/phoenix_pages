import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function SingleBookPage() {
  const { bookKey } = useParams();
  const { USERID, setUSERID } = useContext(UserContext);

  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [alreadyReadCheck, setAlreadyReadCheck] = useState(false);
  const [wantToReadCheck, setWantToReadCheck] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const initializeListButtons = async () => {
      const responseToRead = await axios.get(
        `${API_URL}/users/${USERID}?_embed=books_to_read`
      );
      const responseAlreadyRead = await axios.get(
        `${API_URL}/users/${USERID}?_embed=books_already_read`
      );

      const bookCheckToRead = responseToRead.data.books_to_read.find(
        book => book.bookKey === bookKey
      );
      const bookCheckAlreadyRead =
        responseAlreadyRead.data.books_already_read.find(
          book => book.bookKey === bookKey
        );

      if (bookCheckToRead) {
        setWantToReadCheck(true);
      }
      if (bookCheckAlreadyRead) {
        setAlreadyReadCheck(true);
      }
    };

    if (book) {
      initializeListButtons();
    }
  }, [book]);

  // when this function is called, it will add the given book to the Want To Read List

  const wantToRead = async () => {
    const requestBook = { bookKey, userId: USERID };

    const responseToRead = await axios.get(
      `${API_URL}/users/${USERID}?_embed=books_to_read`
    );

    const responseAlreadyRead = await axios.get(
      `${API_URL}/users/${USERID}?_embed=books_already_read`
    );

    const bookCheckToRead = responseToRead.data.books_to_read.find(
      book => book.bookKey === bookKey
    );
    const bookCheckAlreadyRead =
      responseAlreadyRead.data.books_already_read.find(
        book => book.bookKey === bookKey
      );

    console.log(bookCheckAlreadyRead);

    if (bookCheckToRead) {
      console.log('This book is already on the list');
    } else {
      await axios.post(`${API_URL}/books_to_read`, requestBook);
      setWantToReadCheck(true);

      if (bookCheckAlreadyRead) {
        await axios.delete(
          `${API_URL}/books_already_read/${bookCheckAlreadyRead.id}`
        );
        setAlreadyReadCheck(false);
      }
    }
  };

  // when this function is called, it will add the given book to the Already Read List

  const alreadyRead = async () => {
    const requestBook = { bookKey, userId: USERID };

    const responseToRead = await axios.get(
      `${API_URL}/users/${USERID}?_embed=books_to_read`
    );

    const responseAlreadyRead = await axios.get(
      `${API_URL}/users/${USERID}?_embed=books_already_read`
    );

    const bookCheckToRead = responseToRead.data.books_to_read.find(
      book => book.bookKey === bookKey
    );
    const bookCheckAlreadyRead =
      responseAlreadyRead.data.books_already_read.find(
        book => book.bookKey === bookKey
      );

    if (bookCheckAlreadyRead) {
      console.log('This book is already on the list');
    } else {
      await axios.post(`${API_URL}/books_already_read`, requestBook);
      setAlreadyReadCheck(true);
      if (bookCheckToRead) {
        await axios.delete(`${API_URL}/books_to_read/${bookCheckToRead.id}`);
        setWantToReadCheck(false);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {
        <div className='pt-3'>
          {/* only return books with cover and author information */}
          {book && book.covers[0] && author && (
            <section className='flex  justify-items-center m-10 items-center border-solid border-2 border-amber-800'>
              <figure className='w-1/3  flex justify-center'>
                {!imageLoaded && (
                  <img
                    src='src/assets/coverLoading1.webp'
                    alt='loading'
                    className='text-center object-contain w-85 mb-5'
                  />
                )}
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                  alt='cover'
                  className='text-center object-contain w-85 mb-5'
                  onLoad={() => setImageLoaded(true)}
                />
              </figure>
              <div className='w-1/2 flex flex-col justify-start  border-solid border-2 border-amber-800'>
                <div className='mb-30 '>
                  <h1 className='mb-1'>
                    <strong className='text-2xl'>{book.title}</strong>
                  </h1>
                  <p className='mt-1 mb-11 '>
                    <Link
                      to={`${author.key}`}
                      className='hover:border-b hover:border-neutral-800'
                    >{`${author.name}`}</Link>
                  </p>
                  <p className='mb-20 border-solid border-2 border-amber-800'>
                    {typeof book.description === 'object'
                      ? book.description.value
                      : book.description}
                  </p>
                </div>

                <div className='my-2 self-end flex flex-col border-solid border-2 border-amber-800'>
                  {USERID && (
                    <div className='flex justify-evenly'>
                      {!wantToReadCheck ? (
                        <button
                          onClick={() => wantToRead()}
                          className='px-4 mx-2 border-solid border-2 border-amber-800 hover:bg-gray-500'
                        >
                          Want to Read
                        </button>
                      ) : (
                        <button className='px-4 mx-2 border-solid border-2 border-gray-300'>
                          Want to Read
                        </button>
                      )}
                      {!alreadyReadCheck ? (
                        <button
                          onClick={() => alreadyRead()}
                          className='px-4 mx-2 border-solid border-2 border-amber-800 hover:bg-gray-500'
                        >
                          Already Read
                        </button>
                      ) : (
                        <button className='px-4 mx-2 border-solid border-2 border-gray-300'>
                          Already Read
                        </button>
                      )}
                    </div>
                  )}
                  <button
                    className='mt-4 border-solid border-2 border-amber-800 hover:bg-amber-800 text-l'
                    onClick={handleGoBack}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      }
    </div>
  );
}

export default SingleBookPage;
