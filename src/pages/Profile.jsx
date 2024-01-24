import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserProvider';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function Profile() {
  const { userLogged, setUserLogged, USERID, setUSERID } =
    useContext(UserContext);
  const userRef = useRef(null);
  const [userDetails, setUserDetails] = useState([]);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${USERID}`);
        console.log(response.data);
        console.log(USERID);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching User info:', error);
      }
    };

    if (userLogged) {
      getUserInfo();
    }
  }, [USERID]);

  const handleUsernameEdit = async () => {
    setUsernameEdit(true);
  };
  const handlePasswordChange = async () => {
    setPasswordChange(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('Start login process');

    // const response = await axios.get(`${API_URL}/users/${USERID}`);
    // const user = response.data;

    // // Checking if the user exists
    // const userExists = users.find(
    //   (user) =>
    //     user.username === requestBody.username &&
    //     user.password === requestBody.password
    // );

    if (!newUsername && !password) {
      setErrorMessage('Please input your username and password!');
    } else if (!newUsername) {
      setErrorMessage(
        'To change your Username, please input your new Username!'
      );
    } else if (newUsername === userDetails.username) {
      setErrorMessage('New Username is the same as the current one');
    } else if (!password) {
      setErrorMessage('To change your Username, please input your password!');
    } else if (password !== userDetails.password) {
      setErrorMessage(`Passwords don't match!`);
    } else {
      const updateUser = { username: newUsername, password };
      await axios.put(`${API_URL}/users/${USERID}`, updateUser);
    }
    console.log('End login process');
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <>
      {userDetails && (
        <div className=' h-screen flex justify-center'>
          <div className='mb-40 flex items-center'>
            <div className=' w-full flex flex-col px-12 py-10 items-center justify-center border-2 border-slate-400 rounded-md shadow-sm shadow-slate-500'>
              <h1>Hello, {userDetails.username}</h1>
              {!usernameEdit && !passwordChange && (
                <button
                  onClick={handleUsernameEdit}
                  className='px-4 py-1 mx-2 mb-5 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700'
                >
                  Edit your Username
                </button>
              )}
              {!passwordChange && !usernameEdit && (
                <button
                  onClick={handlePasswordChange}
                  className='px-4 py-1 mx-2 mb-5 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700'
                >
                  Change Password
                </button>
              )}

              <form
                onSubmit={handleSubmit}
                className='min-h-72 min-w-72 flex flex-col justify-around'
              >
                <div className='flex justify-center mb-4'>
                  <h1 className='text-3xl'>Edit your Username</h1>
                </div>
                <label>
                  <div className='flex items-center justify-between'>
                    <h3>New Username</h3>
                  </div>
                  <input
                    type='text'
                    id='newUsername'
                    name='newUsername'
                    className='border-solid rounded-md border-2 border-amber-800 min-w-72 min-h-10 pl-1 mb-2'
                    value={newUsername}
                    onChange={e => setNewUsername(e.target.value)}
                    ref={userRef}
                  />
                </label>
                <label>
                  <h3>Password</h3>
                  <input
                    type='password'
                    id='passwordLogin'
                    name='passwordLogin'
                    className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </label>

                <label>
                  <p className='text-s text-red-500'>{errorMessage}</p>
                </label>

                <div className='flex justify-center mt-10'>
                  <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white'>
                    <button type='submit'>Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
