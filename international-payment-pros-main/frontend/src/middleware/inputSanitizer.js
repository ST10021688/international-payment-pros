// Sanitize input by trimming whitespace, limiting length, and removing unwanted characters
const sanitizeInput = (input) => {
  const trimmedInput = input.trim().slice(0, 100); // Adjust max length as needed
  return trimmedInput.replace(/[^a-zA-Z0-9_ ]/g, ''); // Allow spaces for full names
};

// Validation functions
const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

const validateIDNumber = (idNumber) => {
  const idNumberRegex = /^\d+$/; // Only digits
  return idNumberRegex.test(idNumber);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  sanitizeInput,
  validateUsername,
  validateIDNumber,
  validatePassword
};
