<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { sanitizeInput, validateUsername, validateIDNumber, validatePassword } from '../middleware/inputSanitizer';
import './RegistrationForm.css'; // Import the CSS file for styles
import logo from '../assets/images/bank-logo.png'; // Import the logo image

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [idNumber, setIDNumber] = useState('');
    const [csrfToken, setCsrfToken] = useState(''); // State for CSRF token
    const [loading, setLoading] = useState(false); // Loading state

    const [error, setError] = useState(null);
=======
// frontend/src/components/RegistrationForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import sanitizeInput from '../middleware/inputSanitizer';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [csrfToken, setCsrfToken] = useState(''); // State for CSRF token
>>>>>>> 468b49c (Register page is fixed)
    const navigate = useNavigate(); // Use useNavigate for redirection

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch('/api/csrf-token', {
                    method: 'GET',
                    credentials: 'include' // Include credentials for cookies
                });
                const data = await response.json();
<<<<<<< HEAD
                console.log('CSRF token:', data.csrfToken);
=======
>>>>>>> 468b49c (Register page is fixed)
                setCsrfToken(data.csrfToken); // Set CSRF token from server
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };
<<<<<<< HEAD
=======

>>>>>>> 468b49c (Register page is fixed)
        fetchCsrfToken();
    }, []);

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setLoading(true); // Start loading

        // Sanitize user inputs
<<<<<<< HEAD
        const sanitizedFirstName = sanitizeInput(firstName);
        const sanitizedLastName = sanitizeInput(lastName);
        const sanitizedUsername = sanitizeInput(username);
        const sanitizedIDNumber = sanitizeInput(idNumber);

        // Validate inputs
        if (!validateUsername(sanitizedUsername)) {
            setError('Username must be 3-20 characters long and can only contain letters, numbers, and underscores.');
            setLoading(false); // Stop loading
            return;
        }

        if (!validateIDNumber(sanitizedIDNumber)) {
            setError('ID Number must consist of digits only.');
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.');
            setLoading(false);
            return;
        }

        // Debug logs
        console.log('Sanitized First Name:', sanitizedFirstName);
        console.log('Sanitized Last Name:', sanitizedLastName);
        console.log('Email Address:', emailAddress);
        console.log('Sanitized Username:', sanitizedUsername);
        console.log('Sanitized ID Number:', sanitizedIDNumber);
        console.log('Password, CSRF Token:', password, csrfToken);

        try {
            const data = await authService.register(
                sanitizedFirstName,
                sanitizedLastName,
                emailAddress,
                sanitizedUsername,
                password,
                csrfToken
=======
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
>>>>>>> 468b49c (Register page is fixed)
            );
            // If registration is successful, navigate to the login page
            if (data) {
                navigate('/login'); // Redirect to the login page
            }
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.'); // Handle error
<<<<<<< HEAD
        } finally {
            setLoading(false); // Stop loading after request
=======
>>>>>>> 468b49c (Register page is fixed)
        }
    };

    return (
<<<<<<< HEAD
        <div className="registration-container">
            <div className="logo-container">
        <img src={logo} alt="Logo" />
        <label>Global Banking</label>
      </div>
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="registration-form">
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
=======
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
>>>>>>> 468b49c (Register page is fixed)
                        required
                    />
                </div>
                <div>
<<<<<<< HEAD
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email Address:</label>
                    <input
                        type="text"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ID Number:</label>
                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIDNumber(e.target.value)}
=======
                    <label>Account Number:</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
>>>>>>> 468b49c (Register page is fixed)
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
<<<<<<< HEAD
            <div className="additional-info">
        <label>Already have an account?</label>
        <a href="/login">Login here</a>
      </div>
=======
>>>>>>> 468b49c (Register page is fixed)
        </div>
    );
}

export default Register;