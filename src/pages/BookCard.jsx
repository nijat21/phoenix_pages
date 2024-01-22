import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import { useEffect, useState } from 'react';

function BookCard({ book, setImageLoaded, imageLoaded }) {
  const [show, setShow] = useState(true);
  const [length, setLength] = useState(50);

  const showTitle = titleLength => {
    setShow(!show);
    if (show) {
      setLength(titleLength);
    } else {
      setLength(50);
    }
  };

  return (
    <div className='w-64 flex-col'>
      <Link key={book.key} to={`/books${book.key}`}>
        <div className='flex flex-col text-center items-center mt-16'>
          {book && book.cover_i && (
            <>
              <div className='h-64 w-40 flex justify-center items-center'>
                {!imageLoaded && (
                  <img
                    src='src/assets/coverLoading1.webp'
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
                <div className='mh-12 flex justify-center items-center text-base'>
                  <h3>
                    <strong>{book.title}</strong> (
                    {book.first_publish_year})
                  </h3>
                </div>
                <div className='mh-10 flex justify-center items-center'>
                  <h4>{book.author_name[0]}</h4>
                </div>
                <div className='mh-6 flex justify-center items-center'>
                  <div>
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
    </div>
  );
}
export default BookCard;
