import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserProvider';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function Profile() {
  const { userLogged, setUserLogged, USERID, setUSERID, logOutUser } =
    useContext(UserContext);
  const userRef = useRef(null);
  const [userDetails, setUserDetails] = useState([]);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

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

  const handleSubmitUserEdit = async e => {
    e.preventDefault();

    console.log('Start login process');

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
      blankPasswords();
    } else {
      const updateUser = { username: newUsername, password };
      await axios.put(`${API_URL}/users/${USERID}`, updateUser);
      console.log('End login process');
      setUsernameEdit(false);
      setNewUsername('');
      setPassword('');
      setErrorMessage('');
      setUserDetails(updateUser);
    }
  };

  const handleSubmitPasswordChange = async e => {
    e.preventDefault();

    console.log('Start login process');

    if (!password) {
      setErrorMessage('Please input your current password!');
    } else if (newPassword === userDetails.password) {
      setErrorMessage('New Password cannot the same as the current one.');
    } else if (password !== userDetails.password) {
      setErrorMessage('Incorrect password, try again.');
      blankPasswords();
    } else if (!newPassword) {
      setErrorMessage('To change your password, please input a new one!');
    } else if (newPassword !== newPasswordConfirm) {
      setErrorMessage('Please correctly confirm your password.');
    } else if (!checkPasswordConditions(newPassword)) {
      setErrorMessage(
        'Password should have at least one upper and lower case letter, a number and a special character.'
      );
      blankPasswords();
    } else {
      const updateUser = {
        username: userDetails.username,
        password: newPassword,
      };
      await axios.put(`${API_URL}/users/${USERID}`, updateUser);
      setPasswordChange(false);
      blankPasswords();
      setErrorMessage('');
    }
    console.log('End login process');
  };

  const handleDeleteProfile = async e => {
    e.preventDefault();

    console.log('Start login process');

    if (!password) {
      setErrorMessage('Please input your password!');
    } else if (password !== userDetails.password) {
      setErrorMessage(`Put the correct password!`);
    } else if (deleteConfirm !== 'delete') {
      setErrorMessage(`Please write 'delete' in order to remove your profile`);
    } else {
      await axios.delete(`${API_URL}/users/${USERID}`);
      setPassword('');
      setErrorMessage('');
      setDeleteConfirm('');
      logOutUser();
      navigate('/');
    }
    console.log('End login process');
  };

  const checkPasswordConditions = str => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (/[A-Z]/.test(str) && /[a-z]/.test(str)) {
      return true;
    } else if (str.length >= 8) {
      return true;
    } else if (specialChars.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const blankPasswords = () => {
    setPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
  };

  useEffect(() => {
    if (usernameEdit) {
      userRef.current.focus();
    }
  }, []);

  const handleGoBack = () => {
    setUsernameEdit(false);
    setPasswordChange(false);
    setDeleteProfile(false);
    setErrorMessage('');
    navigate(-1);
  };

  return (
    <>
      {userDetails && (
        <div className='w-screen h-screen flex justify-center'>
          <div className=' flex flex-col items-center justify-center'>
            <div className='w-full px-12 py-10 flex  items-center justify-center border-2 border-slate-400 rounded-md shadow-sm shadow-slate-500'>
              {!usernameEdit && !passwordChange && !deleteProfile && (
                <div className='flex flex-col justify-evenly items-center mr-10'>
                  <img
                    src='./authorGeneric.png'
                    alt='profileImg'
                    className='w-20 mb-5 rounded-3xl'
                  />
                  <h1 className='text-3xl'>{userDetails.username}</h1>
                </div>
              )}
              <div className='flex flex-col'>
                {!usernameEdit && !passwordChange && !deleteProfile && (
                  <>
                    <button
                      onClick={() => setUsernameEdit(true)}
                      className='min-w-72 min-h-10 px-4 py-1 mx-2 mb-5 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700'
                    >
                      Edit your Username
                    </button>
                  </>
                )}
                {!passwordChange && !usernameEdit && !deleteProfile && (
                  <button
                    onClick={() => setPasswordChange(true)}
                    className='min-w-72 min-h-10 px-4 py-1 mx-2 mb-5 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700'
                  >
                    Change Password
                  </button>
                )}
                {!passwordChange && !usernameEdit && !deleteProfile && (
                  <button
                    onClick={() => setDeleteProfile(true)}
                    className='min-w-72 min-h-10 px-4 py-1 mx-2 mb-5 rounded-2xl border-solid  bg-amber-800 text-white border-2 border-amber-800 hover:bg-amber-700 hover:border-amber-700'
                  >
                    Delete Profile
                  </button>
                )}
              </div>

              {usernameEdit && (
                <form
                  onSubmit={handleSubmitUserEdit}
                  className='min-h-72 min-w-72 flex flex-col justify-around items-center'
                >
                  <div className='flex justify-center mb-8'>
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
                      className='border-solid rounded-md border-2 border-amber-800 min-w-72 min-h-10 pl-1 mb-2 text-black'
                      value={newUsername}
                      onChange={e => setNewUsername(e.target.value)}
                      ref={userRef}
                    />
                  </label>
                  <label>
                    <div className='flex items-center justify-between'>
                      <h3>Password</h3>
                    </div>
                    <input
                      type='password'
                      id='passwordLogin'
                      name='passwordLogin'
                      className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1 text-black'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </label>

                  <label className='flex items-center justify-center'>
                    <p className='text-xs text-red-500 max-w-72'>
                      {errorMessage}
                    </p>
                  </label>

                  <div className='flex justify-center mt-10'>
                    <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white'>
                      <button type='submit'>Confirm</button>
                    </div>
                  </div>
                </form>
              )}

              {passwordChange && (
                <form
                  onSubmit={handleSubmitPasswordChange}
                  className='min-h-72 min-w-72 flex flex-col justify-around items-center'
                >
                  <div className='flex justify-center mb-8'>
                    <h1 className='text-3xl'>Change your Password</h1>
                  </div>
                  <label>
                    <div className='flex items-center justify-between'>
                      <h3>Old Password</h3>
                    </div>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      className='border-solid rounded-md border-2 border-amber-800 min-w-72 min-h-10 pl-1 mb-2 text-black'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      ref={userRef}
                    />
                  </label>
                  <label>
                    <h3>New Password</h3>
                    <input
                      type='password'
                      id='newPassword'
                      name='newPassword'
                      className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1 mb-2 text-black'
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                  </label>
                  <label>
                    <h3 className='mt-2'>Confirm New Password</h3>
                    <input
                      type='password'
                      id='newPasswordConfirm'
                      name='newPasswordConfirm'
                      className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1 mb-2 text-black'
                      value={newPasswordConfirm}
                      onChange={e => setNewPasswordConfirm(e.target.value)}
                    />
                  </label>

                  <label className='flex items-center justify-center'>
                    <p className='text-xs text-red-500 max-w-72'>
                      {errorMessage}
                    </p>
                  </label>

                  <div className='flex justify-center mt-10'>
                    <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white'>
                      <button type='submit'>Confirm</button>
                    </div>
                  </div>
                </form>
              )}

              {deleteProfile && (
                <form
                  onSubmit={handleDeleteProfile}
                  className='min-h-72 min-w-72 flex flex-col justify-center items-center'
                >
                  <div className='flex justify-center mb-8'>
                    <h1 className='text-3xl'>Delete Profile</h1>
                  </div>

                  <label>
                    <h3>Password</h3>
                    <input
                      type='password'
                      id='passwordLogin'
                      name='passwordLogin'
                      className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1 mb-2 text-black'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </label>

                  <label>
                    <h3>Please write 'delete'</h3>
                    <input
                      type='text'
                      id='deleteConfirm'
                      name='deleteConfirm'
                      className='border-solid rounded-md border-2 border-amber-800 min-w-72  min-h-10 pl-1 mb-2 text-black'
                      value={deleteConfirm}
                      onChange={e => setDeleteConfirm(e.target.value)}
                    />
                  </label>

                  <label className='flex items-center justify-center'>
                    <p className='text-xs text-red-500 max-w-72'>
                      {errorMessage}
                    </p>
                  </label>

                  <div className='flex justify-center mt-10'>
                    <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white'>
                      <button type='submit'>Confirm</button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className=' self-end flex flex-col mt-4'>
              <button
                className='p-2 rounded-2xl border-2 text-white border-lime-700 text-l bg-lime-700 hover:bg-lime-600 hover:border-lime-600'
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
