import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import LoaderFull from '../components/LoaderFull';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function SingleBookPage() {
  const { bookKey } = useParams();
  const { user, loading, setLoading } = useContext(UserContext);

  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [alreadyReadCheck, setAlreadyReadCheck] = useState(false);
  const [wantToReadCheck, setWantToReadCheck] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [descLength, setDescLength] = useState(850);
  const [descShow, setDescShow] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`https://openlibrary.org/works/${bookKey}.json`) //this returns a promise
      .then(response => {
        // console.log(response.data);
        setLoading(false);
        setBook(response.data);
      })
      .catch(error => {
        navigate('/server-error');
        console.error('Error fetching book:', error);
      });
  }, []);


  useEffect(() => {
    if (book && book.authors) {
      setLoading(true);
      axios
        .get(`https://openlibrary.org${book.authors[0].author.key}.json`)
        .then(response => {
          setLoading(false);
          setAuthor(response.data);
        })
        .catch(error => {
          navigate('/server-error');
          console.error('Error fetching author:', error);
        });
    }
  }, [book]);

  // Checks books and updates buttons' look
  useEffect(() => {
    const initializeListButtons = async () => {
      const responseToRead = await axios.get(
        `${API_URL}/users/${user._id}?_embed=books_to_read`
      );
      console.log("Books to read", responseToRead);
      const responseAlreadyRead = await axios.get(
        `${API_URL}/users/${user._id}?_embed=books_already_read`
      );

      if (user._id) {
        const bookCheckToRead = await responseToRead.data.books_to_read.find(
          book => book.bookKey === bookKey
        );
        const bookCheckAlreadyRead =
          await responseAlreadyRead.data.books_already_read.find(
            book => book.bookKey === bookKey
          );

        if (bookCheckToRead) {
          setWantToReadCheck(true);
        }
        if (bookCheckAlreadyRead) {
          setAlreadyReadCheck(true);
        }
      }
    };

    if (book) {
      initializeListButtons();
    }
  }, [book]);


  // when this function is called, it will add the given book to the Want To Read List
  const wantToRead = async () => {
    const requestBook = { bookKey, userId: user._id };

    const responseToRead = await axios.get(
      `${API_URL}/users/${user._id}?_embed=books_to_read`
    );

    const responseAlreadyRead = await axios.get(
      `${API_URL}/users/${user._id}?_embed=books_already_read`
    );

    const bookCheckToRead = responseToRead.data.books_to_read.find(
      book => book.bookKey === bookKey
    );
    const bookCheckAlreadyRead =
      responseAlreadyRead.data.books_already_read.find(
        book => book.bookKey === bookKey
      );

    // console.log(bookCheckAlreadyRead);

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
    const requestBook = { bookKey, userId: user._id };

    const responseToRead = await axios.get(
      `${API_URL}/users/${user._id}?_embed=books_to_read`
    );

    const responseAlreadyRead = await axios.get(
      `${API_URL}/users/${user._id}?_embed=books_already_read`
    );

    const bookCheckToRead = responseToRead.data.books_to_read.find(
      book => book.bookKey === bookKey
    );
    const bookCheckAlreadyRead =
      responseAlreadyRead.data.books_already_read.find(
        book => book.bookKey === bookKey
      );

    if (bookCheckAlreadyRead) {
      // console.log('This book is already on the list');
    } else {
      await axios.post(`${API_URL}/books_already_read`, requestBook);
      setAlreadyReadCheck(true);
      if (bookCheckToRead) {
        await axios.delete(`${API_URL}/books_to_read/${bookCheckToRead.id}`);
        setWantToReadCheck(false);
      }
    }
  };

  const removeText = text => {
    const indexOfSeparationOne = text.indexOf('---');
    const indexOfSeparationTwo = text.indexOf('([');

    if (indexOfSeparationTwo !== -1) {
      const modifiedText = text.slice(0, indexOfSeparationTwo);
      return modifiedText;
    } else if (indexOfSeparationOne !== -1) {
      const modifiedText = text.slice(0, indexOfSeparationOne);
      return modifiedText;
    } else {
      return text;
    }
  };

  const showDesc = descLength => {
    setDescShow(!descShow);
    if (descShow) {
      setDescLength(descLength);
    } else {
      setDescLength(850);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {loading ? (
        <LoaderFull />
      ) : (
        <m.div className='pt-3' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}>
          {/* only return books with cover and author information */}
          {book && book.covers[0] && author && (
            <section className='flex  justify-items-center m-10 items-center '>
              <figure className='w-1/5 ml-10 flex flex-col justify-center'>
                {!imageLoaded && (
                  <img
                    src='/public/coverLoading1.webp'
                    alt='cover'
                    className='object-contain w-85 mb-10'
                  />
                )}
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                  alt=''
                  className='w-85 text-center object-contain mb-10 rounded-tr-xl rounded-br-xl shadow-slate-700 shadow-2xl'
                  onLoad={() => setImageLoaded(true)}
                />
                {user._id && (
                  <div className='flex justify-evenly flex-col '>
                    {!wantToReadCheck ? (
                      <button
                        onClick={() => wantToRead()}
                        className='px-4 py-1 mx-2 mb-5 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700
                        shadow-md shadow-slate-400 dark:shadow-neutral-900'
                      >
                        Want to Read
                      </button>
                    ) : (
                      <div className='px-4 py-1 mx-2 mb-5 text-center rounded-2xl border-solid border-2 border-amber-800'>
                        Want to Read
                      </div>
                    )}
                    {!alreadyReadCheck ? (
                      <button
                        onClick={() => alreadyRead()}
                        className='px-4 py-1 mx-2 rounded-2xl border-solid bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700
                        shadow-md shadow-slate-400 dark:shadow-neutral-900'
                      >
                        Already Read
                      </button>
                    ) : (
                      <div className='px-4 py-1 mx-2 text-center rounded-2xl border-solid border-2 border-amber-800'>
                        Already Read
                      </div>
                    )}
                  </div>
                )}
              </figure>
              <div className='w-1/2 ml-20 flex flex-col justify-start  '>
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
                  {book.description ? (
                    <p className='mb-20 pb-3 border-b-2 border-amber-800'>
                      {typeof book.description === 'object'
                        ? removeText(
                          book.description.value.slice(0, descLength)
                        )
                        : removeText(book.description.slice(0, descLength))}

                      {((typeof book.description !== 'object' &&
                        book.description.length > 850) ||
                        (typeof book.description === 'object' &&
                          book.description.value.length > 850)) && (
                          <button
                            className='ml-1 font-thin text-gray-400 rounded-lg hover:bg-slate-200 hover:px-1'
                            onClick={e => {
                              e.stopPropagation();
                              showDesc(undefined);
                              e.preventDefault();
                            }}
                          >
                            {descShow ? 'more' : 'less'}
                          </button>
                        )}
                    </p>
                  ) : (
                    <p className='text-sm'>
                      No description available for this book.
                    </p>
                  )}
                </div>

                <div className='my-2 self-end flex flex-col '>
                  <button
                    className='w-20 p-2 rounded-2xl text-white shadow-slate-400 dark:shadow-neutral-900 shadow-md bg-lime-700 hover:bg-lime-600'
                    onClick={handleGoBack}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </section>
          )}
        </m.div>
      )}
    </div>
  );
}

export default SingleBookPage;
