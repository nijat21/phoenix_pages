import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
import { useEffect, useState } from 'react';
import { motion as m } from "framer-motion";

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
    <Link
      key={book.key}
      to={`/books${book.key}`}
      className='min-h-max pb-2 px-1 flex-shrink-0 rounded-br-lg shadow-slate-400 shadow-md border border-slate-300 hover:border-slate-700 
    dark:shadow-neutral-900 dark:hover:border-slate-500'
    >
      <m.div className='flex flex-col h-auto text-center items-center'
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}>
        {book && book.cover_i && (
          <>
            <div className='h-64 w-40 mt-2 flex justify-center items-center'>
              {!imageLoaded && (
                <img
                  src='./coverLoading1.webp'
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
              <div className='flex justify-center items-center '>
                <h4>{book.author_name[0]}</h4>
              </div>
              <div className=' flex justify-center items-center '>
                <RatingDisplay rating={book.ratings_average} />
              </div>
            </div>
          </>
        )}
      </m.div>
    </Link>
  );
}
export default BookCard;
