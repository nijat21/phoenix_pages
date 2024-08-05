import { useState, useEffect, useRef, useContext } from 'react';
import UserContext from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { signup } from '../API/auth.api';


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userRef = useRef(null);
  const { storeToken, authenticateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Check for regex
  function validatePassword(password) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !password) {
      setErrorMessage('All fields must be filled!');

    } else {
      if (!validatePassword(password)) {
        setErrorMessage('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.');
        return;
      }
      const user = { name, email, password };
      try {
        const response = await signup(user);
        storeToken(response.data.authToken);
        authenticateUser();
        toast.success('You have successfully created your profile!');
        navigate('/');
      } catch (error) {
        console.log('Error signing up.', error);
        setErrorMessage(`Error signing up, ${error}`);
      }
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);


  return (
    <div className=' h-screen flex justify-center items-center'>
      <div className='min-w-max flex flex-col px-12 py-10 items-center justify-center rounded-md shadow-sm bg-black bg-opacity-20'>
        <div className='flex justify-center mb-4'>
          <h1 className='text-3xl'>Create an Account</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className='min-h-72 min-w-72 flex flex-col justify-around items-center'
        >
          <label className='p-2'>
            <div className='flex items-center justify-between'>
              <h3>Name</h3>
            </div>
            <input type='text' id='username' name='username' value={name} ref={userRef}
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label className='p-2'>
            <div className='flex items-center justify-between'>
              <h3>Email</h3>
            </div>
            <input type='email' id='email' name='email' value={email} ref={userRef}
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label className='p-2'>
            <h3>Password</h3>
            <input type='password' id='password' name='password' value={password}
              className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <label className='flex items-center justify-center'>
            <p className='text-xs text-red-500 max-w-72'>{errorMessage}</p>
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
    </div >
  );
}

export default SignUp;
