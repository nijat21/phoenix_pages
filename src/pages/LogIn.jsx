import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logInMessage, setLogInMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.get(`${API_URL}/users`);

    console.log(response);

    if (!username) {
      setLogInMessage('Please input your username, mate!');
    } else if (!password) {
      setLogInMessage('Dude, are you serious?! Put in the password as well!');
    } else {
      const userCheck = response.data.find(
        user => user.username === username && user.password === password
      );
      if (userCheck) {
        navigate('/');
      } else {
        setLogInMessage("That's not the password, boy. Please try again.");
      }
    }
  };

  return (
    <div className='pt-14'>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Username:</h3>
          <p>
            Need an account?
            <Link to={'/signup'}>Sign up</Link>
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
      <Link to={'/deleteuser'}>Delete Account</Link>
    </div>
  );
}

export default LogIn;
