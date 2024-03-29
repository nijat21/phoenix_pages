import axios from 'axios';
import { useState, useEffect, useRef, useContext } from 'react';
import UserContext from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import '../styles/login.styles.css';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function SignUp() {
  const userRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [logInMessage, setLogInMessage] = useState('');

  const { storeToken, authenticateUser, setUSERID } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.get(`${API_URL}/users`);
    const user = response.data;

    if (!username) {
      setLogInMessage('To Sign up, please input your username!');
      // blankEverything();
    } else if (!password) {
      setLogInMessage('To Sign up, please input your password!');
      blankPasswords();
    } else if (!passwordConfirmed) {
      setLogInMessage('Please confirm your password!');
      blankPasswords();
    } else if (passwordConfirmed !== password) {
      setLogInMessage(`Passwords don't match!`);
      blankPasswords();
    } else if (!checkPasswordConditions(password)) {
      setLogInMessage(
        'Password should have at least one upper and lower case letter, a number and a special character.'
      );
      blankPasswords();
    } else {
      const userCheck = user.find(user => user.username === username);

      if (userCheck) {
        setLogInMessage('Username is taken. Please try a different one!');
      } else {
        const requestUser = { username, password };
        await axios.post(`${API_URL}/users`, requestUser);
        toast.success('You have successfully created your profile!');

        const response = await axios.get(`${API_URL}/users`);
        const users = response.data;

        const userExists = users.find(
          user =>
            user.username === requestUser.username &&
            user.password === requestUser.password
        );

        if (userExists) {
          storeToken(userExists.id);
          setUSERID(userExists.id);
          authenticateUser();
          navigate('/');
        } else {
          // setErrorMessage('Username or password is wrong. Please try again.');
        }
      }
    }
  };

  // check if the password follows the conditions

  const checkPasswordConditions = str => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{6,}$/;
    return passwordRegex.test(str);
  };

  const blankPasswords = () => {
    setPassword('');
    setPasswordConfirmed('');
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <div className=' h-screen flex justify-center items-center'>
      <div className='canva-signup'>
        <div className='flex justify-center mb-4'>
          <h1 className='text-3xl'>Create an Account</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className='min-h-72 min-w-72 flex flex-col justify-around items-center'
        >
          <label className='p-2'>
            <div className='flex items-center justify-between'>
              <h3>Username</h3>
            </div>
            <input
              type='text'
              id='username'
              name='username'
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
              value={username}
              onChange={e => setUsername(e.target.value)}
              ref={userRef}
            />
          </label>
          <label className='p-2'>
            <h3>Password</h3>
            <input
              type='password'
              id='passwordLogin'
              name='passwordLogin'
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <label className='p-2'>
            <h3>Confirm Password:</h3>
            <input
              type='password'
              id='password1'
              name='password1'
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
              value={passwordConfirmed}
              onChange={e => setPasswordConfirmed(e.target.value)}
            />
          </label>

          <label className='flex items-center justify-center'>
            <p className='text-xs text-red-500 max-w-72'>{logInMessage}</p>
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
  );
}

export default SignUp;
