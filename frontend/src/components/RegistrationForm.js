import React, { useState } from 'react';
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
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate for redirection

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setLoading(true); // Start loading

        // Sanitize user inputs
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
        console.log('Password:', password);

        try {
            const data = await authService.register(
                sanitizedFirstName,
                sanitizedLastName,
                emailAddress,
                sanitizedUsername,
                password,
                sanitizedIDNumber
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
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="registration-form">
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
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