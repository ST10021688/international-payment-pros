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

const validateIDNumber = (idNumber) => {
  // Account number must only contain digits
  const idNumberRegex = /^\d+$/; // Only digits
  return idNumberRegex.test(idNumber);
};

const validatePassword = (password) => {
  // Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;"<>,.?/~`-]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  sanitizeInput,
  validateUsername,
  validateIDNumber,
  validatePassword
};
