import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext, { UserProvider } from '../context/UserProvider';
import { toast } from 'sonner';
import { motion as m } from 'framer-motion';
import { deleteUser } from '../API/auth.api';
import { updateEmail } from '../API/auth.api';
import { updatePass } from '../API/auth.api';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

function Profile() {
  const userRef = useRef(null);
  const [userDetails, setUserDetails] = useState([]);
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, logOutUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleEditEmail = async e => {
    e.preventDefault();
    if (!newEmail && !password) {
      setErrorMessage('Please input all the fields to proceed');
    } else {
      await updateEmail({ user_id: user.id, new_email: newEmail, password });
      toast.success('You have successfully modified your email!');
      setUsernameEdit(false);
      setNewEmail('');
      setPassword('');
      setErrorMessage('');
    }
  };

  const handlePasswordChange = async e => {
    e.preventDefault();

    if (!password || !newPassword) {
      setErrorMessage('Please fill all the fields to proceed');
    } else if (newPassword !== newPasswordConfirm) {
      setErrorMessage("Passwords don't match");
    } else if (!checkPasswordConditions(newPassword)) {
      setErrorMessage(
        'Password should have at least one upper and lower case letter, a number and a special character.'
      );
      blankPasswords();
    } else {
      await updatePass({ user_id: user.id, new_password: newPassword, password: password });
      toast.success('You have successfully modified your password!');
      setPasswordChange(false);
      blankPasswords();
      setErrorMessage('');
    }
  };

  const handleDeleteProfile = async e => {
    e.preventDefault();
    if (!password || !deleteConfirm) {
      setErrorMessage(`Please input all the fields to proceed`);
    } else {
      await deleteUser(user.id, password);
      toast.success('You have successfully deleted your profile!');
      setPassword('');
      setErrorMessage('');
      setDeleteConfirm('');
      logOutUser();
      navigate('/');
    }
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
      {user && (
        <m.div className='w-screen h-screen flex justify-center'
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}>
          <div className=' flex flex-col items-center justify-center'>
            <div className='w-full min-h-80 px-12 py-10 flex  items-center justify-center shadow-slate-500 rounded-md shadow-sm bg-black bg-opacity-20 dark:shadow-neutral-900'>
              {!usernameEdit && !passwordChange && !deleteProfile && (
                <div className='flex flex-col justify-evenly items-center mr-10'>
                  <i className="fa-regular fa-user fa-5x p-4"></i>
                  <h1 className='text-3xl'>{user.name}</h1>
                </div>
              )}
              <div className='flex flex-col'>
                {!usernameEdit && !passwordChange && !deleteProfile && (
                  <>
                    <button
                      onClick={() => setUsernameEdit(true)}
                      className='min-w-72 min-h-10 px-4 py-1 mx-2 mb-5 rounded-xl border-2 border-amber-700 hover:text-white
              shadow-slate-400 shadow-md hover:bg-amber-700  dark:shadow-neutral-900'
                    >
                      Edit Email
                    </button>
                  </>
                )}
                {!passwordChange && !usernameEdit && !deleteProfile && (
                  <button
                    onClick={() => setPasswordChange(true)}
                    className='min-w-72 min-h-10 px-4 py-1 mx-2 mb-5 rounded-xl border-2 border-amber-700 hover:text-white
              shadow-slate-400 shadow-md hover:bg-amber-700  dark:shadow-neutral-900'
                  >
                    Change Password
                  </button>
                )}
                {!passwordChange && !usernameEdit && !deleteProfile && (
                  <button
                    onClick={() => setDeleteProfile(true)}
                    className='min-w-72 min-h-10 px-4 py-1 mx-2 mb-5 rounded-xl border-2 border-amber-700 hover:text-white
              shadow-slate-400 shadow-md hover:bg-amber-700  dark:shadow-neutral-900'
                  >
                    Delete Profile
                  </button>
                )}
              </div>

              {usernameEdit && (
                <m.form
                  onSubmit={handleEditEmail}
                  className='min-h-72 min-w-72 flex flex-col justify-around items-center'
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}
                >
                  <div className='flex justify-center mb-8'>
                    <h1 className='text-3xl'>Edit your Username</h1>
                  </div>
                  <label className='p-2'>
                    <div className='flex items-center justify-between'>
                      <h3>New Username</h3>
                    </div>
                    <input
                      type='text'
                      id='newEmail'
                      name='newEmail'
                      className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      ref={userRef}
                    />
                  </label>
                  <label className='p-2'>
                    <div className='flex items-center justify-between'>
                      <h3>Password</h3>
                    </div>
                    <input
                      type='password'
                      id='passwordLogin'
                      name='passwordLogin'
                      className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
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
                    <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white
                    shadow-slate-400 shadow-md dark:shadow-neutral-900'>
                      <button type='submit'>Confirm</button>
                    </div>
                  </div>
                </m.form>
              )}

              {passwordChange && (
                <m.form
                  onSubmit={handlePasswordChange}
                  className='min-h-72 min-w-72 flex flex-col justify-around items-center'
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}
                >
                  <div className='flex justify-center mb-8'>
                    <h1 className='text-3xl'>Change your Password</h1>
                  </div>
                  <label className='p-2'>
                    <div className='flex items-center justify-between'>
                      <h3>Old Password</h3>
                    </div>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      ref={userRef}
                    />
                  </label>
                  <label className='p-2'>
                    <h3>New Password</h3>
                    <input
                      type='password'
                      id='newPassword'
                      name='newPassword'
                      className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                  </label>
                  <label className='p-2'>
                    <h3 className='mt-2'>Confirm New Password</h3>
                    <input
                      type='password'
                      id='newPasswordConfirm'
                      name='newPasswordConfirm'
                      className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
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
                    <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white
                    shadow-slate-400 shadow-md dark:shadow-neutral-900'>
                      <button type='submit'>Confirm</button>
                    </div>
                  </div>
                </m.form>
              )}

              {deleteProfile && (
                <m.form
                  onSubmit={handleDeleteProfile}
                  className='min-h-72 min-w-72 flex flex-col justify-center items-center'
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} exit={{ opacity: 0 }}
                >
                  <div className='flex justify-center mb-8'>
                    <h1 className='text-3xl'>Delete Profile</h1>
                  </div>

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
                    <h3>Please write 'delete'</h3>
                    <input
                      type='text'
                      id='deleteConfirm'
                      name='deleteConfirm'
                      className='shadow-slate-400 shadow-md dark:shadow-neutral-900 rounded-md min-w-72 min-h-10 pl-1 text-black'
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
                    <div className='flex flex-col justify-center items-center rounded-md border-solid border-2 border-lime-600 min-w-20 hover:bg-lime-600 hover:text-white
                    shadow-slate-400 shadow-md dark:shadow-neutral-900'>
                      <button type='submit'>Confirm</button>
                    </div>
                  </div>
                </m.form>
              )}
            </div>
            <div className=' self-end flex flex-col mt-4'>
              <button
                className='p-2 rounded-2xl text-white shadow-slate-400 shadow-md bg-lime-700 
              hover:bg-lime-600  dark:shadow-neutral-900'
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </m.div>
      )
      }
    </>
  );
}

export default Profile;
