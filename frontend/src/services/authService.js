// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'https://localhost:5000/api';

//---------------------------------------------------------------------------------------------------------//
const register = async (firstName, lastName, email, idNumber, username, password, userType ) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      firstName, 
      lastName, 
      email,
      idNumber,
      username,
      password,
      userType
    });
    return response.data; // Return the user data
  } catch (error) {
    console.error('Registration error:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

//---------------------------------------------------------------------------------------------------------//
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data; // Return the user data
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

//---------------------------------------------------------------------------------------------------------//
const createTransaction = async (transactionData) => {
  console.log('Sending transaction data:', transactionData);

  try {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    console.log('Transaction response:', response.data);

    return response.data; // Return the transaction data
  } catch (error) {
    console.error('Error creating transaction:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

//---------------------------------------------------------------------------------------------------------//
const getAccountDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/accounts/${userId}`);
    return response.data; // Return the account details
  } catch (error) {
    console.error('Error fetching account details:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

//---------------------------------------------------------------------------------------------------------//

// Transactions

//---------------------------------------------------------------------------------------------------------//
const getTransactions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${userId}`);
    return response.data; // Return the transactions
  } catch (error) {
    console.error('Error fetching transactions:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

const getAllTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data; // Return all transactions
  } catch (error) {
    console.error('Error fetching all transactions:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

const validateTransaction = async (transactionId) => {
  try {
    const response = await axios.post(`${API_URL}/transactions/${transactionId}/validate`);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error validating transaction:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

const rejectTransaction = async (transactionId) => {
  try {
    const response = await axios.post(`${API_URL}/transactions/${transactionId}/reject`);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error rejecting transaction:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

//---------------------------------------------------------------------------------------------------------//
const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data; // Return the user details
  } catch (error) {
    console.error('Error fetching user details:', error.response.data);
    throw error.response.data; // Throw an error if the request fails
  }
};

//---------------------------------------------------------------------------------------------------------//
const authService = {
  login,
  register,
  createTransaction,
  getAccountDetails,
  getTransactions,
  getAllTransactions,
  validateTransaction,
  rejectTransaction,
  getUserDetails,
};

export default authService;