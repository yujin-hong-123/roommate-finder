import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', username, password);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">NYU Roommate Finder</h2>
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
          <button type="submit" className="button">Login</button>
          <div className="footer">
            <Link to="/register" className="link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
