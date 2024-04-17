import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './landingPages.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login with:', username, password);

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);  // Save the token to localStorage
                navigate('/matches');  // Navigate to the 'matches' route on successful login
            } else {
                console.error('Login failed:', data.message);
                setLoginError(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Failed to connect to the server.');
        }
    };

    return (
        <div className="landingPage-container">
            <div className="landingPage-form-container">
                <h2 className="landingPage-title">Welcome Back!</h2>
                {loginError && <div className="login-error-message">{loginError}</div>}
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
