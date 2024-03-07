import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './landingPages.css';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', username, password);
  };

  return (
    <div className="landingPage-container">
      <div className="landingPage-form-container">
        <h2 className="landingPage-title">NYU Roommate Finder</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="input"
          />
          <button type="submit" onClick={() => navigate('/matches')} className="landingPage-button">Login</button>
          <div className="landingPage-footer">
            <Link to="/register" className="landingPage-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
