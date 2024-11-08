// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this to your backend URL

const register = async (firstName, lastName, email, username, password, idNumber, csrfToken) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        firstName, 
        lastName, 
        email,
        username,
        password,
        idNumber,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Explicitly set content type
          'X-CSRF-Token': csrfToken,          // Include the CSRF token in the headers
        },
        withCredentials: true, // Ensure cookies are sent along with the request
      }
    );
    return response.data; // Return the response data (e.g., user info)
  } catch (error) {
    // Handle and throw a more descriptive error message
    throw error.response?.data?.message || 'An error occurred during registration';
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