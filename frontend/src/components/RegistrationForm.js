/*import React, { useState } from 'react';
import DOMPurify from 'dompurify';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
  const accountNumberPattern = /^[0-9]{8,12}$/;
  const passwordPattern = /.{8,}/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'username':
        if (!usernamePattern.test(value)) {
          setErrors({ ...errors, username: 'Invalid username' });
        } else {
          const sanitizedUsername = DOMPurify.sanitize(value);
          setErrors({ ...errors, username: '' });
          setFormData({ ...formData, username: sanitizedUsername });
        }
        break;
      case 'accountNumber':
        if (!accountNumberPattern.test(value)) {
          setErrors({ ...errors, accountNumber: 'Invalid account number' });
        } else {
          setErrors({ ...errors, accountNumber: '' });
        }
        break;
      case 'password':
        if (!passwordPattern.test(value)) {
          setErrors({ ...errors, password: 'Password must be at least 8 characters' });
        } else {
          setErrors({ ...errors, password: '' });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.username && !errors.accountNumber && !errors.password) {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        alert('Registration successful!');
      } catch (error) {
        console.error(error);
      }
    }
  };
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Adjust the path as needed

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const data = await authService.register(username, password, fullName, idNumber, accountNumber);
      // If registration is successful, navigate to the login page
      if (data) {
        navigate('/login'); // Redirect to the login page
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.'); // Handle error
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
          <label>ID Number:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;