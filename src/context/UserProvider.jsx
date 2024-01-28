import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

const API_URL = 'https://server-phoenix-pages.adaptable.app';

export const UserProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState('');
  const [userLogged, setUserLogged] = useState(false);
  const [USERID, setUSERID] = useState('');
  const [category, setCategory] = useState('*');
  const [searchTitle, setSearchTitle] = useState('');
  const [enterHandler, setEnterHandler] = useState('');

  const storeToken = userId => {
    localStorage.setItem('userId', userId);
  };

  const authenticateUser = async () => {
    const userId = localStorage.getItem('userId');
    // If userId
    if (userId) {
      try {
        console.log('Authenticate true', userId);
        const response = await axios.get(`${API_URL}/users/${userId}`);
        setUserLogin(response.data.username);
        setUserLogged(true);
        setUSERID(Number(userId));
      } catch (error) {
        console.log(error);
      }
    } else {
      // If userId is not available (or is removed)
      setUserLogged(false);
    }
  };

  const removeId = () => {
    // Upon logout, remove the id from the localStorage
    localStorage.removeItem('userId');
    setUSERID('');
    setUserLogin('');
  };

  const logOutUser = () => {
    // To log out the user, remove the id
    removeId();
    // and update the state variables
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const getTopBooks = (input, slice, readlog) => {
    const five = input
      ? input
          .filter(book => book.readinglog_count > readlog)
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
      : [];
    return five.slice(0, slice);
  };

  return (
    <UserContext.Provider
      value={{
        userLogin,
        setUserLogin,
        userLogged,
        setUserLogged,
        USERID,
        setUSERID,
        storeToken,
        authenticateUser,
        logOutUser,
        category,
        setCategory,
        searchTitle,
        setSearchTitle,
        enterHandler,
        setEnterHandler,
        getTopBooks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
