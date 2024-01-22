import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import RatingDisplay from '../components/RatingDisplay';
import BookCard from './BookCard';

function AuthorPage() {
  const { authorKey } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [authorImageLoaded, setAuthorImageLoaded] = useState(false);
  const [length, setLength] = useState(50);
  const [bioLength, setBioLength] = useState(1140);
  const [show, setShow] = useState(true);
  const [bioShow, setBioShow] = useState(true);

  useEffect(() => {
    axios
      .get(`https://openlibrary.org/authors/${authorKey}.json`) //this returns a promise
      .then(response => {
        console.log(response.data);

        setAuthor(response.data);
      })
      .catch(error => {
        console.error('Error fetching author:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://openlibrary.org/search.json?q=author_key:${authorKey}&limit=50`
      )
      .then(response => {
        setAuthorBooks(response.data.docs);
      })
      .catch(error => {
        console.error('Error fetching author:', error);
      });
  }, []);

  // Book rating algorithm
  const getTopTen = input => {
    const ten = input
      ? input
          .filter(book => book.readinglog_count > 50)
          .sort(
            (a, b) =>
              b.ratings_average * 0.5 +
              (b.already_read_count /
                (b.readinglog_count - b.currently_reading_count)) *
                5 *
                0.5 -
              (a.ratings_average * 0.5 +
                (a.already_read_count /
                  (a.readinglog_count - a.currently_reading_count)) *
                  5 *
                  0.5)
          )
      : // .slice(0, 5)
        [];
    return ten.slice(0, 10);
  };
  const topTen = getTopTen(authorBooks);

  const showTitle = titleLength => {
    setShow(!show);
    if (show) {
      setLength(titleLength);
    } else {
      setLength(50);
    }
  };

  const showBio = authorBioLength => {
    setBioShow(!bioShow);
    if (bioShow) {
      setBioLength(authorBioLength);
    } else {
      setBioLength(1140);
    }
  };

  const removeText = text => {
    const indexOfSeparationOne = text.indexOf('([');
    const indexOfSeparationTwo = text.indexOf('<');

    if (indexOfSeparationOne !== -1) {
      const modifiedText = text.slice(0, indexOfSeparationOne);
      return modifiedText;
    } else if (indexOfSeparationTwo !== -1) {
      const modifiedText = text.slice(0, indexOfSeparationTwo);
      return modifiedText;
    } else {
      return text;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='mt-6 flex flex-col'>
      {author && (
        <>
          <section className=' flex flex-start '>
            {!authorImageLoaded && (
              <img
                src='../src/assets/authorGeneric.png'
                alt='loading'
                className='text-center object-contain max-w-64 max-h-80 mb-5 ml-10'
              />
            )}
            <img
              src={`https://covers.openlibrary.org/a/olid/${authorKey}-M.jpg`}
              alt='cover'
              className='text-center object-contain max-w-64 max-h-80 mb-5 ml-10 rounded-tl-lg rounded-tr-lg rounded-br-lg shadow-slate-700 shadow-sm'
              onLoad={() => {
                setAuthorImageLoaded(true);
              }}
            />

            <div className='mx-10'>
              <h1 className='mb-1'>
                <strong className='text-2xl'>{`${author.name}`}</strong>
              </h1>

              <p className='text-sm mt-1 mb-11'>
                {author.birth_date}{' '}
                {author.death_date ? `- ${author.death_date}` : ' '}
              </p>

              <p className='mb-14 pb-10 border-b-2 border-amber-800'>
                {typeof author.bio === 'object'
                  ? removeText(`${author.bio.value.slice(0, bioLength)}`)
                  : removeText(`${author.bio.slice(0, bioLength)}`)}

                {((typeof author.bio !== 'object' &&
                  author.bio.length > 1140) ||
                  (typeof author.bio === 'object' &&
                    author.bio.value.length > 1140)) && (
                  <button
                    className='ml-1 font-thin text-gray-400 rounded-lg hover:bg-slate-200 hover:px-1'
                    onClick={e => {
                      e.stopPropagation();
                      showBio(undefined);
                      e.preventDefault();
                    }}
                  >
                    {bioShow ? 'more' : 'less'}
                  </button>
                )}
              </p>
            </div>
          </section>
          <section className='flex overflow-x-scroll  h-auto gap-5 mr-20 ml-20 pb-5 scrollable-container'>
            {authorBooks &&
              topTen.map(book => {
                return (
                  <>
                    <Link
                      key={book.key}
                      to={`/books${book.key}`}
                      className='w-1/6 max-h-min flex-shrink-0 border-2 border-slate-300 hover:border-slate-700'
                    >
                      <div className='flex flex-col h-full text-center items-center '>
                        {book && book.cover_i && (
                          <>
                            <div className='min-h-fit pt-3 flex justify-center items-center'>
                              {!imageLoaded && (
                                <img
                                  src='../src/assets/coverLoading1.webp'
                                  alt='loading'
                                  className='text-center object-cover h-60 w-26'
                                />
                              )}
                              <img
                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                alt='cover'
                                className='text-center object-cover w-20 rounded-tr-lg rounded-br-lg shadow-slate-400 shadow-sm'
                                onLoad={() => setImageLoaded(true)}
                              />
                            </div>
                            <div className='w-auto mr-2 ml-2'>
                              <div className=' flex justify-center items-center mt-2 max-w-xs'>
                                <h2 className='text-xs'>
                                  <strong className='max-w-xs'>
                                    {book.title.slice(0, length)}
                                  </strong>{' '}
                                  {book.title.length > 50 && (
                                    <button
                                      className='ml-1 font-thin text-gray-400 rounded-lg hover:bg-slate-200 hover:px-1'
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
                              <p className='text-xs'>
                                ({book.first_publish_year})
                              </p>
                              <div className=' flex justify-center items-center '>
                                <h4 className='text-xs'>
                                  {book.author_name[0]}
                                </h4>
                              </div>
                              <div className=' flex  justify-center items-center mt-2 mb-1'>
                                <RatingDisplay
                                  rating={book.ratings_average.toFixed(1)}
                                />
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
          <div className='my-2 mr-20 self-end flex flex-col '>
            <button
              className='mt-4 p-2 rounded-2xl border-2 text-white border-lime-700 text-l bg-lime-700 hover:bg-lime-600 hover:border-lime-600'
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AuthorPage;
