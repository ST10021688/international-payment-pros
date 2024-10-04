import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { sanitizeInput, validateUsername, validatePassword } from '../middleware/inputSanitizer';
import './LoginForm.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
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

    try {
      const data = await authService.login(username, password);
      // If login is successful, navigate to the home page
      if (data) {
        navigate('/register'); // Redirect to the login page
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.'); // Handle error
    }
    setLoading(false);
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="login-form">
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;