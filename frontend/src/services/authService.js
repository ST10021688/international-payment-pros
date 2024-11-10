// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this to your backend URL

const register = async (firstName, lastName, email, username, password, idNumber) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      firstName, 
      lastName, 
      email,
      username,
      password,
      idNumber
    });
    return response.data; // Return the response data (e.g., user info)
  } catch (error) {
    console.error('Registration error:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

const login = async (username, password) => {
  try {
    console.log('Logging in user with data:', { username, password });
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // Return the response data (e.g., user info, token)
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

const payment = async (userId, recipientName, recipientsBank, recipientsAccountNumber, amountToTransfer, swiftCode, transactionType, status, date) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, {
      userId,
      recipientName,
      recipientsBank,
      recipientsAccountNumber,
      amountToTransfer,
      swiftCode,
      transactionType,
      status,
      date,
    });
    return response.data; // Return the response data (e.g., user info, token)
  } catch (error) {
    throw error.response.data; // Throw an error if the request fails
  }
};

const authService = {
  login,
  register,
  payment,
};

export default authService;