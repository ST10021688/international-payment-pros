<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { sanitizeInput, validateUsername, validatePassword } from '../middleware/inputSanitizer';
import { UserContext } from '../UserContext';
import './LoginForm.css';
import logo from '../assets/images/bank-logo.png'; // Import the logo image
=======
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from './services/authService';
>>>>>>> 468b49c (Register page is fixed)

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
=======
  const history = useHistory();
>>>>>>> 468b49c (Register page is fixed)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
<<<<<<< HEAD
    setLoading(true); // Start loading

    // Sanitize user inputs
    const sanitizedUsername = sanitizeInput(username);

    // Validate inputs
    if (!validateUsername(sanitizedUsername)) {
        setError('Username must be 3-20 characters long and can only contain letters, numbers, and underscores.');
        setLoading(false); // Stop loading
        return;
    }

    if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.');
        setLoading(false);
        return;
    }
=======
>>>>>>> 468b49c (Register page is fixed)

    try {
      const data = await authService.login(username, password);
      // If login is successful, navigate to the home page
      if (data) {
<<<<<<< HEAD
        setUser({ userId: data.userId, firstName: data.firstName });
        navigate('/dashboard');
=======
        history.push('/');
>>>>>>> 468b49c (Register page is fixed)
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.'); // Handle error
    }
<<<<<<< HEAD
    setLoading(false);
  };
  

  // UI
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
        <label>Global Banking</label>
      </div>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="login-form">
=======
  };
  
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
>>>>>>> 468b49c (Register page is fixed)
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
<<<<<<< HEAD
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="additional-info">
        <label>Don't have an account?</label>
        <a href="/register">Register here</a>
      </div>
=======
        <button type="submit">Login</button>
      </form>
>>>>>>> 468b49c (Register page is fixed)
    </div>
  );
}

export default Login;