import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function SignUp() {
  const userRef = useRef(null);
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

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div className=' h-screen flex justify-center'>
      <div className='mb-40 flex items-center'>
        <div className=' w-full flex flex-col px-12 py-10 items-center justify-center border-2 border-slate-400 rounded-md shadow-sm shadow-slate-500'>
          <form
            onSubmit={handleSubmit}
            className='min-h-72 min-w-72 flex flex-col justify-around'
          >
            <div className='flex justify-center mb-4'>
              <h1 className='text-3xl'>Create an Account</h1>
            </div>
            <label>
              <div className='flex items-center justify-between'>
                <h3>Username</h3>
              </div>
              <input
                type='text'
                id='username'
                name='username'
                className='border-solid rounded-md border-2 border-amber-800 min-w-72 min-h-10 pl-1 mb-2'
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
                className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1 mb-2'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <label>
              <h3>Confirm Password:</h3>
              <input
                type='password'
                id='password1'
                name='password1'
                className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1'
                value={passwordConfirmed}
                onChange={e => setPasswordConfirmed(e.target.value)}
              />
            </label>

            <label>
              <p className='text-s text-red-500'>{logInMessage}</p>
            </label>

            <div className='flex justify-center mt-10'>
              <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white'>
                <button type='submit'>Create</button>
              </div>
            </div>
          </form>
          <span className='text-s text-gray-500 mt-4'>
            Already on Phoenix Pages?
            <Link to={'/login'} className='text-blue-400 hover:text-gray-500'>
              {' '}
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
