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

  const { userLogin, setUserLogin, USERID, setUSERID } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;

    console.log(response);

    if (!username && !password) {
      setErrorMessage('Please input your username and password!');
    }
    else if (!username) {
      setErrorMessage('To Log in, please input your username!');
    } else if (!password) {
      setErrorMessage('To Log in, please input your password!');
    } else {
      const userCheck = users.find(
        user => user.username === username && user.password === password
      );
      if (userCheck) {
        setUserLogin(username)
        setUSERID(userCheck.id)
        navigate('/');

      } else {
        setErrorMessage('Username or password is wrong. Please try again.');
      }
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div className='h-screen flex justify-center'>
      <div className='mb-40'>
        <div className='h-full w-full flex flex-col items-center justify-center'>
          <form
            onSubmit={handleSubmit}
            className='min-h-72 min-w-72 flex flex-col justify-around'
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
                className='border-solid border-2 border-amber-800 min-w-72 min-h-10 pl-1'
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
                className='border-solid border-2 border-amber-800 min-w-72  min-h-10 pl-1'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <label>
              <p className='text-s text-red-500'>{errorMessage}</p>
            </label>
            <div className='flex justify-center'>
              <div className='flex flex-col justify-center items-center border-solid border-2 border-gray-400 min-w-20'>
                <button type='submit'>Log In</button>
              </div>
            </div>
          </form>
          <span className='text-s text-gray-500 mt-4'>
            Need an account?
            <Link to={'/signup'} className='text-blue-400'>
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
