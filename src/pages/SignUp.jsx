import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [logInMessage, setLogInMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.get(`${API_URL}/users`);
    const user = response.data;

    if (!username) {
      setLogInMessage('To Sign up, please input your username!');
    } else if (!password) {
      setLogInMessage('To Sign up, please input your password!');
    } else if (!passwordConfirmed) {
      setLogInMessage('Please confirm your password!');
    } else if (passwordConfirmed !== password) {
      setLogInMessage(`Passwords don't match!`);
    }

    const userCheck = user.find(user => user.username === username);

    if (userCheck) {
      setLogInMessage('Username is taken. Please try a different one!');
    } else {
      const requestUser = { username, password };
      await axios.post(`${API_URL}/users`, requestUser);
      navigate('/');
    }
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
          type='password'
          id='password'
          name='password'
          className='border-solid border-2 border-amber-800 mb-5'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <h3>Confirm Password:</h3>
        <input
          type='password'
          id='password1'
          name='password1'
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
