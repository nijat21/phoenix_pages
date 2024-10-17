import React, { useState, useEffect } from "react";
import { verify } from "../API/auth.api";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [category, setCategory] = useState("*");
  const [searchTitle, setSearchTitle] = useState("");
  const [enterHandler, setEnterHandler] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);

  // Check preferred color scheme
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark").matches) {
      setDarkMode(true);
      setTheme("dark");
    } else {
      setDarkMode(false);
      setTheme("light");
    }
  }, []);

  //
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // Getting the user preference
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Store token
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  // Authentication
  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");
    // If userId
    if (storedToken) {
      try {
        // Verify token
        const verified = await verify(storedToken);
        // console.log("Verified user", verified.data);
        setUser(verified.data.User);
        setUserLogged(true);
      } catch (error) {
        console.log("Not able to authenticate the user", error);
        clearUser();
      }
    } else {
      // If userId is not available (or is removed)
      clearUser();
    }
    setLoading(false);
  };

  const clearUser = () => {
    // Upon logout, remove the id from the localStorage
    localStorage.removeItem("authToken");
    setUserLogged(false);
    setUser(null);
  };

  const logOutUser = () => {
    // To log out the user, remove the id
    clearUser();
    // and update the state variables
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
    console.log("User", user);
  }, []);

  const getTopBooks = (input, slice, readlog) => {
    const five = input
      ? input
          .filter((book) => book.readinglog_count > readlog)
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
        user,
        setUser,
        userLogged,
        setUserLogged,
        storeToken,
        category,
        setCategory,
        searchTitle,
        setSearchTitle,
        enterHandler,
        setEnterHandler,
        getTopBooks,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        theme,
        setTheme,
        loading,
        setLoading,
        // functions
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
