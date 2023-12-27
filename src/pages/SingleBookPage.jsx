import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBookPage() {
  const { bookKey } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`https://openlibrary.org/search.json?q=key:${bookKey}`) //this returns a promise
      .then(response => {
        console.log(response.data);
        setBook(response.data);
      });
  }, []);

  return <div>{book.title}</div>;
}

export default SingleBookPage;
