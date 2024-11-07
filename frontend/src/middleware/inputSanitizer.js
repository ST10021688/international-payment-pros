const sanitizeInput = (input) => {
<<<<<<< HEAD
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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  sanitizeInput,
  validateUsername,
  validateIDNumber,
  validatePassword
};
=======
    // Trim whitespace and limit length to prevent excessively long inputs
    const trimmedInput = input.trim().slice(0, 100); // Adjust max length as needed
    // Replace unwanted characters
    return trimmedInput.replace(/[^a-zA-Z0-9_ ]/g, ''); // Allow spaces for full names
  };
    
    module.exports = sanitizeInput;
>>>>>>> 468b49c (Register page is fixed)
