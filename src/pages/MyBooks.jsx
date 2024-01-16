import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserProvider';
import RatingDisplay from '../components/RatingDisplay';

const API_URL = 'https://server-phoenix-pages.adaptable.app';


function MyBooks() {
  const [myListOfBooks, setMyListOfBooks] = useState(null);
  const [additionalBookInfo, setAdditionalBookInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const { USERID, setUSERID } = useContext(UserContext);


  const getList = async v => {
    try {
      if (v === 1) {
        const response = await axios.get(
          `${API_URL}/users/${USERID}?_embed=books_to_read`
        );

        setMyListOfBooks(response.data.books_to_read);
      } else if (v === 2) {
        const response = await axios.get(
          `${API_URL}/users/${USERID}?_embed=books_already_read`
        );

        setMyListOfBooks(response.data.books_already_read);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBooksByKey = async bookKey => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/works/${bookKey}.json`
      );
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
          const info = await getBooksByKey(book.bookKey);

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

  return (
    <div className='pt-14'>
      <h2>Which List do you want to see?</h2>

      <button onClick={() => getList(1)}>Want to Read</button>

      <button onClick={() => getList(2)}>Already Read</button>

      {additionalBookInfo &&
        additionalBookInfo.map(book => {
          return (
            book && (
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
                            <strong>{book.title}</strong> (
                            {/* {book.first_publish_year} */})
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
            )
          );
        })}
    </div>
  );
}

export default MyBooks;
