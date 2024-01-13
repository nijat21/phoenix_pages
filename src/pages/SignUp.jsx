import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app/';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [logInMessage, setLogInMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.get(`${API_URL}/users`);

    if (!username) {
      setLogInMessage('Please input your username, mate!');
    } else if (!password) {
      setLogInMessage('Dude, are you serious?! Put in the password as well!');
    } else if (!passwordConfirmed) {
      setLogInMessage('You need to confirm your password!');
    } else if (passwordConfirmed !== password) {
      setLogInMessage('Man, cmon. Passwords dont match');
    }

    response.data.forEach(user => {
      if (user.username === username) {
        setLogInMessage('Username already in use, try a different one');
      }
    });
  };

  return (
    <div className='pt-14'>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Username:</h3>
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
        <h3>Confirm Password:</h3>
        <input
          type='text'
          id='password'
          name='password'
          className='border-solid border-2 border-amber-800 mb-5'
          value={passwordConfirmed}
          onChange={e => setPasswordConfirmed(e.target.value)}
        />
        <p>{logInMessage}</p>
        <button type='submit'>Create!</button>
      </form>
    </div>
  );
}

export default SignUp;
