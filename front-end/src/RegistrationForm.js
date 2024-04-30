import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from './sockets/ReactSocket';
import './landingPages.css';

function RegistrationForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for storing the error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Prepare the data for sending
    const userData = { username, password };

    try {
      // Attempt to register the user
      const response = await fetch('http://{$process.env.HOST}:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server responds with a non-OK HTTP status, display the error message
        setErrorMessage(data.message || 'Failed to sign up.');
      } else {
        //connect chat socket and register username
        //socket.auth = { username };
        //socket.connect();

        // On successful registration, navigate to the survey page
        console.log('Registration successful:', data);
        navigate('/survey');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="landingPage-container">
      <div className="landingPage-form-container">
        <h2 className="landingPage-title">Create Your Account</h2>
        {errorMessage && <div className="login-error-message">{errorMessage}</div>} {/* Display error message */}
        <form className="landingPage-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="landingPage-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="landingPage-input"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="landingPage-input"
          />
          <button type="submit" className="landingPage-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
