import { useState, useEffect, useRef, useContext } from 'react';
import UserContext from '../context/UserProvider';
import { Link } from 'react-router-dom';
import { login } from '../API/auth.api';

function LogIn() {
  const userRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { storeToken, authenticateUser } = useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username: email, password };

    try {
      const response = await login(user);
      console.log("Response to login", response.data);
      storeToken(response.data.access_token);
      authenticateUser();
    } catch (error) {
      console.log('Error logging in', error);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='min-w-max min-h-max px-12 py-10 flex flex-col items-center justify-center rounded-md shadow-sm bg-black bg-opacity-20'>
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
              type='email'
              id='email'
              name='email'
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
              value={email}
              onChange={e => setEmail(e.target.value)}
              ref={userRef}
            />
          </label>
          <label>
            <h3>Password</h3>
            <input
              type='password'
              id='passwordLogin'
              name='passwordLogin'
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72  min-h-10 pl-1 text-black'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p className='text-s text-red-500'>{errorMessage}</p>
          </label>
          <div className='flex justify-center'>
            <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:text-white
              shadow-slate-400 shadow-md hover:bg-lime-600  dark:shadow-neutral-900'>
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
  );
}

export default LogIn;
