import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8083/api/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                setMessage(response.data.message || 'Login successful!');
                onLoginSuccess();
                navigate('/home');
            } else {
                setMessage('Error logging in.');
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data;
                let errorMessage = '';

                if (errors.username) {
                    errorMessage += `Username: ${errors.username} `;
                }
                if (errors.password) {
                    errorMessage += `Password: ${errors.password} `;
                }

                if (!errorMessage) {
                    errorMessage = 'Invalid credentials or other errors.';
                }

                console.error('Error response from server:', errors);
                setMessage(errorMessage.trim());
            } else {
                console.error('Error during request:', error.message);
                setMessage('Error logging in.');
            }
        }
    };

    return (
        <div className="main1">
            <h2 className="header">Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
            />
            <button
                onClick={handleLogin}
                className="btn"
            >
                Login
            </button>
            {message && <p className="message">{message}</p>}
            <p className="account">
                Don't have an account?{' '}
                <a href="/register" className="link">
                    Register
                </a>
            </p>
        </div>

    );
};

export default Login;
