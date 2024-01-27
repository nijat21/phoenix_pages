import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
