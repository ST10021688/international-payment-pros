const sanitizeInput = (input) => {
  // Trim leading and trailing whitespace
  return input.trim();
};

// Validation functions
const validateUsername = (username) => {
  // Username can consist of letters, numbers, and underscores, 3-20 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

const validateAccountNumber = (accountNumber) => {
  // Account number must only contain digits
  const accountNumberRegex = /^\d+$/; // Only digits
  return accountNumberRegex.test(accountNumber);
};

const validatePassword = (password) => {
  // Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  sanitizeInput,
  validateUsername,
  validateAccountNumber,
  validatePassword
};