import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import UserContext from '../context/UserProvider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function LogIn() {
  const userRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { storeToken, authenticateUser, setUSERID } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('Start login process');

    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;
    const requestBody = { username, password };
    console.log(response);

    // Checking if the user exists
    const userExists = users.find(
      user =>
        user.username === requestBody.username &&
        user.password === requestBody.password
    );

    if (!username && !password) {
      setErrorMessage('Please input your username and password!');
    } else if (!username) {
      setErrorMessage('To Log in, please input your username!');
    } else if (!password) {
      setErrorMessage('To Log in, please input your password!');
    } else {
      if (userExists) {
        storeToken(userExists.id);
        setUSERID(userExists.id);
        authenticateUser();
        navigate('/');
      } else {
        setErrorMessage('Username or password is wrong. Please try again.');
      }
    }
    console.log('End login process');
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div className=' w-screen h-screen flex justify-center '>
      <div className='mb-40 flex items-center '>
        <div className=' w-full px-12 py-10 flex flex-col items-center justify-center border-2 border-slate-400 rounded-md shadow-sm shadow-slate-500'>
          <form
            onSubmit={handleSubmit}
            className='min-h-72 min-w-72 flex flex-col justify-around items-center'
          >
            <div className='flex justify-center mb-4'>
              <h1 className='text-3xl'>Log In</h1>
            </div>
            <label>
              <div className='flex items-center justify-between'>
                <h3>Username</h3>
              </div>
              <input
                type='text'
                id='username'
                name='username'
                className='border-solid rounded-md border-2 border-amber-800 min-w-72 min-h-10 pl-1 dark:text-neutral-900'
                value={username}
                onChange={e => setUsername(e.target.value)}
                ref={userRef}
              />
            </label>
            <label>
              <h3>Password</h3>
              <input
                type='password'
                id='passwordLogin'
                name='passwordLogin'
                className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1 dark:text-neutral-900'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <label>
              <p className='text-s text-red-500'>{errorMessage}</p>
            </label>
            <div className='flex justify-center'>
              <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white'>
                <button type='submit'>Log In</button>
              </div>
            </div>
          </form>
          <span className='text-s text-gray-500 mt-4'>
            Need an account?
            <Link to={'/signup'} className='text-blue-400 hover:text-gray-500'>
              {' '}
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
