import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import RatingDisplay from '../components/RatingDisplay';

function AuthorPage() {
  const { authorKey } = useParams();

  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  // We may need to replace is with global function
  const topFive = authorBooks
    ? authorBooks
        .sort((a, b) => b.ratings_average - a.ratings_average)
        .slice(0, 5)
    : [];

  return (
    <div className='pt-14 flex flex-col '>
      {author && (
        <>
          <section className='w-1/2 border-2 border-slate-600'>
            <img
              src={`https://covers.openlibrary.org/a/olid/${authorKey}-M.jpg`}
              alt='cover'
              className='text-center object-contain w-85 mb-5'
            />
            <h1 className='mb-1'>
              <strong className='text-2xl'>{`${author.name}`}</strong>
            </h1>

            <p>Birth Date: {author.birth_date}</p>
          </section>
          <section className='grid grid-cols-5 gap-5 mr-5 ml-5'>
            {authorBooks &&
              topFive.map(book => {
                return (
                  <>
                    <Link
                      key={book.key}
                      to={`/books${book.key}`}
                      className='border-2 border-slate-300 hover:border-slate-700'
                    >
                      <div className='flex flex-col text-center items-center mt-16'>
                        {book && (
                          <>
                            <div className='h-64 flex justify-center items-center'>
                              {!imageLoaded && (
                                <img
                                  src={'src/assets/coverLoading1.webp'}
                                  alt='loading'
                                  className='text-center object-cover h-60 w-26'
                                />
                              )}
                              <img
                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                alt='cover'
                                className='text-center object-cover h-60 w-26 '
                                onLoad={() => setImageLoaded(true)}
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
          </section>
        </>
      )}
    </div>
  );
}

export default AuthorPage;
