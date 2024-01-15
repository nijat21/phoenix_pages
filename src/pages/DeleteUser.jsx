import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://server-phoenix-pages.adaptable.app';

// this page can later be associated with the user that just logged in
// for now, since we didn't implement the global variable yet, it needs the username and password

function DeleteUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logInMessage, setLogInMessage] = useState('');
  const [decision, setDecision] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await axios.get(`${API_URL}/users`);

    console.log(response);

    if (!username) {
      setLogInMessage('Please input your username, mate!');
    } else if (!password) {
      setLogInMessage('Dude, are you serious?! Put in the password as well!');
    } else {
      //it's gonna find out if there is a user with these credentials
      // if yes, userCheck receives that info
      const userCheck = response.data.find(
        user => user.username === username && user.password === password
      );

      if (userCheck) {
        await axios.delete(`${API_URL}/users/${userCheck.id}`);

        navigate('/');
      } else {
        setLogInMessage("That's not the password, boy. Please try again.");
      }
    }
  };

  return (
    <div className='pt-14'>
      <h2>Are you sure you want to delete this account?</h2>
      <button onClick={() => setDecision(true)}>Yes</button>

      {decision && (
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
            type='text'
            id='password'
            name='password'
            className='border-solid border-2 border-amber-800 mb-5'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p>{logInMessage}</p>
          <button type='submit'>Delete</button>
        </form>
      )}
    </div>
  );
}

export default DeleteUser;
