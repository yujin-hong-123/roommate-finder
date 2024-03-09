import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './landingPages.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', username, password);
    navigate('/matches');
  };

  return (
    <div className="landingPage-container">
      <div className="landingPage-form-container">
        <h2 className="landingPage-title">Welcome Back!</h2>
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
          <button type="submit" className="landingPage-button">Log In</button>
          <div className="landingPage-footer">
            <Link to="/register" className="landingPage-link">
              Need an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
