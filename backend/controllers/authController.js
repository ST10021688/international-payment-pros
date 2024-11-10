const authService = require('../services/authService');
const { validationResult } = require('express-validator');

// Calls the registerUser function from authService
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calls the loginUser function from authService
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await authService.loginUser(req.body.username, req.body.password);
    res.json({ 
      userId: user._id,
      firstName: user.firstName,
      userType: user.userType,
      token: user.token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };