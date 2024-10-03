/*import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this to your backend URL

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // Return the response data (e.g., user info, token)
  } catch (error) {
    throw error.response.data; // Throw an error if the request fails
  }
};

const register = async (username, password, fullName, idNumber, accountNumber) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
        fullName,
        idNumber,
        accountNumber,
      });
      return response.data; // Return the response data (e.g., user info)
    } catch (error) {
      throw error.response.data; // Throw an error if the request fails
    }
  };

const authService = {
  login,
  register,
};

export default authService;*/

// backend/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (userData) => {
  const { username, password, fullName, accountNumber } = userData;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Username already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    fullName,
    accountNumber,
  });

  await newUser.save();
  return newUser;
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('No matching User found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = { registerUser, loginUser };