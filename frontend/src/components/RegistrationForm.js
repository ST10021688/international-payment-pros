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

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} required />
      </div>
      <div>
        <label>Account Number:</label>
        <input type="text" name="accountNumber" onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;