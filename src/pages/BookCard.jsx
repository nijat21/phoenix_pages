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
    <div className='flex flex-col h-auto text-center items-center '>
      {book && book.cover_i && (
        <>
          <div className='h-64 w-40 flex justify-center items-center'>
            {!imageLoaded && (
              <img
                src='src/assets/coverLoading1.webp'
                alt='loading'
                className='text-center object-cover h-60 w-26 rounded-tr-lg rounded-br-lg shadow-slate-400 shadow-sm w-40'
              />
            )}
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt='cover'
              className='text-center object-cover h-60 w-26 rounded-tr-lg rounded-br-lg shadow-slate-400 shadow-sm w-40'
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className='h-auto mw-44'>
            <div className='mh-12 flex justify-center items-center'>
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
            <p className='text-sm'>({book.first_publish_year})</p>
            <div className='mh-10 flex justify-center items-center '>
              <h4>{book.author_name[0]}</h4>
            </div>
            <div className=' flex justify-center items-center '>
              <RatingDisplay rating={book.ratings_average.toFixed(1)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default BookCard;
