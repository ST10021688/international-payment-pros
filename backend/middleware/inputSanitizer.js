const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9_]/g, ''); // allow only alphanumeric and underscore
  };
  
  module.exports = sanitizeInput;
  