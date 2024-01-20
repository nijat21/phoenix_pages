import { Link } from 'react-router-dom';
import RatingDisplay from '../components/RatingDisplay';
function BookCard({ book, setImageLoaded, imageLoaded }) {
  return (
    <>
      <Link key={book.key} to={`/books${book.key}`}>
        <div className='flex flex-col text-center items-center mt-16'>
          {book && book.cover_i && (
            <>
              <div className='h-64 flex justify-center items-center'>
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
                <div className='mh-12 flex justify-center items-center'>
                  <h2>
                    <strong>{book.title}</strong> ({book.first_publish_year})
                  </h2>
                </div>
                <div className='mh-10 flex justify-center items-center'>
                  <h4>{book.author_name[0]}</h4>
                </div>
                <div className='mh-6 flex justify-center items-center'>
                  <div className='flex'>
                    <RatingDisplay rating={book.ratings_average.toFixed(1)} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Link>
    </>
  );
}
export default BookCard;
