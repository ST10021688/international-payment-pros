// frontend/src/components/RegistrationForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import sanitizeInput from '../middleware/inputSanitizer';
import './RegistrationForm.css'; // Import the CSS file for styles
import logo from '../assets/images/bank-logo.png'; // Import the logo image

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [csrfToken, setCsrfToken] = useState(''); // State for CSRF token
    const navigate = useNavigate(); // Use useNavigate for redirection

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('/api/csrf-token', {
                    method: 'GET',
                    credentials: 'include' // Include credentials for cookies
                });
                const data = await response.json();
                setCsrfToken(data.csrfToken); // Set CSRF token from server
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setLoading(true); // Start loading

        // Sanitize user inputs
        const sanitizedFullName = sanitizeInput(fullName);
        const sanitizedUsername = sanitizeInput(username);
        const sanitizedAccountNumber = sanitizeInput(accountNumber);

        console.log('Sanitized Full Name:', sanitizedFullName);
        console.log('Sanitized Username:', sanitizedUsername);
        console.log('Sanitized Account Number:', sanitizedAccountNumber);
        console.log('Password, CSRF Token:', password, csrfToken);

        try {
            const data = await authService.register(
                sanitizedUsername,
                password,
                sanitizedFullName,
                sanitizedAccountNumber,
                csrfToken // Include CSRF token in the request
            );
            // If registration is successful, navigate to the login page
            if (data) {
                navigate('/login'); // Redirect to the login page
            }
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.'); // Handle error
        } finally {
            setLoading(false); // Stop loading after request
        }
    };

    return (
        <div className="registration-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
                <label>Global Banking</label>
            </div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Account Number:</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <div className="additional-info">
                <label>Already have an account?</label>
                <a href="/login">Login here</a>
            </div>
        </div>
    );
}

export default Register;
