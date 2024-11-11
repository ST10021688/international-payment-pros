// Function to sanitize input by trimming whitespace
const sanitizeInput = (input) => {
  return input.trim();
};

// Validation function for usernames
const validateUsername = (username) => {
  // Username can consist of letters, numbers, and underscores, 3-20 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// Validation function for ID numbers
const validateIDNumber = (idNumber) => {
  // ID number must only contain digits
  const idNumberRegex = /^\d+$/; // Only digits
  return idNumberRegex.test(idNumber);
};

// Validation function for passwords
const validatePassword = (password) => {
  // Password must be at least 8 characters, include uppercase, lowercase, digit, and special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}[\]|\\:;"<>,.?/~`-]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  sanitizeInput,
  validateUsername,
  validateIDNumber,
  validatePassword
};