import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { sanitizeInput, validateUsername, validateAccountNumber, validatePassword } from '../middleware/inputSanitizer';
import './RegistrationForm.css'; // Import the CSS file for styles
import logo from '../assets/images/bank-logo.png'; // Import the logo image


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [idNumber, setIDNumber] = useState('');
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
                console.log('CSRF token:', data.csrfToken);
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
        const sanitizedIDNumber = sanitizeInput(idNumber);

        // Validate inputs
        if (!validateUsername(sanitizedUsername)) {
            setError('Username must be 3-20 characters long and can only contain letters, numbers, and underscores.');
            setLoading(false); // Stop loading
            return;
        }

        if (!validateAccountNumber(sanitizedAccountNumber)) {
            setError('Account Number must consist of digits only.');
            setLoading(false);
            return;
        }

        if (!validateAccountNumber(sanitizedIDNumber)) {
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
        console.log('Sanitized Full Name:', sanitizedFullName);
        console.log('Sanitized Username:', sanitizedUsername);
        console.log('Sanitized Account Number:', sanitizedAccountNumber);
        console.log('Sanitized ID Number:', sanitizedIDNumber);
        console.log('Password, CSRF Token:', password, csrfToken);

        try {
            const data = await authService.register(
                sanitizedUsername,
                password,
                sanitizedFullName,
                sanitizedAccountNumber,
                csrfToken
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

    // Function to navigate to the login page
    /*const handleRedirectToLogin = () => {
        navigate('/login'); // Navigate to the login page
    };*/

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

/*
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Register.css';

//------------------------------------------------------//
const Register = () => {
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmailAddress, setEnteredEmailAddress] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [enteredAccountNumber, setAccountNumber] = useState('');
    const [enteredIDNumber, setIDNumber] = useState('');
    const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmailAddress,
            username: enteredUsername,
            password: enteredPassword,
            accountNumber: enteredAccountNumber,
            idNumber: enteredIDNumber,
        };

        try {
            const response = await fetch('https://localhost:3001/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('User registered successfully!');
                console.log('User registered successfully:', result);
                navigate('/login'); 

                setEnteredFirstName('');
                setEnteredLastName('');
                setEnteredEmailAddress('');
                setEnteredUsername('');
                setEnteredPassword('');
                setEnteredConfirmPassword('');
                setAccountNumber('');
                setIDNumber('');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed');
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while registering. Please try again.');
        }
    };

    return (
        <div
            style={{
                backgroundImage: url(${process.env.PUBLIC_URL + '/images/background.jpg'}),
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0',
                padding: '0',
                boxSizing: 'border-box',
            }}
        >
            <div className="register-container">
                <div className="form-container">
                    <h1>Customer Registration</h1>
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={enteredFirstName}
                                onChange={(e) => setEnteredFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={enteredLastName}
                                onChange={(e) => setEnteredLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={enteredEmailAddress}
                                onChange={(e) => setEnteredEmailAddress(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={enteredUsername}
                                onChange={(e) => setEnteredUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={enteredPassword}
                                onChange={(e) => setEnteredPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={enteredConfirmPassword}
                                onChange={(e) => setEnteredConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Account Number"
                                value={enteredAccountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="ID Number"
                                value={enteredIDNumber}
                                onChange={(e) => setIDNumber(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="register-btn">Register</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <p className="login-message">
                        Already have an account? <Link to="/login" className="login-link">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
//------------------------------------------------------//
export default Register;
//---------------------------------------------------END OF FILE------------------------//
*/