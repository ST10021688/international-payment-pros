// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this to your backend URL
/*
const register = async (username, password, fullName, accountNumber, idNumber, csrfToken) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      fullName,
      idNumber,
    }, {
      headers: {
        'X-CSRF-Token': csrfToken // Include the CSRF token in the headers
      }
    });
    return response.data; // Return the response data (e.g., user info)
  } catch (error) {
    throw error.response.data; // Throw an error if the request fails
  }
};
*/
const register = async (username, password, fullName, idNumber) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      fullName,
      idNumber,
    });
    return response.data; // Return the response data (e.g., user info)
  } catch (error) {
    throw error.response.data; // Throw an error if the request fails
  }
};

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

const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/info`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
        'Content-Type': 'application/json', // Set content type
      }
    });
    return response.data; // Return the parsed JSON response data
  } catch (error) {
    throw error.response.data; // Throw an error if the request fails
  }
};

const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transaction`, transactionData);
    return response.data; // Return the response data (e.g., transaction info)
  } catch (error) {
    throw error.response.data; // Throw an error if the request fails
  }
};

const authService = {
  login,
  register,
  getUserInfo,
  addTransaction,
};

export default authService;