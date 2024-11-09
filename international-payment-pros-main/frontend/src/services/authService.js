// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this to your backend URL

const register = async (firstName, lastName, email, username, password, idNumber, csrfToken) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      firstName, 
      lastName, 
      email,
      username,
      password,
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

// If you're not using the payment function yet, it can be removed
// If you plan to use it, you can keep it as follows:

// const payment = async (userId, recipientName, recipientsBank, recipientsAccountNumber, amountToTransfer, swiftCode, transactionType, status, date) => {
//   try {
//     const response = await axios.post(`${API_URL}/transactions`, {
//       userId,
//       recipientName,
//       recipientsBank,
//       recipientsAccountNumber,
//       amountToTransfer,
//       swiftCode,
//       transactionType,
//       status,
//       date,
//     });
//     return response.data; // Return the response data (e.g., transaction info)
//   } catch (error) {
//     throw error.response.data; // Throw an error if the request fails
//   }
// };

const authService = {
  login,
  register,
  // payment, // Uncomment this line if you need to include the payment function
};

export default authService;
