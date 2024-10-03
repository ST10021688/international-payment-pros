import axios from 'axios';

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

export default authService;