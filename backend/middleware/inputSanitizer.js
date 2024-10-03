const sanitizeInput = (input) => {
  // Trim whitespace and limit length to prevent excessively long inputs
  const trimmedInput = input.trim().slice(0, 100); // Adjust max length as needed
  // Replace unwanted characters
  return trimmedInput.replace(/[^a-zA-Z0-9_ ]/g, ''); // Allow spaces for full names
};
  
  module.exports = sanitizeInput;
  