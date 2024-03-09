import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPages.css';

function RegistrationForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    console.log('Register with:', username, password);
    navigate('/survey');
  };

  return (
    <div className="landingPage-container">
      <div className="landingPage-form-container">
        <h2 className="landingPage-title">Create Your Account</h2>
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