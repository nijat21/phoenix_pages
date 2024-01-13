import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app/';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logInMessage, setLogInMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.get(`${API_URL}/users`);

    if (!username) {
      setLogInMessage('Please input your username, mate!');
    } else if (!password) {
      setLogInMessage('Dude, are you serious?! Put in the password as well!');
    }

    response.data.forEach(user => {
      if (user.username === username && user.password === password) {
      } else {
        navigate('/signup');
      }
    });
  };

  return (
    <div className='pt-14'>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Username:</h3>
          <p>
            Need an account?
            <Link>Sign up</Link>
          </p>
        </div>
        <input
          type='text'
          id='username'
          name='username'
          className='border-solid border-2 border-amber-800'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <h3>Password:</h3>{' '}
        <input
          type='text'
          id='password'
          name='password'
          className='border-solid border-2 border-amber-800 mb-5'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p>{logInMessage}</p>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
